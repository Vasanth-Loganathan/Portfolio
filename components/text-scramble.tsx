'use client';

import { useEffect, useState } from 'react';

interface TextScrambleProps {
  text: string;
  duration?: number;
  onComplete?: () => void;
}

export default function TextScramble({ text, duration = 1200, onComplete }: TextScrambleProps) {
  const [displayText, setDisplayText] = useState('');
  const [isScrambling, setIsScrambling] = useState(true);

  useEffect(() => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%';
    let currentIteration = 0;
    const iterations = Math.ceil(duration / 30);
    const charsPerIteration = text.length / iterations;
    let scrambleInterval: NodeJS.Timeout;

    const scramble = () => {
      let result = '';
      for (let i = 0; i < text.length; i++) {
        if (i < currentIteration * charsPerIteration) {
          result += text[i];
        } else {
          result += chars[Math.floor(Math.random() * chars.length)];
        }
      }
      setDisplayText(result);
      currentIteration++;

      if (currentIteration > iterations) {
        setDisplayText(text);
        setIsScrambling(false);
        clearInterval(scrambleInterval);
        onComplete?.();
      }
    };

    scrambleInterval = setInterval(scramble, 30);

    return () => clearInterval(scrambleInterval);
  }, [text, duration, onComplete]);

  return <span>{displayText}</span>;
}
