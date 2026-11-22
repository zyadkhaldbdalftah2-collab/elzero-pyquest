"use client";

import React from "react";
import { Terminal, Trash2, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { ExecutionResult } from "@/hooks/usePyodide";

interface ConsoleOutputProps {
  result: ExecutionResult | null;
  isRunning: boolean;
  onClear: () => void;
}

export default function ConsoleOutput({
  result,
  isRunning,
  onClear,
}: ConsoleOutputProps) {
  const hasOutput = result && (result.output || result.error);

  return (
    <div className="flex flex-col h-full bg-slate-950 text-slate-200 border-t border-slate-800">
      {/* Console Bar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-slate-800/80 bg-slate-900/70 select-none">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">
            Terminal Output
          </span>
          {result && (
            <span className="flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700/60 ml-2">
              <Clock className="w-3 h-3 text-python-yellow" />
              <span>{result.executionTime}ms</span>
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {hasOutput && (
            <button
              onClick={onClear}
              className="flex items-center gap-1 text-xs text-slate-400 hover:text-white px-2 py-1 rounded hover:bg-slate-800 transition-colors"
              title="Clear Console"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>
          )}
        </div>
      </div>

      {/* Terminal View */}
      <div className="flex-1 overflow-y-auto p-4 font-fira text-xs leading-relaxed select-text space-y-2">
        {isRunning && (
          <div className="flex items-center gap-2 text-python-yellow animate-pulse">
            <span className="w-2 h-2 rounded-full bg-python-yellow" />
            <span>Executing Python script in WebAssembly runtime...</span>
          </div>
        )}

        {!isRunning && !result && (
          <div className="text-slate-500 italic select-none">
            Ready to execute. Press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 font-mono text-[10px] text-slate-300">Run Code</kbd> or <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 font-mono text-[10px] text-slate-300">Ctrl + Enter</kbd> to see output.
          </div>
        )}

        {!isRunning && result && (
          <>
            {result.output && (
              <pre className="text-emerald-300 whitespace-pre-wrap font-fira">
                {result.output}
              </pre>
            )}

            {result.error && (
              <div className="p-3 rounded-lg bg-red-950/30 border border-red-900/50 text-red-300 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-red-400">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>Python Traceback (Error):</span>
                </div>
                <pre className="text-red-200 whitespace-pre-wrap font-fira text-[11px] overflow-x-auto">
                  {result.error}
                </pre>
              </div>
            )}

            {!result.output && !result.error && (
              <div className="text-slate-400 italic">
                (Process finished with exit code 0 – no output returned)
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
