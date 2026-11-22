"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Code2,
  BookOpen,
  Trophy,
  Flame,
  Zap,
  ArrowRight,
  Sparkles,
  Play,
  Menu,
  GraduationCap,
  Layers,
  CheckCircle2,
  Terminal,
} from "lucide-react";
import Sidebar from "@/components/Sidebar";
import UserNav from "@/components/UserNav";
import { courseModules, allLessons } from "@/data/courseStructure";
import { loadProgress } from "@/lib/storage";
import { UserProgress } from "@/types";

export default function HomePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [progress, setProgress] = useState<UserProgress | null>(null);

  useEffect(() => {
    setProgress(loadProgress());
  }, []);

  const totalLessons = allLessons.length;
  const completedCount = progress?.completedLessons.length || 0;
  const progressPercent = Math.round((completedCount / totalLessons) * 100);

  // Determine continue lesson (last completed + 1, or lesson 1)
  const lastLessonId =
    progress?.completedLessons && progress.completedLessons.length > 0
      ? Math.min(totalLessons, Math.max(...progress.completedLessons) + 1)
      : 3; // Default to Lesson #003 as requested

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 flex flex-col lg:flex-row">
      {/* Sidebar */}
      <Sidebar
        isOpenMobile={sidebarOpen}
        onCloseMobile={() => setSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <main className="flex-1 lg:ml-80 flex flex-col min-h-screen">
        {/* Top Navbar */}
        <header className="sticky top-0 z-30 bg-slate-950/80 backdrop-blur-md border-b border-slate-800 px-4 sm:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-python-yellow animate-pulse" />
              <span className="text-xs font-mono text-slate-400">
                Osama Elzero Python Playlist (152 Lessons)
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Link
              href="/playground"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-python-yellow hover:text-white text-xs font-bold border border-slate-700/80 transition-all shadow-sm"
              title="Open Python Studio (VS Code & Pyodide)"
            >
              <Terminal className="w-3.5 h-3.5 text-python-yellow" />
              <span>Python Studio</span>
            </Link>

            <Link
              href={`/lesson/${lastLessonId}`}
              className="hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-python-blue hover:bg-blue-600 text-white text-xs font-bold shadow-md shadow-python-blue/20 transition-all active:scale-95"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>Resume #{String(lastLessonId).padStart(3, "0")}</span>
            </Link>

            <UserNav />
          </div>
        </header>

        {/* Hero Section */}
        <div className="p-4 sm:p-8 space-y-8 max-w-6xl w-full mx-auto">
          <div className="relative rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800 p-6 sm:p-10 overflow-hidden shadow-2xl">
            {/* Background Glow Accents */}
            <div className="absolute -top-24 -right-24 w-80 h-80 bg-python-blue/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-python-yellow/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 space-y-6">
              <div className="flex flex-wrap items-center gap-2">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/80 text-xs font-mono text-python-yellow">
                  <Sparkles className="w-3.5 h-3.5 text-python-yellow" />
                  <span>Bilingual Interactive Python Master Platform</span>
                </div>
                <Link
                  href="/leaderboard"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-python-yellow/15 border border-python-yellow/30 text-xs font-mono text-python-yellow hover:bg-python-yellow/25 transition-colors"
                >
                  <Trophy className="w-3 h-3" />
                  <span>Global Leaderboard</span>
                </Link>
                <Link
                  href="/playground"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-python-blue/20 border border-python-blue/40 text-xs font-mono text-blue-300 hover:text-white hover:bg-python-blue transition-colors"
                >
                  <Terminal className="w-3 h-3 text-python-yellow" />
                  <span>Python Studio IDE</span>
                </Link>
              </div>

              <div className="space-y-3">
                <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
                  Elzero{" "}
                  <span className="bg-gradient-to-r from-python-blue via-sky-400 to-python-yellow bg-clip-text text-transparent">
                    PyQuest
                  </span>
                </h1>
                <p className="text-sm sm:text-base text-slate-400 max-w-2xl leading-relaxed">
                  Dedicated exclusively to Osama Elzero&apos;s renowned 152-lesson Mastering Python course.
                  Master Python with an <strong>Arabic Reference Hub</strong> on the left, <strong>10 Interactive English Mini-Games</strong> on the right, and cloud progress syncing with our <strong>Competitive Leaderboard</strong>.
                </p>
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  href="/lesson/3"
                  className="flex items-center gap-2.5 px-6 py-3 rounded-xl bg-gradient-to-r from-python-blue to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold text-sm shadow-xl shadow-python-blue/25 transition-all active:scale-95"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>Explore Lesson #003 (Featured)</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/leaderboard"
                  className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-python-yellow hover:text-white font-semibold text-sm border border-slate-700 transition-colors"
                >
                  <Trophy className="w-4 h-4 text-python-yellow" />
                  <span>View Leaderboard</span>
                </Link>
                <Link
                  href="/playground"
                  className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white font-semibold text-sm border border-slate-800 transition-colors"
                >
                  <Terminal className="w-4 h-4 text-python-blue" />
                  <span>Python Studio</span>
                </Link>
              </div>

              {/* Progress Summary Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-800/80">
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-python-yellow/10 text-python-yellow">
                    <Zap className="w-4 h-4 fill-python-yellow" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono uppercase text-slate-500">Total XP</div>
                    <div className="text-sm font-extrabold text-white font-fira">{progress?.xp || 0} pts</div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-python-blue/10 text-python-blue">
                    <Trophy className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono uppercase text-slate-500">Rank</div>
                    <div className="text-sm font-extrabold text-white">Level {progress?.level || 1}</div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-orange-500/10 text-orange-400">
                    <Flame className="w-4 h-4 fill-orange-400" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono uppercase text-slate-500">Streak</div>
                    <div className="text-sm font-extrabold text-white">{progress?.streak || 0} Days</div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono uppercase text-slate-500">Completed</div>
                    <div className="text-sm font-extrabold text-white">{completedCount} / 152</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Course Modules Grid */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-python-blue" />
                <h2 className="text-lg font-bold text-white">Course Modules (16 Modules)</h2>
              </div>
              <span className="text-xs font-mono text-slate-400">
                Overall: {progressPercent}% Completed
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {courseModules.map((mod) => {
                const count = mod.lessonRange[1] - mod.lessonRange[0] + 1;
                const firstLesson = mod.lessonRange[0];

                return (
                  <Link
                    key={mod.id}
                    href={`/lesson/${firstLesson}`}
                    className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-python-blue/50 hover:bg-slate-900/90 transition-all group flex flex-col justify-between space-y-4 shadow-md"
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <h3 className="text-sm font-bold text-white group-hover:text-python-yellow transition-colors">
                          {mod.nameEn}
                        </h3>
                        <p className="text-xs text-slate-400 font-cairo" dir="rtl">
                          {mod.nameAr}
                        </p>
                      </div>
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">
                        #{mod.lessonRange[0]}–#{mod.lessonRange[1]}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800/80">
                      <span className="font-mono">{count} Lessons</span>
                      <span className="text-python-blue group-hover:translate-x-1 transition-transform flex items-center gap-1 font-semibold">
                        <span>Enter Module</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
