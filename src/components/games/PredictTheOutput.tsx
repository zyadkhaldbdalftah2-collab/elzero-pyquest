"use client";

import React, { useState } from "react";
import { PredictTheOutputGame } from "@/types";
import { Terminal, CheckCircle2, XCircle, Zap, HelpCircle } from "lucide-react";

interface PredictTheOutputProps {
  data: PredictTheOutputGame;
  onComplete: (gameName: string) => void;
  isCompleted: boolean;
}

export default function PredictTheOutput({
  data,
  onComplete,
  isCompleted,
}: PredictTheOutputProps) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasChecked, setHasChecked] = useState(false);

  const handleSelect = (idx: number) => {
    if (isCompleted || (hasChecked && selectedOption === data.correctIndex)) return;
    setSelectedOption(idx);
    setHasChecked(false);
  };

  const handleCheck = () => {
    if (selectedOption === null) return;
    setHasChecked(true);
    if (selectedOption === data.correctIndex) {
      onComplete("predictTheOutput");
    }
  };

  const isCorrect = hasChecked && selectedOption === data.correctIndex;
  const isWrong = hasChecked && selectedOption !== data.correctIndex;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-emerald-400" />
          <h3 className="text-sm font-bold text-white font-inter">
            4. Predict the Output
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            <Zap className="w-3 h-3 fill-emerald-300" />
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

      {/* Code Snippet Box */}
      <div className="bg-slate-950 rounded-xl border border-slate-800 p-3 font-fira text-xs text-python-yellow overflow-x-auto shadow-inner">
        <pre>
          <code>{data.code}</code>
        </pre>
      </div>

      {/* Multiple Choice Options */}
      <div className="space-y-2">
        <p className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
          What will this print to the console?
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {data.options.map((option, idx) => {
            const isSelected = selectedOption === idx;
            const isTheAnswer = idx === data.correctIndex;

            let optionStyle = "bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800/50";
            if (isSelected) {
              optionStyle = "bg-python-blue/20 border-python-blue text-white";
            }
            if (hasChecked || isCompleted) {
              if (isTheAnswer) {
                optionStyle = "bg-green-500/20 border-green-500 text-green-300 font-semibold";
              } else if (isSelected && !isTheAnswer) {
                optionStyle = "bg-red-500/20 border-red-500 text-red-300";
              }
            }

            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelect(idx)}
                disabled={isCompleted || (hasChecked && isCorrect)}
                className={`p-3 rounded-xl border text-left font-fira text-xs transition-all flex items-center justify-between ${optionStyle}`}
              >
                <span>{option}</span>
                {(hasChecked || isCompleted) && isTheAnswer && (
                  <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0 ml-2" />
                )}
                {hasChecked && isSelected && !isTheAnswer && (
                  <XCircle className="w-4 h-4 text-red-400 shrink-0 ml-2" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Explanation & Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
        <div className="text-xs">
          {isCorrect && (
            <div className="text-green-400 flex items-start gap-1.5 font-medium">
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{data.explanation}</span>
            </div>
          )}
          {isWrong && (
            <div className="text-red-400 flex items-center gap-1.5">
              <XCircle className="w-4 h-4" />
              <span>Incorrect output! Re-trace the code execution.</span>
            </div>
          )}
        </div>

        <button
          onClick={handleCheck}
          disabled={selectedOption === null || isCompleted || isCorrect}
          className="self-end sm:self-auto px-4 py-1.5 bg-python-blue hover:bg-blue-600 disabled:opacity-50 text-white text-xs font-semibold rounded-lg shadow-md transition-colors"
        >
          Submit Answer
        </button>
      </div>
    </div>
  );
}
