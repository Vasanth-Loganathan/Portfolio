'use client';

import { useEffect } from 'react';

/**
 * Forces the page scroll position to the top after hydration.
 * Placed in layout.tsx to run once on every page load.
 */
export default function ScrollRestorer() {
  useEffect(() => {
    // Defer to ensure all child components (including chat init) have run first
    const id = requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' } as ScrollToOptions);
    });
    return () => cancelAnimationFrame(id);
  }, []);

  return null;
}
