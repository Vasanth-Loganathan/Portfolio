'use client';

import { useEffect, useRef, useCallback } from 'react';
import { X, ExternalLink, Github } from 'lucide-react';

export interface Project {
  id: number;
  title: string;
  shortDesc: string;
  longDesc: string;
  tags: string[];
  github: string;
  live: string;
}

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const isOpen = project !== null;

  /* ── Scroll lock ───────────────────────────────────────────────────── */
  useEffect(() => {
    if (!isOpen) return;
    const body = document.body;
    const originalOverflow = body.style.overflow;
    body.style.overflow = 'hidden';
    return () => {
      body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  /* ── Focus: move into modal on open, back on close ─────────────────── */
  useEffect(() => {
    if (isOpen) {
      // slight delay lets the animation start before stealing focus
      const id = setTimeout(() => closeButtonRef.current?.focus(), 60);
      return () => clearTimeout(id);
    }
  }, [isOpen]);

  /* ── Escape key ─────────────────────────────────────────────────────── */
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  /* ── Focus trap ─────────────────────────────────────────────────────── */
  const trapFocus = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'Tab' || !panelRef.current) return;
    const focusable = Array.from(
      panelRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      ),
    ).filter((el) => !el.hasAttribute('disabled'));
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey) {
      if (document.activeElement === first) { e.preventDefault(); last.focus(); }
    } else {
      if (document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  }, []);

  if (!project) return null;

  return (
    <>
      {/* Inject animation keyframes once per mount */}
      <style>{`
        @keyframes pmFadeIn   { from { opacity:0 } to { opacity:1 } }
        @keyframes pmScaleIn  { from { opacity:0; transform:scale(.96) translateY(10px) } to { opacity:1; transform:scale(1) translateY(0) } }
        @keyframes pmSlideUp  { from { opacity:0; transform:translateY(100%) } to { opacity:1; transform:translateY(0) } }
        .pm-backdrop { animation: pmFadeIn 200ms ease-out forwards }
        @media (min-width:768px) { .pm-panel { animation: pmScaleIn 250ms ease-out forwards } }
        @media (max-width:767px) { .pm-panel { animation: pmSlideUp 280ms ease-out forwards } }
      `}</style>

      {/* ── Backdrop ── */}
      <div
        className="pm-backdrop fixed inset-0 z-[100]"
        style={{ backgroundColor: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)' }}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* ── Centering wrapper (pointer-events-none so clicks miss the panel hit the backdrop) ── */}
      <div className="fixed inset-0 z-[101] flex items-end md:items-center justify-center md:p-6 pointer-events-none">

        {/* ── Modal panel ── */}
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="pm-title"
          onKeyDown={trapFocus}
          className="pm-panel pointer-events-auto w-full md:max-w-[720px] max-h-[90vh] md:max-h-[85vh] overflow-y-auto bg-card border border-border rounded-t-2xl md:rounded-2xl shadow-2xl flex flex-col"
        >
          {/* ── HEADER ── */}
          <div className="flex items-start justify-between gap-4 p-6 pb-4 flex-shrink-0">
            <h2
              id="pm-title"
              className="font-bold text-foreground leading-snug"
              style={{ fontSize: '22px' }}
            >
              {project.title}
            </h2>
            <button
              ref={closeButtonRef}
              onClick={onClose}
              aria-label="Close project details"
              className="flex-shrink-0 mt-0.5 w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Divider */}
          <div className="h-px bg-border mx-6 flex-shrink-0" />

          {/* ── BODY (scrolls if needed) ── */}
          <div className="p-6 space-y-6 flex-1 min-h-0 overflow-y-auto">
            {/* Tech Stack */}
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">
                Tech Stack
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 bg-accent/10 text-accent text-xs font-medium rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Long description */}
            <p
              className="text-muted-foreground"
              style={{ fontSize: '15px', lineHeight: '1.8' }}
            >
              {project.longDesc}
            </p>
          </div>

          {/* ── FOOTER ACTIONS ── */}
          <div className="flex gap-3 p-6 pt-4 flex-shrink-0 border-t border-border/50">
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 px-3 py-2 border border-accent/40 hover:border-accent hover:bg-accent/10 text-foreground text-sm font-medium rounded transition-all flex items-center justify-center gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                View Live Demo
              </a>
            )}
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 px-3 py-2 border border-accent/40 hover:border-accent hover:bg-accent/10 text-foreground text-sm font-medium rounded transition-all flex items-center justify-center gap-2"
            >
              <Github className="w-4 h-4" />
              View on GitHub
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
