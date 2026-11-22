"use client";

import React, { useState } from "react";
import { CodeFlashcardsGame } from "@/types";
import { BookOpen, CheckCircle2, ChevronLeft, ChevronRight, RotateCw, Zap } from "lucide-react";

interface CodeFlashcardsProps {
  data: CodeFlashcardsGame;
  onComplete: (gameName: string) => void;
  isCompleted: boolean;
}

export default function CodeFlashcards({
  data,
  onComplete,
  isCompleted,
}: CodeFlashcardsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [reviewedCards, setReviewedCards] = useState<Set<number>>(new Set());

  const currentCard = data.cards[currentIndex];

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    if (!reviewedCards.has(currentIndex)) {
      const updated = new Set(reviewedCards);
      updated.add(currentIndex);
      setReviewedCards(updated);

      if (updated.size === data.cards.length) {
        onComplete("codeFlashcards");
      }
    }
  };

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % data.cards.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + data.cards.length) % data.cards.length);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-sky-400" />
          <h3 className="text-sm font-bold text-white font-inter">
            9. Code Flashcards
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30">
            <Zap className="w-3 h-3 fill-sky-300" />
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

      <p className="text-xs text-slate-400 font-inter">
        {data.instruction} <span className="text-slate-500">(Click card to flip definition & example)</span>
      </p>

      {/* Interactive Card */}
      <div
        onClick={handleFlip}
        className="cursor-pointer select-none perspective min-h-[170px] rounded-2xl border border-slate-800 bg-slate-950 p-6 flex flex-col items-center justify-center text-center relative group hover:border-python-blue/50 transition-all shadow-md"
      >
        <span className="absolute top-3 right-3 text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 flex items-center gap-1">
          <RotateCw className="w-2.5 h-2.5 group-hover:rotate-180 transition-transform duration-500" />
          {isFlipped ? "Definition" : "Term"}
        </span>

        {!isFlipped ? (
          <div className="space-y-2">
            <h4 className="text-lg font-bold font-fira text-python-yellow">
              {currentCard?.term}
            </h4>
            <p className="text-xs text-slate-400 font-inter">Click to flip card</p>
          </div>
        ) : (
          <div className="space-y-2.5 max-w-md">
            <p className="text-xs text-slate-200 font-inter leading-relaxed">
              {currentCard?.definition}
            </p>
            {currentCard?.example && (
              <pre className="font-fira text-[11px] text-blue-300 bg-slate-900/90 p-2 rounded-lg border border-slate-800 inline-block text-left">
                <code>{currentCard.example}</code>
              </pre>
            )}
          </div>
        )}
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={handlePrev}
          className="flex items-center gap-1 text-xs text-slate-300 hover:text-white px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Prev</span>
        </button>

        <div className="text-xs font-mono text-slate-400">
          Card{" "}
          <span className="text-white font-bold">{currentIndex + 1}</span> of{" "}
          {data.cards.length}
          <span className="ml-2 text-slate-500">
            ({reviewedCards.size} reviewed)
          </span>
        </div>

        <button
          onClick={handleNext}
          className="flex items-center gap-1 text-xs text-slate-300 hover:text-white px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors"
        >
          <span>Next</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
