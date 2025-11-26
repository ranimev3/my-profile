import React from 'react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip } from 'recharts';
import { Section, Skill } from '../types';
import { CyberCard } from './ui/CyberCard';

const skillsData = [
  { subject: 'React', A: 95, fullMark: 100 },
  { subject: 'TypeScript', A: 90, fullMark: 100 },
  { subject: 'Node.js', A: 85, fullMark: 100 },
  { subject: 'Design', A: 75, fullMark: 100 },
  { subject: 'Web3', A: 80, fullMark: 100 },
  { subject: 'DevOps', A: 70, fullMark: 100 },
];

const techStack = [
    { category: 'FRONTEND', items: ['React 18', 'Next.js', 'Tailwind', 'Three.js', 'Framer Motion'] },
    { category: 'BACKEND', items: ['Node.js', 'Python', 'PostgreSQL', 'Redis', 'GraphQL'] },
    { category: 'TOOLS', items: ['Docker', 'AWS', 'Git', 'Figma', 'Vite'] },
    { category: 'AI & DATA', items: ['Gemini API', 'TensorFlow.js', 'D3.js', 'LangChain'] },
];

export const Skills: React.FC = () => {
  return (
    <section id={Section.SKILLS} className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
            <h2 className="text-cyber-primary font-tech tracking-widest text-sm mb-2">SYSTEM ANALYSIS</h2>
            <h3 className="text-3xl md:text-4xl font-display font-bold text-white">SKILL SYNCHRONIZATION</h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Chart Column */}
            <div className="lg:col-span-1 h-[400px]">
                <CyberCard className="h-full flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={skillsData}>
                            <PolarGrid stroke="#334155" />
                            <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 12, fontFamily: 'Rajdhani' }} />
                            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                            <Radar
                                name="Proficiency"
                                dataKey="A"
                                stroke="#06b6d4"
                                strokeWidth={2}
                                fill="#06b6d4"
                                fillOpacity={0.3}
                            />
                            <Tooltip 
                                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#f1f5f9' }}
                                itemStyle={{ color: '#06b6d4' }}
                            />
                        </RadarChart>
                    </ResponsiveContainer>
                </CyberCard>
            </div>

            {/* List Column */}
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                {techStack.map((stack) => (
                    <CyberCard key={stack.category} title={stack.category}>
                        <div className="flex flex-wrap gap-2">
                            {stack.items.map((item) => (
                                <span 
                                    key={item} 
                                    className="px-3 py-1 bg-cyber-gray/50 border border-cyber-gray text-slate-300 text-sm font-tech hover:border-cyber-primary hover:text-cyber-primary transition-colors cursor-default"
                                >
                                    {item}
                                </span>
                            ))}
                        </div>
                    </CyberCard>
                ))}
            </div>
        </div>
      </div>
    </section>
  );
};
