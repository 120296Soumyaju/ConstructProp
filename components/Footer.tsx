import React from "react";
import { SITE_CONTENT } from "../content";
import FacebookIcon from "./icons/FacebookIcon";
import TwitterIcon from "./icons/TwitterIcon";
import LinkedInIcon from "./icons/LinkedInIcon";
import InstagramIcon from "./icons/InstagramIcon";

const Footer: React.FC = () => {
  const socialLinks = [
    { href: "#", icon: FacebookIcon, name: "Facebook" },
    { href: "#", icon: TwitterIcon, name: "Twitter" },
    { href: "#", icon: LinkedInIcon, name: "LinkedIn" },
    { href: "#", icon: InstagramIcon, name: "Instagram" },
  ];

  return (
    <footer className="bg-slate-800 text-slate-300 fade-in">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="md:col-span-2 lg:col-span-1">
            <h3 className="text-2xl font-bold text-white mb-4">
              {SITE_CONTENT.footer.about.title}
              <span className="text-amber-500">
                {SITE_CONTENT.footer.about.titleHighlight}
              </span>
            </h3>
            <p className="text-slate-400 leading-relaxed">
              {SITE_CONTENT.footer.about.description}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">
              {SITE_CONTENT.footer.quickLinksTitle}
            </h4>
            <ul className="space-y-2">
              {SITE_CONTENT.navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="hover:text-amber-400 transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">
              {SITE_CONTENT.footer.contactTitle}
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>{SITE_CONTENT.contact.info.address.full}</li>
              <li>{SITE_CONTENT.contact.info.phone}</li>
              <li>{SITE_CONTENT.contact.info.email}</li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">
              {SITE_CONTENT.footer.followUsTitle}
            </h4>
            <div className="flex space-x-4 slide-up">
              {socialLinks.map(({ href, icon: Icon, name }) => (
                <a
                  key={name}
                  href={href}
                  aria-label={`Follow us on ${name}`}
                  className="text-slate-400 hover:text-amber-400 transition-fast focus-visible"
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
          <p>
            &copy; {new Date().getFullYear()} {SITE_CONTENT.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
