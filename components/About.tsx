
import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-4xl font-extrabold text-slate-900 mb-4">About ConstructPro</h2>
            <div className="mb-6 w-24 h-1 bg-amber-500 rounded"></div>
            <p className="text-slate-600 leading-relaxed mb-4">
              With over 20 years of experience in the construction industry, ConstructPro has established itself as a leader in delivering exceptional quality and innovative solutions. Our foundation is built on integrity, reliability, and a relentless pursuit of excellence.
            </p>
            <p className="text-slate-600 leading-relaxed mb-6">
              Our mission is to build more than just structures; we build lasting relationships with our clients by exceeding their expectations and earning their trust through outstanding performance by every member of our construction team.
            </p>
            <a href="#contact" className="inline-block bg-slate-800 text-white font-semibold px-6 py-3 rounded-md hover:bg-slate-900 transition-colors duration-300">
              Work With Us
            </a>
          </div>
          <div className="order-1 md:order-2">
            <img src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1920&auto=format&fit=crop" alt="Construction team meeting" className="rounded-lg shadow-xl w-full h-auto object-cover" loading="lazy" decoding="async"/>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
