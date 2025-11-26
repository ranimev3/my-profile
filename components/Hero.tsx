import React from 'react';
import { Section } from '../types';
import { GlitchText } from './ui/GlitchText';
import { Terminal, ArrowRight, FileJson, Activity, Database, Globe } from 'lucide-react';
import { CyberCard } from './ui/CyberCard';

interface HeroProps {
    onNavigate: (section: Section) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  
  const downloadManifest = () => {
    const manifest = {
        name: "Hiro Protagonist",
        class: "Full Stack Engineer",
        specialization: "RWA & Web3 Interfaces",
        version: "2.5.0",
        stats: {
            experience: "2+ Years",
            projects_deployed: 42,
            coffee_consumption: "High",
            status: "OPERATIONAL"
        },
        skills: ["React", "TypeScript", "Node.js", "Solidity", "WebGL"],
        contact: "aishianetwork@gmail.com"
    };
    
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(manifest, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "manifestasi.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return (
    <section id={Section.HERO} className="min-h-screen flex flex-col justify-center relative overflow-hidden pt-20 pb-10">
      {/* Modern RWA Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:60px_60px] -z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyber-black/50 to-cyber-black -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center flex-1">
        
        {/* Left Column: Dashboard/Text */}
        <div className="lg:col-span-7 space-y-10 z-10">
          
          {/* Status Badge */}
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-cyber-gray/30 border border-cyber-primary/20 backdrop-blur-sm rounded-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-xs font-tech tracking-[0.2em] text-cyber-primary">SYSTEM STATUS: OPTIMAL</span>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-xl text-slate-400 font-tech tracking-wider">PROTOCOL ARCHITECT //</h2>
            <GlitchText 
                text="HIRO.PROTAGONIST" 
                as="h1" 
                className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white tracking-tighter block" 
            />
            <p className="text-2xl md:text-3xl font-light font-sans text-slate-300">
              Building the <span className="text-cyber-primary font-bold">RWA</span> infrastructure of tomorrow.
            </p>
          </div>

          <div className="p-6 border-l-2 border-cyber-primary/50 bg-gradient-to-r from-cyber-primary/5 to-transparent backdrop-blur-sm">
            <p className="text-slate-400 text-lg leading-relaxed font-sans">
              Specializing in high-performance React dashboards, decentralized finance interfaces, and real-time data visualization.
              Blending anime aesthetics with institutional-grade UI reliability.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-5 pt-4">
             <button 
                onClick={downloadManifest}
                className="group relative flex items-center justify-center gap-3 px-8 py-4 bg-cyber-primary/10 border border-cyber-primary text-cyber-primary hover:bg-cyber-primary hover:text-cyber-black transition-all duration-300 overflow-hidden"
            >
                <div className="absolute inset-0 w-full h-full bg-cyber-primary/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <FileJson className="w-5 h-5 relative z-10" />
                <span className="font-display font-bold tracking-wider relative z-10">DOWNLOAD MANIFEST</span>
            </button>
            
            <button 
                onClick={() => onNavigate(Section.PROJECTS)}
                className="group flex items-center justify-center gap-3 px-8 py-4 bg-cyber-gray/20 border border-slate-700 text-white hover:border-white transition-all duration-300"
            >
              <span className="font-display font-bold tracking-wider">VIEW PROTOCOLS</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Right Column: Asset Visualization */}
        <div className="lg:col-span-5 relative hidden lg:block">
           <CyberCard variant="glass" className="h-[600px] flex flex-col relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyber-primary to-transparent opacity-50" />
                
                {/* Header of Card */}
                <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
                    <span className="font-tech text-cyber-primary text-xs tracking-widest">ASSET ID: #8492</span>
                    <span className="font-tech text-green-400 text-xs tracking-widest flex items-center gap-1">
                        <Activity className="w-3 h-3" /> LIVE
                    </span>
                </div>

                {/* Main Image Area */}
                <div className="relative flex-1 bg-cyber-black/50 overflow-hidden mb-6 border border-white/5">
                    <img 
                        src="https://picsum.photos/seed/cyberstats/800/1000" 
                        alt="Avatar" 
                        className="w-full h-full object-cover opacity-80 mix-blend-luminosity hover:mix-blend-normal transition-all duration-700 scale-105"
                    />
                    
                    {/* Overlay HUD */}
                    <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/90 to-transparent">
                        <div className="flex justify-between items-end">
                            <div>
                                <div className="text-[10px] text-slate-400 font-tech mb-1">CURRENT ASSIGNMENT</div>
                                <div className="text-white font-bold font-display">SENIOR FRONTEND ENG.</div>
                            </div>
                            <Terminal className="w-6 h-6 text-cyber-primary animate-pulse" />
                        </div>
                    </div>
                </div>

                {/* Data Rows */}
                <div className="space-y-3 font-tech text-sm">
                    <div className="flex justify-between items-center text-slate-400">
                        <span>SYNC RATE</span>
                        <span className="text-cyber-primary">98.4%</span>
                    </div>
                    <div className="w-full bg-cyber-gray/50 h-1">
                        <div className="bg-cyber-primary h-full w-[98.4%]" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mt-4">
                        <div className="bg-cyber-gray/20 p-3 border border-white/5">
                            <div className="text-[10px] text-slate-500 mb-1">TOTAL COMMITS</div>
                            <div className="text-white font-bold text-lg">4,829</div>
                        </div>
                        <div className="bg-cyber-gray/20 p-3 border border-white/5">
                            <div className="text-[10px] text-slate-500 mb-1">SMART CONTRACTS</div>
                            <div className="text-white font-bold text-lg">15+</div>
                        </div>
                    </div>
                </div>
           </CyberCard>
           
           {/* Background decorative elements */}
           <div className="absolute -z-10 top-1/2 -right-20 w-[500px] h-[500px] bg-cyber-primary/5 rounded-full blur-[100px]" />
        </div>
      </div>

      {/* Bottom Ticker */}
      <div className="absolute bottom-0 left-0 w-full bg-cyber-black/80 backdrop-blur-md border-t border-cyber-gray/30 py-3 overflow-hidden flex">
        <div className="flex animate-[scroll_20s_linear_infinite] gap-12 whitespace-nowrap px-4">
            {[...Array(2)].map((_, i) => (
                <React.Fragment key={i}>
                    <span className="flex items-center gap-2 text-slate-400 font-tech text-sm">
                        <Globe className="w-4 h-4 text-cyber-primary" /> NETWORK STATUS: <span className="text-green-400">ONLINE</span>
                    </span>
                    <span className="flex items-center gap-2 text-slate-400 font-tech text-sm">
                        <Database className="w-4 h-4 text-cyber-secondary" /> BLOCKS MINED: <span className="text-white">14,293,102</span>
                    </span>
                    <span className="flex items-center gap-2 text-slate-400 font-tech text-sm">
                        <Activity className="w-4 h-4 text-cyber-accent" /> MARKET CAP: <span className="text-white">$UNLIMITED</span>
                    </span>
                     <span className="flex items-center gap-2 text-slate-400 font-tech text-sm">
                        <Terminal className="w-4 h-4 text-cyber-primary" /> LATEST DEPLOY: <span className="text-white">FEAT/RWA-DASHBOARD</span>
                    </span>
                </React.Fragment>
            ))}
        </div>
      </div>
    </section>
  );
};