import React from 'react';

interface CyberCardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  variant?: 'default' | 'hollow' | 'glass';
}

export const CyberCard: React.FC<CyberCardProps> = ({ children, className = '', title, variant = 'default' }) => {
  const getBackground = () => {
    switch (variant) {
      case 'hollow': return 'bg-transparent';
      case 'glass': return 'bg-cyber-dark/30 backdrop-blur-md border-cyber-gray/20';
      default: return 'bg-cyber-gray/20 backdrop-blur-sm border-cyber-gray/30';
    }
  };

  return (
    <div className={`relative group ${className}`}>
      {/* Precision Corners (RWA Style) */}
      <div className="absolute top-0 left-0 w-[1px] h-3 bg-cyber-primary transition-all group-hover:h-full group-hover:opacity-50 duration-500 opacity-70" />
      <div className="absolute top-0 left-0 w-3 h-[1px] bg-cyber-primary transition-all group-hover:w-full group-hover:opacity-50 duration-500 opacity-70" />
      <div className="absolute bottom-0 right-0 w-[1px] h-3 bg-cyber-primary transition-all group-hover:h-full group-hover:opacity-50 duration-500 opacity-70" />
      <div className="absolute bottom-0 right-0 w-3 h-[1px] bg-cyber-primary transition-all group-hover:w-full group-hover:opacity-50 duration-500 opacity-70" />
      
      {/* Main Content Container */}
      <div className={`
        relative z-10 h-full p-6
        ${getBackground()}
        border
        hover:border-cyber-primary/40 transition-colors duration-500
      `}>
        {title && (
            <div className="mb-6 flex items-center justify-between border-b border-white/5 pb-2">
                <h3 className="font-display text-sm tracking-[0.2em] text-cyber-primary uppercase">{title}</h3>
                <div className="flex gap-1">
                    <div className="w-1 h-1 bg-cyber-primary rounded-full animate-pulse" />
                    <div className="w-1 h-1 bg-cyber-primary/50 rounded-full" />
                </div>
            </div>
        )}
        {children}
      </div>

      {/* Subtle Grid overlay for texture */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />
    </div>
  );
};