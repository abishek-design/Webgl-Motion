
import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import Header from './components/Header';
import Home from './components/sections/Home';
import About from './components/sections/About';
import WhatIDo from './components/sections/WhatIDo';
import MyWorks from './components/sections/MyWorks';
import Contact from './components/sections/Contact';
import Footer from './components/Footer';
import AnimatedParticles from './components/webgl/AnimatedParticles';
import GatePage from './components/GatePage';
import HackingTransition from './components/HackingTransition';

function App() {
  const [isHomeHovered, setIsHomeHovered] = useState(false);
  const [isHeaderActive, setIsHeaderActive] = useState(false);
  const [showGate, setShowGate] = useState(true);
  const [isExitingGate, setIsExitingGate] = useState(false);
  const [showTransition, setShowTransition] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsHeaderActive(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleEnter = () => {
    setIsExitingGate(true);
    setTimeout(() => {
      setShowGate(false);
      setShowTransition(true);
    }, 500); // Match fade-out animation duration
  };
  
  const handleTransitionComplete = () => {
    setShowTransition(false);
  };

  if (showGate) {
    return <GatePage onEnter={handleEnter} isExiting={isExitingGate} />;
  }

  if (showTransition) {
    return <HackingTransition onComplete={handleTransitionComplete} />;
  }

  return (
    <div className="bg-[#0a0a0a] text-slate-200 animate-fade-in">
      <div className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <Suspense fallback={null}>
            <AnimatedParticles isHoverEffectActive={isHomeHovered} />
          </Suspense>
        </Canvas>
      </div>

      <div className="relative z-10">
        <Header isHeaderActive={isHeaderActive} />
        <main>
          <div
            onMouseEnter={() => setIsHomeHovered(true)}
            onMouseLeave={() => setIsHomeHovered(false)}
          >
            <Home isHeaderActive={isHeaderActive} />
          </div>
          <About />
          <WhatIDo />
          <MyWorks />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;