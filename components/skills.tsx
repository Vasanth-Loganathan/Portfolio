'use client';

import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import AnimatedSkillBars from './animated-skill-bars';
import {
  SiPython,
  SiJavascript,
  SiReact,
  SiSpring,
  SiFastapi,
  SiNodedotjs,
  SiTerraform,
  SiMysql,
  SiPostgresql,
  SiMongodb,
  SiPandas,
  SiScikitlearn,
  SiGit,
  SiGithub,
  SiPostman,
  SiSupabase,
} from 'react-icons/si';
import { FaAws, FaJava } from 'react-icons/fa';

// Maps each skill name → its react-icon component (null = text-only fallback)
const skillIconMap: Record<string, React.ElementType | null> = {
  // Languages
  Java: FaJava,
  Python: SiPython,
  JavaScript: SiJavascript,
  C: null,           // no SI icon for C language

  // Web Frameworks
  React: SiReact,
  'Spring Boot': SiSpring,
  FastAPI: SiFastapi,
  'Node.js': SiNodedotjs,

  // Cloud & DevOps
  AWS: FaAws,
  Terraform: SiTerraform,
  'Infracost CLI': null,      // no SI icon available

  // Database
  MySQL: SiMysql,
  PostgreSQL: SiPostgresql,
  MongoDB: SiMongodb,

  // Data Analysis
  Pandas: SiPandas,
  'Scikit-learn': SiScikitlearn,
  Matplotlib: null,         // no SI icon available

  // Tools
  Git: SiGit,
  GitHub: SiGithub,
  Postman: SiPostman,
  Supabase: SiSupabase,
};

export default function Skills() {
  const { ref, isVisible } = useScrollAnimation();

  const skillCategories = [
    {
      category: 'Programming Languages',
      skills: [
        { name: 'Python', percentage: 88 },
        { name: 'Java', percentage: 85 },
        { name: 'JavaScript', percentage: 70 },
        { name: 'C', percentage: 70 },
      ],
    },
    {
      category: 'Web Frameworks',
      skills: [
        { name: 'React', percentage: 75 },
        { name: 'Node.js', percentage: 75 },
        { name: 'FastAPI', percentage: 65 },
        { name: 'Spring Boot', percentage: 60 },
      ],
    },
    {
      category: 'Cloud & DevOps',
      skills: [
        { name: 'AWS', percentage: 75 },
        { name: 'Terraform', percentage: 72 },
        { name: 'Infracost CLI', percentage: 65 },
      ],
    },
    {
      category: 'Databases',
      skills: [
        { name: 'MySQL', percentage: 82 },
        { name: 'PostgreSQL', percentage: 80 },
        { name: 'MongoDB', percentage: 75 },
        { name: 'OracleDB', percentage: 65 },
      ],
    },
    {
      category: 'Data Analysis',
      skills: [
        { name: 'Pandas', percentage: 82 },
        { name: 'Scikit-learn', percentage: 80 },
        { name: 'Matplotlib', percentage: 70 },
      ],
    },
    {
      category: 'Tools',
      skills: [
        { name: 'Git', percentage: 90 },
        { name: 'GitHub', percentage: 88 },
        { name: 'Postman', percentage: 82 },
        { name: 'Supabase', percentage: 75 },
      ],
    },
  ];

  return (
    <section id="skills" className="py-20 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-4">Skills</h2>
        <div className="w-16 h-1 bg-accent mb-12" />

        <div
          ref={ref}
          className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
        >
          <AnimatedSkillBars
            categories={skillCategories}
            isVisible={isVisible}
            iconMap={skillIconMap}
          />
        </div>
      </div>
    </section>
  );
}
