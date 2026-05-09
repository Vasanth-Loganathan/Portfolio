'use client';

import { useEffect, useState } from 'react';

export default function TerminalAbout() {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [cursorVisible, setCursorVisible] = useState(true);

  const lines = [
    '$ whoami',
    '→ Vasanth Logu — Full Stack Developer & ML Engineer',
    '$ cat skills.txt',
    '→ Java, Python, React, Node.js, PHP, MySQL, PostgreSQL, MongoDB, AWS, Spring Boot, Machine Learning',
    '$ cat status.txt',
    '→ Open to new opportunities & freelance projects',
    '$ echo "Let\'s build something amazing"',
    '→ Let\'s build something amazing',
  ];

  useEffect(() => {
    let lineIndex = 0;
    let charIndex = 0;
    let displayedContent: string[] = [];
    let timeoutId: NodeJS.Timeout;

    const typeNextChar = () => {
      if (lineIndex >= lines.length) return;

      const currentLine = lines[lineIndex];
      if (charIndex < currentLine.length) {
        displayedContent = [...displayedContent.slice(0, -1)];
        const newLine = currentLine.slice(0, charIndex + 1);
        displayedContent.push(newLine);
        setDisplayedLines([...displayedContent]);
        charIndex++;
        timeoutId = setTimeout(typeNextChar, 40);
      } else {
        charIndex = 0;
        lineIndex++;
        if (lineIndex < lines.length) {
          displayedContent.push('');
        }
        setDisplayedLines([...displayedContent]);
        timeoutId = setTimeout(typeNextChar, 200);
      }
    };

    typeNextChar();

    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <div className="bg-black/80 border border-accent/30 rounded-lg p-6 font-mono text-sm overflow-hidden">
      {/* Terminal header */}
      <div className="flex items-center gap-2 mb-4 pb-2 border-b border-accent/20">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <span className="text-accent/60 flex-1 text-center text-xs">about.sh</span>
      </div>

      {/* Terminal content */}
      <div className="space-y-1 min-h-[200px]">
        {displayedLines.map((line, idx) => (
          <div
            key={idx}
            className={`${line.startsWith('$') || line.startsWith('→')
              ? 'text-accent'
              : 'text-accent/80'
              }`}
          >
            {line}
          </div>
        ))}
        {displayedLines.length < 8 && (
          <div className="text-accent">
            {displayedLines.length === 0 ? '$' : ''}
            {cursorVisible ? ' |' : '  '}
          </div>
        )}
      </div>
    </div>
  );
}
