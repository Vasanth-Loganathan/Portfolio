'use client';

import { useEffect, useRef, useState } from 'react';

interface ProjectCardProps {
  children: React.ReactNode;
}

export default function ProjectCard3DTilt({ children }: ProjectCardProps) {
  const [transform, setTransform] = useState('perspective(800px) rotateX(0deg) rotateY(0deg)');
  const [glarePos, setGlarePos] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice(window.matchMedia('(pointer:coarse)').matches);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchDevice || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = ((y - centerY) / centerY) * 12;
    const rotateY = ((centerX - x) / centerX) * 12;

    setTransform(
      `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`
    );
    setGlarePos({
      x: ((x / rect.width) * 100),
      y: ((y / rect.height) * 100),
    });
  };

  const handleMouseLeave = () => {
    setTransform('perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)');
    setGlarePos({ x: 50, y: 50 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative transition-transform duration-300 h-full"
      style={{
        transform: isTouchDevice ? 'none' : transform,
      }}
    >
      {children}
      {!isTouchDevice && (
        <div
          className="absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-300 group-hover:opacity-30"
          style={{
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.3) 0%, transparent 50%)`,
            borderRadius: 'inherit',
          }}
        />
      )}
    </div>
  );
}
