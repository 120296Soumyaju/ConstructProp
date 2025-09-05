import React from "react";
import { SITE_CONTENT } from "../content";

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-slate-50 fade-in">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1 slide-up">
            <h2 className="text-4xl font-extrabold text-slate-900 mb-4">
              {SITE_CONTENT.about.title}
            </h2>
            <div className="mb-6 w-24 h-1 bg-amber-500 rounded"></div>
            <p className="text-slate-600 leading-relaxed mb-4">
              {SITE_CONTENT.about.paragraph1}
            </p>
            <p className="text-slate-600 leading-relaxed mb-6">
              {SITE_CONTENT.about.paragraph2}
            </p>
            <a
              href="#contact"
              className="inline-block bg-slate-800 text-white font-semibold px-6 py-3 rounded-md hover:bg-slate-900 transition-fast focus-visible slide-up"
            >
              {SITE_CONTENT.about.ctaButton}
            </a>
          </div>
          <div className="order-1 md:order-2 slide-up">
            <img
              src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1920&auto=format&fit=crop"
              alt={SITE_CONTENT.about.imageAlt}
              className="rounded-lg shadow-xl w-full h-auto object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
