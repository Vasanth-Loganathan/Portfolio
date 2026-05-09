'use client';

import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Wrench, BrainCircuit, BookOpen, Briefcase } from 'lucide-react';

/* ─── Keyframe styles (injected once) ───────────────────────────────────── */
const styles = `
  @keyframes pulse-dot {
    0%, 100% { opacity: 1; transform: scale(1); }
    50%       { opacity: 0.5; transform: scale(0.75); }
  }
`;

/* ─── Card data — UPDATE THESE ────────────────────────────────────────────
   Each object maps to one card. Change title, description, and tag freely.
   dotColor, tagColor, and Icon control the visual theme of each card.
───────────────────────────────────────────────────────────────────────── */
const cards = [
  {
    label: 'LEARNING',
    title: 'Angular & Spring Boot',
    description:
      'Mastering full-stack enterprise development with Angular for dynamic frontends and Spring Boot for robust backend services.',
    tag: 'Ongoing',
    tagColor: 'bg-blue-400/15 text-blue-400 border border-blue-400/30',
    dotColor: 'bg-blue-400',
    Icon: BookOpen,
    iconColor: 'text-blue-400',
  },
  {
    label: 'UPCOMING',
    title: 'Intern @ BNY Mellon',
    description:
      'Preparing to join as an intern to contribute to real-world projects, expand my software engineering skills, and collaborate with industry professionals.',
    tag: 'Excited',
    tagColor: 'bg-emerald-400/15 text-emerald-400 border border-emerald-400/30',
    dotColor: 'bg-emerald-400',
    Icon: Briefcase,
    iconColor: 'text-emerald-400',
  },
];

/* ─── Single Card ─────────────────────────────────────────────────────── */
function CurrentlyCard({
  card,
  delay,
  isVisible,
}: {
  card: (typeof cards)[number];
  delay: number;
  isVisible: boolean;
}) {
  const { Icon } = card;

  return (
    <div
      className="relative flex flex-col gap-4 rounded-2xl bg-card border border-border p-6
                 border-l-[3px] border-l-accent
                 transition-all duration-300 ease-out
                 hover:-translate-y-1 hover:shadow-[0_0_24px_0px_hsl(var(--accent)/0.18)]"
      style={{
        transitionDelay: `${delay}ms`,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity 600ms ease ${delay}ms, transform 600ms ease ${delay}ms, box-shadow 300ms ease, border-color 300ms ease`,
      }}
    >
      {/* Pulsing live dot — top-left */}
      <span
        className={`absolute top-4 right-4 w-2.5 h-2.5 rounded-full ${card.dotColor}`}
        style={{ animation: 'pulse-dot 2s ease-in-out infinite' }}
        aria-hidden="true"
      />

      {/* Icon + label row */}
      <div className="flex items-center gap-3">
        <div className={`${card.iconColor}`}>
          <Icon className="w-5 h-5" />
        </div>
        <span
          className="text-[11px] font-semibold tracking-widest text-muted-foreground uppercase"
        >
          {card.label}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-base font-bold text-foreground leading-snug -mt-1">
        {card.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-muted-foreground leading-relaxed flex-1">
        {card.description}
      </p>

      {/* Tag */}
      <div>
        <span
          className={`inline-block text-xs font-semibold px-3 py-1 rounded-full ${card.tagColor}`}
        >
          {card.tag}
        </span>
      </div>
    </div>
  );
}

/* ─── Section ─────────────────────────────────────────────────────────── */
export default function CurrentlySection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <>
      <style>{styles}</style>

      <section id="currently" className="py-20 px-6 bg-background/50">
        <div className="max-w-6xl mx-auto">
          {/* Heading — same style as all other sections */}
          <h2 className="text-4xl font-bold mb-4">What I&apos;m Up To</h2>
          <div className="w-16 h-1 bg-accent mb-12" />

          {/* Cards grid */}
          <div
            ref={ref}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {cards.map((card, i) => (
              <CurrentlyCard
                key={card.label}
                card={card}
                delay={i * 100}
                isVisible={isVisible}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
