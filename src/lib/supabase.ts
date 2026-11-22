import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { Profile, UserProgress } from "@/types";

let cachedClient: SupabaseClient | null = null;

export function getSupabaseCredentials(): { url: string; anonKey: string } | null {
  // 1. Check environment variables
  const envUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const envKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (envUrl && envKey && envUrl.startsWith("http")) {
    return { url: envUrl, anonKey: envKey };
  }

  // 2. Check browser localStorage fallback
  if (typeof window !== "undefined") {
    try {
      const localUrl = localStorage.getItem("elzero_supabase_url");
      const localKey = localStorage.getItem("elzero_supabase_anon_key");
      if (localUrl && localKey && localUrl.startsWith("http")) {
        return { url: localUrl, anonKey: localKey };
      }
    } catch {
      // ignore
    }
  }

  return null;
}

export function isSupabaseConfigured(): boolean {
  return getSupabaseCredentials() !== null;
}

export function getSupabaseClient(): SupabaseClient | null {
  if (cachedClient) return cachedClient;

  const creds = getSupabaseCredentials();
  if (!creds) return null;

  try {
    cachedClient = createClient(creds.url, creds.anonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    });
    return cachedClient;
  } catch (err) {
    console.error("Failed to initialize Supabase client:", err);
    return null;
  }
}

// ─── Cloud Sync Helper ────────────────────────────────────────────────

export async function syncProgressToSupabase(
  userId: string,
  progress: UserProgress
): Promise<boolean> {
  const client = getSupabaseClient();
  if (!client) return false;

  try {
    const { error } = await client
      .from("profiles")
      .update({
        xp: progress.xp,
        level: progress.level,
        streak: progress.streak,
        last_active_date: progress.lastActiveDate || new Date().toISOString().split("T")[0],
        completed_lessons: progress.completedLessons,
        completed_games: progress.completedGames,
        updated_at: new Date().toISOString(),
      })
      .eq("id", userId);

    if (error) {
      console.warn("Failed to sync progress to Supabase:", error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.warn("Error during cloud sync:", err);
    return false;
  }
}

// ─── Leaderboard Data (Real + Fallback) ────────────────────────────────

export const MOCK_LEADERBOARD: Profile[] = [
  {
    id: "a0000000-0000-0000-0000-000000000001",
    username: "ahmed_py",
    display_name: "Ahmed Mansour",
    avatar_url: "https://api.dicebear.com/7.x/bottts/svg?seed=ahmed",
    xp: 1450,
    level: 15,
    streak: 21,
    completed_lessons: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  },
  {
    id: "a0000000-0000-0000-0000-000000000002",
    username: "sara_code",
    display_name: "Sara Al-Omari",
    avatar_url: "https://api.dicebear.com/7.x/bottts/svg?seed=sara",
    xp: 1120,
    level: 12,
    streak: 14,
    completed_lessons: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  },
  {
    id: "a0000000-0000-0000-0000-000000000003",
    username: "karim_dev",
    display_name: "Karim El-Sayed",
    avatar_url: "https://api.dicebear.com/7.x/bottts/svg?seed=karim",
    xp: 890,
    level: 9,
    streak: 9,
    completed_lessons: [1, 2, 3, 4, 5, 6, 7],
  },
  {
    id: "a0000000-0000-0000-0000-000000000004",
    username: "nour_python",
    display_name: "Nourhan Tarek",
    avatar_url: "https://api.dicebear.com/7.x/bottts/svg?seed=nour",
    xp: 670,
    level: 7,
    streak: 7,
    completed_lessons: [1, 2, 3, 4, 5],
  },
  {
    id: "a0000000-0000-0000-0000-000000000005",
    username: "omar_quest",
    display_name: "Omar Zaki",
    avatar_url: "https://api.dicebear.com/7.x/bottts/svg?seed=omar",
    xp: 480,
    level: 5,
    streak: 4,
    completed_lessons: [1, 2, 3, 4],
  },
  {
    id: "a0000000-0000-0000-0000-000000000006",
    username: "layla_py",
    display_name: "Layla Hassan",
    avatar_url: "https://api.dicebear.com/7.x/bottts/svg?seed=layla",
    xp: 290,
    level: 3,
    streak: 3,
    completed_lessons: [1, 2, 3],
  },
  {
    id: "a0000000-0000-0000-0000-000000000007",
    username: "tareq_builder",
    display_name: "Tareq Mahmoud",
    avatar_url: "https://api.dicebear.com/7.x/bottts/svg?seed=tareq",
    xp: 150,
    level: 2,
    streak: 2,
    completed_lessons: [1, 2],
  },
];

export async function fetchLeaderboard(): Promise<Profile[]> {
  const client = getSupabaseClient();
  if (client) {
    try {
      const { data, error } = await client
        .from("profiles")
        .select("*")
        .order("xp", { ascending: false })
        .limit(50);

      if (!error && data && data.length > 0) {
        return data as Profile[];
      }
    } catch (err) {
      console.warn("Could not fetch cloud leaderboard, falling back to mock:", err);
    }
  }

  return MOCK_LEADERBOARD;
}

export async function fetchProfileByUsername(username: string): Promise<Profile | null> {
  const cleanUsername = username.toLowerCase().trim();

  // Try Supabase first
  const client = getSupabaseClient();
  if (client) {
    try {
      const { data, error } = await client
        .from("profiles")
        .select("*")
        .ilike("username", cleanUsername)
        .single();

      if (!error && data) {
        return data as Profile;
      }
    } catch {
      // fallback
    }
  }

  // Check mock data
  const mockFound = MOCK_LEADERBOARD.find(
    (p) => p.username.toLowerCase() === cleanUsername
  );
  if (mockFound) return mockFound;

  return null;
}
