import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Forum } from './components/Forum';
import { Footer } from './components/Footer';
import { ChatWidget } from './components/ChatWidget';
import { Section } from './types';

function App() {
  const [activeSection, setActiveSection] = useState<Section>(Section.HERO);

  const handleNavigate = (section: Section) => {
    setActiveSection(section);
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-cyber-dark text-slate-200 selection:bg-cyber-primary selection:text-cyber-black font-sans">
      <Navbar activeSection={activeSection} onNavigate={handleNavigate} />
      
      <main className="flex flex-col">
        <Hero onNavigate={handleNavigate} />
        <About />
        <Skills />
        <Projects />
        <Forum />
      </main>
      
      <Footer />
      <ChatWidget />
    </div>
  );
}

export default App;