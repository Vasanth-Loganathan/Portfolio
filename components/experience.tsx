'use client';

import { useEffect, useState } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function Experience() {
  const { ref, isVisible } = useScrollAnimation();

  const experiences = [
    {
      id: 1,
      type: 'education',
      company: 'Raj Vidya Bhavan Matric Hr. Sec. School',
      title: 'SSLC',
      duration: '2020 - 2021',
      description: [
        'Achieved a Grade of 99%',
      ],
    },
    {
      id: 2,
      type: 'education',
      company: 'Raj Vidya Bhavan Matric Hr. Sec. School',
      title: 'HSC',
      duration: '2022 - 2023',
      description: [
        'Achieved a Grade of 93.5%',
      ],
    },
    {
      id: 3,
      type: 'education',
      company: 'PSG College of Technology',
      title: 'B.Tech Information Technology',
      duration: '2023 - 2027',
      description: [
        'Achieved a CGPA of 8.72',
      ],
    },
    {
      id: 4,
      type: 'Internship',
      company: 'Cogensoft System Private Limited',
      title: 'Software Intern',
      duration: 'Dec 2025 - April 2026',
      description: [
        'Built a Fully Functional Conversational Infrastructure Provisioning Agent for AWS'
      ],
    }
  ];

  return (
    <section
      id="experience"
      className="py-20 px-6 bg-background"
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-4">Experience</h2>
        <div className="w-16 h-1 bg-accent mb-12"></div>

        <div
          ref={ref}
          className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
        >
          {/* Timeline */}
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-accent via-accent/50 to-transparent"></div>

            {/* Timeline Items */}
            <div className="space-y-12">
              {experiences.map((exp, index) => (
                <div
                  key={exp.id}
                  className={`relative flex gap-6 md:gap-0 transition-all duration-1000 transform ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                    } ${isVisible
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-8'
                    }`}
                  style={{
                    transitionDelay: isVisible ? `${index * 150}ms` : '0ms',
                  }}
                >
                  {/* Dot */}
                  <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-accent rounded-full -translate-x-1.5 md:-translate-x-1/2 top-6 border-4 border-background"></div>

                  {/* Content */}
                  <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                    <div
                      className={`bg-card border border-border rounded-lg p-6 hover:border-accent/50 transition-colors ${exp.type === 'education'
                        ? 'border-l-2 border-l-accent/50'
                        : 'border-l-2 border-l-accent'
                        }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-xl font-bold text-foreground">
                            {exp.title}
                          </h3>
                          <p className="text-accent font-semibold">
                            {exp.company}
                          </p>
                        </div>
                        <span className="text-xs font-mono bg-accent/10 text-accent px-3 py-1 rounded whitespace-nowrap ml-4">
                          {exp.type === 'education' ? 'Education' : 'Work'}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">
                        {exp.duration}
                      </p>
                      <ul className="space-y-2">
                        {exp.description.map((desc, idx) => (
                          <li key={idx} className="text-muted-foreground text-sm flex items-start gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-accent mt-[0.4rem] flex-shrink-0" />
                            <span>{desc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
