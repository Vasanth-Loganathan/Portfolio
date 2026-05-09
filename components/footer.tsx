'use client';

import { ArrowUp } from 'lucide-react';

export default function Footer() {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 px-6 bg-background border-t border-border">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          · Built with ❤️ by Vasanth Logu  · {currentYear}
        </p>
        <button
          onClick={handleScrollToTop}
          className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors group"
          aria-label="Back to top"
        >
          <span className="text-sm font-medium">Back to top</span>
          <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
        </button>
      </div>
    </footer>
  );
}
