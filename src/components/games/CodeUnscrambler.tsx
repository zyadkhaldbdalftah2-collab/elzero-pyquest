"use client";

import React, { useState, useEffect } from "react";
import { CodeUnscramblerGame } from "@/types";
import { ArrowUpDown, ChevronUp, ChevronDown, CheckCircle2, RotateCcw, Zap } from "lucide-react";

interface CodeUnscramblerProps {
  data: CodeUnscramblerGame;
  onComplete: (gameName: string) => void;
  isCompleted: boolean;
}

export default function CodeUnscrambler({
  data,
  onComplete,
  isCompleted,
}: CodeUnscramblerProps) {
  const [lines, setLines] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(null);

  useEffect(() => {
    // Shuffle the lines ensuring they don't start in the correct order
    const shuffled = [...data.correctOrder].sort(() => Math.random() - 0.5);
    setLines(shuffled);
    setFeedback(null);
  }, [data]);

  const moveLine = (fromIndex: number, toIndex: number) => {
    if (isCompleted || feedback === "correct") return;
    if (toIndex < 0 || toIndex >= lines.length) return;

    const newLines = [...lines];
    const [moved] = newLines.splice(fromIndex, 1);
    newLines.splice(toIndex, 0, moved);
    setLines(newLines);
    setFeedback(null);
  };

  const handleReset = () => {
    const shuffled = [...data.correctOrder].sort(() => Math.random() - 0.5);
    setLines(shuffled);
    setFeedback(null);
  };

  const handleCheck = () => {
    const isCorrect = lines.every((line, idx) => line === data.correctOrder[idx]);
    if (isCorrect) {
      setFeedback("correct");
      onComplete("codeUnscrambler");
    } else {
      setFeedback("incorrect");
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <ArrowUpDown className="w-4 h-4 text-purple-400" />
          <h3 className="text-sm font-bold text-white font-inter">
            5. Code Unscrambler
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
            <Zap className="w-3 h-3 fill-purple-300" />
            +20 XP
          </span>
          {isCompleted && (
            <span className="flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 border border-green-500/30">
              <CheckCircle2 className="w-3 h-3" />
              Completed
            </span>
          )}
        </div>
      </div>

      <p className="text-xs text-slate-400 font-inter">
        {data.instruction} <span className="text-slate-500">(Use the arrow buttons to arrange lines into a working program)</span>
      </p>

      {/* Shuffled Lines List */}
      <div className="space-y-2">
        {lines.map((line, idx) => {
          return (
            <div
              key={idx}
              className={`flex items-center justify-between p-2.5 rounded-xl border font-fira text-xs transition-all ${
                feedback === "correct" || isCompleted
                  ? "bg-green-500/10 border-green-500/40 text-green-300"
                  : "bg-slate-950 border-slate-800 text-slate-200"
              }`}
            >
              <div className="flex items-center gap-3 overflow-hidden">
                <span className="w-5 text-right font-mono text-slate-500 select-none">
                  {idx + 1}
                </span>
                <code className="whitespace-pre truncate">{line}</code>
              </div>

              {!isCompleted && feedback !== "correct" && (
                <div className="flex items-center gap-1 shrink-0 ml-2">
                  <button
                    onClick={() => moveLine(idx, idx - 1)}
                    disabled={idx === 0}
                    className="p-1 rounded bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-slate-300 transition-colors"
                    title="Move up"
                  >
                    <ChevronUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => moveLine(idx, idx + 1)}
                    disabled={idx === lines.length - 1}
                    className="p-1 rounded bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-slate-300 transition-colors"
                    title="Move down"
                  >
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={handleReset}
          disabled={isCompleted}
          className="flex items-center gap-1 text-xs text-slate-400 hover:text-white px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors disabled:opacity-40"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Order</span>
        </button>

        <div className="flex items-center gap-3">
          {feedback === "correct" && (
            <span className="text-xs text-green-400 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" />
              Perfect Sequence! (+20 XP)
            </span>
          )}
          {feedback === "incorrect" && (
            <span className="text-xs text-red-400 font-semibold">
              Not quite right yet. Keep rearranging!
            </span>
          )}
          <button
            onClick={handleCheck}
            disabled={isCompleted || feedback === "correct"}
            className="px-4 py-1.5 bg-python-blue hover:bg-blue-600 disabled:opacity-50 text-white text-xs font-semibold rounded-lg shadow-md transition-colors"
          >
            Check Sequence
          </button>
        </div>
      </div>
    </div>
  );
}
