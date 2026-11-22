-- ==============================================================================
-- Elzero PyQuest – Supabase Database Schema
-- Dedicated to Osama Elzero's "Mastering Python" Course Platform
-- ==============================================================================

-- 1. Create the `profiles` table extending auth.users
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique not null,
  display_name text,
  avatar_url text,
  xp integer not null default 0,
  level integer not null default 1,
  streak integer not null default 0,
  last_active_date date default current_date,
  completed_lessons integer[] not null default array[]::integer[],
  completed_games jsonb not null default '{}'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Indexes for high performance queries (Leaderboard & Profiles)
create index if not exists idx_profiles_xp on public.profiles (xp desc);
create index if not exists idx_profiles_streak on public.profiles (streak desc);
create index if not exists idx_profiles_username on public.profiles (username);

-- 3. Enable Row Level Security (RLS)
alter table public.profiles enable row level security;

-- 4. RLS Policies
-- Anyone can view profiles for the public profile page and leaderboard
create policy "Public profiles are viewable by everyone" 
  on public.profiles 
  for select 
  using (true);

-- Users can insert their own profile
create policy "Users can insert their own profile" 
  on public.profiles 
  for insert 
  with check (auth.uid() = id);

-- Users can update only their own profile
create policy "Users can update own profile" 
  on public.profiles 
  for update 
  using (auth.uid() = id);

-- 5. Trigger for automatic profile creation on user signup
create or replace function public.handle_new_user()
returns trigger as $$
declare
  raw_username text;
begin
  raw_username := coalesce(
    new.raw_user_meta_data->>'username',
    split_part(new.email, '@', 1) || '_' || substr(new.id::text, 1, 4)
  );

  insert into public.profiles (id, username, display_name, avatar_url, xp, level, streak, completed_lessons)
  values (
    new.id,
    raw_username,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', raw_username),
    coalesce(new.raw_user_meta_data->>'avatar_url', 'https://api.dicebear.com/7.x/bottts/svg?seed=' || raw_username),
    0,
    1,
    0,
    array[]::integer[]
  );
  return new;
end;
$$ language plpgsql security definer;

-- Trigger execution on auth.users insert
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 6. Seed mock leaderboard data (optional demo users)
insert into public.profiles (id, username, display_name, avatar_url, xp, level, streak, completed_lessons)
values
  ('a0000000-0000-0000-0000-000000000001', 'ahmed_py', 'Ahmed Mansour', 'https://api.dicebear.com/7.x/bottts/svg?seed=ahmed', 1450, 15, 21, array[1,2,3,4,5,6,7,8,9,10,11,12]),
  ('a0000000-0000-0000-0000-000000000002', 'sara_code', 'Sara Al-Omari', 'https://api.dicebear.com/7.x/bottts/svg?seed=sara', 1120, 12, 14, array[1,2,3,4,5,6,7,8]),
  ('a0000000-0000-0000-0000-000000000003', 'karim_dev', 'Karim El-Sayed', 'https://api.dicebear.com/7.x/bottts/svg?seed=karim', 890, 9, 9, array[1,2,3,4,5,6]),
  ('a0000000-0000-0000-0000-000000000004', 'nour_python', 'Nourhan Tarek', 'https://api.dicebear.com/7.x/bottts/svg?seed=nour', 670, 7, 7, array[1,2,3,4,5]),
  ('a0000000-0000-0000-0000-000000000005', 'omar_quest', 'Omar Zaki', 'https://api.dicebear.com/7.x/bottts/svg?seed=omar', 480, 5, 4, array[1,2,3,4])
on conflict (id) do nothing;
