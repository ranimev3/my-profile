import React from 'react';
import { Section } from '../types';
import { CyberCard } from './ui/CyberCard';

export const About: React.FC = () => {
  return (
    <section id={Section.ABOUT} className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Text Content */}
            <div className="space-y-8">
                 <div>
                    <h2 className="text-cyber-primary font-tech tracking-widest text-sm mb-2">ACCESSING ARCHIVES...</h2>
                    <h3 className="text-3xl md:text-4xl font-display font-bold text-white">
                        PERSONNEL DATA_LOGS
                    </h3>
                </div>

                <div className="prose prose-invert prose-lg text-slate-300 font-light">
                    <p>
                        Initiated in the early days of the web, my operator privileges have evolved to master the 
                        <span className="text-white font-normal"> Modern Stack</span>. I architect interfaces that bridge the gap 
                        between complex backend logic and seamless user experience.
                    </p>
                    <p>
                        Current mission parameters involve high-fidelity <span className="text-cyber-secondary">Real World Asset (RWA)</span> dashboard construction, 
                        ensuring data integrity and visual clarity in high-stakes environments.
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <div className="p-4 bg-cyber-gray/10 border border-cyber-gray/30 rounded">
                        <div className="text-xs text-slate-500 font-tech mb-1">CURRENT STATUS</div>
                        <div className="text-white font-display text-lg">AVAILABLE</div>
                    </div>
                    <div className="p-4 bg-cyber-gray/10 border border-cyber-gray/30 rounded">
                        <div className="text-xs text-slate-500 font-tech mb-1">LOCATION</div>
                        <div className="text-white font-display text-lg">NEO-TOKYO</div>
                    </div>
                </div>
            </div>

            {/* Visual/Stats Grid */}
            <div className="grid grid-cols-1 gap-6">
                <CyberCard variant="glass" title="CORE METRICS">
                    <div className="space-y-4">
                        {[
                            { label: 'Frontend Architecture', val: '98%' },
                            { label: 'Smart Contract Integration', val: '85%' },
                            { label: 'UI/UX Design Systems', val: '92%' },
                            { label: 'System Optimization', val: '95%' }
                        ].map((stat) => (
                            <div key={stat.label}>
                                <div className="flex justify-between text-xs font-tech mb-1 text-slate-400">
                                    <span>{stat.label.toUpperCase()}</span>
                                    <span className="text-cyber-primary">{stat.val}</span>
                                </div>
                                <div className="h-1 bg-cyber-gray/50 w-full overflow-hidden">
                                    <div 
                                        className="h-full bg-gradient-to-r from-cyber-primary to-cyber-secondary" 
                                        style={{ width: stat.val }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </CyberCard>

                <div className="grid grid-cols-2 gap-6">
                    <CyberCard className="flex flex-col items-center justify-center p-6 text-center">
                        <span className="text-4xl font-display font-bold text-white mb-2">5+</span>
                        <span className="text-xs font-tech text-slate-400 tracking-widest">YEARS EXP</span>
                    </CyberCard>
                    <CyberCard className="flex flex-col items-center justify-center p-6 text-center">
                        <span className="text-4xl font-display font-bold text-cyber-secondary mb-2">100%</span>
                        <span className="text-xs font-tech text-slate-400 tracking-widest">COMMITMENT</span>
                    </CyberCard>
                </div>
            </div>

        </div>
      </div>
    </section>
  );
};