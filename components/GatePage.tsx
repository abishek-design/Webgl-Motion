import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import GateAnimation from './webgl/GateAnimation';

interface GatePageProps {
  onEnter: () => void;
  isExiting: boolean;
}

const GatePage: React.FC<GatePageProps> = ({ onEnter, isExiting }) => {
  return (
    <div className={`
      fixed top-0 left-0 w-full h-full bg-[#0a0a0a] z-50
      ${isExiting ? 'animate-fade-out' : 'animate-fade-in'}
    `}>
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <Suspense fallback={null}>
          <GateAnimation />
        </Suspense>
      </Canvas>
      <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center text-center text-white p-4">
        <div className="z-10">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 text-glow">
            Welcome to My Space
          </h1>
          <p className="text-lg md:text-xl text-slate-300 mb-12 max-w-2xl">
            A journey through creativity, code, and artificial intelligence.
          </p>
          <button
            onClick={onEnter}
            className="
              relative ripple-button
              bg-purple-600/80 text-white font-bold text-lg 
              px-8 py-4 rounded-full
              border-2 border-purple-500/90
              hover:bg-purple-500/80 hover:scale-105
              transition-all duration-300 ease-in-out
              card-glow
              animate-float
            "
          >
            Let's Dive In
          </button>
        </div>
      </div>
    </div>
  );
};

export default GatePage;