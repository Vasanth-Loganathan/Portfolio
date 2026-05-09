'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import CommandPalette from './command-palette';
import ThemeToggle from './theme-toggle';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'About', href: '#about-section' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleScroll = (e: React.MouseEvent<HTMLButtonElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="text-2xl font-bold bg-gradient-to-r from-accent to-accent/60 bg-clip-text text-transparent">
          Vasanth Logu
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={(e) => handleScroll(e, link.href)}
              className="text-muted-foreground hover:text-accent transition-colors text-sm font-medium"
            >
              {link.name}
            </button>
          ))}
          <CommandPalette />
          <ThemeToggle />
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-background border-b border-border px-6 py-4 space-y-4">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={(e) => handleScroll(e, link.href)}
              className="block w-full text-left text-muted-foreground hover:text-accent transition-colors text-sm font-medium"
            >
              {link.name}
            </button>
          ))}
          <div className="pt-4 flex items-center gap-4 border-t border-border">
            <CommandPalette />
            <ThemeToggle />
          </div>
        </div>
      )}
    </nav>
  );
}
