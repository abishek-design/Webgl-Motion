import React, { useState, useEffect, useCallback } from 'react';
import myphoto from '../image/myphoto.png';

const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#services', label: 'What I Do' },
  { href: '#works', label: 'My Works' },
  { href: '#contact', label: 'Contact' },
];

interface HeaderProps {
  isHeaderActive: boolean;
}

const Header: React.FC<HeaderProps> = ({ isHeaderActive }) => {
  const [activeSection, setActiveSection] = useState('#home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      const style = window.getComputedStyle(targetElement);
      const scrollMargin = parseFloat(style.scrollMarginTop) || 0;
      const y = targetElement.getBoundingClientRect().top + window.scrollY - scrollMargin;

      window.scrollTo({ top: y, behavior: 'smooth' });
      
      // Manually update URL hash for better history management
      if(history.pushState) {
          history.pushState(null, '', href);
      } else {
          location.hash = href;
      }

      setActiveSection(href);
      setIsMenuOpen(false); // Close menu on click
    }
  };

  const handleScroll = useCallback(() => {
    const sections = navLinks.map(link => document.getElementById(link.href.substring(1)));
    let currentSection = '#home';

    for (const section of sections) {
        if (section) {
            const rect = section.getBoundingClientRect();
            // Check if section is in the upper part of the viewport
            if (rect.top <= 150 && rect.bottom >= 150) {
                currentSection = `#${section.id}`;
                break;
            }
        }
    }
    
    if (activeSection !== currentSection) {
      setActiveSection(currentSection);
    }
  }, [activeSection]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); 
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${isHeaderActive || isMenuOpen ? 'bg-black/50 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
            <div className={`
                relative w-10 h-10 
                rounded-full overflow-hidden 
                transition-all duration-700 ease-in-out
                bg-black/20
                ${isHeaderActive ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}
            `}>
                  {/* Use import for Vite/Vercel compatibility */}
                  {(() => {
                    try {
                        return (
                          <img
                            src={myphoto}
                            alt="My Photo"
                            className="w-full h-full object-cover rounded-full block"
                            style={{ display: 'block' }}
                          />
                        );
                      } catch {
                        return null;
                      }
                  })()}
            </div>
            <a 
              href="#home" 
              onClick={(e) => handleNavClick(e, '#home')}
              className="text-2xl font-bold text-white hover:text-purple-400 transition-colors duration-300 text-glow"
            >
              {isHeaderActive ? 'Abishek S' : 'Portfolio'}
            </a>
        </div>
        <nav className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <a 
              key={link.href} 
              href={link.href} 
              onClick={(e) => handleNavClick(e, link.href)}
              className={`font-medium transition-colors duration-300 ${
                activeSection === link.href 
                  ? 'text-purple-400' 
                  : 'text-slate-300 hover:text-purple-400'
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="md:hidden">
            <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-slate-200 hover:text-purple-400 focus:outline-none"
                aria-label="Toggle navigation menu"
            >
                {isMenuOpen ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                )}
            </button>
        </div>
      </div>
      <div className={`
        md:hidden overflow-hidden transition-all duration-300 ease-in-out
        ${isMenuOpen ? 'max-h-96 border-t border-purple-900/30' : 'max-h-0'}
      `}>
          <nav className="flex flex-col">
              {navLinks.map((link) => (
                  <a 
                      key={link.href} 
                      href={link.href} 
                      onClick={(e) => handleNavClick(e, link.href)}
                      className={`w-full text-center py-3 font-medium transition-colors duration-300 ${
                          activeSection === link.href 
                          ? 'text-purple-400 bg-purple-900/20' 
                          : 'text-slate-300 hover:text-purple-400 hover:bg-purple-900/10'
                      }`}
                  >
                      {link.label}
                  </a>
              ))}
          </nav>
      </div>
    </header>
  );
};

export default Header;
