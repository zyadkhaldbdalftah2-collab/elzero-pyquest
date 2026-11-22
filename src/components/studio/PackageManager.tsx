"use client";

import React, { useState } from "react";
import { Package, Download, CheckCircle2, Loader2, Sparkles, Plus } from "lucide-react";

interface PackageManagerProps {
  installedPackages: string[];
  isInstalling: boolean;
  installMessage: string | null;
  onInstallPackage: (name: string) => Promise<boolean>;
}

const POPULAR_PACKAGES = [
  {
    name: "numpy",
    desc: "Scientific computing & multidimensional arrays",
    badge: "Official Wheel",
  },
  {
    name: "pandas",
    desc: "Data analysis, manipulation & DataFrames",
    badge: "Official Wheel",
  },
  {
    name: "matplotlib",
    desc: "Comprehensive plotting and visualization",
    badge: "Official Wheel",
  },
  {
    name: "beautifulsoup4",
    desc: "HTML and XML web scraping library",
    badge: "micropip",
  },
];

export default function PackageManager({
  installedPackages,
  isInstalling,
  installMessage,
  onInstallPackage,
}: PackageManagerProps) {
  const [customPkg, setCustomPkg] = useState("");

  const handleCustomInstall = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customPkg.trim() || isInstalling) return;
    const ok = await onInstallPackage(customPkg.trim());
    if (ok) setCustomPkg("");
  };

  return (
    <div className="flex flex-col h-full bg-slate-950 border-r border-slate-800 text-slate-300 w-72 select-none overflow-y-auto">
      {/* Header */}
      <div className="px-4 py-3 border-b border-slate-800 bg-slate-900/60 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
          <Package className="w-4 h-4 text-python-blue" />
          <span>Package Manager (micropip)</span>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Status banner */}
        {installMessage && (
          <div className="p-2.5 rounded-lg bg-blue-950/40 border border-blue-900/50 text-xs text-blue-200 flex items-center gap-2">
            {isInstalling && <Loader2 className="w-3.5 h-3.5 animate-spin text-python-yellow shrink-0" />}
            <span className="truncate">{installMessage}</span>
          </div>
        )}

        {/* Custom package install input */}
        <form onSubmit={handleCustomInstall} className="space-y-1.5">
          <label className="text-[11px] font-mono text-slate-400">
            Install custom package from PyPI:
          </label>
          <div className="flex items-center gap-1.5">
            <input
              type="text"
              value={customPkg}
              onChange={(e) => setCustomPkg(e.target.value)}
              placeholder="e.g. sympy, regex"
              disabled={isInstalling}
              className="flex-1 px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs font-fira text-slate-200 focus:outline-none focus:border-python-blue"
            />
            <button
              type="submit"
              disabled={isInstalling || !customPkg.trim()}
              className="px-3 py-1.5 bg-python-blue hover:bg-blue-600 disabled:opacity-40 text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
          </div>
        </form>

        {/* 1-Click Popular Packages */}
        <div className="space-y-2 pt-2">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-300">
            <Sparkles className="w-3.5 h-3.5 text-python-yellow" />
            <span>Popular Libraries (1-Click)</span>
          </div>

          <div className="space-y-2">
            {POPULAR_PACKAGES.map((pkg) => {
              const isInstalled = installedPackages.includes(pkg.name);

              return (
                <div
                  key={pkg.name}
                  className="p-3 rounded-xl border border-slate-800 bg-slate-900/50 space-y-1.5 hover:border-slate-700 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-fira text-xs font-bold text-white">
                      {pkg.name}
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                      {pkg.badge}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-400 leading-snug">
                    {pkg.desc}
                  </p>

                  <div className="pt-1 flex justify-end">
                    {isInstalled ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-green-400">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Installed</span>
                      </span>
                    ) : (
                      <button
                        onClick={() => onInstallPackage(pkg.name)}
                        disabled={isInstalling}
                        className="flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 hover:border-python-blue transition-colors disabled:opacity-50"
                      >
                        <Download className="w-3 h-3" />
                        <span>Install</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Installed summary */}
        {installedPackages.length > 0 && (
          <div className="pt-2 border-t border-slate-800/80">
            <p className="text-[11px] font-mono text-slate-400 mb-1.5">
              Installed in runtime ({installedPackages.length}):
            </p>
            <div className="flex flex-wrap gap-1">
              {installedPackages.map((p) => (
                <span
                  key={p}
                  className="px-2 py-0.5 rounded-full bg-green-500/10 text-green-400 border border-green-500/20 text-[10px] font-fira"
                >
                  {p}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
