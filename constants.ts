
import type { NavLink, Service, Project, Testimonial } from './types';
import BuildingIcon from './components/icons/BuildingIcon';
import WrenchIcon from './components/icons/WrenchIcon';
import RulerIcon from './components/icons/RulerIcon';
import HardHatIcon from './components/icons/HardHatIcon';

export const NAV_LINKS: NavLink[] = [
  { href: '#home', label: 'Home' },
  { href: '#services', label: 'Services' },
  { href: '#projects', label: 'Projects' },
  { href: '#about', label: 'About Us' },
  { href: '#testimonials', label: 'Testimonials' },
  { href: '#contact', label: 'Contact' },
];

export const SERVICES: Service[] = [
  {
    icon: BuildingIcon,
    title: 'General Contracting',
    description: 'We provide end-to-end general contracting services, managing every aspect of your project from start to finish with precision and care.',
  },
  {
    icon: RulerIcon,
    title: 'Design-Build',
    description: 'Our integrated design-build approach streamlines project delivery, fostering collaboration and innovation to bring your vision to life efficiently.',
  },
  {
    icon: WrenchIcon,
    title: 'Renovations',
    description: 'Transform your existing space with our expert renovation services. We modernize and enhance properties with a focus on quality and durability.',
  },
  {
    icon: HardHatIcon,
    title: 'Construction Management',
    description: 'Leverage our expert construction management to ensure your project is completed on time, within budget, and to the highest standards.',
  },
];

export const PROJECTS: Project[] = [
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

export const TESTIMONIALS: Testimonial[] = [
  {
    quote: "ConstructPro transformed our vision into a stunning reality. Their attention to detail and commitment to quality is unparalleled. We couldn't be happier with our new headquarters.",
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
];
