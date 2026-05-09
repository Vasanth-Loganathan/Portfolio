'use client';

import { useState } from 'react';

interface LiveStatusBadgeProps {
  onContactClick: () => void;
}

export default function LiveStatusBadge({ onContactClick }: LiveStatusBadgeProps) {
  return (
    <button
      onClick={onContactClick}
      className="inline-flex items-center gap-3 px-4 py-2 border border-accent/30 rounded-full hover:border-accent/60 transition-all duration-300 hover:bg-accent/5 group cursor-pointer"
    >
      <div className="relative w-2 h-2">
        <div className="absolute inset-0 bg-green-500 rounded-full animate-pulse" />
        <div className="absolute inset-0 bg-green-500 rounded-full opacity-30" />
      </div>
      <span className="text-sm font-medium text-foreground group-hover:text-accent transition-colors">
        Open to Work
      </span>
    </button>
  );
}
