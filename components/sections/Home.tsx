import React from 'react';

interface HomeProps {
  isHeaderActive: boolean;
}

const Home: React.FC<HomeProps> = ({ isHeaderActive }) => {
  return (
    <section id="home" className="w-full flex items-center justify-center pt-28 md:pt-32 pb-12 md:pb-16 scroll-mt-24">
      <div className="container mx-auto px-6 z-10">
        <div className="flex flex-col-reverse md:grid md:grid-cols-2 items-center gap-8 md:gap-4 w-full max-w-6xl mx-auto">
            
            {/* Text Content */}
            <div className="text-center md:text-left">
                <h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-8 text-glow">
                  <span className="block text-purple-400">Hii,</span>
                  <span className="block">I'M Abishek S</span>
                </h1>
                <div className="text-lg md:text-xl text-slate-300 space-y-6 max-w-xl">
                <p>
                    We live in an era where anything is possible when we truly engage our minds, and that belief drives me to start from scratch, learning and growing with every project. I embrace intelligent tools not as shortcuts, but as companions that expand my creativity. For me, coding is more than building websites—it’s about shaping experiences that connect, inspire, and leave an impact.
                </p>
                </div>
            </div>
            
            {/* Image with Circular Frame */}
            <div className="flex-shrink-0 flex justify-center md:justify-end">
                 <div 
                    className={`
                        relative w-64 h-64 md:w-80 md:h-80 
                        rounded-full 
                        border-2 border-purple-900/40 
                        card-glow
                        bg-black/20
                        transition-all duration-700 ease-in-out
                        ${isHeaderActive 
                            ? 'opacity-0 scale-50 -translate-y-20 md:-translate-x-20' 
                            : 'opacity-100 scale-100 translate-y-0 translate-x-0'
                        }
                    `}
                >
                    {/* User's image will go here */}
                    {/* Use import for Vite/Vercel compatibility */}
                    {(() => {
                      try {
                        // @ts-ignore
                        const myPhoto = require('../../image/myphoto.png');
                        return (
                          <img
                            src={myPhoto}
                            alt="My Photo"
                            className="w-full h-full object-cover rounded-full"
                            style={{ position: 'absolute', top: 0, left: 0 }}
                          />
                        );
                      } catch {
                        return null;
                      }
                    })()}
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
