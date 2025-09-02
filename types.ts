
import React from 'react';

export interface NavLink {
  href: string;
  label: string;
}

export interface Service {
  icon: React.ElementType;
  title: string;
  description: string;
}

export interface Project {
  image: string;
  title: string;
  category: string;
  description: string;
  location: string;
  client: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  title: string;
  avatar: string;
}
