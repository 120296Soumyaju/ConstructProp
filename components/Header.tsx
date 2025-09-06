import React, { useState, useEffect } from "react";
import { SITE_CONTENT } from "../content";
import type { NavLink } from "../types";

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("#home");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);

      // Active section tracking
      let currentSection = "#home";
      const scrollY = window.scrollY;
      SITE_CONTENT.navLinks.forEach((link) => {
        const section = document.getElementById(link.href.substring(1));
        if (section) {
          const sectionTop = section.offsetTop;
          if (scrollY >= sectionTop - 150) {
            currentSection = link.href;
          }
        }
      });
      setActiveLink(currentSection);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const headerOffset = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      if (isOpen) setIsOpen(false);
    }
  };

  //Handle logo click to scroll to #home locally, with external URL as fallback
  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    handleLinkClick(e, "#home");
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 
        ${
          isScrolled
            ? "bg-white/80 backdrop-blur-sm shadow-md"
            : "bg-white/50 backdrop-blur-sm" // Reverted to black overlay for contrast
        }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a
              href="https://benoit.ae/" // External URL for live site
              onClick={handleLogoClick} // Local scroll to #home during development
              className="cursor-pointer focus-visible fade-in flex items-center"
            >
              <img
                src={SITE_CONTENT.header.logo}
                alt={SITE_CONTENT.header.altText}
                className="h-14 w-auto"
              />
            </a>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            {SITE_CONTENT.navLinks.map((link: NavLink) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`font-medium transition-colors duration-300 cursor-pointer ${
                  activeLink === link.href
                    ? "text-blue-ribbon"
                    : isScrolled
                    ? "text-slate-700 hover:text-blue-ribbon"
                    : "text-black hover:text-blue-ribbon" // Changed from text-black to text-white
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, "#contact")}
              className={`inline-block font-semibold px-5 py-3 rounded-md shadow-sm transition-fast ${
                isScrolled
                  ? "bg-blue-ribbon text-white hover:bg-blue-700"
                  : "bg-white text-blue-ribbon hover:bg-slate-100" // Aligned with blue-ribbon theme
              }`}
            >
              {SITE_CONTENT.header.quoteButton}
            </a>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`inline-flex items-center justify-center p-2 rounded-md focus:outline-none ${
                isScrolled
                  ? "text-slate-700 hover:text-blue-ribbon hover:bg-slate-100"
                  : "text-white hover:text-blue-ribbon"
              }`}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              <span className="sr-only">{SITE_CONTENT.header.srOpenMenu}</span>
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={`${
          isOpen ? "max-h-96" : "max-h-0"
        } md:hidden overflow-hidden transition-all duration-500 ease-in-out bg-white`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {SITE_CONTENT.navLinks.map((link: NavLink) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                activeLink === link.href
                  ? "text-blue-ribbon bg-blue-50"
                  : "text-slate-700 hover:text-blue-ribbon"
              }`}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => handleLinkClick(e, "#contact")}
            className="block w-full text-left bg-blue-ribbon text-white font-semibold px-4 py-3 rounded-md hover:bg-blue-700 mt-2"
          >
            {SITE_CONTENT.header.quoteButton}
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;