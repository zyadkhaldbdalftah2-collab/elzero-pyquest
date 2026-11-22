"use client";

import React, { useState, useEffect } from "react";
import { Key, Eye, EyeOff, X, Trash2, Check, ExternalLink, ShieldCheck } from "lucide-react";
import { getApiKey, setApiKey, removeApiKey } from "@/lib/storage";

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onKeySaved?: () => void;
}

export default function ApiKeyModal({
  isOpen,
  onClose,
  onKeySaved,
}: ApiKeyModalProps) {
  const [keyInput, setKeyInput] = useState("");
  const [showKey, setShowKey] = useState(false);
  const [hasExistingKey, setHasExistingKey] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const stored = getApiKey();
      if (stored) {
        setKeyInput(stored);
        setHasExistingKey(true);
      } else {
        setKeyInput("");
        setHasExistingKey(false);
      }
      setSavedSuccess(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    const trimmed = keyInput.trim();
    if (!trimmed) return;
    setApiKey(trimmed);
    setHasExistingKey(true);
    setSavedSuccess(true);
    onKeySaved?.();
    setTimeout(() => {
      onClose();
    }, 1000);
  };

  const handleRemove = () => {
    removeApiKey();
    setKeyInput("");
    setHasExistingKey(false);
    setSavedSuccess(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden animate-fadeIn">
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-python-yellow/15 border border-python-yellow/30 text-python-yellow">
              <Key className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white font-inter">
                Gemini API Key
              </h3>
              <p className="text-xs text-slate-400 font-inter">
                Auto-generate lessons #006 to #152
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-4">
          <div className="flex items-start gap-2.5 p-3 rounded-xl bg-blue-950/30 border border-blue-900/40 text-xs text-blue-200 font-inter">
            <ShieldCheck className="w-4 h-4 text-python-blue shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              Your key is stored <strong>locally in your browser</strong> (localStorage). It is never logged or stored on any server.
            </p>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 font-inter flex items-center justify-between">
              <span>Google Gemini API Key:</span>
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noopener noreferrer"
                className="text-python-yellow hover:underline flex items-center gap-1 text-[11px] font-normal"
              >
                <span>Get Free Key</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </label>
            <div className="relative">
              <input
                type={showKey ? "text" : "password"}
                value={keyInput}
                onChange={(e) => setKeyInput(e.target.value)}
                placeholder="AIzaSy..."
                className="w-full pl-3 pr-10 py-2.5 bg-slate-950 border border-slate-800 rounded-xl font-fira text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-python-blue transition-colors"
                dir="ltr"
              />
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 p-0.5"
              >
                {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {savedSuccess && (
            <div className="flex items-center gap-2 text-xs text-green-400 font-medium">
              <Check className="w-4 h-4" />
              <span>Key saved successfully!</span>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
          {hasExistingKey ? (
            <button
              onClick={handleRemove}
              className="flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 px-3 py-1.5 rounded-lg hover:bg-red-950/30 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear Key</span>
            </button>
          ) : (
            <div />
          )}

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={!keyInput.trim()}
              className="px-5 py-2 text-xs font-bold text-white bg-python-blue hover:bg-blue-600 disabled:opacity-50 rounded-xl shadow-md transition-colors"
            >
              Save Key
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
