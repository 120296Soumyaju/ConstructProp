import React, { useState, useEffect, useRef } from "react";
import { SITE_CONTENT } from "../content";

const Hero: React.FC = () => {
  const [offsetY, setOffsetY] = useState(0);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const { videoUrl } = SITE_CONTENT.hero;
  const posterUrl = SITE_CONTENT.siteMetadata.ogImage;

  // Effect for parallax scroll
  const handleScroll = () => setOffsetY(window.scrollY);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Effect to ensure video plays
  useEffect(() => {
    if (isVideoLoaded && videoRef.current) {
      videoRef.current.play().catch((error) => {
        // Autoplay was prevented.
        console.error("Video autoplay was prevented:", error);
      });
    }
  }, [isVideoLoaded]);

  const handleCtaClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const targetElement = document.getElementById("projects");
    if (targetElement) {
      // Header height is 80px (h-20 in Header.tsx)
      const headerOffset = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="home"
      className="relative h-screen flex items-center justify-center text-white overflow-hidden"
    >
      {/* Fallback static image with parallax */}
      <img
        src={posterUrl}
        alt="Construction site background"
        aria-hidden="true"
        className="absolute inset-0 object-cover w-full h-full"
        style={{ transform: `translateY(${offsetY * 0.4}px)` }}
      />

      {/* Video that fades in over the image */}
      <video
        ref={videoRef}
        src={videoUrl}
        autoPlay
        muted
        loop
        playsInline
        onLoadedData={() => setIsVideoLoaded(true)}
        className={`absolute inset-0 object-cover w-full h-full transition-opacity duration-1000 ${
          isVideoLoaded ? "opacity-100" : "opacity-0"
        }`}
        style={{
          transform: `translateY(${offsetY * 0.4}px)`,
        }}
        aria-hidden="true"
      />

      <div className="absolute inset-0 bg-black opacity-40"></div>

      <div className="relative z-10 text-center px-4">
        {/* Main Title */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-2 text-white drop-shadow-2xl fade-in">
          {SITE_CONTENT.hero.titleL1}
        </h1>

        {/* Sub Title (same size but amber) */}
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6 text-amber-400 drop-shadow-2xl fade-in">
          {SITE_CONTENT.hero.titleL2}
        </h2>

        {/* Subtitle (smaller paragraph) */}
        <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8 text-slate-200 slide-up">
          {SITE_CONTENT.hero.subtitle}
        </p>
        <a
          href="#projects"
          onClick={handleCtaClick}
          className="inline-block bg-amber-500 text-white font-bold text-lg px-8 py-4 rounded-md hover:bg-amber-600 transition-fast focus-visible slide-up shadow-lg cursor-pointer"
        >
          {SITE_CONTENT.hero.ctaButton}
        </a>
      </div>
    </section>
  );
};

export default Hero;
