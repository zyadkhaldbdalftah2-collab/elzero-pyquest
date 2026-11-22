"use client";

import React, { useState } from "react";
import { getVideoUrl } from "@/data/courseStructure";
import { Youtube, ExternalLink } from "lucide-react";

interface VideoPlayerProps {
  lessonId: number;
  titleEn?: string;
}

export default function VideoPlayer({ lessonId, titleEn }: VideoPlayerProps) {
  const [isLoading, setIsLoading] = useState(true);
  const videoSrc = getVideoUrl(lessonId);
  const watchUrl = `https://www.youtube.com/watch?v=&list=PLDoPjvoNmBAyE_gei5d18qkfIe-Z8mocs&index=${lessonId}`;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
      <div className="px-4 py-3 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Youtube className="w-5 h-5 text-red-500" />
          <span className="text-xs font-semibold text-slate-200">
            Official Course Video #{String(lessonId).padStart(3, "0")}
          </span>
        </div>
        <a
          href={watchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-slate-400 hover:text-python-yellow flex items-center gap-1 transition-colors"
        >
          <span>Open on YouTube</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      <div className="relative w-full aspect-video bg-black/60">
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950 text-slate-400 space-y-2">
            <div className="w-8 h-8 border-2 border-python-blue border-t-transparent rounded-full animate-spin" />
            <p className="text-xs font-mono">Loading Elzero Lesson #{lessonId}...</p>
          </div>
        )}
        <iframe
          src={videoSrc}
          title={titleEn || `Elzero Python Lesson #${lessonId}`}
          className="w-full h-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          onLoad={() => setIsLoading(false)}
        />
      </div>
    </div>
  );
}
