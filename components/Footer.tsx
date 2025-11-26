import React from 'react';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';
import { Section } from '../types';

export const Footer: React.FC = () => {
  return (
    <footer id={Section.CONTACT} className="bg-cyber-black border-t border-cyber-gray py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl font-display font-bold text-white mb-8">
            INITIALIZE <span className="text-cyber-secondary">CONTACT</span>
        </h2>
        
        <div className="flex justify-center gap-8 mb-8">
            <a href="#" className="text-slate-400 hover:text-cyber-primary hover:scale-110 transition-all">
                <Github className="w-6 h-6" />
            </a>
            <a href="https://github.com/aishiaanime" className="text-slate-400 hover:text-cyber-primary hover:scale-110 transition-all">
                <Linkedin className="w-6 h-6" />
            </a>
            <a href="#" className="text-slate-400 hover:text-cyber-primary hover:scale-110 transition-all">
                <Twitter className="w-6 h-6" />
            </a>
            <a href="#" className="text-slate-400 hover:text-cyber-primary hover:scale-110 transition-all">
                <Mail className="w-6 h-6" />
            </a>
        </div>
        
        <p className="text-slate-600 font-tech text-sm">
            © {new Date().getFullYear()} Aishi Network.
        </p>
      </div>
    </footer>
  );
};
