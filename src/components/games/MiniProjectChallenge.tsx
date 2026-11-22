"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MiniProjectGame } from "@/types";
import {
  Code2,
  CheckCircle2,
  Lightbulb,
  Eye,
  EyeOff,
  Terminal,
  Zap,
  Sparkles,
  RotateCcw,
  Play,
} from "lucide-react";

interface MiniProjectChallengeProps {
  data: MiniProjectGame;
  onComplete: (gameName: string) => void;
  isCompleted: boolean;
}

export default function MiniProjectChallenge({
  data,
  onComplete,
  isCompleted,
}: MiniProjectChallengeProps) {
  const [code, setCode] = useState(data.starterCode);
  const [revealedHints, setRevealedHints] = useState<number[]>([]);
  const [showExpectedOutput, setShowExpectedOutput] = useState(false);
  const [showSolution, setShowSolution] = useState(false);

  const toggleHint = (idx: number) => {
    if (revealedHints.includes(idx)) {
      setRevealedHints(revealedHints.filter((h) => h !== idx));
    } else {
      setRevealedHints([...revealedHints, idx]);
    }
  };

  const handleComplete = () => {
    onComplete("miniProject");
  };

  const handleResetCode = () => {
    setCode(data.starterCode);
  };

  const handleTryInStudio = (snippet: string) => {
    sessionStorage.setItem("pyquest_try_code", snippet);
  };

  return (
    <div className="bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-python-yellow/30 rounded-2xl p-6 shadow-xl space-y-5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-python-yellow/20 text-python-yellow border border-python-yellow/40">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white font-inter flex items-center gap-2">
              10. Mini-Project Challenge
              <span className="text-xs font-normal text-slate-400 font-mono">
                – {data.title}
              </span>
            </h3>
            <p className="text-xs text-slate-400 font-inter mt-0.5">
              Hands-on practical challenge for this lesson
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-python-yellow/20 text-python-yellow border border-python-yellow/40 shadow-sm shadow-python-yellow/10">
            <Zap className="w-3.5 h-3.5 fill-python-yellow" />
            +50 XP
          </span>
          {isCompleted && (
            <span className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-green-500/20 text-green-400 border border-green-500/30">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Completed
            </span>
          )}
        </div>
      </div>

      {/* Description */}
      <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 text-xs text-slate-300 leading-relaxed font-inter">
        <p className="font-semibold text-slate-200 mb-1">Challenge Objective:</p>
        <p>{data.description}</p>
      </div>

      {/* Code Editor Area */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-slate-400 font-mono px-1">
          <div className="flex items-center gap-2">
            <Code2 className="w-4 h-4 text-python-blue" />
            <span>Python Workspace:</span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href={`/playground?code=${encodeURIComponent(code)}`}
              onClick={() => handleTryInStudio(code)}
              className="flex items-center gap-1 text-xs text-blue-300 hover:text-white bg-python-blue/20 hover:bg-python-blue px-2 py-0.5 rounded border border-python-blue/40 transition-colors"
              title="Open full Python Studio IDE with this code"
            >
              <Play className="w-3 h-3 fill-current" />
              <span>Open in Studio</span>
            </Link>

            <button
              onClick={handleResetCode}
              className="flex items-center gap-1 hover:text-white transition-colors"
              title="Reset code to starter template"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        <div className="relative rounded-xl border border-slate-800 bg-slate-950 overflow-hidden shadow-inner focus-within:border-python-blue/60 transition-colors">
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            rows={8}
            className="w-full p-4 bg-transparent font-fira text-xs text-python-yellow placeholder-slate-600 focus:outline-none resize-y"
            spellCheck={false}
            dir="ltr"
          />
        </div>
      </div>

      {/* Hints Accordion */}
      {data.hints && data.hints.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
            <Lightbulb className="w-4 h-4 text-amber-400" />
            <span>Need a Hint?</span>
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {data.hints.map((hint, idx) => {
              const isRevealed = revealedHints.includes(idx);
              return (
                <div
                  key={idx}
                  className="rounded-xl border border-slate-800/80 bg-slate-950/60 p-3 text-xs space-y-1.5"
                >
                  <button
                    onClick={() => toggleHint(idx)}
                    className="w-full flex items-center justify-between text-left text-slate-400 hover:text-amber-300 transition-colors"
                  >
                    <span className="font-mono text-[11px] font-bold">
                      Hint #{idx + 1}
                    </span>
                    {isRevealed ? (
                      <EyeOff className="w-3.5 h-3.5" />
                    ) : (
                      <Eye className="w-3.5 h-3.5" />
                    )}
                  </button>
                  {isRevealed && (
                    <p className="text-slate-300 font-inter text-xs pt-1 border-t border-slate-800/60">
                      {hint}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Expected Output & Solution Toggles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
        {/* Expected Output */}
        <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3.5 space-y-2">
          <button
            onClick={() => setShowExpectedOutput(!showExpectedOutput)}
            className="w-full flex items-center justify-between text-left text-xs font-semibold text-slate-300 hover:text-white"
          >
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-emerald-400" />
              <span>Expected Output</span>
            </div>
            {showExpectedOutput ? (
              <EyeOff className="w-3.5 h-3.5 text-slate-400" />
            ) : (
              <Eye className="w-3.5 h-3.5 text-slate-400" />
            )}
          </button>
          {showExpectedOutput && (
            <pre className="font-fira text-xs text-emerald-300 p-2.5 rounded-lg bg-slate-900 border border-slate-800 overflow-x-auto whitespace-pre">
              <code>{data.expectedOutput}</code>
            </pre>
          )}
        </div>

        {/* Model Solution */}
        <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3.5 space-y-2">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setShowSolution(!showSolution)}
              className="flex-1 flex items-center justify-between text-left text-xs font-semibold text-slate-300 hover:text-white"
            >
              <div className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-python-blue" />
                <span>Reference Solution</span>
              </div>
              {showSolution ? (
                <EyeOff className="w-3.5 h-3.5 text-slate-400" />
              ) : (
                <Eye className="w-3.5 h-3.5 text-slate-400" />
              )}
            </button>

            {showSolution && (
              <Link
                href={`/playground?code=${encodeURIComponent(data.solution)}`}
                onClick={() => handleTryInStudio(data.solution)}
                className="ml-2 flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded bg-blue-950 hover:bg-blue-900 text-blue-300 border border-blue-800 transition-colors"
                title="Run reference solution in Studio"
              >
                <Play className="w-2.5 h-2.5 fill-current" />
                <span>Run</span>
              </Link>
            )}
          </div>

          {showSolution && (
            <pre className="font-fira text-xs text-blue-200 p-2.5 rounded-lg bg-slate-900 border border-slate-800 overflow-x-auto whitespace-pre">
              <code>{data.solution}</code>
            </pre>
          )}
        </div>
      </div>

      {/* Completion Button */}
      <div className="pt-2 flex justify-end">
        <button
          onClick={handleComplete}
          disabled={isCompleted}
          className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-python-blue to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 text-white text-xs font-bold rounded-xl shadow-lg shadow-python-blue/20 transition-all active:scale-95"
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>{isCompleted ? "Challenge Completed!" : "Complete Challenge (+50 XP)"}</span>
        </button>
      </div>
    </div>
  );
}
