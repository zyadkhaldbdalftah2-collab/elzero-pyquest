"use client";

import React from "react";
import { BookOpen, Sparkles } from "lucide-react";

interface LessonSummaryProps {
  summaryAr: string[];
  titleAr?: string;
}

export default function LessonSummary({ summaryAr, titleAr }: LessonSummaryProps) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4" dir="rtl">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-python-blue/10 border border-python-blue/30 text-python-blue">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white font-cairo">
              ملخص الدرس
            </h2>
            {titleAr && (
              <p className="text-xs text-slate-400 font-cairo">{titleAr}</p>
            )}
          </div>
        </div>
        <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-python-yellow border border-python-yellow/20 flex items-center gap-1">
          <Sparkles className="w-3 h-3" />
          {summaryAr.length} نقاط رئيسية
        </span>
      </div>

      <div className="space-y-3 font-cairo" dir="rtl">
        {summaryAr.map((point, idx) => (
          <div
            key={idx}
            className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800/60 hover:border-slate-700 transition-all text-slate-300 text-sm leading-relaxed"
          >
            <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-python-blue/15 text-python-blue font-mono font-bold text-xs shrink-0 mt-0.5">
              {idx + 1}
            </span>
            <div className="flex-1 text-right">{point}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
