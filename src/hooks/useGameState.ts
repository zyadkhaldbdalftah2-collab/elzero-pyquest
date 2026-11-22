"use client";

import { useState, useEffect, useCallback } from "react";
import { UserProgress } from "@/types";
import {
  loadProgress,
  addXP as addXPStorage,
  markGameCompleted,
  isGameCompleted,
  markLessonCompleted as markLessonCompletedStorage,
} from "@/lib/storage";
import { useAuth } from "@/context/AuthContext";
import { syncProgressToSupabase } from "@/lib/supabase";
import confetti from "canvas-confetti";

export function useGameState(lessonId: number) {
  const { user } = useAuth();
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [xpAnimation, setXpAnimation] = useState(false);

  useEffect(() => {
    setProgress(loadProgress());
  }, []);

  const awardXP = useCallback(
    (amount: number, gameName: string) => {
      if (isGameCompleted(lessonId, gameName)) return;

      markGameCompleted(lessonId, gameName);
      const updated = addXPStorage(amount);
      setProgress(updated);

      // Trigger animation
      setXpAnimation(true);
      setTimeout(() => setXpAnimation(false), 500);

      // Confetti!
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 },
        colors: ["#3776AB", "#FFD43B", "#4ade80"],
      });

      // Cloud sync if user logged in
      if (user) {
        syncProgressToSupabase(user.id, updated);
      }
    },
    [lessonId, user]
  );

  const completeLesson = useCallback(() => {
    markLessonCompletedStorage(lessonId);
    const updated = loadProgress();
    setProgress(updated);
    if (user) {
      syncProgressToSupabase(user.id, updated);
    }
  }, [lessonId, user]);

  const checkCompleted = useCallback(
    (gameName: string) => {
      return isGameCompleted(lessonId, gameName);
    },
    [lessonId]
  );

  return { progress, awardXP, xpAnimation, checkCompleted, completeLesson };
}
