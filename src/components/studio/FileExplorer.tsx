"use client";

import React, { useState } from "react";
import {
  FileCode,
  Plus,
  Trash2,
  Edit2,
  Download,
  Check,
  X,
  FolderOpen,
} from "lucide-react";

export interface VirtualFile {
  id: string;
  name: string;
  content: string;
}

interface FileExplorerProps {
  files: VirtualFile[];
  activeFileId: string;
  onSelectFile: (id: string) => void;
  onCreateFile: (name: string) => void;
  onRenameFile: (id: string, newName: string) => void;
  onDeleteFile: (id: string) => void;
  onDownloadFile: (file: VirtualFile) => void;
}

export default function FileExplorer({
  files,
  activeFileId,
  onSelectFile,
  onCreateFile,
  onRenameFile,
  onDeleteFile,
  onDownloadFile,
}: FileExplorerProps) {
  const [isCreating, setIsCreating] = useState(false);
  const [newFileName, setNewFileName] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let name = newFileName.trim();
    if (!name) return;
    if (!name.endsWith(".py")) {
      name += ".py";
    }
    onCreateFile(name);
    setNewFileName("");
    setIsCreating(false);
  };

  const handleStartRename = (file: VirtualFile, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingId(file.id);
    setEditName(file.name);
  };

  const handleRenameSubmit = (id: string, e: React.FormEvent) => {
    e.preventDefault();
    let name = editName.trim();
    if (!name) return;
    if (!name.endsWith(".py")) {
      name += ".py";
    }
    onRenameFile(id, name);
    setEditingId(null);
  };

  return (
    <div className="flex flex-col h-full bg-slate-950 border-r border-slate-800 text-slate-300 w-64 select-none">
      {/* Explorer Header */}
      <div className="flex items-center justify-between px-3 py-2.5 border-b border-slate-800/80 bg-slate-900/60">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
          <FolderOpen className="w-3.5 h-3.5 text-python-yellow" />
          <span>Explorer</span>
        </div>
        <button
          onClick={() => setIsCreating(true)}
          className="p-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors"
          title="New Python File"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* New File Input */}
      {isCreating && (
        <form onSubmit={handleCreateSubmit} className="p-2 border-b border-slate-800 bg-slate-900/40">
          <div className="flex items-center gap-1">
            <input
              type="text"
              autoFocus
              value={newFileName}
              onChange={(e) => setNewFileName(e.target.value)}
              placeholder="filename.py"
              className="flex-1 px-2 py-1 bg-slate-950 border border-python-blue rounded text-xs font-fira text-slate-200 focus:outline-none"
            />
            <button
              type="submit"
              className="p-1 text-green-400 hover:bg-slate-800 rounded"
              title="Confirm"
            >
              <Check className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setIsCreating(false)}
              className="p-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded"
              title="Cancel"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>
      )}

      {/* File List */}
      <div className="flex-1 overflow-y-auto py-1">
        {files.map((file) => {
          const isActive = file.id === activeFileId;
          const isRenaming = editingId === file.id;

          if (isRenaming) {
            return (
              <form
                key={file.id}
                onSubmit={(e) => handleRenameSubmit(file.id, e)}
                className="px-2 py-1 flex items-center gap-1 bg-slate-900"
              >
                <input
                  type="text"
                  autoFocus
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="flex-1 px-1.5 py-0.5 bg-slate-950 border border-python-yellow rounded text-xs font-fira text-slate-200 focus:outline-none"
                />
                <button type="submit" className="p-1 text-green-400">
                  <Check className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setEditingId(null)}
                  className="p-1 text-slate-400"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </form>
            );
          }

          return (
            <div
              key={file.id}
              onClick={() => onSelectFile(file.id)}
              className={`group flex items-center justify-between px-3 py-1.5 text-xs font-fira cursor-pointer transition-colors ${
                isActive
                  ? "bg-slate-800/90 text-white font-medium border-l-2 border-python-blue"
                  : "hover:bg-slate-900/80 text-slate-400 hover:text-slate-200 border-l-2 border-transparent"
              }`}
            >
              <div className="flex items-center gap-2 truncate">
                <FileCode className={`w-3.5 h-3.5 shrink-0 ${isActive ? "text-python-yellow" : "text-slate-500"}`} />
                <span className="truncate">{file.name}</span>
              </div>

              {/* Action buttons on hover */}
              <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDownloadFile(file);
                  }}
                  className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-700/60"
                  title="Download .py"
                >
                  <Download className="w-3 h-3" />
                </button>
                <button
                  onClick={(e) => handleStartRename(file, e)}
                  className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-700/60"
                  title="Rename"
                >
                  <Edit2 className="w-3 h-3" />
                </button>
                {files.length > 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (confirm(`Delete "${file.name}"?`)) {
                        onDeleteFile(file.id);
                      }
                    }}
                    className="p-1 text-slate-400 hover:text-red-400 rounded hover:bg-slate-700/60"
                    title="Delete"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Info */}
      <div className="p-3 border-t border-slate-800/80 text-[11px] font-mono text-slate-500 flex items-center justify-between">
        <span>{files.length} Files</span>
        <span className="text-slate-600">Saved in LocalStorage</span>
      </div>
    </div>
  );
}
