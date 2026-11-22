"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Menu,
  Key,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Gamepad2,
  Layers,
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Terminal,
} from "lucide-react";

import Sidebar from "@/components/Sidebar";
import UserNav from "@/components/UserNav";
import VideoPlayer from "@/components/VideoPlayer";
import LessonSummary from "@/components/LessonSummary";
import MethodsCheatSheet from "@/components/MethodsCheatSheet";
import CommonPitfalls from "@/components/CommonPitfalls";
import GamificationBar from "@/components/GamificationBar";
import EssayPrep from "@/components/EssayPrep";
import ApiKeyModal from "@/components/ApiKeyModal";

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
import {
  getCachedLesson,
  setCachedLesson,
  getApiKey,
} from "@/lib/storage";
import { Lesson, XP_REWARDS } from "@/types";

export default function LessonPage() {
  const params = useParams();
  const router = useRouter();
  const rawId = params?.id as string;
  const lessonId = parseInt(rawId, 10) || 1;

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [apiKeyModalOpen, setApiKeyModalOpen] = useState(false);
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

  // Load lesson data (static -> cache -> null)
  useEffect(() => {
    setIsLoaded(false);
    setGenerationError(null);

    // 1. Try static lessons (Lessons 1-5)
    const staticData = getLesson(lessonId);
    if (staticData) {
      setLesson(staticData);
      setIsLoaded(true);
      return;
    }

    // 2. Try localStorage cache
    const cached = getCachedLesson(lessonId);
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        setLesson(parsed);
        setIsLoaded(true);
        return;
      } catch (e) {
        console.error("Failed to parse cached lesson:", e);
      }
    }

    // No content yet
    setLesson(null);
    setIsLoaded(true);
  }, [lessonId]);

  // Trigger AI generation
  const handleGenerateWithAI = async () => {
    const key = getApiKey();
    if (!key) {
      setApiKeyModalOpen(true);
      return;
    }

    setIsGenerating(true);
    setGenerationError(null);

    try {
      const res = await fetch("/api/generate-lesson", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lessonId, apiKey: key }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to generate lesson content");
      }

      setLesson(data.lesson);
      setCachedLesson(lessonId, JSON.stringify(data.lesson));
    } catch (err: any) {
      setGenerationError(err.message || "Failed to generate lesson content.");
    } finally {
      setIsGenerating(false);
    }
  };

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
              onClick={() => setApiKeyModalOpen(true)}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white text-xs font-semibold transition-colors"
              title="Configure Gemini API Key"
            >
              <Key className="w-3.5 h-3.5 text-python-yellow" />
              <span>Gemini AI</span>
            </button>

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

          {/* AI Generation State when lesson data doesn't exist */}
          {isLoaded && !lesson && (
            <div className="p-8 sm:p-12 rounded-3xl bg-slate-900 border border-slate-800 text-center space-y-6 max-w-2xl mx-auto shadow-2xl">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-python-blue to-python-yellow p-0.5 mx-auto">
                <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                  <Sparkles className="w-8 h-8 text-python-yellow animate-pulse" />
                </div>
              </div>

              <div className="space-y-2">
                <h2 className="text-xl font-bold text-white">
                  Generate Lesson #{lessonId} with Gemini AI
                </h2>
                <p className="text-xs text-slate-400 leading-relaxed max-w-md mx-auto">
                  Lessons #001 through #005 are pre-loaded out of the box. Lessons #006 through #152 can be generated on-demand with rich Arabic references, 10 English mini-games, and exam essay questions.
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

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  onClick={handleGenerateWithAI}
                  disabled={isGenerating}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-python-blue to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 text-white font-bold text-xs shadow-lg shadow-python-blue/20 transition-all active:scale-95"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Generating with Gemini 2.0...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-python-yellow" />
                      <span>Generate Full Lesson (+10 Games)</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => setApiKeyModalOpen(true)}
                  className="flex items-center gap-1.5 px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-300 transition-colors"
                >
                  <Key className="w-3.5 h-3.5 text-python-yellow" />
                  <span>Configure API Key</span>
                </button>
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

      {/* API Key Modal */}
      <ApiKeyModal
        isOpen={apiKeyModalOpen}
        onClose={() => setApiKeyModalOpen(false)}
        onKeySaved={() => {
          if (!lesson) {
            handleGenerateWithAI();
          }
        }}
      />
    </div>
  );
}
