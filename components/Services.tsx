
import React from 'react';
import { SITE_CONTENT } from '../content';
import type { Service } from '../types';

const ServiceCard: React.FC<{ service: Service }> = ({ service }) => {
  const Icon = service.icon;
  return (
    <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-2">
      <div className="flex items-center justify-center h-16 w-16 rounded-full bg-amber-100 mb-6">
        <Icon className="h-8 w-8 text-amber-500" />
      </div>
      <h3 className="text-2xl font-bold text-slate-800 mb-3">{service.title}</h3>
      <p className="text-slate-600 leading-relaxed">{service.description}</p>
    </div>
  );
};

const Services: React.FC = () => {
  return (
    <section id="services" className="py-20 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-slate-900">{SITE_CONTENT.services.title}</h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            {SITE_CONTENT.services.subtitle}
          </p>
          <div className="mt-4 mx-auto w-24 h-1 bg-amber-500 rounded"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SITE_CONTENT.services.items.map((service, index) => (
            <ServiceCard key={index} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;