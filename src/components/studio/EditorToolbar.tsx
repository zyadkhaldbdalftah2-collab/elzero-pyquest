"use client";

import React from "react";
import Link from "next/link";
import {
  Play,
  Download,
  Trash2,
  FolderOpen,
  Package,
  Terminal,
  Code2,
  ArrowLeft,
  Loader2,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import { PyodideStatus } from "@/hooks/usePyodide";

interface EditorToolbarProps {
  status: PyodideStatus;
  statusMessage: string;
  isRunning: boolean;
  activeFileName: string;
  onRunCode: () => void;
  onClearConsole: () => void;
  onDownloadFile: () => void;
  showFileExplorer: boolean;
  setShowFileExplorer: (v: boolean) => void;
  showPackageManager: boolean;
  setShowPackageManager: (v: boolean) => void;
}

export default function EditorToolbar({
  status,
  statusMessage,
  isRunning,
  activeFileName,
  onRunCode,
  onClearConsole,
  onDownloadFile,
  showFileExplorer,
  setShowFileExplorer,
  showPackageManager,
  setShowPackageManager,
}: EditorToolbarProps) {
  const isEngineReady = status === "ready";

  return (
    <header className="h-14 bg-slate-950 border-b border-slate-800 px-4 flex items-center justify-between gap-3 select-none">
      {/* Left: Branding & Back to Course */}
      <div className="flex items-center gap-3">
        <Link
          href="/"
          className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
          title="Return to Course Hub"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Back to Lessons</span>
        </Link>

        <div className="h-5 w-[1px] bg-slate-800 hidden sm:block" />

        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-python-blue to-python-yellow flex items-center justify-center p-0.5 shadow-sm">
            <div className="w-full h-full bg-slate-950 rounded-[6px] flex items-center justify-center">
              <Code2 className="w-4 h-4 text-python-yellow" />
            </div>
          </div>
          <div>
            <div className="text-xs font-bold text-white flex items-center gap-1.5">
              <span>PyVerse</span>
              <span className="text-python-yellow">Academy</span>
              <span className="text-slate-500 font-normal hidden sm:inline">|</span>
              <span className="text-blue-300 hidden sm:inline">Python Studio</span>
            </div>
            <div className="text-[10px] text-slate-500 font-mono hidden md:block">
              VS Code Web IDE & Pyodide • Osama Elzero Course
            </div>
          </div>
        </div>

        {/* Active file indicator */}
        <span className="font-mono text-xs px-2 py-0.5 rounded bg-slate-900 text-python-blue border border-slate-800 font-medium">
          {activeFileName}
        </span>
      </div>

      {/* Middle: Engine Status Badge */}
      <div className="hidden lg:flex items-center gap-2">
        {status === "ready" && (
          <div className="flex items-center gap-1.5 text-xs text-green-400 px-2.5 py-1 rounded-full bg-green-500/10 border border-green-500/20 font-mono">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Python 3.12 (Pyodide Wasm)</span>
          </div>
        )}
        {(status === "loading_script" || status === "initializing") && (
          <div className="flex items-center gap-1.5 text-xs text-python-yellow px-2.5 py-1 rounded-full bg-python-yellow/10 border border-python-yellow/20 font-mono animate-pulse">
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            <span>{statusMessage}</span>
          </div>
        )}
        {status === "error" && (
          <div className="flex items-center gap-1.5 text-xs text-red-400 px-2.5 py-1 rounded-full bg-red-500/10 border border-red-500/20 font-mono">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>{statusMessage}</span>
          </div>
        )}
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2">
        {/* Toggle File Explorer */}
        <button
          onClick={() => setShowFileExplorer(!showFileExplorer)}
          className={`p-2 rounded-lg text-xs font-medium border transition-colors ${
            showFileExplorer
              ? "bg-slate-800 border-python-blue text-white"
              : "bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200"
          }`}
          title="Toggle File Explorer"
        >
          <FolderOpen className="w-4 h-4" />
        </button>

        {/* Toggle Package Manager */}
        <button
          onClick={() => setShowPackageManager(!showPackageManager)}
          className={`p-2 rounded-lg text-xs font-medium border transition-colors ${
            showPackageManager
              ? "bg-slate-800 border-python-yellow text-white"
              : "bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200"
          }`}
          title="Toggle Package Manager (micropip)"
        >
          <Package className="w-4 h-4" />
        </button>

        {/* Download File */}
        <button
          onClick={onDownloadFile}
          className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white transition-colors"
          title="Download .py file"
        >
          <Download className="w-4 h-4" />
        </button>

        {/* Run Code Button */}
        <button
          onClick={onRunCode}
          disabled={!isEngineReady || isRunning}
          className="flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-python-blue to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 text-white rounded-lg text-xs font-bold shadow-md shadow-python-blue/20 transition-all active:scale-95"
          title="Execute script (Ctrl + Enter)"
        >
          {isRunning ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Play className="w-4 h-4 fill-white" />
          )}
          <span>{isRunning ? "Running..." : "Run Code"}</span>
          <span className="hidden sm:inline text-[10px] opacity-70 font-mono font-normal">
            (Ctrl+↵)
          </span>
        </button>
      </div>
    </header>
  );
}
