"use client";

import React from "react";
import Link from "next/link";
import { Pitfall } from "@/types";
import { AlertTriangle, XCircle, CheckCircle2, Play } from "lucide-react";

interface CommonPitfallsProps {
  pitfalls: Pitfall[];
}

export default function CommonPitfalls({ pitfalls }: CommonPitfallsProps) {
  if (!pitfalls || pitfalls.length === 0) return null;

  const handleTryInStudio = (code: string) => {
    sessionStorage.setItem("pyquest_try_code", code);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4" dir="rtl">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white font-cairo">
              أشهر الأخطاء الشائعة
            </h2>
            <p className="text-xs text-slate-400 font-mono" dir="ltr">
              Common Pitfalls & Fixes
            </p>
          </div>
        </div>
        <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-slate-800 text-amber-400 border border-amber-400/20">
          {pitfalls.length} Warnings
        </span>
      </div>

      <div className="space-y-4">
        {pitfalls.map((pitfall, idx) => (
          <div
            key={idx}
            className="rounded-xl border border-slate-800 bg-slate-950/70 p-4 space-y-3"
          >
            {/* Title */}
            <h3 className="text-sm font-bold text-amber-300 font-cairo" dir="rtl">
              ⚠️ {pitfall.titleAr}
            </h3>

            {/* Comparison Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3" dir="ltr">
              {/* Wrong Code */}
              <div className="rounded-lg border border-red-900/50 bg-red-950/20 p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-red-400">
                    <XCircle className="w-4 h-4" />
                    <span>Wrong Code (❌)</span>
                  </div>
                  <Link
                    href={`/playground?code=${encodeURIComponent(pitfall.wrongCode)}`}
                    onClick={() => handleTryInStudio(pitfall.wrongCode)}
                    className="flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded bg-red-950 hover:bg-red-900 text-red-300 hover:text-white border border-red-800 transition-colors"
                    title="Run wrong code in Studio to see traceback"
                  >
                    <Play className="w-2.5 h-2.5 fill-current" />
                    <span>Run Error</span>
                  </Link>
                </div>
                <pre className="font-fira text-xs text-red-200/90 overflow-x-auto p-2 bg-slate-950/80 rounded border border-red-900/30">
                  <code>{pitfall.wrongCode}</code>
                </pre>
              </div>

              {/* Correct Code */}
              <div className="rounded-lg border border-green-900/50 bg-green-950/20 p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-green-400">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Correct Code (✅)</span>
                  </div>
                  <Link
                    href={`/playground?code=${encodeURIComponent(pitfall.correctCode)}`}
                    onClick={() => handleTryInStudio(pitfall.correctCode)}
                    className="flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded bg-green-950 hover:bg-green-900 text-green-300 hover:text-white border border-green-800 transition-colors"
                    title="Run fix in Studio"
                  >
                    <Play className="w-2.5 h-2.5 fill-current" />
                    <span>Run Fix</span>
                  </Link>
                </div>
                <pre className="font-fira text-xs text-green-200/90 overflow-x-auto p-2 bg-slate-950/80 rounded border border-green-900/30">
                  <code>{pitfall.correctCode}</code>
                </pre>
              </div>
            </div>

            {/* Arabic Explanation */}
            <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800 text-xs text-slate-300 font-cairo leading-relaxed" dir="rtl">
              <span className="font-bold text-python-yellow ml-1">التوضيح:</span>
              {pitfall.explanationAr}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
