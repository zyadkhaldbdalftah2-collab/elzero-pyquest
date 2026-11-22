"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import {
  User,
  LogOut,
  Trophy,
  Shield,
  ChevronDown,
  Sparkles,
  ExternalLink,
  Layers,
} from "lucide-react";
import { getRankTitle } from "@/types";

export default function UserNav() {
  const { user, profile, signOut, isConfigured } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  if (!isConfigured) {
    return (
      <div className="flex items-center gap-2">
        <Link
          href="/leaderboard"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
          title="View Global Leaderboard"
        >
          <Trophy className="w-3.5 h-3.5 text-python-yellow" />
          <span className="hidden sm:inline">Leaderboard</span>
        </Link>
        <Link
          href="/login"
          className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-python-blue/20 hover:bg-python-blue text-blue-300 hover:text-white border border-python-blue/40 text-xs font-semibold transition-all"
        >
          <User className="w-3.5 h-3.5" />
          <span>Connect Cloud</span>
        </Link>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <Link
          href="/leaderboard"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
        >
          <Trophy className="w-3.5 h-3.5 text-python-yellow" />
          <span className="hidden sm:inline">Leaderboard</span>
        </Link>
        <Link
          href="/login"
          className="px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
        >
          Sign In
        </Link>
        <Link
          href="/signup"
          className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-white bg-python-blue hover:bg-blue-600 shadow-md shadow-python-blue/20 transition-all active:scale-95"
        >
          Sign Up
        </Link>
      </div>
    );
  }

  const username = profile?.username || user.email?.split("@")[0] || "developer";
  const rank = getRankTitle(profile?.xp || 0);
  const avatarUrl =
    profile?.avatar_url ||
    user.user_metadata?.avatar_url ||
    `https://api.dicebear.com/7.x/bottts/svg?seed=${username}`;

  return (
    <div className="relative">
      <div className="flex items-center gap-2">
        <Link
          href="/leaderboard"
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
        >
          <Trophy className="w-3.5 h-3.5 text-python-yellow" />
          <span>Leaderboard</span>
        </Link>

        {/* User Button */}
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center gap-2 p-1 pl-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl transition-colors"
        >
          <div className="text-left hidden md:block">
            <div className="text-xs font-bold text-white leading-tight truncate max-w-[100px]">
              {profile?.display_name || username}
            </div>
            <div className="text-[10px] text-python-yellow font-mono leading-tight">
              {rank.title}
            </div>
          </div>

          <img
            src={avatarUrl}
            alt={username}
            className="w-7 h-7 rounded-lg bg-slate-950 border border-slate-700 object-cover"
          />
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 mr-1" />
        </button>
      </div>

      {/* Dropdown Menu */}
      {dropdownOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setDropdownOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-56 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-2 z-50 space-y-1 animate-fadeIn">
            {/* Header info */}
            <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800/80 mb-1 space-y-1">
              <div className="text-xs font-bold text-white truncate">
                {profile?.display_name || username}
              </div>
              <div className="text-[11px] text-slate-400 font-mono truncate">
                @{username}
              </div>
              <div className="pt-1 flex items-center justify-between text-[11px] font-mono border-t border-slate-800/80 mt-1">
                <span className="text-python-yellow">{profile?.xp || 0} XP</span>
                <span className="text-python-blue">Lvl {profile?.level || 1}</span>
              </div>
            </div>

            <Link
              href={`/profile/${username}`}
              onClick={() => setDropdownOpen(false)}
              className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-300 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
            >
              <User className="w-4 h-4 text-python-blue" />
              <span>Developer Profile</span>
            </Link>

            <Link
              href="/leaderboard"
              onClick={() => setDropdownOpen(false)}
              className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-300 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
            >
              <Trophy className="w-4 h-4 text-python-yellow" />
              <span>Global Leaderboard</span>
            </Link>

            <button
              onClick={() => {
                setDropdownOpen(false);
                signOut();
              }}
              className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-red-400 hover:text-red-300 rounded-xl hover:bg-red-950/30 transition-colors text-left"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
}
