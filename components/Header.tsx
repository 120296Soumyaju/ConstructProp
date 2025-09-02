import React, { useState, useEffect } from 'react';
import { NAV_LINKS } from '../constants';
import type { NavLink } from '../types';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('#home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);

      // Determine active section
      let currentSection = '#home';
      const scrollY = window.scrollY;

      NAV_LINKS.forEach(link => {
        const section = document.getElementById(link.href.substring(1));
        if (section) {
          // 150px offset to trigger active state a bit before section top
          const sectionTop = section.offsetTop;
          if (scrollY >= sectionTop - 150) {
            currentSection = link.href;
          }
        }
      });
      
      setActiveLink(currentSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run on mount to set initial state
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      // The header height is 80px (h-20)
      const headerOffset = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      // Close mobile menu if open
      if (isOpen) {
        setIsOpen(false);
      }
    }
  };


  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-sm shadow-md' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <a href="#home" onClick={(e) => handleLinkClick(e, '#home')} className="text-2xl font-bold text-slate-900 cursor-pointer">
              Construct<span className="text-amber-500">Pro</span>
            </a>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            {NAV_LINKS.map((link: NavLink) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`font-medium transition-colors duration-300 cursor-pointer ${
                  activeLink === link.href ? 'text-amber-500' : 'text-slate-700 hover:text-amber-500'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="hidden md:block">
            <a href="#contact" onClick={(e) => handleLinkClick(e, '#contact')} className="inline-block bg-amber-500 text-white font-semibold px-5 py-3 rounded-md hover:bg-amber-600 transition-colors duration-300 shadow-sm cursor-pointer">
              Get a Quote
            </a>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-700 hover:text-amber-500 hover:bg-slate-100 focus:outline-none"
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              <span className="sr-only">Open main menu</span>
              <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      <div id="mobile-menu" className={`${isOpen ? 'max-h-96' : 'max-h-0'} md:hidden overflow-hidden transition-all duration-500 ease-in-out bg-white`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {NAV_LINKS.map((link: NavLink) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className={`block px-3 py-2 rounded-md text-base font-medium hover:bg-slate-50 transition-colors duration-300 cursor-pointer ${
                activeLink === link.href ? 'text-amber-500 bg-amber-50' : 'text-slate-700 hover:text-amber-500'
              }`}
            >
              {link.label}
            </a>
          ))}
          <a href="#contact" onClick={(e) => handleLinkClick(e, '#contact')} className="block w-full text-left bg-amber-500 text-white font-semibold px-4 py-3 rounded-md hover:bg-amber-600 transition-colors duration-300 mt-2 cursor-pointer">
            Get a Quote
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
