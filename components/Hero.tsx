import React, { useState, useEffect } from 'react';

const Hero: React.FC = () => {
  const [offsetY, setOffsetY] = useState(0);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const imageUrl = 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1920&auto=format&fit=crop';

  // Effect for preloading the image
  useEffect(() => {
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => {
      setIsImageLoaded(true);
    };
  }, [imageUrl]);
  
  // Effect for parallax scroll
  const handleScroll = () => setOffsetY(window.scrollY);
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="home" className="relative h-screen flex items-center justify-center text-white overflow-hidden bg-slate-800">
      <div
        className={`absolute inset-0 bg-cover bg-center w-full h-full transition-opacity duration-1000 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
        style={{
          backgroundImage: isImageLoaded ? `url('${imageUrl}')` : 'none',
          transform: `translateY(${offsetY * 0.4}px)`,
        }}
        aria-hidden="true"
      ></div>
      <div className="absolute inset-0 bg-black opacity-60"></div>
      <div className="relative z-10 text-center px-4">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-4 animate-fade-in-down" style={{ opacity: 0 }}>
          Building Your Vision, <br />
          <span className="text-amber-400">Creating Reality</span>
        </h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8 text-slate-200 animate-fade-in-up animation-delay-300" style={{ opacity: 0 }}>
          We are a team of dedicated professionals committed to delivering high-quality construction projects on time and within budget.
        </p>
        <a
          href="#projects"
          className="inline-block bg-amber-500 text-white font-bold text-lg px-8 py-4 rounded-md hover:bg-amber-600 transition-all duration-300 transform hover:scale-105 shadow-lg animate-fade-in-up animation-delay-600"
          style={{ opacity: 0 }}
        >
          View Our Work
        </a>
      </div>
    </section>
  );
};

export default Hero;