import React, { useState, useEffect } from 'react';
import { Menu, X, Hexagon } from 'lucide-react';
import { Section } from '../types';

interface NavbarProps {
  activeSection: Section;
  onNavigate: (section: Section) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection, onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: Section.HERO, label: 'START' },
    { id: Section.ABOUT, label: 'DATA' },
    { id: Section.SKILLS, label: 'SKILLS' },
    { id: Section.PROJECTS, label: 'PROTOCOLS' },
    { id: Section.FORUM, label: 'COMMS' },
  ];

  return (
    <nav className={`
        fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b
        ${scrolled 
            ? 'bg-cyber-black/90 backdrop-blur-md border-cyber-gray/30 py-2' 
            : 'bg-transparent border-transparent py-4'}
    `}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => onNavigate(Section.HERO)}>
            <div className="relative">
                <Hexagon className="w-8 h-8 text-cyber-primary stroke-1 group-hover:rotate-180 transition-transform duration-700" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-2 h-2 bg-cyber-primary rounded-full animate-pulse" />
                </div>
            </div>
            <div className="flex flex-col">
                <span className="font-display font-bold text-lg tracking-widest text-white leading-none">NEON<span className="text-cyber-primary">.GENESIS</span></span>
                <span className="font-tech text-[10px] text-slate-400 tracking-[0.3em]">RWA PORTFOLIO</span>
            </div>
          </div>
          
          <div className="hidden md:block">
            <div className="flex items-center space-x-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`
                    px-4 py-2 text-xs font-tech font-bold tracking-widest transition-all duration-300 relative group overflow-hidden
                    ${activeSection === item.id ? 'text-cyber-black bg-cyber-primary' : 'text-slate-400 hover:text-white hover:bg-white/5'}
                  `}
                >
                  <span className="relative z-10">{item.label}</span>
                  {activeSection !== item.id && (
                    <span className="absolute bottom-0 left-0 w-full h-[1px] bg-cyber-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  )}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-white focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-cyber-black border-b border-cyber-gray">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setIsOpen(false);
                }}
                className={`
                  block w-full text-left px-3 py-3 text-sm font-tech font-bold tracking-widest
                  ${activeSection === item.id ? 'text-cyber-primary bg-cyber-primary/10 border-l-2 border-cyber-primary' : 'text-slate-300 border-l-2 border-transparent'}
                `}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};