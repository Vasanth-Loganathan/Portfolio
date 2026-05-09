'use client';

import { useState, useEffect } from 'react';

interface Project {
  id: number;
  title: string;
  shortDesc: string;
  longDesc: string;
  tags: string[];
  github: string;
  live: string;
}

interface ProjectFilterProps {
  projects: Project[];
  children: (filtered: Project[]) => React.ReactNode;
}

export default function ProjectFilter({ projects, children }: ProjectFilterProps) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [filtered, setFiltered] = useState(projects);

  // Define high-level categories instead of showing every single tag
  const tags = [
    'All',
    'React',
    'Node.js',
    'Fast API',
    'Java',
    'Python',
    'Spring Boot',
    'Supabase',
    'PostgreSQL',
    'MongoDB',
    'AWS',
    'IoT',
    'Raspberry Pi',
    'Machine Learning',
    'Terraform'
  ];

  useEffect(() => {
    if (activeFilter === 'All') {
      setFiltered(projects);
    } else {
      setFiltered(
        projects.filter((p) =>
          p.tags.some((tag) =>
            tag.toLowerCase().includes(activeFilter.toLowerCase())
          )
        )
      );
    }
  }, [activeFilter, projects]);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-2 justify-center">
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveFilter(tag)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeFilter === tag
              ? 'bg-accent text-accent-foreground'
              : 'border border-accent/40 text-foreground hover:border-accent/60'
              }`}
          >
            {tag}
          </button>
        ))}
      </div>
      {children(filtered)}
    </div>
  );
}
