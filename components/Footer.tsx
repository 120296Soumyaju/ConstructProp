import React from 'react';
import { NAV_LINKS } from '../constants';
import FacebookIcon from './icons/FacebookIcon';
import TwitterIcon from './icons/TwitterIcon';
import LinkedInIcon from './icons/LinkedInIcon';
import InstagramIcon from './icons/InstagramIcon';

const Footer: React.FC = () => {
  const socialLinks = [
    { href: '#', icon: FacebookIcon, name: 'Facebook' },
    { href: '#', icon: TwitterIcon, name: 'Twitter' },
    { href: '#', icon: LinkedInIcon, name: 'LinkedIn' },
    { href: '#', icon: InstagramIcon, name: 'Instagram' },
  ];

  return (
    <footer className="bg-slate-800 text-slate-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="md:col-span-2 lg:col-span-1">
            <h3 className="text-2xl font-bold text-white mb-4">
              Construct<span className="text-amber-500">Pro</span>
            </h3>
            <p className="text-slate-400 leading-relaxed">
              Building the Future, One Project at a Time. Our commitment is to quality, integrity, and client satisfaction.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {NAV_LINKS.map(link => (
                <li key={link.href}>
                  <a href={link.href} className="hover:text-amber-400 transition-colors duration-300">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Contact Us</h4>
            <ul className="space-y-2 text-slate-400">
              <li>123 Construction Ave, Metropolis, USA</li>
              <li>(123) 456-7890</li>
              <li>contact@constructpro.com</li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              {socialLinks.map(({ href, icon: Icon, name }) => (
                <a
                  key={name}
                  href={href}
                  aria-label={`Follow us on ${name}`}
                  className="text-slate-400 hover:text-amber-400 transition-colors duration-300"
                >
                  <Icon className="w-6 h-6" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-slate-900 py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-slate-500">
          <p>&copy; {new Date().getFullYear()} ConstructPro. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
