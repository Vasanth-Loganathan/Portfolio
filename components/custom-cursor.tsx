'use client';

import { useEffect, useRef } from 'react';

/* ─────────────────────────────────────────────────────────────────────────
   CrosshairCursor — thin + at the mouse position
   • Two 20px lines forming a crosshair
   • Instant (no lag) — positioned via CSS custom properties
   • Accent color (--accent from globals.css)
   • Pure CSS, no canvas, no SVG filter
──────────────────────────────────────────────────────────────────────── */

export default function CustomCursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const el = ref.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      el.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 9999,
        pointerEvents: 'none',
        willChange: 'transform',
      }}
    >
      {/* Horizontal line */}
      <span
        style={{
          position: 'absolute',
          width: 20,
          height: 1.5,
          background: 'var(--accent, #60a5fa)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          borderRadius: 1,
        }}
      />
      {/* Vertical line */}
      <span
        style={{
          position: 'absolute',
          width: 1.5,
          height: 20,
          background: 'var(--accent, #60a5fa)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          borderRadius: 1,
        }}
      />
    </div>
  );
}