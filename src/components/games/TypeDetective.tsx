"use client";

import React, { useState } from "react";
import { TypeDetectiveGame } from "@/types";
import { Search, CheckCircle2, RotateCcw, Zap, HelpCircle } from "lucide-react";

interface TypeDetectiveProps {
  data: TypeDetectiveGame;
  onComplete: (gameName: string) => void;
  isCompleted: boolean;
}

export default function TypeDetective({
  data,
  onComplete,
  isCompleted,
}: TypeDetectiveProps) {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [hasEvaluated, setHasEvaluated] = useState(false);

  const handleSelectOption = (idx: number, typeChoice: string) => {
    if (isCompleted || hasEvaluated) return;
    setAnswers((prev) => ({ ...prev, [idx]: typeChoice }));
  };

  const handleCheck = () => {
    setHasEvaluated(true);
    const allCorrect = data.expressions.every(
      (item, idx) => answers[idx] === item.correctType
    );
    if (allCorrect) {
      onComplete("typeDetective");
    }
  };

  const handleReset = () => {
    setAnswers({});
    setHasEvaluated(false);
  };

  const allAnswered = Object.keys(answers).length === data.expressions.length;
  const isAllCorrect =
    hasEvaluated &&
    data.expressions.every((item, idx) => answers[idx] === item.correctType);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Search className="w-4 h-4 text-amber-400" />
          <h3 className="text-sm font-bold text-white font-inter">
            8. Type Detective
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
            <Zap className="w-3 h-3 fill-amber-300" />
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

      {/* Expressions List */}
      <div className="space-y-3">
        {data.expressions.map((item, idx) => {
          const selected = answers[idx];
          const isCorrect = selected === item.correctType;

          return (
            <div
              key={idx}
              className="p-3.5 rounded-xl border border-slate-800 bg-slate-950/70 space-y-2.5"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2 font-fira text-xs text-python-yellow bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
                  <span className="text-slate-500">expr:</span>
                  <code>{item.expression}</code>
                </div>

                {/* Option Chips */}
                <div className="flex flex-wrap items-center gap-1.5">
                  {item.options.map((option) => {
                    const isChosen = selected === option;
                    const isRightType = option === item.correctType;

                    let btnClass = "bg-slate-900 border-slate-700 text-slate-300 hover:border-slate-500";
                    if (isChosen) {
                      btnClass = "bg-python-blue text-white border-python-blue";
                    }
                    if (hasEvaluated || isCompleted) {
                      if (isRightType) {
                        btnClass = "bg-green-500/20 border-green-500 text-green-300 font-bold";
                      } else if (isChosen && !isRightType) {
                        btnClass = "bg-red-500/20 border-red-500 text-red-300";
                      }
                    }

                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => handleSelectOption(idx, option)}
                        disabled={isCompleted || hasEvaluated}
                        className={`px-2.5 py-1 rounded-lg border font-fira text-xs transition-all ${btnClass}`}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
              </div>

              {(hasEvaluated || isCompleted) && (
                <div className="text-[11px] font-mono text-slate-400">
                  Expected type: <span className="text-green-400 font-bold">{item.correctType}</span>
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
              All Detected! (+10 XP)
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
