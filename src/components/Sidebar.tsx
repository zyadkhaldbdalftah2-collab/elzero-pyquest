"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import {
  ChevronDown,
  ChevronRight,
  BookOpen,
  CheckCircle2,
  Flame,
  Trophy,
  Zap,
  Menu,
  X,
  Code2,
  Terminal,
} from "lucide-react";
import { courseModules, allLessons } from "@/data/courseStructure";
import SearchBar from "@/components/SearchBar";
import { loadProgress } from "@/lib/storage";
import { UserProgress } from "@/types";

interface SidebarProps {
  currentLessonId?: number;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

export default function Sidebar({
  currentLessonId,
  isOpenMobile = false,
  onCloseMobile,
}: SidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [collapsedModules, setCollapsedModules] = useState<Record<string, boolean>>({});
  const [progress, setProgress] = useState<UserProgress | null>(null);

  useEffect(() => {
    setProgress(loadProgress());
  }, []);

  // Filter lessons based on search query
  const filteredLessons = useMemo(() => {
    if (!searchQuery.trim()) return allLessons;
    const q = searchQuery.toLowerCase().trim();
    return allLessons.filter(
      (lesson) =>
        lesson.id.toString().includes(q) ||
        lesson.titleEn.toLowerCase().includes(q) ||
        lesson.titleAr.includes(q) ||
        lesson.module.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const toggleModule = (moduleId: string) => {
    setCollapsedModules((prev) => ({
      ...prev,
      [moduleId]: !prev[moduleId],
    }));
  };

  const isCompleted = (id: number) => {
    return progress?.completedLessons.includes(id) ?? false;
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          className="fixed inset-0 bg-black/70 z-40 lg:hidden backdrop-blur-sm"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-80 bg-slate-950 border-r border-slate-800 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpenMobile ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header / Brand */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-python-blue to-python-yellow flex items-center justify-center p-0.5 shadow-md shadow-python-blue/20">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Code2 className="w-5 h-5 text-python-yellow group-hover:rotate-12 transition-transform" />
              </div>
            </div>
            <div>
              <div className="text-base font-bold tracking-tight text-white flex items-center gap-1.5">
                <span>Elzero</span>
                <span className="text-python-yellow font-extrabold">PyQuest</span>
              </div>
              <p className="text-[10px] text-slate-400 font-mono">152 Master Lessons</p>
            </div>
          </Link>
          {onCloseMobile && (
            <button
              onClick={onCloseMobile}
              className="lg:hidden p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-900 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Python Studio Shortcut Link */}
        <div className="p-3 border-b border-slate-800/80 bg-slate-900/40">
          <Link
            href="/playground"
            onClick={() => onCloseMobile?.()}
            className="flex items-center justify-between p-2.5 rounded-xl bg-gradient-to-r from-python-blue/20 to-python-yellow/10 border border-python-blue/40 hover:border-python-yellow/60 text-white transition-all group"
          >
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-python-blue/30 text-python-yellow">
                <Terminal className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-white group-hover:text-python-yellow transition-colors flex items-center gap-1.5">
                  <span>Python Studio</span>
                  <span className="text-[10px] font-mono px-1 py-0.2 rounded bg-python-yellow/20 text-python-yellow">
                    IDE
                  </span>
                </div>
                <div className="text-[10px] text-slate-400 font-mono">
                  VS Code + Pyodide Wasm
                </div>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 group-hover:text-white transition-all" />
          </Link>
        </div>

        {/* Quick Gamification Ribbon */}
        {progress && (
          <div className="px-4 py-2.5 bg-slate-900/60 border-b border-slate-800 flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5 text-python-yellow font-semibold">
              <Zap className="w-3.5 h-3.5 fill-python-yellow" />
              <span>{progress.xp} XP</span>
            </div>
            <div className="flex items-center gap-1 text-python-blue font-semibold">
              <Trophy className="w-3.5 h-3.5" />
              <span>Lvl {progress.level}</span>
            </div>
            <div className="flex items-center gap-1 text-orange-400 font-semibold">
              <Flame className="w-3.5 h-3.5 fill-orange-400" />
              <span>{progress.streak}d Streak</span>
            </div>
          </div>
        )}

        {/* Search Bar */}
        <div className="p-3 border-b border-slate-800 bg-slate-950">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </div>

        {/* Lesson Modules List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-3">
          {courseModules.map((module) => {
            const moduleLessons = filteredLessons.filter((l) => l.module === module.id);
            if (moduleLessons.length === 0 && searchQuery) return null;

            const isCollapsed = collapsedModules[module.id];
            const completedCount = moduleLessons.filter((l) => isCompleted(l.id)).length;

            return (
              <div
                key={module.id}
                className="rounded-xl border border-slate-800/80 bg-slate-900/40 overflow-hidden"
              >
                {/* Module Header Button */}
                <button
                  onClick={() => toggleModule(module.id)}
                  className="w-full px-3 py-2.5 flex items-center justify-between text-left hover:bg-slate-800/40 transition-colors"
                >
                  <div className="flex items-center gap-2 overflow-hidden">
                    <BookOpen className="w-4 h-4 text-python-blue shrink-0" />
                    <div className="truncate">
                      <div className="text-xs font-semibold text-slate-200 truncate">
                        {module.nameEn}
                      </div>
                      <div
                        className="text-[11px] text-slate-400 font-cairo truncate"
                        dir="rtl"
                      >
                        {module.nameAr}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0 ml-2">
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                      {completedCount}/{moduleLessons.length}
                    </span>
                    {isCollapsed ? (
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                    )}
                  </div>
                </button>

                {/* Module Lessons */}
                {!isCollapsed && (
                  <div className="px-2 py-1.5 space-y-1 border-t border-slate-800/60 bg-slate-950/40">
                    {moduleLessons.map((lesson) => {
                      const isActive = currentLessonId === lesson.id;
                      const done = isCompleted(lesson.id);

                      return (
                        <Link
                          key={lesson.id}
                          href={`/lesson/${lesson.id}`}
                          onClick={() => onCloseMobile?.()}
                          className={`flex items-center justify-between px-2.5 py-2 rounded-lg text-xs transition-all group ${
                            isActive
                              ? "bg-python-blue text-white font-medium shadow-md shadow-python-blue/20"
                              : done
                              ? "text-slate-300 hover:bg-slate-800/70"
                              : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                          }`}
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <span
                              className={`font-mono text-[11px] px-1.5 py-0.5 rounded ${
                                isActive
                                  ? "bg-blue-900/60 text-white"
                                  : "bg-slate-800/90 text-slate-400 group-hover:text-slate-200"
                              }`}
                            >
                              #{String(lesson.id).padStart(3, "0")}
                            </span>
                            <span className="truncate">{lesson.titleEn}</span>
                          </div>

                          {done && (
                            <CheckCircle2
                              className={`w-3.5 h-3.5 shrink-0 ml-2 ${
                                isActive ? "text-white" : "text-green-400"
                              }`}
                            />
                          )}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </aside>
    </>
  );
}
