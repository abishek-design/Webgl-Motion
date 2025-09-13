import React from 'react';
import AnimatedSection from '../AnimatedSection';

const About: React.FC = () => {
  return (
    <AnimatedSection id="about" className="bg-black/20">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <div className="mx-auto w-80 h-80 md:w-96 md:h-96 rounded-full card-glow bg-black/20 border-2 border-purple-900/40">
          {/* About image in circular frame */}
          <div className="relative w-full h-full">
            {/* Use import for Vite/Vercel compatibility */}
            {(() => {
              try {
                // @ts-ignore
                const aboutImg = require('../../image/about.png');
                return (
                  <img
                    src={aboutImg}
                    alt="About"
                    className="absolute inset-0 w-full h-full object-cover rounded-full"
                  />
                );
              } catch {
                return null;
              }
            })()}
          </div>
        </div>
        <div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white text-glow">About Me</h2>
          <p className="text-slate-300 mb-4 text-lg leading-relaxed">
             I’m Abishek S, a passionate individual with a strong mindset and a drive to create meaningful work. I believe growth begins from scratch, and every project is an opportunity to learn and innovate. With dedication, I approach challenges as stepping stones toward progress.
          </p>
          <p className="text-slate-300 text-lg leading-relaxed">
           I use AI tools effectively not as shortcuts, but as companions that enhance my creativity and efficiency. My passion lies in coding and problem solving, where I focus on building not just solutions but experiences. I thrive on shaping ideas into impactful results that connect with people.
          </p>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default About;
