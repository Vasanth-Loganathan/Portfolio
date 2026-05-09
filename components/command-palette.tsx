'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import {
  Search,
  X,
  Command,
  User,
  Code2,
  FolderOpen,
  Briefcase,
  Mail,
  Download,
  Eye,
  Github,
  Linkedin,
  Sun,
  Moon,
  ArrowRight,
  Twitter,
} from 'lucide-react';
import { viewResume, downloadResume } from '@/lib/resume';

/* ─── Types ─────────────────────────────────────────────────────────────── */
interface CommandAction {
  id: string;
  label: string;
  description?: string;
  category: string;
  icon: React.ElementType;
  shortcut?: string;
  action: () => void;
}

/* ─── Helper: scroll to section ─────────────────────────────────────────── */
function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

/* ─── Component ─────────────────────────────────────────────────────────── */
export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isDark, setIsDark] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const selectedRef = useRef<HTMLButtonElement>(null);

  /* Keep isDark in sync with the actual DOM */
  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'));
  }, [isOpen]);

  const open = useCallback(() => {
    setIsOpen(true);
    setSearch('');
    setSelectedIndex(0);
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  /* ─── Actions ─────────────────────────────────────────────────────────── */
  const actions: CommandAction[] = [
    /* Navigation */
    {
      id: 'about',
      label: 'About Me',
      description: 'Background, skills & story',
      category: 'Navigate',
      icon: User,
      action: () => { scrollTo('about-section'); close(); },
    },
    {
      id: 'skills',
      label: 'Skills',
      description: 'Languages, frameworks & tools',
      category: 'Navigate',
      icon: Code2,
      action: () => { scrollTo('skills'); close(); },
    },
    {
      id: 'projects',
      label: 'Projects',
      description: 'Things I\'ve built',
      category: 'Navigate',
      icon: FolderOpen,
      action: () => { scrollTo('projects'); close(); },
    },
    {
      id: 'experience',
      label: 'Experience',
      description: 'Education & internship history',
      category: 'Navigate',
      icon: Briefcase,
      action: () => { scrollTo('experience'); close(); },
    },
    {
      id: 'contact',
      label: 'Contact',
      description: 'Get in touch',
      category: 'Navigate',
      icon: Mail,
      action: () => { scrollTo('contact'); close(); },
    },
    /* Actions */
    {
      id: 'view-resume',
      label: 'View Resume',
      description: 'Open resume PDF in a new tab',
      category: 'Actions',
      icon: Eye,
      action: () => { viewResume(); close(); },
    },
    {
      id: 'resume',
      label: 'Download Resume',
      description: 'Save resume PDF to your device',
      category: 'Actions',
      icon: Download,
      action: () => { downloadResume(); close(); },
    },
    {
      id: 'theme',
      label: isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode',
      description: 'Toggle colour scheme',
      category: 'Actions',
      icon: isDark ? Sun : Moon,
      action: () => {
        const html = document.documentElement;
        const dark = html.classList.toggle('dark');
        localStorage.setItem('theme', dark ? 'dark' : 'light');
        setIsDark(dark);
        close();
      },
    },
    /* Social */
    {
      id: 'github',
      label: 'GitHub',
      description: 'github.com/Vasanth-Loganathan',
      category: 'Social',
      icon: Github,
      action: () => { window.open('https://github.com/Vasanth-Loganathan', '_blank'); close(); },
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      description: 'linkedin.com/in/vasanthloganathan',
      category: 'Social',
      icon: Linkedin,
      action: () => { window.open('https://linkedin.com/in/vasanthloganathan/', '_blank'); close(); },
    },
    {
      id: 'twitter',
      label: 'Twitter / X',
      description: '@vasanth_5556',
      category: 'Social',
      icon: Twitter,
      action: () => { window.open('https://x.com/vasanth_5556', '_blank'); close(); },
    },
    {
      id: 'email',
      label: 'Send Email',
      description: 'vasanthloganthan5657@gmail.com',
      category: 'Social',
      icon: Mail,
      action: () => { window.location.href = 'mailto:vasanthloganthan5657@gmail.com'; close(); },
    },
  ];

  /* ─── Filtering ───────────────────────────────────────────────────────── */
  const filtered = search.trim()
    ? actions.filter(
        (a) =>
          a.label.toLowerCase().includes(search.toLowerCase()) ||
          a.description?.toLowerCase().includes(search.toLowerCase()) ||
          a.category.toLowerCase().includes(search.toLowerCase()),
      )
    : actions;

  /* Group by category */
  const grouped = filtered.reduce<Record<string, CommandAction[]>>((acc, action) => {
    (acc[action.category] ??= []).push(action);
    return acc;
  }, {});

  /* Flat list for keyboard nav */
  const flat = Object.values(grouped).flat();

  /* ─── Keyboard handler ───────────────────────────────────────────────── */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); isOpen ? close() : open(); }
      if (!isOpen) return;
      if (e.key === 'Escape') { close(); return; }
      if (e.key === 'ArrowDown') { e.preventDefault(); setSelectedIndex((p) => (p + 1) % flat.length); }
      if (e.key === 'ArrowUp')   { e.preventDefault(); setSelectedIndex((p) => (p - 1 + flat.length) % flat.length); }
      if (e.key === 'Enter')     { e.preventDefault(); flat[selectedIndex]?.action(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, flat, selectedIndex, open, close]);

  /* Auto-focus input */
  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 40);
  }, [isOpen]);

  /* Reset selection when filter changes */
  useEffect(() => { setSelectedIndex(0); }, [search]);

  /* Scroll selected item into view */
  useEffect(() => {
    selectedRef.current?.scrollIntoView({ block: 'nearest' });
  }, [selectedIndex]);

  /* ─── Render ─────────────────────────────────────────────────────────── */
  return (
    <>
      {/* Trigger button */}
      <button
        onClick={open}
        className="inline-flex items-center justify-center p-2 rounded-full hover:bg-accent/10 hover:text-accent transition-all duration-200 text-muted-foreground"
        title="Open command palette (Ctrl+K)"
        aria-label="Open command palette"
      >
        <Command className="w-5 h-5" />
      </button>

      {/* Overlay */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm"
            onClick={close}
            aria-hidden="true"
            style={{ animation: 'cpFadeIn 150ms ease-out' }}
          />

          {/* Palette panel */}
          <div
            className="fixed inset-0 z-[201] flex items-start justify-center pt-[15vh] px-4 pointer-events-none"
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
          >
            <div
              className="pointer-events-auto w-full max-w-[560px] rounded-xl border border-border bg-card shadow-2xl overflow-hidden flex flex-col"
              style={{ animation: 'cpSlideIn 180ms ease-out', maxHeight: '65vh' }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* ── Search bar ── */}
              <div className="flex items-center gap-3 px-4 py-3.5 border-b border-border flex-shrink-0">
                <Search className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search commands…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-sm text-foreground placeholder:text-muted-foreground/60"
                  aria-autocomplete="list"
                />
                {search && (
                  <button
                    onClick={() => setSearch('')}
                    className="p-1 rounded hover:bg-muted text-muted-foreground transition-colors"
                    aria-label="Clear search"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
                <button
                  onClick={close}
                  className="p-1 rounded hover:bg-muted text-muted-foreground transition-colors sm:hidden"
                  aria-label="Close command palette"
                >
                  <X className="w-4 h-4" />
                </button>
                <button
                  onClick={close}
                  className="hidden sm:flex items-center gap-1 px-2 py-0.5 text-[10px] font-mono border border-border rounded text-muted-foreground hover:bg-muted/50 transition-colors"
                  aria-label="Close command palette"
                >
                  ESC
                </button>
              </div>

              {/* ── Results ── */}
              <div ref={listRef} className="overflow-y-auto flex-1 py-2" role="listbox">
                {flat.length === 0 ? (
                  <div className="px-4 py-10 text-center text-muted-foreground text-sm">
                    No results for &ldquo;<span className="text-foreground">{search}</span>&rdquo;
                  </div>
                ) : (
                  Object.entries(grouped).map(([category, items]) => (
                    <div key={category}>
                      {/* Category label */}
                      <p className="px-4 pt-3 pb-1 text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">
                        {category}
                      </p>

                      {items.map((action) => {
                        const globalIdx = flat.indexOf(action);
                        const isSelected = globalIdx === selectedIndex;
                        const Icon = action.icon;

                        return (
                          <button
                            key={action.id}
                            ref={isSelected ? selectedRef : undefined}
                            role="option"
                            aria-selected={isSelected}
                            onClick={action.action}
                            onMouseEnter={() => setSelectedIndex(globalIdx)}
                            className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors duration-100 ${
                              isSelected
                                ? 'bg-accent/10 text-foreground'
                                : 'text-muted-foreground hover:text-foreground'
                            }`}
                          >
                            {/* Icon container */}
                            <span
                              className={`flex-shrink-0 w-7 h-7 rounded-md flex items-center justify-center transition-colors ${
                                isSelected ? 'bg-accent/20 text-accent' : 'bg-muted/60 text-muted-foreground'
                              }`}
                            >
                              <Icon className="w-3.5 h-3.5" />
                            </span>

                            {/* Text */}
                            <span className="flex-1 min-w-0">
                              <span className={`block text-sm font-medium ${isSelected ? 'text-foreground' : ''}`}>
                                {action.label}
                              </span>
                              {action.description && (
                                <span className="block text-xs text-muted-foreground truncate">
                                  {action.description}
                                </span>
                              )}
                            </span>

                            {/* Shortcut or arrow */}
                            {action.shortcut ? (
                              <kbd className="flex-shrink-0 px-2 py-0.5 text-[10px] font-mono border border-border rounded text-muted-foreground bg-muted/50">
                                {action.shortcut}
                              </kbd>
                            ) : (
                              <ArrowRight
                                className={`flex-shrink-0 w-3.5 h-3.5 transition-all duration-100 ${
                                  isSelected ? 'opacity-100 text-accent translate-x-0' : 'opacity-0 -translate-x-1'
                                }`}
                              />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  ))
                )}
              </div>

              {/* ── Footer hints ── */}
              <div className="flex items-center gap-4 px-4 py-2.5 border-t border-border bg-muted/30 flex-shrink-0">
                <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                  <kbd className="px-1.5 py-0.5 bg-muted border border-border rounded text-[10px] font-mono">↑↓</kbd>
                  navigate
                </span>
                <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                  <kbd className="px-1.5 py-0.5 bg-muted border border-border rounded text-[10px] font-mono">↵</kbd>
                  select
                </span>
                <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                  <kbd className="px-1.5 py-0.5 bg-muted border border-border rounded text-[10px] font-mono">esc</kbd>
                  close
                </span>
                <span className="ml-auto text-[11px] text-muted-foreground">
                  {flat.length} result{flat.length !== 1 ? 's' : ''}
                </span>
              </div>
            </div>
          </div>

          {/* Keyframe animations */}
          <style>{`
            @keyframes cpFadeIn  { from { opacity: 0 } to { opacity: 1 } }
            @keyframes cpSlideIn { from { opacity: 0; transform: translateY(-8px) scale(.98) } to { opacity: 1; transform: translateY(0) scale(1) } }
          `}</style>
        </>
      )}
    </>
  );
}
