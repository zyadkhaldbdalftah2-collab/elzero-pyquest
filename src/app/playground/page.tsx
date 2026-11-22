"use client";

import React, { useState, useEffect, useCallback, Suspense } from "react";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import EditorToolbar from "@/components/studio/EditorToolbar";
import FileExplorer, { VirtualFile } from "@/components/studio/FileExplorer";
import PackageManager from "@/components/studio/PackageManager";
import ConsoleOutput from "@/components/studio/ConsoleOutput";
import { usePyodide, ExecutionResult } from "@/hooks/usePyodide";
import { Loader2, AlertCircle } from "lucide-react";

// Dynamically import Monaco Editor to prevent any SSR hydration mismatch
const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
  loading: () => (
    <div className="flex-1 flex flex-col items-center justify-center bg-slate-950 text-slate-500 gap-2 font-mono text-xs">
      <Loader2 className="w-6 h-6 animate-spin text-python-blue" />
      <span>Loading Monaco Editor (VS Code)...</span>
    </div>
  ),
});

const DEFAULT_CODE = `# ==========================================
# Elzero PyQuest – Python Studio
# Real Python 3.12 Execution (Pyodide Wasm)
# ==========================================

def greet_developer(name, track="Mastering Python"):
    print(f"\\n🐍 Hello, {name}!")
    print(f"🚀 Welcome to Elzero PyQuest: {track}")

greet_developer("Osama Elzero Student")

# Try lists, math, or interactive input()
numbers = [x ** 2 for x in range(1, 6)]
print(f"Squared numbers: {numbers}")

# Uncomment below to test input dialog:
# user_lang = input("What is your favorite programming language? ")
# print(f"Awesome choice: {user_lang}")
`;

const STORAGE_FILES_KEY = "pyquest_studio_files";
const STORAGE_ACTIVE_KEY = "pyquest_studio_active_file";

function PlaygroundContent() {
  const searchParams = useSearchParams();

  // Pyodide Hook
  const {
    status,
    statusMessage,
    errorDetails,
    runCode,
    installPackage,
    installedPackages,
    isInstallingPackage,
    packageInstallMessage,
  } = usePyodide();

  // Virtual Files State
  const [files, setFiles] = useState<VirtualFile[]>([
    { id: "file_main", name: "main.py", content: DEFAULT_CODE },
  ]);
  const [activeFileId, setActiveFileId] = useState<string>("file_main");

  // UI Panels
  const [showFileExplorer, setShowFileExplorer] = useState(true);
  const [showPackageManager, setShowPackageManager] = useState(false);

  // Execution State
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState<ExecutionResult | null>(null);

  // Load files from localStorage & handle ?code= query param
  useEffect(() => {
    try {
      const savedFiles = localStorage.getItem(STORAGE_FILES_KEY);
      const savedActive = localStorage.getItem(STORAGE_ACTIVE_KEY);

      let currentFiles: VirtualFile[] = [
        { id: "file_main", name: "main.py", content: DEFAULT_CODE },
      ];

      if (savedFiles) {
        const parsed = JSON.parse(savedFiles);
        if (Array.isArray(parsed) && parsed.length > 0) {
          currentFiles = parsed;
        }
      }

      // Check URL query param ?code= or session storage
      const codeQuery = searchParams.get("code");
      const sessionSnippet = sessionStorage.getItem("pyquest_try_code");

      const snippetToLoad = codeQuery || sessionSnippet;

      if (snippetToLoad) {
        // Clear session snippet so it doesn't repeatedly overwrite
        if (sessionSnippet) {
          sessionStorage.removeItem("pyquest_try_code");
        }

        const snippetFile: VirtualFile = {
          id: `snippet_${Date.now()}`,
          name: "snippet.py",
          content: decodeURIComponent(snippetToLoad),
        };

        currentFiles = [snippetFile, ...currentFiles];
        setFiles(currentFiles);
        setActiveFileId(snippetFile.id);
        localStorage.setItem(STORAGE_FILES_KEY, JSON.stringify(currentFiles));
        localStorage.setItem(STORAGE_ACTIVE_KEY, snippetFile.id);
        return;
      }

      setFiles(currentFiles);

      if (savedActive && currentFiles.some((f) => f.id === savedActive)) {
        setActiveFileId(savedActive);
      } else {
        setActiveFileId(currentFiles[0].id);
      }
    } catch (e) {
      console.error("Failed to load studio files from localStorage:", e);
    }
  }, [searchParams]);

  // Persist files to localStorage
  const updateFiles = useCallback(
    (newFiles: VirtualFile[], newActiveId?: string) => {
      setFiles(newFiles);
      localStorage.setItem(STORAGE_FILES_KEY, JSON.stringify(newFiles));
      if (newActiveId) {
        setActiveFileId(newActiveId);
        localStorage.setItem(STORAGE_ACTIVE_KEY, newActiveId);
      }
    },
    []
  );

  const activeFile = files.find((f) => f.id === activeFileId) || files[0];

  const handleEditorChange = (value: string | undefined) => {
    if (value === undefined) return;
    const updated = files.map((f) =>
      f.id === activeFileId ? { ...f, content: value } : f
    );
    setFiles(updated);
    localStorage.setItem(STORAGE_FILES_KEY, JSON.stringify(updated));
  };

  const handleCreateFile = (name: string) => {
    const newFile: VirtualFile = {
      id: `file_${Date.now()}`,
      name,
      content: `# ${name}\n\nprint("Running ${name}...")\n`,
    };
    updateFiles([...files, newFile], newFile.id);
  };

  const handleRenameFile = (id: string, newName: string) => {
    const updated = files.map((f) => (f.id === id ? { ...f, name: newName } : f));
    updateFiles(updated);
  };

  const handleDeleteFile = (id: string) => {
    if (files.length <= 1) return;
    const remaining = files.filter((f) => f.id !== id);
    const nextActive = id === activeFileId ? remaining[0].id : activeFileId;
    updateFiles(remaining, nextActive);
  };

  const handleDownloadFile = (file: VirtualFile = activeFile) => {
    const blob = new Blob([file.content], { type: "text/x-python" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleRunCode = useCallback(async () => {
    if (isRunning || !activeFile) return;
    setIsRunning(true);
    const execResult = await runCode(activeFile.content);
    setResult(execResult);
    setIsRunning(false);
  }, [isRunning, activeFile, runCode]);

  // Keyboard shortcut: Ctrl+Enter / Cmd+Enter to run code
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        handleRunCode();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleRunCode]);

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-slate-950 text-slate-200">
      {/* Top VS Code Style Toolbar */}
      <EditorToolbar
        status={status}
        statusMessage={statusMessage}
        isRunning={isRunning}
        activeFileName={activeFile ? activeFile.name : "main.py"}
        onRunCode={handleRunCode}
        onClearConsole={() => setResult(null)}
        onDownloadFile={() => handleDownloadFile(activeFile)}
        showFileExplorer={showFileExplorer}
        setShowFileExplorer={setShowFileExplorer}
        showPackageManager={showPackageManager}
        setShowPackageManager={setShowPackageManager}
      />

      {/* Error state if Pyodide CDN completely fails */}
      {status === "error" && (
        <div className="p-3 bg-red-950/80 border-b border-red-900 text-xs text-red-200 flex items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>
              <strong>Pyodide Error:</strong> {errorDetails || "Could not load WebAssembly engine."}
            </span>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="px-3 py-1 rounded bg-red-900 hover:bg-red-800 text-white font-semibold transition-colors"
          >
            Retry
          </button>
        </div>
      )}

      {/* Main Workspace Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Virtual File Explorer Sidebar */}
        {showFileExplorer && (
          <FileExplorer
            files={files}
            activeFileId={activeFileId}
            onSelectFile={(id) => setActiveFileId(id)}
            onCreateFile={handleCreateFile}
            onRenameFile={handleRenameFile}
            onDeleteFile={handleDeleteFile}
            onDownloadFile={handleDownloadFile}
          />
        )}

        {/* Package Manager Sidebar */}
        {showPackageManager && (
          <PackageManager
            installedPackages={installedPackages}
            isInstalling={isInstallingPackage}
            installMessage={packageInstallMessage}
            onInstallPackage={installPackage}
          />
        )}

        {/* Center: Monaco Editor & Output Terminal */}
        <div className="flex-1 flex flex-col min-w-0 bg-slate-950">
          {/* File Tab Strip */}
          <div className="flex items-center bg-slate-950 border-b border-slate-800/80 overflow-x-auto select-none">
            {files.map((f) => {
              const isActive = f.id === activeFileId;
              return (
                <button
                  key={f.id}
                  onClick={() => setActiveFileId(f.id)}
                  className={`flex items-center gap-2 px-4 py-2 text-xs font-fira border-r border-slate-800 transition-colors shrink-0 ${
                    isActive
                      ? "bg-slate-900 text-python-yellow font-semibold border-t-2 border-t-python-blue"
                      : "bg-slate-950 text-slate-500 hover:text-slate-300 hover:bg-slate-900/40 border-t-2 border-t-transparent"
                  }`}
                >
                  <span>{f.name}</span>
                </button>
              );
            })}
          </div>

          {/* Monaco Editor Canvas */}
          <div className="flex-1 min-h-[300px] relative bg-[#1e1e1e]">
            {activeFile && (
              <MonacoEditor
                height="100%"
                language="python"
                theme="vs-dark"
                value={activeFile.content}
                onChange={handleEditorChange}
                options={{
                  fontSize: 13,
                  fontFamily: "'Fira Code', 'Courier New', monospace",
                  fontLigatures: true,
                  minimap: { enabled: false },
                  automaticLayout: true,
                  lineNumbers: "on",
                  bracketPairColorization: { enabled: true },
                  autoIndent: "full",
                  formatOnPaste: true,
                  scrollBeyondLastLine: false,
                  cursorBlinking: "smooth",
                  renderWhitespace: "none",
                  tabSize: 4,
                  insertSpaces: true,
                }}
              />
            )}
          </div>

          {/* Bottom Console Terminal */}
          <div className="h-56 min-h-[160px] max-h-[50vh]">
            <ConsoleOutput
              result={result}
              isRunning={isRunning}
              onClear={() => setResult(null)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PlaygroundPage() {
  return (
    <Suspense
      fallback={
        <div className="h-screen w-screen flex items-center justify-center bg-slate-950 text-slate-400 font-mono text-xs gap-2">
          <Loader2 className="w-5 h-5 animate-spin text-python-blue" />
          <span>Opening Python Studio...</span>
        </div>
      }
    >
      <PlaygroundContent />
    </Suspense>
  );
}
