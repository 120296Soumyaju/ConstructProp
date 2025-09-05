import React from "react";
import { SITE_CONTENT } from "../content";
import type { Testimonial } from "../types";
import QuoteIcon from "./icons/QuoteIcon";

const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({
  testimonial,
}) => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md flex flex-col h-full fade-in">
      <QuoteIcon className="w-10 h-10 text-amber-300 mb-4" />
      <p className="text-slate-600 italic mb-6 flex-grow">
        "{testimonial.quote}"
      </p>
      <div className="flex items-center mt-auto">
        <img
          className="w-14 h-14 rounded-full mr-4 object-cover"
          src={testimonial.avatar}
          alt={testimonial.name}
          loading="lazy"
          decoding="async"
        />
        <div>
          <p className="font-bold text-slate-800">{testimonial.name}</p>
          <p className="text-slate-500 text-sm">{testimonial.title}</p>
        </div>
      </div>
    </div>
  );
};

const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-20 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-slate-900">
            {SITE_CONTENT.testimonials.title}
          </h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            {SITE_CONTENT.testimonials.subtitle}
          </p>
          <div className="mt-4 mx-auto w-24 h-1 bg-amber-500 rounded"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SITE_CONTENT.testimonials.items.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
