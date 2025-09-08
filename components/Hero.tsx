import React, { useState, useEffect, useRef } from "react";
import { SITE_CONTENT } from "../content";

const Hero: React.FC = () => {
  const [offsetY, setOffsetY] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Parallax effect
  const handleScroll = () => setOffsetY(window.scrollY);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Ensure autoplay works
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.error("Video autoplay was prevented:", error);
      });
    }
  }, []);

  const handleCtaClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const targetElement = document.getElementById("projects");
    if (targetElement) {
      const headerOffset = 80; // header height
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
      {/* Video Background */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        /*poster={SITE_CONTENT.hero.bannerUrL}*/ // Poster only shows if video fails/blocked
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          transform: `translateY(${offsetY * 0.4}px)`,
        }}
        aria-hidden="true"
      >
        {SITE_CONTENT.hero.videoSources.map((video, idx) => (
          <source key={idx} src={video.src} type={video.type} />
        ))}
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-2 text-white drop-shadow-2xl fade-in">
          {SITE_CONTENT.hero.titleL1}
        </h1>
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6 text-[#35b0e9] drop-shadow-2xl fade-in">
          {SITE_CONTENT.hero.titleL2}
        </h2>
        <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8 text-slate-200 slide-up">
          {SITE_CONTENT.hero.subtitle}
        </p>
        <a
          href="#projects"
          onClick={handleCtaClick}
          className="inline-block bg-[#35b0e9] text-white font-bold text-lg px-8 py-4 rounded-md hover:bg-white hover:text-[#0443F2] transition-fast focus-visible slide-up shadow-lg cursor-pointer"
        >
          {SITE_CONTENT.hero.ctaButton}
        </a>
      </div>
    </section>
  );
};

export default Hero;
