import React from 'react';
import AnimatedSection from '../AnimatedSection';

const services = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
    title: 'UI/UX Designer',
    description: 'Designing intuitive and engaging user interfaces with a focus on user experience and visual aesthetics.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    title: 'Web Developer',
    description: 'Building responsive, high-performance web applications with modern frameworks and cutting-edge technologies.',
  },
  {
    icon: (
       <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 00-7.072 0m7.072 7.072a5 5 0 01-7.072 0"/>
       </svg>
    ),
    title: 'AI Agent & Automation',
    description: 'Leveraging AI to build intelligent agents and automate processes, creating efficient and innovative solutions.',
  },
];

const skills = [
    'HTML', 'CSS', 'JavaScript', 'React', 'WebGL',
    'Supabase', 'API Integration',
    'Java', 'C', 'C++', 'Python',
    'Git & GitHub', 'AI-Assisted Development', 'forex analyzer', 
];

const WhatIDo: React.FC = () => {
  return (
    <AnimatedSection id="services">
      <div className="text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white text-glow">What I Do</h2>
        <p className="text-lg text-slate-300 max-w-3xl mx-auto mb-12">
          I combine design and technology to create digital products that are not only beautiful but also highly functional.
        </p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <div key={index} className="bg-gray-900/50 p-8 rounded-lg border border-purple-900/30 card-glow transition-transform duration-300 hover:-translate-y-2">
            <div className="mb-6">{service.icon}</div>
            <h3 className="text-2xl font-bold text-white mb-3">{service.title}</h3>
            <p className="text-slate-400">{service.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-16">
        <h3 className="text-3xl font-bold text-center mb-12 text-white text-glow">My Tech Stack</h3>
        <div className="relative w-full overflow-hidden mask-image-linear-gradient">
      <div className="flex animate-scroll min-w-max">
        {[...skills, ...skills].map((skill, index) => (
          <div key={index} className="flex-shrink-0 bg-gray-800/60 text-purple-300 text-lg font-medium px-6 py-3 rounded-full mx-4 border border-purple-900/50 whitespace-nowrap">
            {skill}
          </div>
        ))}
      </div>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default WhatIDo;
