import React, { useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Projects from './components/Projects';
import About from './components/About';
/*import Testimonials from './components/Testimonials';*/
import Contact from './components/Contact';
import Footer from './components/Footer';
import { SITE_CONTENT } from './content';

// SEO Component to manage head tags
const MetaTags: React.FC = () => {
  useEffect(() => {
    const { siteMetadata, contact } = SITE_CONTENT;
    const {
      title,
      description,
      author,
      keywords,
      siteUrl,
      logoUrl,
      ogImage,
    } = siteMetadata;

    // Set document title
    document.title = title;

    // Helper to create/update a meta tag by name
    const setMetaTag = (name: string, content: string) => {
      if (!content) return;
      let element = document.querySelector(`meta[name="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('name', name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Helper to create/update a meta tag by property
    const setPropertyMetaTag = (property: string, content: string) => {
      if (!content) return;
      let element = document.querySelector(`meta[property="${property}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('property', property);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Set standard meta tags
    setMetaTag('description', description);
    setMetaTag('keywords', keywords.join(', '));
    setMetaTag('author', author);
    setMetaTag('robots', 'index, follow');

    // Open Graph / Facebook meta tags
    setPropertyMetaTag('og:type', 'website');
    setPropertyMetaTag('og:url', siteUrl);
    setPropertyMetaTag('og:title', title);
    setPropertyMetaTag('og:description', description);
    setPropertyMetaTag('og:image', ogImage);

    // Twitter Card meta tags
    setMetaTag('twitter:card', 'summary_large_image');
    setMetaTag('twitter:url', siteUrl);
    setMetaTag('twitter:title', title);
    setMetaTag('twitter:description', description);
    setMetaTag('twitter:image', ogImage);

    // Canonical Link
    let canonicalLink = document.querySelector<HTMLLinkElement>("link[rel='canonical']");
    if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', siteUrl);
    
    // Structured Data (JSON-LD) for SEO
    let ldJsonScript = document.getElementById('ld-json-data') as HTMLScriptElement | null;
    if (!ldJsonScript) {
      // FIX: The `ldJsonScript` variable is inferred as `HTMLElement`, which doesn't have a `type` property.
      // Create a new, strongly-typed `HTMLScriptElement` to fix the error.
      const newScript = document.createElement('script');
      newScript.type = 'application/ld+json';
      newScript.id = 'ld-json-data';
      document.head.appendChild(newScript);
      ldJsonScript = newScript;
    }
    
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'ConstructionCompany',
      name: title,
      description: description,
      url: siteUrl,
      logo: logoUrl,
      image: ogImage,
      telephone: contact.info.phone,
      email: contact.info.email,
      website: contact.info.website,
      address: {
        '@type': 'PostalAddress',
        streetAddress: contact.info.address.street,
        addressLocality: contact.info.address.city,
        postalCode: contact.info.address.zip,
        addressCountry: contact.info.address.country,
      },
      hours: contact.info.hours,
    };
    
    ldJsonScript.innerHTML = JSON.stringify(structuredData);

  }, []);

  return null; // This component renders nothing
};


const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <MetaTags />
      <Header />
      <main>
        <Hero />
        <Services />
        <Projects />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default App;