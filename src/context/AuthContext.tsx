"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { User, Session } from "@supabase/supabase-js";
import {
  getSupabaseClient,
  isSupabaseConfigured,
  syncProgressToSupabase,
} from "@/lib/supabase";
import { Profile, UserProgress } from "@/types";
import { loadProgress, saveProgress } from "@/lib/storage";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  loading: boolean;
  isConfigured: boolean;
  signInWithEmail: (email: string, pass: string) => Promise<{ error: string | null }>;
  signUpWithEmail: (
    email: string,
    pass: string,
    username: string,
    fullName?: string
  ) => Promise<{ error: string | null }>;
  signInWithGoogle: () => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  profile: null,
  loading: true,
  isConfigured: false,
  signInWithEmail: async () => ({ error: "Not initialized" }),
  signUpWithEmail: async () => ({ error: "Not initialized" }),
  signInWithGoogle: async () => ({ error: "Not initialized" }),
  signOut: async () => {},
  refreshProfile: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isConfigured, setIsConfigured] = useState(false);

  const fetchProfile = useCallback(async (client: any, userId: string) => {
    try {
      const { data, error } = await client
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (!error && data) {
        setProfile(data as Profile);

        // Merge cloud progress into local progress
        const local = loadProgress();
        const merged: UserProgress = {
          xp: Math.max(local.xp, data.xp || 0),
          level: Math.max(local.level, data.level || 1),
          streak: Math.max(local.streak, data.streak || 0),
          lastActiveDate: data.last_active_date || local.lastActiveDate,
          completedLessons: Array.from(
            new Set([...local.completedLessons, ...(data.completed_lessons || [])])
          ),
          completedGames: {
            ...local.completedGames,
            ...(data.completed_games || {}),
          },
        };
        saveProgress(merged);

        // If local had more progress than cloud, sync back up
        if (local.xp > (data.xp || 0) || local.completedLessons.length > (data.completed_lessons?.length || 0)) {
          syncProgressToSupabase(userId, merged);
        }
      }
    } catch (err) {
      console.warn("Could not load user profile from cloud:", err);
    }
  }, []);

  useEffect(() => {
    const configured = isSupabaseConfigured();
    setIsConfigured(configured);

    if (!configured) {
      setLoading(false);
      return;
    }

    const client = getSupabaseClient();
    if (!client) {
      setLoading(false);
      return;
    }

    // Get current session
    client.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(client, session.user.id);
      }
      setLoading(false);
    });

    // Listen to auth changes
    const {
      data: { subscription },
    } = client.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        await fetchProfile(client, session.user.id);
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [fetchProfile]);

  const signInWithEmail = async (email: string, pass: string) => {
    const client = getSupabaseClient();
    if (!client) return { error: "Supabase is not configured." };
    const { error } = await client.auth.signInWithPassword({
      email,
      password: pass,
    });
    return { error: error?.message || null };
  };

  const signUpWithEmail = async (
    email: string,
    pass: string,
    username: string,
    fullName?: string
  ) => {
    const client = getSupabaseClient();
    if (!client) return { error: "Supabase is not configured." };

    const cleanUsername = username.toLowerCase().replace(/[^a-z0-9_]/g, "");
    if (!cleanUsername) return { error: "Username must be alphanumeric." };

    const { error } = await client.auth.signUp({
      email,
      password: pass,
      options: {
        data: {
          username: cleanUsername,
          full_name: fullName || cleanUsername,
          avatar_url: `https://api.dicebear.com/7.x/bottts/svg?seed=${cleanUsername}`,
        },
      },
    });

    return { error: error?.message || null };
  };

  const signInWithGoogle = async () => {
    const client = getSupabaseClient();
    if (!client) return { error: "Supabase is not configured." };
    const { error } = await client.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: typeof window !== "undefined" ? window.location.origin : undefined,
      },
    });
    return { error: error?.message || null };
  };

  const signOut = async () => {
    const client = getSupabaseClient();
    if (client) {
      await client.auth.signOut();
    }
    setUser(null);
    setSession(null);
    setProfile(null);
  };

  const refreshProfile = async () => {
    const client = getSupabaseClient();
    if (client && user) {
      await fetchProfile(client, user.id);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        profile,
        loading,
        isConfigured,
        signInWithEmail,
        signUpWithEmail,
        signInWithGoogle,
        signOut,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
