import React from 'react';
import { Section, Project } from '../types';
import { CyberCard } from './ui/CyberCard';
import { ExternalLink, Github, Layers } from 'lucide-react';

const projects: Project[] = [
    {
    id: '1',
    title: 'Aishiaanime',
    description: 'You can watch anime for free and without paying, you just have to donate',
    image: 'https://picsum.photos/seed/nexus/600/400',
    tags: ['React', 'Javascript'],
    link: 'https://aishiaanime.xyz',
    status: 'Live'
  },
  {
    id: '2',
    title: 'Aishia Network DASHBOARD',
    description: 'A real-time crypto asset tracking dashboard with complex data visualization and RWA integration.',
    image: 'https://picsum.photos/seed/nexus/600/400',
    tags: ['React', '', 'Web3', 'Tailwind'],
    link: 'https://suiscan.xyz',
    status: 'Live'
  },
  {
    id: '3',
    title: 'CHRONO SOCIAL',
    description: 'Decentralized social media platform built on Lens Protocol with anime-inspired UI themes.',
    image: 'https://picsum.photos/seed/chrono/600/400',
    tags: ['Next.js', 'GraphQL', 'Solidity', 'IPFS'],
    link: '#',
    status: 'In Progress'
  },
  {
    id: '4',
    title: 'A.I. COMPANION',
    description: 'Personal assistant chat interface powered by Gemini Flash 2.5 with voice synthesis capability.',
    image: 'https://picsum.photos/seed/ai/600/400',
    tags: ['TypeScript', 'Gemini API', 'WebSpeech API'],
    link: '#',
    status: 'Prototype'
  }
];

export const Projects: React.FC = () => {
  return (
    <section id={Section.PROJECTS} className="py-20 relative bg-cyber-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
                <h2 className="text-cyber-secondary font-tech tracking-widest text-sm mb-2">DEPLOYED UNITS</h2>
                <h3 className="text-3xl md:text-4xl font-display font-bold text-white">FEATURED PROJECTS</h3>
            </div>
            <div className="flex items-center gap-2 text-slate-500 text-sm font-tech">
                <Layers className="w-4 h-4" />
                <span>TOTAL REPOSITORIES: 42</span>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
                <CyberCard key={project.id} className="h-full flex flex-col p-0">
                    <div className="relative h-48 overflow-hidden border-b border-cyber-gray/30 group-hover:border-cyber-primary/30 transition-colors">
                        <img 
                            src={project.image} 
                            alt={project.title} 
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute top-2 right-2 px-2 py-1 bg-black/80 backdrop-blur text-xs font-bold text-cyber-primary border border-cyber-primary/30">
                            {project.status.toUpperCase()}
                        </div>
                    </div>
                    
                    <div className="p-6 flex-1 flex flex-col">
                        <h4 className="text-xl font-display font-bold text-white mb-2 group-hover:text-cyber-primary transition-colors">
                            {project.title}
                        </h4>
                        <p className="text-slate-400 text-sm mb-4 flex-1 leading-relaxed">
                            {project.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-2 mb-6">
                            {project.tags.map(tag => (
                                <span key={tag} className="text-xs font-tech text-cyber-secondary">#{tag}</span>
                            ))}
                        </div>
                        
                        <div className="flex items-center justify-between mt-auto pt-4 border-t border-cyber-gray/30">
                            <a href={project.link} className="flex items-center gap-2 text-sm text-slate-300 hover:text-white transition-colors">
                                <Github className="w-4 h-4" /> Source
                            </a>
                            <a href={project.link} className="flex items-center gap-2 text-sm text-cyber-primary hover:text-cyan-300 transition-colors">
                                Demo <ExternalLink className="w-4 h-4" />
                            </a>
                        </div>
                    </div>
                </CyberCard>
            ))}
        </div>
      </div>
    </section>
  );
};
