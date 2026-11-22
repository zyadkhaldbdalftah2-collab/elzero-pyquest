"use client";

import React, { useState } from "react";
import { SyntaxSpotterGame } from "@/types";
import { CheckCircle2, XCircle, RotateCcw, Zap, HelpCircle, Code } from "lucide-react";

interface SyntaxSpotterProps {
  data: SyntaxSpotterGame;
  onComplete: (gameName: string) => void;
  isCompleted: boolean;
}

export default function SyntaxSpotter({
  data,
  onComplete,
  isCompleted,
}: SyntaxSpotterProps) {
  const [answers, setAnswers] = useState<Record<number, boolean>>({});
  const [hasEvaluated, setHasEvaluated] = useState(false);

  const handleSelect = (idx: number, valid: boolean) => {
    if (isCompleted || hasEvaluated) return;
    setAnswers((prev) => ({ ...prev, [idx]: valid }));
  };

  const handleCheck = () => {
    setHasEvaluated(true);
    const allCorrect = data.snippets.every(
      (s, idx) => answers[idx] === s.isValid
    );
    if (allCorrect) {
      onComplete("syntaxSpotter");
    }
  };

  const handleReset = () => {
    setAnswers({});
    setHasEvaluated(false);
  };

  const allAnswered = Object.keys(answers).length === data.snippets.length;
  const isAllCorrect =
    hasEvaluated &&
    data.snippets.every((s, idx) => answers[idx] === s.isValid);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Code className="w-4 h-4 text-pink-400" />
          <h3 className="text-sm font-bold text-white font-inter">
            7. Syntax Spotter
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/30">
            <Zap className="w-3 h-3 fill-pink-300" />
            +15 XP
          </span>
          {isCompleted && (
            <span className="flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 border border-green-500/30">
              <CheckCircle2 className="w-3 h-3" />
              Completed
            </span>
          )}
        </div>
      </div>

      <p className="text-xs text-slate-400 flex items-center gap-1.5 font-inter">
        <HelpCircle className="w-3.5 h-3.5 text-slate-500" />
        {data.instruction}
      </p>

      {/* Snippets List */}
      <div className="space-y-3">
        {data.snippets.map((item, idx) => {
          const userChoice = answers[idx];
          const isCorrect = userChoice === item.isValid;

          return (
            <div
              key={idx}
              className="p-3.5 rounded-xl border border-slate-800 bg-slate-950/70 space-y-2.5"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <pre className="font-fira text-xs text-python-yellow overflow-x-auto p-2 bg-slate-900/90 rounded-lg border border-slate-800/80 flex-1">
                  <code>{item.code}</code>
                </pre>

                {/* Valid / Invalid Buttons */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleSelect(idx, true)}
                    disabled={isCompleted || hasEvaluated}
                    className={`px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
                      userChoice === true
                        ? hasEvaluated
                          ? item.isValid
                            ? "bg-green-500/20 text-green-300 border-green-500"
                            : "bg-red-500/20 text-red-300 border-red-500"
                          : "bg-green-600 text-white border-green-500"
                        : "bg-slate-900 border-slate-700 text-slate-400 hover:text-white"
                    }`}
                  >
                    Valid ✓
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSelect(idx, false)}
                    disabled={isCompleted || hasEvaluated}
                    className={`px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
                      userChoice === false
                        ? hasEvaluated
                          ? !item.isValid
                            ? "bg-green-500/20 text-green-300 border-green-500"
                            : "bg-red-500/20 text-red-300 border-red-500"
                          : "bg-red-600 text-white border-red-500"
                        : "bg-slate-900 border-slate-700 text-slate-400 hover:text-white"
                    }`}
                  >
                    Invalid ✗
                  </button>
                </div>
              </div>

              {/* Reveal explanation */}
              {(hasEvaluated || isCompleted) && (
                <div
                  className={`p-2 rounded-lg text-xs font-inter ${
                    isCorrect
                      ? "bg-green-950/30 border border-green-900/40 text-green-300"
                      : "bg-red-950/30 border border-red-900/40 text-red-300"
                  }`}
                >
                  <span className="font-semibold mr-1">
                    {item.isValid ? "Valid Syntax:" : "Syntax Error:"}
                  </span>
                  {item.explanation}
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
          <span>Reset</span>
        </button>

        <div className="flex items-center gap-3">
          {isAllCorrect && (
            <span className="text-xs text-green-400 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" />
              All Validated! (+15 XP)
            </span>
          )}
          <button
            onClick={handleCheck}
            disabled={!allAnswered || isCompleted || isAllCorrect}
            className="px-4 py-1.5 bg-python-blue hover:bg-blue-600 disabled:opacity-50 text-white text-xs font-semibold rounded-lg shadow-md transition-colors"
          >
            Check All
          </button>
        </div>
      </div>
    </div>
  );
}
