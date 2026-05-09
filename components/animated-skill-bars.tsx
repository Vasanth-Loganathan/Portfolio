'use client';

import { useEffect, useState } from 'react';
import type { ElementType } from 'react';

interface SkillBar {
  name: string;
  percentage: number;
}

interface SkillCategory {
  category: string;
  skills: SkillBar[];
}

interface AnimatedSkillBarsProps {
  categories: SkillCategory[];
  isVisible: boolean;
  iconMap?: Record<string, ElementType | null>;
}

export default function AnimatedSkillBars({ categories, isVisible, iconMap }: AnimatedSkillBarsProps) {
  const [animatedPercentages, setAnimatedPercentages] = useState<Record<string, number>>({});

  useEffect(() => {
    if (!isVisible) return;

    const durations: Record<string, number> = {};
    categories.forEach((cat) => {
      cat.skills.forEach((skill) => {
        durations[skill.name] = 900;
      });
    });

    const startTime = Date.now();
    let animationId: number;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const newPercentages: Record<string, number> = {};

      categories.forEach((cat) => {
        cat.skills.forEach((skill) => {
          const progress = Math.min(elapsed / durations[skill.name], 1);
          // Ease-out cubic
          const eased = 1 - Math.pow(1 - progress, 3);
          newPercentages[skill.name] = eased * skill.percentage;
        });
      });

      setAnimatedPercentages(newPercentages);

      if (elapsed < 900) {
        animationId = requestAnimationFrame(animate);
      }
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [isVisible, categories]);

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
      {categories.map((category, idx) => (
        <div key={idx} className="space-y-5">
          {/* Category heading */}
          <h3 className="text-sm font-bold text-accent uppercase tracking-widest border-b border-accent/20 pb-2">
            {category.category}
          </h3>

          {category.skills.map((skill, skillIdx) => {
            const Icon = iconMap?.[skill.name] ?? null;
            const pct = animatedPercentages[skill.name] || 0;

            return (
              <div key={skillIdx} className="space-y-1.5">
                {/* Name + icon row */}
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 font-medium text-foreground">
                    {Icon && (
                      <Icon
                        className="w-4 h-4 text-accent flex-shrink-0"
                        aria-hidden="true"
                      />
                    )}
                    {skill.name}
                  </span>
                  <span className="text-muted-foreground tabular-nums">
                    {Math.round(pct)}%
                  </span>
                </div>

                {/* Animated bar */}
                <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-accent rounded-full transition-all duration-300"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
