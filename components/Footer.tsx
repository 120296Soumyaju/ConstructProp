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
// Handle logo click to scroll to #home locally, with external URL as fallback
  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const targetElement = document.getElementById("home");
    if (targetElement) {
      const headerOffset = 80; // Match header height
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  }; 

  return (
    <footer className="bg-blue-ribbon-light text-white fade-in">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="md:col-span-2 lg:col-span-1">
            <div className="mb-4">
              <a
                href="https://benoit.ae/"
                onClick={handleLogoClick} // Local scroll to #home during development
              >
                <img
                  src={SITE_CONTENT.footer.about.logo}
                  alt={SITE_CONTENT.header.altText}
                  className="h-14 w-auto " // Added invert filter to make logo visible against blue-ribbon
                />
              </a>  
            </div>
            <p className="text-white leading-relaxed">
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
                    className="hover:text-black transition-colors duration-300"
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
            <ul className="space-y-2 text-white">
              <li>{SITE_CONTENT.contact.info.address.full}</li>
              <li>{SITE_CONTENT.contact.info.phone}</li>
              <li>{SITE_CONTENT.contact.info.email}</li>
              <li>{SITE_CONTENT.contact.info.website}</li>
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
                  className="text-blue-ribbon-dark hover:text-white transition-fast focus-visible"
                >
                  <Icon className="w-6 h-6" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-blue-ribbon-dark py-6"> {/* Using a darker shade for the bottom section */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <p>
            &copy; {new Date().getFullYear()} {SITE_CONTENT.footer.copyright}
          </p>
          <p>
            <a
              href={SITE_CONTENT.footer.developerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-100 transition-colors duration-300"
            >
              {SITE_CONTENT.footer.developedBy}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;