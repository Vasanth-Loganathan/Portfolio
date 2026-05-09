'use client';


import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import TerminalAbout from './terminal-about';


export default function About() {
  const { ref, isVisible } = useScrollAnimation();

  const stats = [
    { number: '10', label: 'Projects Built' },
    { number: '5', label: 'Months Experience' },
    { number: '10+', label: 'Technologies' },
  ];

  return (
    <section
      id="about-section"
      className="py-20 px-6 bg-background/50"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-4">About Me</h2>
        <div className="w-16 h-1 bg-accent mb-12"></div>

        <div
          ref={ref}
          className={`grid md:grid-cols-2 gap-12 items-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
        >
          {/* Bio */}
          <div
            className={`space-y-6 transition-all duration-1000 ${isVisible
              ? 'opacity-100 translate-x-0'
              : 'opacity-0 -translate-x-8'
              }`}
          >
            <TerminalAbout />

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              {stats.map((stat, index) => (
                <div key={index} className="border-l-2 border-accent pl-4">
                  <p className="text-3xl font-bold text-accent mb-1">{stat.number}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Profile Image Placeholder */}
          <div
            className={`flex justify-center transition-all duration-1000 ${isVisible
              ? 'opacity-100 translate-x-0'
              : 'opacity-0 translate-x-8'
              }`}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/30 to-accent/10 rounded-lg blur-2xl opacity-40"></div>
              <div className="relative w-72 h-96 bg-gradient-to-br from-card to-card/50 rounded-lg border border-accent/40 flex items-center justify-center overflow-hidden">
                <div className="text-center">
                  <img
                    src="/photo.jpg"
                    alt="Vasanth Logu"
                    className="relative w-72 h-96 object-cover rounded-lg border border-accent/40"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
