
/*import type { NavLink, Service, Project, Testimonial } from './types';*/
import type { NavLink, Service, Project} from './types';

import BuildingIcon from './components/icons/BuildingIcon';
import WrenchIcon from './components/icons/WrenchIcon';
import RulerIcon from './components/icons/RulerIcon';
import HardHatIcon from './components/icons/HardHatIcon';

const NAV_LINKS: NavLink[] = [
  { href: '#home', label: 'Home' },
  { href: '#services', label: 'Services' },
  { href: '#projects', label: 'Projects' },
  { href: '#about', label: 'About Us' },
  /*{ href: '#testimonials', label: 'Testimonials' },*/
  { href: '#contact', label: 'Contact' },
];

const SERVICES: Service[] = [
  {
    icon: BuildingIcon,
    title: 'General Contracting',
    description: 'We deliver complete general contracting solutions, overseeing every stage of your project with expertise and attention to detail.',
  },
  {
    icon: RulerIcon,
    title: 'Design-Build',
    description: 'Through our unified design-build process, we simplify project execution, enhance teamwork, and turn your vision into reality with efficiency and innovation.',
  },
  {
    icon: WrenchIcon,
    title: 'Renovations',
    description: 'Revitalize your space with our expert renovation services, enhancing every detail for lasting quality and modern appeal.',
  },
  {
    icon: HardHatIcon,
    title: 'Construction Management',
    description: 'Rely on our expert construction management to deliver your project on schedule, within budget, and with uncompromising quality.',
  },
];

const PROJECTS: Project[] = [
  {
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1920&auto=format&fit=crop',
    title: 'Modern Office Complex',
    category: 'Commercial',
    description: 'A state-of-the-art office complex featuring sustainable design, smart technology, and collaborative workspaces. This project involved complex structural engineering and high-end interior finishes to create a landmark business hub.',
    location: 'Metropolis Financial District',
    client: 'Innovate Corp',
  },
  {
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1920&auto=format&fit=crop',
    title: 'Luxury Residential Home',
    category: 'Residential',
    description: 'An exquisitely crafted custom home with bespoke details, luxury materials, and seamless integration of indoor and outdoor living spaces. Our team managed all aspects from foundation to final landscaping.',
    location: 'Oakwood Estates',
    client: 'The Smith Family',
  },
  {
    image: 'https://marathon.in/wp-content/uploads/2022/05/blog_header-07-scaled.jpg',
    title: 'City Infrastructure Project',
    category: 'Public Works',
    description: 'A large-scale public works project to construct a new city bridge, improving traffic flow and community access. The project required meticulous planning, adherence to strict safety protocols, and coordination with multiple municipal agencies.',
    location: 'Central City',
    client: 'Metropolis City Council',
  },
  {
    image: 'https://www.cnu.org/sites/default/files/styles/public_square_feature_image/public/beverly-center-lighting.jpg?itok=gHo9QySd',
    title: 'Downtown Retail Center',
    category: 'Commercial',
    description: 'Development of a premier shopping destination in the heart of downtown. This project included the construction of multiple retail units, a central plaza, and a multi-level parking structure, all delivered on a tight schedule.',
    location: 'Downtown Core',
    client: 'MarketFront Retail',
  },
   {
    image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=1920&auto=format&fit=crop',
    title: 'Suburban Family Home',
    category: 'Residential',
    description: 'A beautiful and functional family home designed for modern living. This design-build project focused on energy efficiency, open-concept spaces, and durable materials to create a lasting and comfortable environment.',
    location: 'Willow Creek',
    client: 'The Johnson Family',
  },
  {
    image: 'https://havitsteelstructure.com/wp-content/uploads/2020/02/Advantages-of-industrial-warehouse-buildings.jpg',
    title: 'Industrial Warehouse',
    category: 'Industrial',
    description: 'Construction of a massive industrial warehouse and logistics center. The facility features high ceilings, advanced loading dock systems, and reinforced concrete flooring to support heavy-duty operations.',
    location: 'Eastern Industrial Park',
    client: 'LogiPro Solutions',
  },
];

/*const TESTIMONIALS: Testimonial[] = [
  {
    quote: "BenoitConstruction transformed our vision into a stunning reality. Their attention to detail and commitment to quality is unparalleled. We couldn't be happier with our new headquarters.",
    name: 'Jane Doe',
    title: 'CEO, Innovate Corp',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
  },
  {
    quote: "The entire process, from design to completion, was seamless. The team was professional, responsive, and finished the project ahead of schedule. Highly recommended!",
    name: 'John Smith',
    title: 'Homeowner',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
  },
  {
    quote: "Their expertise in commercial construction is evident. They handled a complex renovation for us with incredible skill and efficiency. A truly top-tier contractor.",
    name: 'Emily Johnson',
    title: 'COO, MarketFront Retail',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop',
  },
];*/

export const SITE_CONTENT = {
  siteMetadata: {
    title: 'Benoit Contracting LLC - Construction & Renovation Services',
    description: 'Benoit Contracting LLC offers expert general contracting, design-build, and renovation services for commercial and residential projects. Building your vision into reality.',
    author: 'Benoit Contracting LLC',
    keywords: ['construction', 'general contracting', 'design-build', 'renovation', 'commercial construction', 'residential construction', 'construction company'],
    siteUrl: 'https://benoit.ae', // Placeholder URL for canonical link and social sharing
    logoUrl: 'https://benoit.ae/company-logo.png', // Placeholder URL for company logo
    ogImage: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1200&h=630&auto=format&fit=crop', // A 1.91:1 aspect ratio version of the hero image for Open Graph
  },
  navLinks: NAV_LINKS,
  header: {
    /*title: 'Benoit',
    titleHighlight: 'Construction',*/ 
    logo: '/company-logo.png', // Path to the company logo image
    altText: 'Company Logo',
    tagline: 'Building Today, Inspiring Generations Tomorrow',
    ctaButton: 'Request a Quote',
    quoteButton: 'Get a Quote',
    srOpenMenu: 'Open main menu',
  },
  hero: {
    titleL1: 'Building Today,',
    titleL2: 'Inspiring Generations Tomorrow',
    subtitle: 'Our team of skilled professionals is dedicated to crafting exceptional construction projects that stand the test of time, delivered on schedule and within budget.',
    ctaButton: 'View Our Work',
    videoUrl: 'https://videos.pexels.com/video-files/3209228/3209228-hd_1920_1080_25fps.mp4',
  },
  services: {
    title: 'Our Services',
    subtitle: 'We provide end-to-end solutions, guiding every project from initial idea to final delivery.',
    items: SERVICES,
  },
  projects: {
    title: 'Featured Projects',
    subtitle: 'A glimpse into our portfolio of successfully completed projects.',
    items: PROJECTS,
    modal: {
      clientLabel: 'Client:',
      locationLabel: 'Location:',
      closeButtonLabel: 'Close project details',
    }
  },
  about: {
    title: 'About Benoit Contracting LLC',
    paragraph1: 'With over two decades of proven expertise, Benoit Contracting LLC stands as a trusted name in delivering high-quality construction solutions. Our legacy is built on a foundation of integrity, precision, and a commitment to innovation that transforms visions into enduring realities.',
    paragraph2: 'At Benoit, we go beyond constructing buildings—we create lasting partnerships. By consistently exceeding expectations and upholding the highest standards, our dedicated team ensures every project is delivered with excellence, on time, and within budget.',
    ctaButton: 'Work With Us',
    imageAlt: 'Construction team collaborating on blueprints at a worksite',
  },
  /*testimonials: {
    title: 'What Our Clients Say',
    subtitle: 'Real stories from satisfied partners who trusted us with their vision.',
    items: TESTIMONIALS,
  },*/
  contact: {
    title: 'Get In Touch',
    subtitle: "Have a project in mind? We'd love to hear from you.",
    info: {
        title: 'Contact Information',
        addressLabel: 'Address:',
        address: {
          street: 'P.O Box: ',
          city: 'Dubai',
          country: 'UAE',
          zip: '283476',
          full: 'P.O Box: 283476 - Dubai, UAE',
        },
        phoneLabel: 'Phone:',
        phone: '04 263 4123',
        emailLabel: 'Email:',
        email: 'admin@btlme.ae',
        websiteLabel: 'Website:',
        website: 'www.btlme.ae',
        hoursLabel: 'Business Hours:',
        hours: 'Mon-Fri, 8:30 AM - 5:30 PM',
    },
    form: {
      namePlaceholder: 'Your Name',
      emailPlaceholder: 'Your Email',
      subjectPlaceholder: 'Subject',
      messagePlaceholder: 'Your Message',
      submitButton: 'Send Message',
      submitButtonLoading: 'Sending...',
      successMessage: 'Thank you for your message! We will get back to you shortly.',
      errorMessage: 'An error occurred. Please try again later.',
    },
  },
  footer: {
    about: {
      /*title: 'Benoit',
      titleHighlight: 'Construction',*/
      logo: '/company-logo.png',
      description: 'Shaping Tomorrow with Every Build. We stand for excellence, trust, and unmatched client satisfaction.',
    },
    quickLinksTitle: 'Quick Links',
    contactTitle: 'Contact Us',
    followUsTitle: 'Follow Us',
    copyright: 'Benoit Contracting LLC',
    developedBy: 'Developed by RubitCube',
    developerUrl: 'https://rubitcube.com',
  }
};
