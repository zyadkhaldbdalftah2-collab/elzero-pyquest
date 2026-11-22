"use client";

import React, { useState } from "react";
import { EssayQuestion } from "@/types";
import { GraduationCap, Eye, EyeOff, CheckCircle2 } from "lucide-react";

interface EssayPrepProps {
  questions: EssayQuestion[];
}

export default function EssayPrep({ questions }: EssayPrepProps) {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [revealedAnswers, setRevealedAnswers] = useState<Record<number, boolean>>({});

  if (!questions || questions.length === 0) return null;

  const handleAnswerChange = (idx: number, text: string) => {
    setAnswers((prev) => ({ ...prev, [idx]: text }));
  };

  const toggleModelAnswer = (idx: number) => {
    setRevealedAnswers((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-python-blue/15 border border-python-blue/30 text-python-blue">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white font-inter">
              Exam Prep: Essay Questions
            </h3>
            <p className="text-xs text-slate-400 font-inter">
              Strengthen technical English writing & theoretical understanding
            </p>
          </div>
        </div>
        <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
          {questions.length} Questions
        </span>
      </div>

      {/* Questions List */}
      <div className="space-y-6">
        {questions.map((q, idx) => {
          const isRevealed = revealedAnswers[idx];
          const userDraft = answers[idx] || "";

          return (
            <div
              key={idx}
              className="rounded-xl border border-slate-800 bg-slate-950/70 p-4 space-y-3"
            >
              <div className="flex items-start gap-2.5">
                <span className="w-6 h-6 rounded-lg bg-slate-800 text-slate-300 font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  Q{idx + 1}
                </span>
                <p className="text-sm font-semibold text-slate-100 font-inter leading-relaxed">
                  {q.question}
                </p>
              </div>

              {/* User text area */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-mono text-slate-400">
                  Your Answer (in English):
                </label>
                <textarea
                  value={userDraft}
                  onChange={(e) => handleAnswerChange(idx, e.target.value)}
                  placeholder="Draft your explanation here to practice technical communication..."
                  rows={3}
                  className="w-full p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-python-blue transition-colors resize-y font-inter"
                />
              </div>

              {/* Toggle Model Answer */}
              <div className="flex justify-between items-center pt-1">
                <span className="text-[11px] text-slate-500 font-mono">
                  {userDraft.trim().length > 0 ? "Draft saved locally" : "Type your answer first"}
                </span>

                <button
                  type="button"
                  onClick={() => toggleModelAnswer(idx)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
                >
                  {isRevealed ? (
                    <>
                      <EyeOff className="w-3.5 h-3.5" />
                      <span>Hide Model Answer</span>
                    </>
                  ) : (
                    <>
                      <Eye className="w-3.5 h-3.5" />
                      <span>Show Model Answer</span>
                    </>
                  )}
                </button>
              </div>

              {/* Model Answer Reveal */}
              {isRevealed && (
                <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-800/40 text-xs text-emerald-200 font-inter leading-relaxed space-y-1.5 animate-fadeIn">
                  <div className="flex items-center gap-1.5 font-bold text-emerald-400">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Model Answer (Reference):</span>
                  </div>
                  <p>{q.modelAnswer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
