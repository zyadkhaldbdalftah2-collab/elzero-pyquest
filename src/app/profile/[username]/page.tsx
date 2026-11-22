"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  User,
  Trophy,
  Flame,
  Award,
  Zap,
  CheckCircle2,
  Calendar,
  Share2,
  Check,
  ArrowLeft,
  BookOpen,
  Lock,
  Layers,
  Menu,
} from "lucide-react";
import Sidebar from "@/components/Sidebar";
import UserNav from "@/components/UserNav";
import { fetchProfileByUsername } from "@/lib/supabase";
import { Profile, getRankTitle, getUserCertificates } from "@/types";
import { loadProgress } from "@/lib/storage";

export default function ProfilePage() {
  const params = useParams();
  const rawUsername = params?.username as string;
  const username = decodeURIComponent(rawUsername || "");

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    async function loadData() {
      setLoading(true);

      // Check if viewing "you" or local user
      if (username === "you" || username.includes("local")) {
        const local = loadProgress();
        setProfile({
          id: "local_profile",
          username: "you",
          display_name: "You (Local Profile)",
          avatar_url: "https://api.dicebear.com/7.x/bottts/svg?seed=you",
          xp: local.xp,
          level: local.level,
          streak: local.streak,
          completed_lessons: local.completedLessons,
          created_at: new Date().toISOString(),
        });
        setLoading(false);
        return;
      }

      const p = await fetchProfileByUsername(username);
      if (p) {
        setProfile(p);
      } else {
        // Fallback default profile if not found
        setProfile({
          id: `guest_${username}`,
          username: username,
          display_name: username.replace(/_/g, " "),
          avatar_url: `https://api.dicebear.com/7.x/bottts/svg?seed=${username}`,
          xp: 120,
          level: 2,
          streak: 3,
          completed_lessons: [1, 2, 3],
          created_at: new Date().toISOString(),
        });
      }
      setLoading(false);
    }

    if (username) {
      loadData();
    }
  }, [username]);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const xp = profile?.xp || 0;
  const completedLessons = profile?.completed_lessons || [];
  const rank = getRankTitle(xp);
  const certificates = getUserCertificates(xp, completedLessons.length);

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
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
              title="Copy Profile URL"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5 text-green-400" />
                  <span className="text-green-400">Link Copied</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Share Profile</span>
                </>
              )}
            </button>
            <UserNav />
          </div>
        </header>

        {/* Profile Container */}
        <div className="flex-1 p-4 sm:p-8 space-y-8 max-w-5xl w-full mx-auto">
          {/* Developer Identity Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl relative overflow-hidden space-y-6">
            {/* Background Glow */}
            <div className="absolute -top-24 -right-24 w-72 h-72 bg-python-blue/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
              <img
                src={
                  profile?.avatar_url ||
                  `https://api.dicebear.com/7.x/bottts/svg?seed=${username}`
                }
                alt={username}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-slate-950 border-2 border-slate-700 object-cover shadow-xl"
              />

              <div className="space-y-2 flex-1">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <h1 className="text-2xl sm:text-3xl font-black text-white">
                    {profile?.display_name || username}
                  </h1>
                  <span
                    className={`text-xs font-mono px-3 py-1 rounded-full border font-semibold ${rank.badgeColor}`}
                  >
                    {rank.title}
                  </span>
                </div>

                <p className="text-xs font-mono text-slate-400">
                  @{profile?.username || username}
                </p>

                <p className="text-xs text-slate-300 max-w-xl leading-relaxed pt-1">
                  {rank.description}
                </p>

                <div className="flex items-center justify-center sm:justify-start gap-4 text-xs font-mono text-slate-500 pt-2">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Python Master Track</span>
                  </span>
                  <span>•</span>
                  <span>Verified Learner</span>
                </div>
              </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-800/80">
              <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800/80 text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-1.5 text-python-yellow text-[11px] font-mono mb-1">
                  <Zap className="w-3.5 h-3.5 fill-python-yellow" />
                  <span>Total XP</span>
                </div>
                <div className="text-xl font-black text-white font-fira">
                  {xp} <span className="text-xs text-slate-500 font-normal">pts</span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800/80 text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-1.5 text-python-blue text-[11px] font-mono mb-1">
                  <Trophy className="w-3.5 h-3.5" />
                  <span>Player Rank</span>
                </div>
                <div className="text-xl font-black text-white">
                  Level {profile?.level || 1}
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800/80 text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-1.5 text-orange-400 text-[11px] font-mono mb-1">
                  <Flame className="w-3.5 h-3.5 fill-orange-400" />
                  <span>Streak</span>
                </div>
                <div className="text-xl font-black text-white">
                  {profile?.streak || 0} Days
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800/80 text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-1.5 text-emerald-400 text-[11px] font-mono mb-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Completed</span>
                </div>
                <div className="text-xl font-black text-white">
                  {completedLessons.length} / 152
                </div>
              </div>
            </div>
          </div>

          {/* Earned Certificates Gallery */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-python-yellow" />
                <h2 className="text-lg font-bold text-white">
                  Earned Credentials & Certificates
                </h2>
              </div>
              <span className="text-xs font-mono text-slate-400">
                {certificates.filter((c) => c.isUnlocked).length} / {certificates.length} Unlocked
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {certificates.map((cert) => {
                return (
                  <div
                    key={cert.id}
                    className={`p-5 rounded-2xl border transition-all relative overflow-hidden flex flex-col justify-between space-y-4 ${
                      cert.isUnlocked
                        ? "bg-slate-900 border-python-yellow/40 shadow-lg shadow-python-yellow/5"
                        : "bg-slate-950/60 border-slate-800/60 opacity-60"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-bold text-white">
                            {cert.title}
                          </h3>
                          {cert.isUnlocked && (
                            <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
                          )}
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed">
                          {cert.description}
                        </p>
                      </div>

                      <div className="p-2 rounded-xl bg-slate-800 text-python-yellow shrink-0">
                        {cert.isUnlocked ? (
                          <Award className="w-6 h-6 text-python-yellow" />
                        ) : (
                          <Lock className="w-6 h-6 text-slate-500" />
                        )}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono">
                      <span className="text-slate-500">Issued by: {cert.issuer}</span>
                      {cert.isUnlocked ? (
                        <span className="text-green-400 font-bold px-2 py-0.5 rounded bg-green-500/10 border border-green-500/20">
                          VERIFIED
                        </span>
                      ) : (
                        <span className="text-slate-500">
                          Requires {cert.requiredXP} XP or {cert.requiredLessons} Lessons
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Completed Lessons Badges */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-python-blue" />
              <span>Completed Lessons History</span>
            </h3>

            {completedLessons.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {completedLessons.map((num) => (
                  <Link
                    key={num}
                    href={`/lesson/${num}`}
                    className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300 hover:text-white hover:border-python-blue transition-colors flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-3 h-3 text-green-400" />
                    <span>Lesson #{String(num).padStart(3, "0")}</span>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-500 italic">
                No lessons marked as completed yet. Complete lessons to showcase badges here!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
