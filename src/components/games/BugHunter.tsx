"use client";

import React, { useState } from "react";
import { BugHunterGame } from "@/types";
import { Bug, CheckCircle2, AlertCircle, Zap } from "lucide-react";

interface BugHunterProps {
  data: BugHunterGame;
  onComplete: (gameName: string) => void;
  isCompleted: boolean;
}

export default function BugHunter({
  data,
  onComplete,
  isCompleted,
}: BugHunterProps) {
  const [selectedLine, setSelectedLine] = useState<number | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleSelectLine = (index: number) => {
    if (isCompleted || (hasSubmitted && selectedLine === data.buggyLineIndex)) {
      return;
    }
    setSelectedLine(index);
    setHasSubmitted(false);
  };

  const handleCheck = () => {
    if (selectedLine === null) return;
    setHasSubmitted(true);
    if (selectedLine === data.buggyLineIndex) {
      onComplete("bugHunter");
    }
  };

  const isSuccess = hasSubmitted && selectedLine === data.buggyLineIndex;
  const isFailed = hasSubmitted && selectedLine !== data.buggyLineIndex;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Bug className="w-4 h-4 text-red-400" />
          <h3 className="text-sm font-bold text-white font-inter">
            2. Bug Hunter
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-red-500/20 text-red-300 border border-red-500/30">
            <Zap className="w-3 h-3 fill-red-300" />
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

      <p className="text-xs text-slate-400 font-inter">
        {data.instruction} <span className="text-slate-500">(Click on the code line containing the bug)</span>
      </p>

      {/* Code Lines with Click to Select */}
      <div className="bg-slate-950 rounded-xl border border-slate-800 p-2 font-fira text-xs space-y-0.5">
        {data.code.map((line, idx) => {
          const isSelected = selectedLine === idx;
          const isTheBug = idx === data.buggyLineIndex;

          let lineStyle = "hover:bg-slate-800/60 text-slate-300";
          if (isSelected) {
            lineStyle = "bg-python-blue/20 text-blue-200 border border-python-blue/50";
          }
          if (hasSubmitted || isCompleted) {
            if (isTheBug) {
              lineStyle = "bg-green-500/20 text-green-300 border border-green-500/50";
            } else if (isSelected && !isTheBug) {
              lineStyle = "bg-red-500/20 text-red-300 border border-red-500/50";
            }
          }

          return (
            <button
              key={idx}
              type="button"
              onClick={() => handleSelectLine(idx)}
              className={`w-full text-left px-3 py-1.5 rounded flex items-center gap-3 transition-colors ${lineStyle}`}
            >
              <span className="w-6 text-right font-mono text-slate-600 select-none">
                {idx + 1}
              </span>
              <span className="flex-1 whitespace-pre font-fira">
                {line || " "}
              </span>
              {hasSubmitted && isTheBug && (
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-green-950 text-green-400 border border-green-800">
                  Bug Found!
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Feedback & Submit */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
        <div className="text-xs">
          {isSuccess && (
            <div className="flex items-start gap-1.5 text-green-400 font-medium">
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{data.explanation}</span>
            </div>
          )}
          {isFailed && (
            <div className="flex items-center gap-1.5 text-red-400">
              <AlertCircle className="w-4 h-4" />
              <span>Line {selectedLine! + 1} is clean! Try another line.</span>
            </div>
          )}
        </div>

        <button
          onClick={handleCheck}
          disabled={selectedLine === null || isCompleted || isSuccess}
          className="self-end sm:self-auto px-4 py-1.5 bg-python-blue hover:bg-blue-600 disabled:opacity-50 text-white text-xs font-semibold rounded-lg shadow-md transition-colors"
        >
          Verify Bug
        </button>
      </div>
    </div>
  );
}
