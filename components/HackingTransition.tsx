import React, { useState, useEffect, useRef } from 'react';

const transitionPhrases = [
  "INITIALIZING_SYSTEM...",
  "CONNECTING_TO_SERVER...",
  "DECRYPTING_ASSETS...",
  "COMPILING_SCRIPTS...",
  "YOUR ARE HACKED!!!!!!!...",
];

interface HackingTransitionProps {
  onComplete: () => void;
}

const HackingTransition: React.FC<HackingTransitionProps> = ({ onComplete }) => {
  const [currentText, setCurrentText] = useState(transitionPhrases[0]);
  const [phase, setPhase] = useState<'text' | 'binary'>('text');
  const [isFadingOut, setIsFadingOut] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioRef = useRef<{ context: AudioContext | null, gain: GainNode | null }>({ context: null, gain: null });

  // Helper to speak text safely
  const speak = (text: string, volume = 0.8, rate = 0.9) => {
    try {
      if (window.speechSynthesis && typeof SpeechSynthesisUtterance !== 'undefined') {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.volume = volume;
        utterance.rate = rate;
        window.speechSynthesis.speak(utterance);
      }
    } catch (error) {
      console.error("Speech synthesis failed:", error);
    }
  };

  // Phase 1: Text animation and initial speech
  useEffect(() => {
    if (phase !== 'text') return;
    // Only speak if not already spoken (prevent duplicate)
    if (!(window as any).__welcomeSpoken) {
      speak("Welcome to my world");
      (window as any).__welcomeSpoken = true;
    }

    let phraseIndex = 0;
    const interval = setInterval(() => {
      phraseIndex++;
      if (phraseIndex < transitionPhrases.length) {
        setCurrentText(transitionPhrases[phraseIndex]);
      }
    }, 300);

    const timeout = setTimeout(() => {
      clearInterval(interval);
      setPhase('binary');
    }, 2000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [phase]);

  // Phase 2: Binary rain, sound, final speech, and fade-out
  useEffect(() => {
    if (phase !== 'binary') return;

    // --- Sound Effect Setup ---
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContext) {
        const context = new AudioContext();
        const gain = context.createGain();
        gain.gain.setValueAtTime(0.05, context.currentTime); // Start at low volume
        gain.connect(context.destination);
        
        const oscillator = context.createOscillator();
        oscillator.type = 'sawtooth';
        oscillator.frequency.setValueAtTime(800, context.currentTime);
        oscillator.connect(gain);
        oscillator.start();
        
        audioRef.current = { context, gain };
      }
    } catch (error) {
        console.error("Web Audio API not supported or failed:", error);
    }

    // --- Canvas Setup ---
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const characters = '01';
    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array(columns).fill(1);
    let animationFrameId: number;

    const draw = () => {
      ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(55, 255, 0, 1)';
      ctx.font = `${fontSize}px 'Share Tech Mono', monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      animationFrameId = requestAnimationFrame(draw);
    };
    draw();

    // --- Transition Sequence ---
    const sequenceTimeout = setTimeout(() => {
      // 1. Speak "Access granted"
      speak("Access granted", 1.0, 1.0);
      
      // 2. Start fade out visual
      setIsFadingOut(true);

      // 3. Fade out sound
      if (audioRef.current.context && audioRef.current.gain) {
        const { context, gain } = audioRef.current;
        gain.gain.exponentialRampToValueAtTime(0.00001, context.currentTime + 0.5);
      }

      // 4. Call onComplete after fade animation
      setTimeout(onComplete, 500); // Match fadeOut duration

    }, 1000); // Duration of binary rain before final sequence

    // --- Cleanup ---
    return () => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(sequenceTimeout);
      if (audioRef.current.context) {
        audioRef.current.context.close().catch(console.error);
      }
    };
  }, [phase, onComplete]);


  return (
    <div className={`
      fixed top-0 left-0 w-full h-full bg-[#0a0a0a] flex items-center justify-center z-50 
      transition-opacity duration-500
      ${isFadingOut ? 'opacity-0' : 'opacity-100'}
    `}>
        {phase === 'text' && (
             <div className="text-center" style={{ fontFamily: "'Share Tech Mono', monospace" }}>
                <p className="text-2xl md:text-4xl text-green-400 animate-flicker">
                {currentText}
                </p>
            </div>
        )}
        {phase === 'binary' && (
            <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />
        )}
    </div>
  );
};

export default HackingTransition;
