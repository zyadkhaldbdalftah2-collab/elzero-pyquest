"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  Trophy,
  Flame,
  Award,
  Zap,
  CheckCircle2,
  Search,
  ArrowLeft,
  Medal,
  Crown,
  ExternalLink,
  Loader2,
  Menu,
} from "lucide-react";
import Sidebar from "@/components/Sidebar";
import UserNav from "@/components/UserNav";
import { fetchLeaderboard } from "@/lib/supabase";
import { Profile, getRankTitle } from "@/types";
import { loadProgress } from "@/lib/storage";

export default function LeaderboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSort, setActiveSort] = useState<"xp" | "streak" | "lessons">("xp");

  useEffect(() => {
    document.title = "Global Leaderboard | PyVerse Academy";
  }, []);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const data = await fetchLeaderboard();

      // Merge local user's data if they have XP
      const local = loadProgress();
      if (local.xp > 0) {
        const localUserEntry: Profile = {
          id: "local_user_active",
          username: "you (local)",
          display_name: "You (Current Session)",
          avatar_url: "https://api.dicebear.com/7.x/bottts/svg?seed=you",
          xp: local.xp,
          level: local.level,
          streak: local.streak,
          completed_lessons: local.completedLessons,
        };

        // Don't duplicate if already present
        if (!data.some((p) => p.username === "you (local)")) {
          data.push(localUserEntry);
        }
      }

      setProfiles(data);
      setLoading(false);
    }
    loadData();
  }, []);

  const sortedProfiles = useMemo(() => {
    const list = [...profiles];
    if (activeSort === "xp") {
      list.sort((a, b) => b.xp - a.xp);
    } else if (activeSort === "streak") {
      list.sort((a, b) => b.streak - a.streak);
    } else if (activeSort === "lessons") {
      list.sort((a, b) => (b.completed_lessons?.length || 0) - (a.completed_lessons?.length || 0));
    }
    return list;
  }, [profiles, activeSort]);

  const filteredProfiles = useMemo(() => {
    if (!searchQuery.trim()) return sortedProfiles;
    const q = searchQuery.toLowerCase().trim();
    return sortedProfiles.filter(
      (p) =>
        p.username.toLowerCase().includes(q) ||
        (p.display_name && p.display_name.toLowerCase().includes(q))
    );
  }, [sortedProfiles, searchQuery]);

  const top3 = sortedProfiles.slice(0, 3);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 flex flex-col lg:flex-row">
      {/* Sidebar */}
      <Sidebar
        isOpenMobile={sidebarOpen}
        onCloseMobile={() => setSidebarOpen(false)}
      />

      {/* Main Content */}
      <div className="flex-1 lg:ml-80 flex flex-col min-h-screen">
        {/* Top Navbar */}
        <header className="sticky top-0 z-30 bg-slate-950/80 backdrop-blur-md border-b border-slate-800 px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
            >
              <Menu className="w-5 h-5" />
            </button>
            <Link
              href="/"
              className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back to Hub</span>
            </Link>
            <span className="text-slate-700 hidden md:inline">/</span>
            <span className="text-xs font-bold text-white hidden md:inline">
              PyVerse <span className="text-python-yellow">Academy</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <UserNav />
          </div>
        </header>

        {/* Page Container */}
        <div className="flex-1 p-4 sm:p-8 space-y-8 max-w-5xl w-full mx-auto">
          {/* Header Banner */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-python-yellow/15 border border-python-yellow/30 text-python-yellow text-xs font-mono">
              <Trophy className="w-3.5 h-3.5" />
              <span>Competitive Leaderboard</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              PyVerse Academy Leaderboard
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
              Real-time rankings of learners mastering Osama Elzero&apos;s Python course on PyVerse Academy. Earn XP by beating mini-games and mini-projects.
            </p>
          </div>

          {/* Top 3 Podium */}
          {!loading && top3.length >= 3 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 items-end">
              {/* #2 Silver (Left) */}
              <div className="order-2 md:order-1 p-5 rounded-2xl bg-slate-900/90 border border-slate-700/60 text-center space-y-3 relative shadow-lg">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-slate-400 text-slate-950 font-extrabold text-xs flex items-center justify-center shadow-md">
                  2
                </div>
                <img
                  src={top3[1].avatar_url || `https://api.dicebear.com/7.x/bottts/svg?seed=${top3[1].username}`}
                  alt={top3[1].username}
                  className="w-16 h-16 rounded-2xl mx-auto bg-slate-950 border border-slate-700 object-cover"
                />
                <div>
                  <h3 className="text-sm font-bold text-white truncate">
                    {top3[1].display_name || top3[1].username}
                  </h3>
                  <Link
                    href={`/profile/${top3[1].username}`}
                    className="text-xs font-mono text-slate-400 hover:text-python-blue flex items-center justify-center gap-1"
                  >
                    <span>@{top3[1].username}</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </Link>
                </div>
                <div className="pt-2 border-t border-slate-800 flex items-center justify-around text-xs font-mono">
                  <span className="text-python-yellow font-bold">{top3[1].xp} XP</span>
                  <span className="text-orange-400">{top3[1].streak}d Streak</span>
                </div>
              </div>

              {/* #1 Gold (Center, Elevated) */}
              <div className="order-1 md:order-2 p-6 rounded-3xl bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-python-yellow/50 text-center space-y-3 relative shadow-2xl scale-105">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-gradient-to-tr from-python-yellow to-amber-500 text-slate-950 font-black text-sm flex items-center justify-center shadow-lg shadow-python-yellow/30">
                  <Crown className="w-4 h-4 fill-slate-950" />
                </div>
                <img
                  src={top3[0].avatar_url || `https://api.dicebear.com/7.x/bottts/svg?seed=${top3[0].username}`}
                  alt={top3[0].username}
                  className="w-20 h-20 rounded-2xl mx-auto bg-slate-950 border-2 border-python-yellow object-cover shadow-md"
                />
                <div>
                  <div className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-python-yellow/20 text-python-yellow inline-block mb-1">
                    Python Master
                  </div>
                  <h3 className="text-base font-black text-white truncate">
                    {top3[0].display_name || top3[0].username}
                  </h3>
                  <Link
                    href={`/profile/${top3[0].username}`}
                    className="text-xs font-mono text-slate-400 hover:text-python-yellow flex items-center justify-center gap-1"
                  >
                    <span>@{top3[0].username}</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </Link>
                </div>
                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-around text-xs font-mono">
                  <span className="text-python-yellow font-extrabold text-sm">
                    {top3[0].xp} XP
                  </span>
                  <span className="text-orange-400 font-bold">
                    {top3[0].streak}d Streak
                  </span>
                </div>
              </div>

              {/* #3 Bronze (Right) */}
              <div className="order-3 p-5 rounded-2xl bg-slate-900/90 border border-slate-700/60 text-center space-y-3 relative shadow-lg">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-amber-700 text-white font-extrabold text-xs flex items-center justify-center shadow-md">
                  3
                </div>
                <img
                  src={top3[2].avatar_url || `https://api.dicebear.com/7.x/bottts/svg?seed=${top3[2].username}`}
                  alt={top3[2].username}
                  className="w-16 h-16 rounded-2xl mx-auto bg-slate-950 border border-slate-700 object-cover"
                />
                <div>
                  <h3 className="text-sm font-bold text-white truncate">
                    {top3[2].display_name || top3[2].username}
                  </h3>
                  <Link
                    href={`/profile/${top3[2].username}`}
                    className="text-xs font-mono text-slate-400 hover:text-python-blue flex items-center justify-center gap-1"
                  >
                    <span>@{top3[2].username}</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </Link>
                </div>
                <div className="pt-2 border-t border-slate-800 flex items-center justify-around text-xs font-mono">
                  <span className="text-python-yellow font-bold">{top3[2].xp} XP</span>
                  <span className="text-orange-400">{top3[2].streak}d Streak</span>
                </div>
              </div>
            </div>
          )}

          {/* Filter & Search Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-900 p-3 rounded-2xl border border-slate-800">
            {/* Sort Tabs */}
            <div className="flex items-center gap-1.5 w-full sm:w-auto">
              <button
                onClick={() => setActiveSort("xp")}
                className={`flex-1 sm:flex-none px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  activeSort === "xp"
                    ? "bg-python-blue text-white shadow-md shadow-python-blue/20"
                    : "text-slate-400 hover:text-white hover:bg-slate-800"
                }`}
              >
                Highest XP
              </button>
              <button
                onClick={() => setActiveSort("streak")}
                className={`flex-1 sm:flex-none px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  activeSort === "streak"
                    ? "bg-python-blue text-white shadow-md shadow-python-blue/20"
                    : "text-slate-400 hover:text-white hover:bg-slate-800"
                }`}
              >
                Top Streaks
              </button>
              <button
                onClick={() => setActiveSort("lessons")}
                className={`flex-1 sm:flex-none px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  activeSort === "lessons"
                    ? "bg-python-blue text-white shadow-md shadow-python-blue/20"
                    : "text-slate-400 hover:text-white hover:bg-slate-800"
                }`}
              >
                Lessons Done
              </button>
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search learner..."
                className="w-full pl-9 pr-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-python-blue"
              />
            </div>
          </div>

          {/* Leaderboard Table */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
            {loading ? (
              <div className="p-12 text-center space-y-3">
                <Loader2 className="w-8 h-8 animate-spin text-python-blue mx-auto" />
                <p className="text-xs text-slate-400 font-mono">
                  Fetching live leaderboard standings...
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950 text-slate-400 uppercase font-mono text-[11px] border-b border-slate-800">
                    <tr>
                      <th className="py-3 px-4 w-16 text-center">Rank</th>
                      <th className="py-3 px-4">Developer</th>
                      <th className="py-3 px-4 hidden md:table-cell">Title</th>
                      <th className="py-3 px-4 text-center">Lessons</th>
                      <th className="py-3 px-4 text-center">Streak</th>
                      <th className="py-3 px-4 text-right">Total XP</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-inter">
                    {filteredProfiles.map((p, idx) => {
                      const rank = getRankTitle(p.xp);
                      const isTop3 = idx < 3 && !searchQuery;

                      return (
                        <tr
                          key={p.id || idx}
                          className="hover:bg-slate-800/40 transition-colors group"
                        >
                          <td className="py-3.5 px-4 text-center font-mono font-bold">
                            {idx === 0 ? (
                              <span className="w-6 h-6 rounded-full bg-python-yellow text-slate-950 inline-flex items-center justify-center text-xs">
                                1
                              </span>
                            ) : idx === 1 ? (
                              <span className="w-6 h-6 rounded-full bg-slate-400 text-slate-950 inline-flex items-center justify-center text-xs">
                                2
                              </span>
                            ) : idx === 2 ? (
                              <span className="w-6 h-6 rounded-full bg-amber-700 text-white inline-flex items-center justify-center text-xs">
                                3
                              </span>
                            ) : (
                              <span className="text-slate-500">#{idx + 1}</span>
                            )}
                          </td>

                          <td className="py-3.5 px-4">
                            <Link
                              href={`/profile/${p.username}`}
                              className="flex items-center gap-3 group-hover:text-python-blue transition-colors"
                            >
                              <img
                                src={
                                  p.avatar_url ||
                                  `https://api.dicebear.com/7.x/bottts/svg?seed=${p.username}`
                                }
                                alt={p.username}
                                className="w-8 h-8 rounded-lg bg-slate-950 border border-slate-800 object-cover shrink-0"
                              />
                              <div className="truncate">
                                <div className="font-semibold text-white group-hover:text-python-yellow transition-colors truncate">
                                  {p.display_name || p.username}
                                </div>
                                <div className="text-[11px] font-mono text-slate-500">
                                  @{p.username}
                                </div>
                              </div>
                            </Link>
                          </td>

                          <td className="py-3.5 px-4 hidden md:table-cell">
                            <span
                              className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${rank.badgeColor}`}
                            >
                              {rank.title}
                            </span>
                          </td>

                          <td className="py-3.5 px-4 text-center font-mono text-slate-300">
                            {p.completed_lessons?.length || 0}
                          </td>

                          <td className="py-3.5 px-4 text-center">
                            <span className="inline-flex items-center gap-1 font-mono text-orange-400 font-semibold">
                              <Flame className="w-3.5 h-3.5 fill-orange-400" />
                              <span>{p.streak || 0}d</span>
                            </span>
                          </td>

                          <td className="py-3.5 px-4 text-right font-fira font-bold text-python-yellow text-sm">
                            {p.xp} <span className="text-[10px] text-slate-500 font-normal">pts</span>
                          </td>
                        </tr>
                      );
                    })}

                    {filteredProfiles.length === 0 && (
                      <tr>
                        <td colSpan={6} className="py-8 text-center text-slate-500 italic">
                          No learners matched &quot;{searchQuery}&quot;
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
