"use client";

import React, { useState } from "react";
import { TrueOrFalseGame } from "@/types";
import { Check, X, CheckCircle2, RotateCcw, Zap, HelpCircle } from "lucide-react";

interface TrueOrFalseProps {
  data: TrueOrFalseGame;
  onComplete: (gameName: string) => void;
  isCompleted: boolean;
}

export default function TrueOrFalse({
  data,
  onComplete,
  isCompleted,
}: TrueOrFalseProps) {
  const [answers, setAnswers] = useState<Record<number, boolean>>({});
  const [showResults, setShowResults] = useState(false);

  const handleSelect = (idx: number, choice: boolean) => {
    if (isCompleted || showResults) return;
    setAnswers((prev) => ({ ...prev, [idx]: choice }));
  };

  const handleCheck = () => {
    setShowResults(true);
    // Check if all answers are correct
    const allCorrect = data.statements.every(
      (stmt, idx) => answers[idx] === stmt.isTrue
    );
    if (allCorrect) {
      onComplete("trueOrFalse");
    }
  };

  const handleReset = () => {
    setAnswers({});
    setShowResults(false);
  };

  const answeredCount = Object.keys(answers).length;
  const isFinishedAllCorrect =
    showResults &&
    data.statements.every((stmt, idx) => answers[idx] === stmt.isTrue);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-cyan-400" />
          <h3 className="text-sm font-bold text-white font-inter">
            6. True or False
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
            <Zap className="w-3 h-3 fill-cyan-300" />
            +10 XP
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

      {/* Statements List */}
      <div className="space-y-3">
        {data.statements.map((item, idx) => {
          const userChoice = answers[idx];
          const isCorrect = userChoice === item.isTrue;

          return (
            <div
              key={idx}
              className="p-3.5 rounded-xl border border-slate-800 bg-slate-950/70 space-y-2.5"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <p className="text-xs text-slate-200 font-inter leading-relaxed flex-1">
                  <span className="font-mono text-slate-500 mr-2">{idx + 1}.</span>
                  {item.statement}
                </p>

                {/* True / False buttons */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleSelect(idx, true)}
                    disabled={isCompleted || showResults}
                    className={`px-3 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition-all ${
                      userChoice === true
                        ? showResults
                          ? item.isTrue
                            ? "bg-green-500/20 text-green-300 border-green-500"
                            : "bg-red-500/20 text-red-300 border-red-500"
                          : "bg-python-blue text-white border-python-blue shadow-md"
                        : "bg-slate-900 border-slate-700 text-slate-400 hover:text-white"
                    }`}
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>True</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSelect(idx, false)}
                    disabled={isCompleted || showResults}
                    className={`px-3 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition-all ${
                      userChoice === false
                        ? showResults
                          ? !item.isTrue
                            ? "bg-green-500/20 text-green-300 border-green-500"
                            : "bg-red-500/20 text-red-300 border-red-500"
                          : "bg-python-blue text-white border-python-blue shadow-md"
                        : "bg-slate-900 border-slate-700 text-slate-400 hover:text-white"
                    }`}
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>False</span>
                  </button>
                </div>
              </div>

              {/* Reveal explanation after submission */}
              {(showResults || isCompleted) && (
                <div
                  className={`p-2.5 rounded-lg text-xs font-inter ${
                    isCorrect
                      ? "bg-green-950/30 border border-green-900/40 text-green-300"
                      : "bg-red-950/30 border border-red-900/40 text-red-300"
                  }`}
                >
                  <span className="font-semibold mr-1">
                    {item.isTrue ? "✓ True:" : "✗ False:"}
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
          {isFinishedAllCorrect && (
            <span className="text-xs text-green-400 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" />
              All Correct! (+10 XP)
            </span>
          )}
          <button
            onClick={handleCheck}
            disabled={
              answeredCount < data.statements.length ||
              isCompleted ||
              isFinishedAllCorrect
            }
            className="px-4 py-1.5 bg-python-blue hover:bg-blue-600 disabled:opacity-50 text-white text-xs font-semibold rounded-lg shadow-md transition-colors"
          >
            Verify All
          </button>
        </div>
      </div>
    </div>
  );
}
