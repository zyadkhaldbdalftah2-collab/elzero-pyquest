"use client";

import React from "react";
import { UserProgress, getLevelFromXP, getXPForNextLevel } from "@/types";
import { Trophy, Flame, Zap, Award } from "lucide-react";

interface GamificationBarProps {
  progress: UserProgress | null;
  xpAnimation?: boolean;
}

export default function GamificationBar({
  progress,
  xpAnimation = false,
}: GamificationBarProps) {
  const xp = progress?.xp ?? 0;
  const level = progress?.level ?? getLevelFromXP(xp);
  const streak = progress?.streak ?? 0;

  const currentLevelBaseXP = (level - 1) * 100;
  const nextLevelXP = getXPForNextLevel(level);
  const progressInLevel = xp - currentLevelBaseXP;
  const percentToNextLevel = Math.min(100, Math.max(0, (progressInLevel / 100) * 100));

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-lg flex flex-col md:flex-row items-center justify-between gap-4">
      {/* Stats Badges */}
      <div className="flex items-center gap-4 sm:gap-6 w-full md:w-auto justify-around md:justify-start">
        {/* XP Counter */}
        <div
          className={`flex items-center gap-2.5 transition-transform ${
            xpAnimation ? "scale-110 text-python-yellow" : ""
          }`}
        >
          <div className="w-10 h-10 rounded-xl bg-python-yellow/15 border border-python-yellow/30 flex items-center justify-center text-python-yellow shadow-inner">
            <Zap className="w-5 h-5 fill-python-yellow" />
          </div>
          <div>
            <div className="text-[11px] font-mono uppercase text-slate-400">
              Total XP
            </div>
            <div className="text-base font-extrabold text-white font-fira tracking-tight">
              {xp} <span className="text-xs text-python-yellow">pts</span>
            </div>
          </div>
        </div>

        {/* Level Badge */}
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-python-blue/15 border border-python-blue/30 flex items-center justify-center text-python-blue shadow-inner">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] font-mono uppercase text-slate-400">
              Rank
            </div>
            <div className="text-base font-extrabold text-white font-inter">
              Level {level}
            </div>
          </div>
        </div>

        {/* Streak */}
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-orange-500/15 border border-orange-500/30 flex items-center justify-center text-orange-400 shadow-inner">
            <Flame className="w-5 h-5 fill-orange-400" />
          </div>
          <div>
            <div className="text-[11px] font-mono uppercase text-slate-400">
              Streak
            </div>
            <div className="text-base font-extrabold text-white font-inter">
              {streak} {streak === 1 ? "day" : "days"}
            </div>
          </div>
        </div>
      </div>

      {/* Level Progress Bar */}
      <div className="w-full md:w-64 space-y-1.5">
        <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
          <span className="flex items-center gap-1">
            <Award className="w-3 h-3 text-python-blue" />
            Lvl {level} Progress
          </span>
          <span className="text-slate-300 font-bold">{progressInLevel}/100 XP</span>
        </div>
        <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800">
          <div
            className="h-full bg-gradient-to-r from-python-blue to-python-yellow rounded-full transition-all duration-500 ease-out"
            style={{ width: `${percentToNextLevel}%` }}
          />
        </div>
      </div>
    </div>
  );
}
