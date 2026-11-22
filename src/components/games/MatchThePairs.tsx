"use client";

import React, { useState, useEffect } from "react";
import { MatchThePairsGame } from "@/types";
import { Link2, CheckCircle2, RotateCcw, Zap } from "lucide-react";

interface MatchThePairsProps {
  data: MatchThePairsGame;
  onComplete: (gameName: string) => void;
  isCompleted: boolean;
}

export default function MatchThePairs({
  data,
  onComplete,
  isCompleted,
}: MatchThePairsProps) {
  const [selectedLeft, setSelectedLeft] = useState<number | null>(null);
  const [selectedRight, setSelectedRight] = useState<number | null>(null);
  const [shuffledRights, setShuffledRights] = useState<{ id: number; text: string }[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number[]>([]); // stores original pair indexes
  const [wrongMatch, setWrongMatch] = useState(false);

  useEffect(() => {
    // Shuffle right items while preserving their original index ID
    const shuffled = data.pairs
      .map((p, idx) => ({ id: idx, text: p.right }))
      .sort(() => Math.random() - 0.5);
    setShuffledRights(shuffled);
    setMatchedPairs([]);
    setSelectedLeft(null);
    setSelectedRight(null);
    setWrongMatch(false);
  }, [data]);

  const handleLeftClick = (idx: number) => {
    if (isCompleted || matchedPairs.includes(idx)) return;
    setWrongMatch(false);
    setSelectedLeft(idx);

    if (selectedRight !== null) {
      checkMatch(idx, selectedRight);
    }
  };

  const handleRightClick = (shuffledIdx: number) => {
    const originalId = shuffledRights[shuffledIdx].id;
    if (isCompleted || matchedPairs.includes(originalId)) return;
    setWrongMatch(false);
    setSelectedRight(shuffledIdx);

    if (selectedLeft !== null) {
      checkMatch(selectedLeft, shuffledIdx);
    }
  };

  const checkMatch = (leftIdx: number, rightShuffledIdx: number) => {
    const rightOriginalId = shuffledRights[rightShuffledIdx].id;

    if (leftIdx === rightOriginalId) {
      // Correct Match!
      const updated = [...matchedPairs, leftIdx];
      setMatchedPairs(updated);
      setSelectedLeft(null);
      setSelectedRight(null);

      if (updated.length === data.pairs.length) {
        onComplete("matchThePairs");
      }
    } else {
      // Wrong Match
      setWrongMatch(true);
      setTimeout(() => {
        setSelectedLeft(null);
        setSelectedRight(null);
        setWrongMatch(false);
      }, 700);
    }
  };

  const handleReset = () => {
    const shuffled = data.pairs
      .map((p, idx) => ({ id: idx, text: p.right }))
      .sort(() => Math.random() - 0.5);
    setShuffledRights(shuffled);
    setMatchedPairs([]);
    setSelectedLeft(null);
    setSelectedRight(null);
    setWrongMatch(false);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Link2 className="w-4 h-4 text-python-yellow" />
          <h3 className="text-sm font-bold text-white font-inter">
            3. Match the Pairs
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-python-yellow/20 text-yellow-300 border border-python-yellow/30">
            <Zap className="w-3 h-3 fill-yellow-300" />
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
        {data.instruction} <span className="text-slate-500">(Click a syntax term on the left, then its definition on the right)</span>
      </p>

      {/* Matching Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left Column: Python Syntax */}
        <div className="space-y-2">
          <h4 className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
            Python Syntax
          </h4>
          {data.pairs.map((pair, idx) => {
            const isMatched = matchedPairs.includes(idx) || isCompleted;
            const isSelected = selectedLeft === idx;

            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleLeftClick(idx)}
                disabled={isMatched}
                className={`w-full p-2.5 rounded-xl border text-left font-fira text-xs transition-all ${
                  isMatched
                    ? "bg-green-500/10 border-green-500/40 text-green-300 opacity-80 cursor-default"
                    : isSelected
                    ? wrongMatch
                      ? "bg-red-500/20 border-red-500 text-red-200"
                      : "bg-python-blue/20 border-python-blue text-white shadow-md shadow-python-blue/20"
                    : "bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800/40"
                }`}
              >
                <code>{pair.left}</code>
              </button>
            );
          })}
        </div>

        {/* Right Column: English Definitions */}
        <div className="space-y-2">
          <h4 className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
            English Definition
          </h4>
          {shuffledRights.map((item, shuffledIdx) => {
            const isMatched = matchedPairs.includes(item.id) || isCompleted;
            const isSelected = selectedRight === shuffledIdx;

            return (
              <button
                key={shuffledIdx}
                type="button"
                onClick={() => handleRightClick(shuffledIdx)}
                disabled={isMatched}
                className={`w-full p-2.5 rounded-xl border text-left text-xs transition-all font-inter ${
                  isMatched
                    ? "bg-green-500/10 border-green-500/40 text-green-300 opacity-80 cursor-default"
                    : isSelected
                    ? wrongMatch
                      ? "bg-red-500/20 border-red-500 text-red-200"
                      : "bg-python-yellow/20 border-python-yellow text-white shadow-md shadow-python-yellow/20"
                    : "bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800/40"
                }`}
              >
                {item.text}
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer Progress & Reset */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={handleReset}
          disabled={isCompleted}
          className="flex items-center gap-1 text-xs text-slate-400 hover:text-white px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors disabled:opacity-40"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>

        <div className="text-xs font-mono text-slate-400">
          Matched:{" "}
          <span className="text-python-yellow font-bold">
            {isCompleted ? data.pairs.length : matchedPairs.length}
          </span>{" "}
          / {data.pairs.length}
        </div>
      </div>
    </div>
  );
}
