import React, { useState } from 'react';
import AnimatedSection from '../AnimatedSection';

const works = [
  {
    id: 1,
    title: 'UI/UX Design',
    description: 'Crafting intuitive, user-centric interfaces that are both beautiful and highly functional, with a focus on creating seamless user experiences.',
    imageUrl: 'https://picsum.photos/seed/design/800/600',
  },
  {
    id: 2,
    title: 'Web Development',
    description: 'Building robust, scalable, and high-performance web applications from the ground up using modern frameworks and technologies.',
    imageUrl: 'https://picsum.photos/seed/development/800/600',
  },
  {
    id: 3,
    title: 'AI & Automation',
    description: 'Integrating artificial intelligence to create smarter, more efficient systems, from intelligent agents to automated workflows.',
    imageUrl: 'https://picsum.photos/seed/ai/800/600',
  },
];

const MyWorks: React.FC = () => {
    const [hoveredId, setHoveredId] = useState<number | null>(null);

    return (
        <AnimatedSection id="works" className="bg-black/20">
            <div className="text-center">
                <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white text-glow">My Works</h2>
                <p className="text-lg text-slate-300 max-w-3xl mx-auto mb-12">
                    Here's a breakdown of my core competencies. Hover over a card to see more.
                </p>
            </div>
            <div className="flex flex-col md:flex-row gap-4 h-auto md:h-[450px]">
                {works.map((work) => (
                    <div
                        key={work.id}
                        onMouseEnter={() => setHoveredId(work.id)}
                        onMouseLeave={() => setHoveredId(null)}
                        className="
                            relative rounded-lg overflow-hidden cursor-pointer
                            group
                            transition-all duration-700 ease-in-out
                            border border-purple-900/30
                            card-glow
                        "
                        style={{ 
                            flex: hoveredId === null ? '1' : (hoveredId === work.id ? '2.5' : '1')
                        }}
                    >
                        <img 
                            src={work.imageUrl} 
                            alt={work.title} 
                            className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                        />
                        <div className="absolute top-0 left-0 w-full h-full bg-black/60 group-hover:bg-black/70 transition-colors duration-500" />
                        
                        <div className="relative z-10 p-8 flex flex-col items-center justify-center text-center h-full">
                             <h3 
                                className="text-2xl lg:text-3xl font-bold text-white transition-all duration-500 ease-in-out mb-4"
                            >
                                {work.title}
                            </h3>
                            
                            <div 
                                className="
                                    transition-all duration-500 ease-in-out
                                "
                                style={{
                                    maxHeight: hoveredId === work.id ? '200px' : '0',
                                    opacity: hoveredId === work.id ? 1 : 0,
                                    overflow: 'hidden'
                                }}
                            >
                                <p className="text-slate-300">
                                    {work.description}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </AnimatedSection>
    );
};

export default MyWorks;