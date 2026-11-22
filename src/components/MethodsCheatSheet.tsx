"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MethodCard } from "@/types";
import { Copy, Check, Terminal, Play } from "lucide-react";

interface MethodsCheatSheetProps {
  methods: MethodCard[];
}

export default function MethodsCheatSheet({ methods }: MethodsCheatSheetProps) {
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const handleCopy = (code: string, idx: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  const handleTryInStudio = (code: string) => {
    sessionStorage.setItem("pyquest_try_code", code);
  };

  if (!methods || methods.length === 0) {
    return null;
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4" dir="rtl">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-python-yellow/10 border border-python-yellow/30 text-python-yellow">
            <Terminal className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white font-cairo">
              دليل الميثودز والكلمات المحجوزة
            </h2>
            <p className="text-xs text-slate-400 font-mono" dir="ltr">
              Methods & Keywords Cheat Sheet
            </p>
          </div>
        </div>
        <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">
          {methods.length} Items
        </span>
      </div>

      <div className="space-y-4">
        {methods.map((method, idx) => (
          <div
            key={idx}
            className="rounded-xl border border-slate-800 bg-slate-950/70 p-4 space-y-3 hover:border-slate-700 transition-colors"
          >
            {/* Header: Name, Signature, Copy & Try in Studio */}
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-md bg-python-blue/20 text-blue-300 font-fira text-sm font-semibold border border-python-blue/30">
                  {method.name}
                </span>
                <span className="text-xs font-fira text-slate-400 hidden sm:inline" dir="ltr">
                  {method.signature}
                </span>
              </div>

              <div className="flex items-center gap-1.5" dir="ltr">
                <Link
                  href={`/playground?code=${encodeURIComponent(method.example)}`}
                  onClick={() => handleTryInStudio(method.example)}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono bg-python-blue/20 hover:bg-python-blue text-blue-300 hover:text-white border border-python-blue/40 transition-colors"
                  title="Run in Python Studio"
                >
                  <Play className="w-3 h-3 fill-current" />
                  <span>Try in Studio</span>
                </Link>

                <button
                  onClick={() => handleCopy(method.example, idx)}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
                  title="Copy code"
                >
                  {copiedIdx === idx ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-green-400" />
                      <span className="text-green-400">تم النسخ</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Arabic Description */}
            <p className="text-sm text-slate-300 font-cairo leading-relaxed" dir="rtl">
              {method.descriptionAr}
            </p>

            {/* Code Snippet in LTR */}
            <div className="relative group rounded-lg bg-slate-900 border border-slate-800/80 p-3 overflow-x-auto" dir="ltr">
              <pre className="font-fira text-xs text-python-yellow">
                <code>{method.example}</code>
              </pre>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
