"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Menu,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Gamepad2,
  Terminal,
  BookOpen,
  Cpu,
} from "lucide-react";

import Sidebar from "@/components/Sidebar";
import UserNav from "@/components/UserNav";
import VideoPlayer from "@/components/VideoPlayer";
import LessonSummary from "@/components/LessonSummary";
import MethodsCheatSheet from "@/components/MethodsCheatSheet";
import CommonPitfalls from "@/components/CommonPitfalls";
import GamificationBar from "@/components/GamificationBar";
import EssayPrep from "@/components/EssayPrep";

// 10 Mini-Games
import FillInTheBlanks from "@/components/games/FillInTheBlanks";
import BugHunter from "@/components/games/BugHunter";
import MatchThePairs from "@/components/games/MatchThePairs";
import PredictTheOutput from "@/components/games/PredictTheOutput";
import CodeUnscrambler from "@/components/games/CodeUnscrambler";
import TrueOrFalse from "@/components/games/TrueOrFalse";
import SyntaxSpotter from "@/components/games/SyntaxSpotter";
import TypeDetective from "@/components/games/TypeDetective";
import CodeFlashcards from "@/components/games/CodeFlashcards";
import MiniProjectChallenge from "@/components/games/MiniProjectChallenge";

import { getLesson } from "@/data/lessons";
import { allLessons } from "@/data/courseStructure";
import { useGameState } from "@/hooks/useGameState";
import { getCachedLesson, setCachedLesson } from "@/lib/storage";
import { Lesson, XP_REWARDS } from "@/types";

export default function LessonPage() {
  const params = useParams();
  const rawId = params?.id as string;
  const lessonId = parseInt(rawId, 10) || 1;

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeGameTab, setActiveGameTab] = useState<string>("fillInTheBlanks");

  // AI Generation states
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationError, setGenerationError] = useState<string | null>(null);

  // Lesson state
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Gamification hook
  const { progress, awardXP, xpAnimation, checkCompleted, completeLesson } =
    useGameState(lessonId);

  // Find stub from course structure
  const lessonStub = useMemo(() => {
    return allLessons.find((l) => l.id === lessonId);
  }, [lessonId]);

  useEffect(() => {
    const title = lesson?.titleEn || lessonStub?.titleEn || `Lesson #${lessonId}`;
    document.title = `Lesson #${String(lessonId).padStart(3, "0")} – ${title} | PyVerse Academy`;
  }, [lessonId, lesson, lessonStub]);

  // Trigger server-side AI generation (no user API key needed)
  const handleGenerateWithAI = useCallback(
    async (signal?: AbortSignal) => {
      if (!lessonStub) return;

      setIsGenerating(true);
      setGenerationError(null);

      try {
        const res = await fetch("/api/generate-lesson", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ lessonId }),
          signal,
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Failed to generate lesson content");
        }

        if (!signal?.aborted) {
          setLesson(data.lesson);
          setCachedLesson(lessonId, JSON.stringify(data.lesson));
        }
      } catch (err: unknown) {
        if (err instanceof Error && err.name === "AbortError") {
          return;
        }
        const message =
          err instanceof Error ? err.message : "Failed to generate lesson content.";
        setGenerationError(message);
      } finally {
        if (!signal?.aborted) {
          setIsGenerating(false);
        }
      }
    },
    [lessonId, lessonStub]
  );

  // Load lesson data (static -> localStorage cache -> auto-generate)
  useEffect(() => {
    setIsLoaded(false);
    setGenerationError(null);

    // 1. Try static lessons (Lessons 1-5)
    const staticData = getLesson(lessonId);
    if (staticData) {
      setLesson(staticData);
      setIsGenerating(false);
      setIsLoaded(true);
      return;
    }

    // 2. Try localStorage cache
    const cached = getCachedLesson(lessonId);
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        setLesson(parsed);
        setIsGenerating(false);
        setIsLoaded(true);
        return;
      } catch (e) {
        console.error("Failed to parse cached lesson:", e);
      }
    }

    // 3. Not cached yet -> automatically generate via server API
    setLesson(null);
    setIsLoaded(true);

    if (!lessonStub) return;

    const controller = new AbortController();
    void handleGenerateWithAI(controller.signal);

    return () => {
      controller.abort();
    };
  }, [lessonId, lessonStub, handleGenerateWithAI]);

  const handleGameComplete = (gameName: string) => {
    const reward = XP_REWARDS[gameName] || 10;
    awardXP(reward, gameName);
  };

  const isLessonDone = progress?.completedLessons.includes(lessonId) ?? false;
  const handleToggleLessonComplete = () => {
    completeLesson();
  };

  const prevLessonId = lessonId > 1 ? lessonId - 1 : null;
  const nextLessonId = lessonId < allLessons.length ? lessonId + 1 : null;

  // Games list with metadata
  const gamesList = [
    { id: "fillInTheBlanks", name: "Fill in Blanks", xp: 10 },
    { id: "bugHunter", name: "Bug Hunter", xp: 15 },
    { id: "matchThePairs", name: "Match Pairs", xp: 15 },
    { id: "predictTheOutput", name: "Predict Output", xp: 15 },
    { id: "codeUnscrambler", name: "Unscrambler", xp: 20 },
    { id: "trueOrFalse", name: "True / False", xp: 10 },
    { id: "syntaxSpotter", name: "Syntax Spotter", xp: 15 },
    { id: "typeDetective", name: "Type Detective", xp: 10 },
    { id: "codeFlashcards", name: "Flashcards", xp: 10 },
    { id: "miniProject", name: "Mini-Project", xp: 50 },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 flex flex-col lg:flex-row">
      {/* Sidebar */}
      <Sidebar
        currentLessonId={lessonId}
        isOpenMobile={sidebarOpen}
        onCloseMobile={() => setSidebarOpen(false)}
      />

      {/* Main Container */}
      <div className="flex-1 lg:ml-80 flex flex-col min-h-screen">
        {/* Top Sticky Header */}
        <header className="sticky top-0 z-30 bg-slate-950/80 backdrop-blur-md border-b border-slate-800 px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs px-2 py-0.5 rounded bg-python-blue/20 text-blue-300 border border-python-blue/30 font-bold">
                  Lesson #{String(lessonId).padStart(3, "0")}
                </span>
                <h1 className="text-sm sm:text-base font-bold text-white truncate max-w-[140px] sm:max-w-xs md:max-w-md">
                  {lesson?.titleEn || lessonStub?.titleEn || `Lesson #${lessonId}`}
                </h1>
              </div>
              <p className="text-[10px] font-mono text-slate-400 hidden sm:block">
                PyVerse Academy • Osama Elzero&apos;s Mastering Python
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Link to Python Studio */}
            <Link
              href="/playground"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-python-yellow hover:text-white text-xs font-bold transition-colors shadow-sm"
              title="Open full Python Studio IDE"
            >
              <Terminal className="w-3.5 h-3.5 text-python-yellow" />
              <span>Studio</span>
            </Link>

            <button
              onClick={handleToggleLessonComplete}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                isLessonDone
                  ? "bg-green-500/20 text-green-300 border-green-500/40"
                  : "bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-800"
              }`}
            >
              <CheckCircle2
                className={`w-3.5 h-3.5 ${
                  isLessonDone ? "text-green-400" : "text-slate-500"
                }`}
              />
              <span className="hidden sm:inline">
                {isLessonDone ? "Completed" : "Complete"}
              </span>
            </button>

            <UserNav />
          </div>
        </header>

        {/* Content Body */}
        <div className="flex-1 p-4 sm:p-6 space-y-6 max-w-[1600px] w-full mx-auto">
          {/* Breadcrumb & Navigation */}
          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <div className="flex items-center gap-2">
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <span>/</span>
              <span className="text-slate-300">
                {lessonStub?.module || "Module"}
              </span>
              <span>/</span>
              <span className="text-python-yellow">#{lessonId}</span>
            </div>

            <div className="flex items-center gap-2">
              {prevLessonId ? (
                <Link
                  href={`/lesson/${prevLessonId}`}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-colors"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Prev</span>
                </Link>
              ) : null}
              {nextLessonId ? (
                <Link
                  href={`/lesson/${nextLessonId}`}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-colors"
                >
                  <span>Next</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              ) : null}
            </div>
          </div>

          {/* Gamification Bar */}
          <GamificationBar progress={progress} xpAnimation={xpAnimation} />

          {/* Loading state */}
          {!isLoaded && (
            <div className="p-12 text-center space-y-3">
              <Loader2 className="w-8 h-8 animate-spin text-python-blue mx-auto" />
              <p className="text-xs text-slate-400 font-mono">
                Loading lesson data...
              </p>
            </div>
          )}

          {/* Seamless Server-Side AI Generation State when lesson isn't cached yet */}
          {isLoaded && !lesson && (
            <div className="p-8 sm:p-12 rounded-3xl bg-slate-900 border border-slate-800 text-center space-y-6 max-w-2xl mx-auto shadow-2xl relative overflow-hidden">
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-python-blue/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-python-yellow/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 space-y-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-python-blue to-python-yellow p-0.5 mx-auto shadow-lg shadow-python-blue/20">
                  <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                    {isGenerating ? (
                      <Cpu className="w-8 h-8 text-python-yellow animate-spin" />
                    ) : (
                      <Sparkles className="w-8 h-8 text-python-yellow animate-pulse" />
                    )}
                  </div>
                </div>

                {isGenerating ? (
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-python-blue/15 text-blue-300 border border-python-blue/30">
                        <Loader2 className="w-3 h-3 animate-spin" />
                        <span>PyVerse Academy AI Engine</span>
                      </span>
                      <h2 className="text-xl font-bold text-white">
                        Preparing Interactive Lesson #{String(lessonId).padStart(3, "0")}...
                      </h2>
                      <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
                        {lessonStub?.titleEn} — building your Arabic reference guide, method cheat sheet, and 10 interactive Python mini-games. Cached automatically for instant future visits.
                      </p>
                    </div>

                    {/* Sleek animated loading progress steps */}
                    <div className="max-w-sm mx-auto space-y-2 text-left bg-slate-950/70 border border-slate-800 rounded-2xl p-4">
                      <div className="flex items-center gap-2.5 text-xs text-slate-300">
                        <BookOpen className="w-4 h-4 text-python-blue animate-pulse shrink-0" />
                        <span className="flex-1">Compiling Arabic summary &amp; cheat sheet</span>
                        <span className="w-2 h-2 rounded-full bg-python-blue animate-ping" />
                      </div>
                      <div className="flex items-center gap-2.5 text-xs text-slate-300">
                        <Gamepad2 className="w-4 h-4 text-python-yellow animate-pulse shrink-0" />
                        <span className="flex-1">Generating 10 Python coding challenges</span>
                        <span className="w-2 h-2 rounded-full bg-python-yellow animate-ping" />
                      </div>
                      <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden mt-2">
                        <div className="h-full w-2/3 bg-gradient-to-r from-python-blue via-sky-400 to-python-yellow rounded-full animate-pulse" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <h2 className="text-xl font-bold text-white">
                        {lessonStub
                          ? `Interactive Lesson #${String(lessonId).padStart(3, "0")}`
                          : `Lesson #${lessonId} Not Found`}
                      </h2>
                      <p className="text-xs text-slate-400 leading-relaxed max-w-md mx-auto">
                        {lessonStub
                          ? `${lessonStub.titleEn} — load the complete Arabic reference hub, 10 interactive English mini-games, and exam prep questions.`
                          : "This lesson number is outside the 152-lesson Mastering Python curriculum."}
                      </p>
                    </div>

                    {generationError && (
                      <div className="p-3.5 rounded-xl bg-red-950/40 border border-red-900/50 text-xs text-red-300 flex items-start gap-2 text-left">
                        <AlertCircle className="w-4 h-4 shrink-0 text-red-400 mt-0.5" />
                        <div>
                          <span className="font-bold">Error:</span> {generationError}
                        </div>
                      </div>
                    )}

                    {lessonStub && (
                      <div className="flex justify-center pt-1">
                        <button
                          onClick={() => void handleGenerateWithAI()}
                          disabled={isGenerating}
                          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-python-blue to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 text-white font-bold text-xs shadow-lg shadow-python-blue/20 transition-all active:scale-95"
                        >
                          <Sparkles className="w-4 h-4 text-python-yellow" />
                          <span>Load Interactive Lesson</span>
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TWO-COLUMN STRICT BILINGUAL LAYOUT */}
          {lesson && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* LEFT COLUMN: Arabic Reference Hub (dir="rtl", font-cairo) */}
              <div className="lg:col-span-5 space-y-6" dir="rtl">
                {/* Responsive Video Player */}
                <div dir="ltr">
                  <VideoPlayer
                    lessonId={lessonId}
                    titleEn={lesson.titleEn}
                  />
                </div>

                {/* Lesson Summary */}
                <LessonSummary
                  summaryAr={lesson.summaryAr}
                  titleAr={lesson.titleAr}
                />

                {/* Methods & Keywords Cheat Sheet */}
                <MethodsCheatSheet methods={lesson.methods} />

                {/* Common Pitfalls */}
                <CommonPitfalls pitfalls={lesson.pitfalls} />
              </div>

              {/* RIGHT COLUMN: English Interactive Arena (dir="ltr", font-inter) */}
              <div className="lg:col-span-7 space-y-6" dir="ltr">
                {/* 10 Mini-Games Section */}
                <div className="space-y-4">
                  {/* Game Tab Selector */}
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 shadow-md">
                    <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 px-1">
                      <div className="flex items-center gap-2">
                        <Gamepad2 className="w-4 h-4 text-python-yellow" />
                        <h3 className="text-xs font-bold text-white uppercase tracking-wider font-inter">
                          10 Interactive English Mini-Games
                        </h3>
                      </div>
                      <span className="text-[11px] font-mono text-slate-400">
                        Select a Challenge:
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5">
                      {gamesList.map((g, idx) => {
                        const isActive = activeGameTab === g.id;
                        const isDone = checkCompleted(g.id);

                        return (
                          <button
                            key={g.id}
                            onClick={() => setActiveGameTab(g.id)}
                            className={`p-2 rounded-xl text-left text-xs transition-all relative overflow-hidden flex flex-col justify-between ${
                              isActive
                                ? "bg-python-blue text-white font-bold shadow-md shadow-python-blue/20"
                                : isDone
                                ? "bg-slate-950/70 border border-green-500/30 text-green-300 hover:bg-slate-800/60"
                                : "bg-slate-950/50 hover:bg-slate-800/50 border border-slate-800/80 text-slate-400 hover:text-slate-200"
                            }`}
                          >
                            <div className="flex items-center justify-between w-full">
                              <span className="text-[10px] font-mono opacity-70">
                                #{idx + 1}
                              </span>
                              {isDone && (
                                <CheckCircle2 className="w-3 h-3 text-green-400 shrink-0" />
                              )}
                            </div>
                            <span className="truncate text-[11px] font-semibold mt-1">
                              {g.name}
                            </span>
                            <span className="text-[10px] font-mono opacity-80 mt-0.5">
                              +{g.xp} XP
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Active Game Component Render */}
                  <div>
                    {activeGameTab === "fillInTheBlanks" && lesson.games.fillInTheBlanks && (
                      <FillInTheBlanks
                        data={lesson.games.fillInTheBlanks}
                        onComplete={handleGameComplete}
                        isCompleted={checkCompleted("fillInTheBlanks")}
                      />
                    )}
                    {activeGameTab === "bugHunter" && lesson.games.bugHunter && (
                      <BugHunter
                        data={lesson.games.bugHunter}
                        onComplete={handleGameComplete}
                        isCompleted={checkCompleted("bugHunter")}
                      />
                    )}
                    {activeGameTab === "matchThePairs" && lesson.games.matchThePairs && (
                      <MatchThePairs
                        data={lesson.games.matchThePairs}
                        onComplete={handleGameComplete}
                        isCompleted={checkCompleted("matchThePairs")}
                      />
                    )}
                    {activeGameTab === "predictTheOutput" && lesson.games.predictTheOutput && (
                      <PredictTheOutput
                        data={lesson.games.predictTheOutput}
                        onComplete={handleGameComplete}
                        isCompleted={checkCompleted("predictTheOutput")}
                      />
                    )}
                    {activeGameTab === "codeUnscrambler" && lesson.games.codeUnscrambler && (
                      <CodeUnscrambler
                        data={lesson.games.codeUnscrambler}
                        onComplete={handleGameComplete}
                        isCompleted={checkCompleted("codeUnscrambler")}
                      />
                    )}
                    {activeGameTab === "trueOrFalse" && lesson.games.trueOrFalse && (
                      <TrueOrFalse
                        data={lesson.games.trueOrFalse}
                        onComplete={handleGameComplete}
                        isCompleted={checkCompleted("trueOrFalse")}
                      />
                    )}
                    {activeGameTab === "syntaxSpotter" && lesson.games.syntaxSpotter && (
                      <SyntaxSpotter
                        data={lesson.games.syntaxSpotter}
                        onComplete={handleGameComplete}
                        isCompleted={checkCompleted("syntaxSpotter")}
                      />
                    )}
                    {activeGameTab === "typeDetective" && lesson.games.typeDetective && (
                      <TypeDetective
                        data={lesson.games.typeDetective}
                        onComplete={handleGameComplete}
                        isCompleted={checkCompleted("typeDetective")}
                      />
                    )}
                    {activeGameTab === "codeFlashcards" && lesson.games.codeFlashcards && (
                      <CodeFlashcards
                        data={lesson.games.codeFlashcards}
                        onComplete={handleGameComplete}
                        isCompleted={checkCompleted("codeFlashcards")}
                      />
                    )}
                    {activeGameTab === "miniProject" && lesson.games.miniProject && (
                      <MiniProjectChallenge
                        data={lesson.games.miniProject}
                        onComplete={handleGameComplete}
                        isCompleted={checkCompleted("miniProject")}
                      />
                    )}
                  </div>
                </div>

                {/* Exam Prep: Essay Questions */}
                <EssayPrep questions={lesson.essayQuestions} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
