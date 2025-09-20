
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

export interface ImageSource {
  src: string;
  srcSet: string;
  sizes: string;
}
export interface Project {
  image: ImageSource;
  title: string;
  category: string;
  description: string;
  location: string;
  client: string;
}

/*export interface Testimonial {
  quote: string;
  name: string;
  title: string;
  avatar: string;
}*/
