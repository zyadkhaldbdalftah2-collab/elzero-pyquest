"use client";

import { UserProgress, getLevelFromXP } from "@/types";

const STORAGE_KEY = "elzero-pyquest-progress";

function getDefaultProgress(): UserProgress {
  return {
    xp: 0,
    level: 1,
    streak: 0,
    lastActiveDate: "",
    completedLessons: [],
    completedGames: {},
  };
}

export function loadProgress(): UserProgress {
  if (typeof window === "undefined") return getDefaultProgress();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getDefaultProgress();
    return JSON.parse(raw) as UserProgress;
  } catch {
    return getDefaultProgress();
  }
}

export function saveProgress(progress: UserProgress): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function addXP(amount: number): UserProgress {
  const progress = loadProgress();
  progress.xp += amount;
  progress.level = getLevelFromXP(progress.xp);

  // Update streak
  const today = new Date().toISOString().split("T")[0];
  if (progress.lastActiveDate !== today) {
    const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];
    if (progress.lastActiveDate === yesterday) {
      progress.streak += 1;
    } else if (progress.lastActiveDate !== today) {
      progress.streak = 1;
    }
    progress.lastActiveDate = today;
  }

  saveProgress(progress);
  return progress;
}

export function markGameCompleted(lessonId: number, gameName: string): void {
  const progress = loadProgress();
  const key = String(lessonId);
  if (!progress.completedGames[key]) {
    progress.completedGames[key] = [];
  }
  if (!progress.completedGames[key].includes(gameName)) {
    progress.completedGames[key].push(gameName);
  }
  saveProgress(progress);
}

export function markLessonCompleted(lessonId: number): void {
  const progress = loadProgress();
  if (!progress.completedLessons.includes(lessonId)) {
    progress.completedLessons.push(lessonId);
  }
  saveProgress(progress);
}

export function isGameCompleted(lessonId: number, gameName: string): boolean {
  const progress = loadProgress();
  const key = String(lessonId);
  return progress.completedGames[key]?.includes(gameName) ?? false;
}

// Generated lesson cache
const LESSON_CACHE_PREFIX = "elzero-pyquest-lesson-";

export function getCachedLesson(id: number): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(LESSON_CACHE_PREFIX + id);
}

export function setCachedLesson(id: number, data: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(LESSON_CACHE_PREFIX + id, data);
}
