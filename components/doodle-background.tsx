import { Code2, TerminalSquare, Braces, Database, Cpu, Coffee, Sparkles, Workflow, Lightbulb, Rocket, GitBranch, Layers, Globe } from 'lucide-react';

export default function DoodleBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden opacity-15 dark:opacity-15 text-foreground">
      {/* ── Top Left Quadrant ── */}
      <Code2 className="absolute top-[8%] left-[4%] w-20 h-20 md:w-28 md:h-28 -rotate-12" strokeWidth={0.75} />
      <svg className="hidden md:block absolute top-[25%] left-[2%] w-20 h-20 -rotate-12" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <path d="M 10 50 L 30 20 L 50 80 L 70 20 L 90 50" />
      </svg>
      <Rocket className="hidden md:block absolute top-[18%] left-[20%] w-16 h-16 -rotate-45" strokeWidth={0.75} />
      
      {/* ── Top Center ── */}
      <svg className="hidden md:block absolute top-[8%] left-[32%] w-40 h-16 rotate-6" viewBox="0 0 200 50" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <path d="M 0 25 Q 25 0 50 25 T 100 25 T 150 25 T 200 25" />
      </svg>
      <svg className="hidden md:block absolute top-[22%] left-[48%] w-24 h-24 -rotate-6" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round">
        <path d="M 10 50 C 10 20, 40 20, 40 50 C 40 80, 70 80, 70 50 C 70 20, 90 20, 90 50" />
      </svg>
      <Globe className="hidden md:block absolute top-[5%] left-[62%] w-32 h-32 rotate-[25deg]" strokeWidth={0.75} />

      {/* ── Top Right Quadrant ── */}
      <Sparkles className="absolute top-[12%] right-[5%] md:right-[25%] w-12 h-12 md:w-16 md:h-16 rotate-12" strokeWidth={0.75} />
      <svg className="hidden md:block absolute top-[28%] right-[28%] w-20 h-20 rotate-[15deg]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round">
        <path d="M 20 10 L 20 30 M 10 20 L 30 20" />
        <path d="M 50 10 L 50 30 M 40 20 L 60 20" />
        <path d="M 80 10 L 80 30 M 70 20 L 90 20" />
        <path d="M 20 40 L 20 60 M 10 50 L 30 50" />
        <path d="M 50 40 L 50 60 M 40 50 L 60 50" />
        <path d="M 80 40 L 80 60 M 70 50 L 90 50" />
        <path d="M 20 70 L 20 90 M 10 80 L 30 80" />
        <path d="M 50 70 L 50 90 M 40 80 L 60 80" />
        <path d="M 80 70 L 80 90 M 70 80 L 90 80" />
      </svg>
      <Braces className="hidden md:block absolute top-[15%] right-[5%] w-36 h-36 rotate-12" strokeWidth={0.75} />

      {/* ── Mid Left ── */}
      <GitBranch className="hidden md:block absolute top-[45%] left-[3%] w-24 h-24 rotate-12" strokeWidth={0.75} />
      <TerminalSquare className="absolute top-[50%] md:top-[62%] left-[5%] md:left-[12%] w-16 h-16 md:w-20 md:h-20 -rotate-6" strokeWidth={0.75} />

      {/* ── Mid Right ── */}
      <Lightbulb className="absolute top-[40%] right-[5%] md:right-[3%] w-16 h-16 md:w-20 md:h-20 rotate-12" strokeWidth={0.75} />
      <div className="hidden md:block absolute top-[45%] right-[25%] text-[10px] font-mono rotate-12 tracking-[0.5em] opacity-80 whitespace-pre">
        0 1 0 0 1 0 1{'\n'}
        1 0 1 1 0 0 0
      </div>
      <svg className="hidden md:block absolute top-[58%] right-[12%] w-24 h-24 rotate-12" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <path d="M 20 20 C 40 60 80 60 90 90" />
        <path d="M 90 90 L 75 88 M 90 90 L 88 75" />
      </svg>

      {/* ── Bottom Left Quadrant ── */}
      <Layers className="hidden md:block absolute top-[80%] left-[4%] w-24 h-24 -rotate-12" strokeWidth={0.75} />
      <Coffee className="absolute top-[85%] md:top-[92%] left-[8%] w-12 h-12 md:w-16 md:h-16 -rotate-12" strokeWidth={0.75} />
      <svg className="hidden md:block absolute top-[82%] left-[22%] w-32 h-32 opacity-80" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.75" strokeDasharray="4 4">
        <circle cx="50" cy="50" r="20" />
        <circle cx="50" cy="50" r="35" />
        <circle cx="50" cy="50" r="50" />
        <line x1="50" y1="0" x2="50" y2="100" />
        <line x1="0" y1="50" x2="100" y2="50" />
      </svg>
      <Cpu className="hidden md:block absolute top-[75%] left-[38%] w-24 h-24 rotate-45" strokeWidth={0.75} />

      {/* ── Bottom Center ── */}
      <svg className="hidden md:block absolute top-[88%] left-[50%] w-24 h-24 -rotate-12" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="50,10 90,80 10,80" />
        <polygon points="50,30 75,75 25,75" strokeDasharray="3 3" />
      </svg>

      {/* ── Bottom Right Quadrant ── */}
      <Workflow className="hidden md:block absolute top-[72%] right-[4%] w-32 h-32 -rotate-12" strokeWidth={0.75} />
      <Database className="absolute top-[85%] md:top-[88%] right-[10%] md:right-[18%] w-16 h-16 md:w-24 md:h-24 rotate-6" strokeWidth={0.75} />
    </div>
  );
}
