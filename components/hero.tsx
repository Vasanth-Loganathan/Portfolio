'use client';

import { useEffect, useState } from 'react';
import { ArrowRight, Eye, Download } from 'lucide-react';
import TextScramble from './text-scramble';

import LiveStatusBadge from './live-status-badge';
import { viewResume, downloadResume } from '@/lib/resume';

export default function Hero() {
  const [displayText, setDisplayText] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);

  const roles = [
    'IT Undergraduate',
    'Full Stack Developer',
    'Machine Learning Engineer',
  ];

  useEffect(() => {
    const currentRole = roles[roleIndex];
    let charIndex = 0;
    let timeoutId: ReturnType<typeof setTimeout>;

    const typeChar = () => {
      if (charIndex < currentRole.length) {
        setDisplayText(currentRole.slice(0, charIndex + 1));
        charIndex++;
        timeoutId = setTimeout(typeChar, 50);
      } else {
        timeoutId = setTimeout(() => {
          setRoleIndex((prev) => (prev + 1) % roles.length);
          setDisplayText('');
        }, 2000);
      }
    };

    typeChar();

    return () => clearTimeout(timeoutId);
  }, [roleIndex]);

  const handleScroll = (e: React.MouseEvent<HTMLButtonElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center pt-20 px-6 relative overflow-hidden">


      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="mb-8 inline-block">
          <span className="text-accent font-mono text-sm tracking-widest uppercase">
            Welcome to my portfolio
          </span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6">
          Hi, I&apos;m
          <span className="block text-accent">
            <TextScramble text="Vasanth Logu" />
          </span>
        </h1>

        <div className="text-2xl md:text-3xl text-muted-foreground mb-6 h-12 flex items-center justify-center">
          <span>{displayText}</span>
          <span className="ml-2 animate-pulse">|</span>
        </div>

        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
          I build apps, train models, and deploy them to the cloud — sometimes all in one weekend.
        </p>

        <div className="mb-8 flex justify-center">
          <LiveStatusBadge
            onContactClick={() => {
              const element = document.querySelector('#contact');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={(e) => handleScroll(e, '#projects')}
            className="bg-accent hover:bg-accent/90 text-accent-foreground text-sm px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2"
          >
            View My Work
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* View Resume — opens PDF in a new tab */}
          <button
            onClick={viewResume}
            className="border border-accent/40 hover:border-accent hover:bg-accent/10 text-foreground text-sm px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2"
          >
            <Eye className="w-4 h-4" />
            View Resume
          </button>

          {/* Download Resume — saves PDF to disk */}
          <button
            onClick={downloadResume}
            className="border border-accent/40 hover:border-accent hover:bg-accent/10 text-foreground text-sm px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            Download Resume
          </button>
        </div>
      </div>
    </section>
  );
}
