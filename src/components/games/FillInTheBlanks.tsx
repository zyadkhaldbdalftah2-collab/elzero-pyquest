"use client";

import React, { useState, useEffect } from "react";
import { FillInTheBlanksGame } from "@/types";
import { CheckCircle2, RotateCcw, Zap, HelpCircle } from "lucide-react";

interface FillInTheBlanksProps {
  data: FillInTheBlanksGame;
  onComplete: (gameName: string) => void;
  isCompleted: boolean;
}

export default function FillInTheBlanks({
  data,
  onComplete,
  isCompleted,
}: FillInTheBlanksProps) {
  // Extract blanks count
  const blankMatches = data.codeTemplate.match(/___/g) || [];
  const totalBlanks = blankMatches.length;

  const [availableChips, setAvailableChips] = useState<string[]>([]);
  const [placedWords, setPlacedWords] = useState<(string | null)[]>([]);
  const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(null);

  useEffect(() => {
    // Combine blanks + distractors and shuffle
    const all = [...data.blanks, ...data.distractors].sort(() => Math.random() - 0.5);
    setAvailableChips(all);
    setPlacedWords(new Array(totalBlanks).fill(null));
    setFeedback(null);
  }, [data, totalBlanks]);

  const handleChipClick = (word: string, chipIndex: number) => {
    if (isCompleted || feedback === "correct") return;

    // Find first empty slot in placedWords
    const emptyIndex = placedWords.findIndex((slot) => slot === null);
    if (emptyIndex === -1) return;

    const newPlaced = [...placedWords];
    newPlaced[emptyIndex] = word;
    setPlacedWords(newPlaced);

    // Remove chip from available
    const newChips = [...availableChips];
    newChips.splice(chipIndex, 1);
    setAvailableChips(newChips);
    setFeedback(null);
  };

  const handleRemovePlaced = (slotIndex: number) => {
    if (isCompleted || feedback === "correct") return;
    const word = placedWords[slotIndex];
    if (!word) return;

    const newPlaced = [...placedWords];
    newPlaced[slotIndex] = null;
    setPlacedWords(newPlaced);

    setAvailableChips((prev) => [...prev, word]);
    setFeedback(null);
  };

  const handleReset = () => {
    const all = [...data.blanks, ...data.distractors].sort(() => Math.random() - 0.5);
    setAvailableChips(all);
    setPlacedWords(new Array(totalBlanks).fill(null));
    setFeedback(null);
  };

  const handleCheck = () => {
    // Compare placed words with data.blanks
    const isAllCorrect =
      placedWords.every((word, idx) => word === data.blanks[idx]) &&
      placedWords.length === data.blanks.length;

    if (isAllCorrect) {
      setFeedback("correct");
      onComplete("fillInTheBlanks");
    } else {
      setFeedback("incorrect");
    }
  };

  // Render template with blanks or placed words
  const renderTemplate = () => {
    const parts = data.codeTemplate.split("___");
    let blankIndex = 0;

    return (
      <div className="font-fira text-sm leading-relaxed p-4 bg-slate-950 rounded-xl border border-slate-800">
        {parts.map((part, idx) => {
          const currentBlankIndex = blankIndex;
          if (idx < parts.length - 1) {
            blankIndex++;
          }
          const word = placedWords[currentBlankIndex];

          return (
            <React.Fragment key={idx}>
              <span className="text-slate-300 whitespace-pre">{part}</span>
              {idx < parts.length - 1 && (
                <button
                  type="button"
                  onClick={() => handleRemovePlaced(currentBlankIndex)}
                  className={`inline-flex items-center justify-center min-w-[70px] px-2.5 py-0.5 mx-1 rounded border text-xs font-mono transition-all ${
                    word
                      ? feedback === "correct" || isCompleted
                        ? "bg-green-500/20 text-green-300 border-green-500/50 cursor-default"
                        : feedback === "incorrect"
                        ? "bg-red-500/20 text-red-300 border-red-500/50 cursor-pointer animate-pulse"
                        : "bg-python-blue/20 text-blue-200 border-python-blue/60 hover:bg-red-950 hover:text-red-300 cursor-pointer"
                      : "bg-slate-800 border-dashed border-slate-600 text-slate-500"
                  }`}
                  title={word ? "Click to remove" : "Fill with word chips below"}
                >
                  {word || "___"}
                </button>
              )}
            </React.Fragment>
          );
        })}
      </div>
    );
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-python-blue animate-pulse" />
          <h3 className="text-sm font-bold text-white font-inter">
            1. Fill in the Blanks
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-python-blue/20 text-blue-300 border border-python-blue/30">
            <Zap className="w-3 h-3 fill-blue-300" />
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

      {/* Code Display */}
      {renderTemplate()}

      {/* Available Word Chips */}
      <div>
        <p className="text-[11px] font-mono text-slate-400 mb-2">
          Click words in sequence to fill blanks:
        </p>
        <div className="flex flex-wrap gap-2">
          {availableChips.map((word, idx) => (
            <button
              key={`${word}-${idx}`}
              onClick={() => handleChipClick(word, idx)}
              disabled={isCompleted || feedback === "correct"}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 active:scale-95 text-xs font-fira text-python-yellow border border-slate-700 hover:border-python-yellow/50 transition-all disabled:opacity-50"
            >
              {word}
            </button>
          ))}
          {availableChips.length === 0 && placedWords.every(Boolean) && (
            <span className="text-xs text-slate-500 italic">
              All blanks filled! Hit Check Answer.
            </span>
          )}
        </div>
      </div>

      {/* Actions & Feedback */}
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
          {feedback === "correct" && (
            <span className="text-xs text-green-400 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" />
              Awesome! Correct Code (+10 XP)
            </span>
          )}
          {feedback === "incorrect" && (
            <span className="text-xs text-red-400 font-semibold">
              Try again! Check your syntax.
            </span>
          )}
          <button
            onClick={handleCheck}
            disabled={
              isCompleted ||
              feedback === "correct" ||
              placedWords.some((w) => w === null)
            }
            className="px-4 py-1.5 bg-python-blue hover:bg-blue-600 disabled:opacity-50 disabled:hover:bg-python-blue text-white text-xs font-semibold rounded-lg shadow-md transition-colors"
          >
            Check Answer
          </button>
        </div>
      </div>
    </div>
  );
}
