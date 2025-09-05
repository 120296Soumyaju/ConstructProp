# BenoitConstruction - Modern Construction Website

BenoitConstruction is a sleek, professional, and fully responsive single-page website template designed for a modern construction company. Built with React, TypeScript, and Tailwind CSS, it provides a robust foundation for showcasing services, projects, and company information to attract potential clients.

## Key Features

- **Fully Responsive Design**: Looks great on all devices, from mobile phones to desktops.
- **Professional Typography**: Uses modern, readable fonts (Poppins for headings, Roboto for body) for a clean, polished look.
- **Centralized Design System**: All UI/UX tokens (colors, fonts, etc.) are managed in a central `theme` directory for consistency and easy maintenance.
- **Interactive Hero Section**: Features a captivating background image with a subtle parallax effect and smooth text animations.
- **Dynamic Project Portfolio**: A filterable gallery to showcase projects by category (Commercial, Residential, etc.).
- **Project Details Modal**: Clickable project cards open a modal with more detailed information, including descriptions, client, and location.
- **Client Testimonials Carousel**: An interactive and space-saving way to display client feedback.
- **Services Section**: Clearly presents the company's offerings with clean icons and descriptions.
- **Contact Form with Validation**: Includes client-side validation for all fields, a simulated submission process with loading/success states, and clear user feedback.
- **Smooth Scrolling & Active Navigation**: The header provides smooth scrolling to sections and highlights the active link based on the user's position on the page.
- **Performance Optimized**: Implements lazy loading for images to ensure a faster initial page load.
- **SEO Optimized**: Includes dynamic meta tags, structured data (JSON-LD), and SEO best practices to improve search engine visibility.
- **Modern Footer**: A multi-column footer with quick links, contact info, and social media icons.
- **Clean & Organized Codebase**: Built with TypeScript and organized into reusable components for easy maintenance and scalability.

## Tech Stack

- **Frontend:** React, TypeScript
- **Styling:** Tailwind CSS (via CDN)
- **Fonts:** Google Fonts (Poppins, Roboto)
- **Icons:** Custom SVG components

## Project Structure

The project is organized into a logical and maintainable structure:

```
/
|-- public/
|-- src/
|   |-- components/         # Reusable React components for each section
|   |   |-- icons/          # SVG icon components
|   |   |-- About.tsx
|   |   |-- Contact.tsx
|   |   |-- Footer.tsx
|   |   |-- Header.tsx
|   |   |-- Hero.tsx
|   |   |-- Projects.tsx
|   |   |-- Services.tsx
|   |   |-- Testimonials.tsx
|   |
|   |-- theme/              # Centralized UI/UX design tokens
|   |   |-- index.ts
|   |
|   |-- App.tsx             # Main application component, assembles all sections
|   |-- content.ts          # Centralized content for the entire site
|   |-- index.tsx           # Entry point for the React application
|   |-- types.ts            # Shared TypeScript interfaces
|
|-- index.html              # The main HTML file
|-- README.md               # Project documentation
|-- metadata.json           # Application metadata
```

## Design System & Theming

The project's visual identity is managed through a centralized theme file located at `src/theme/index.ts`. This file serves as a single source of truth for all design tokens, ensuring consistency and making future updates simple.

- **Colors**: Defines the primary color palette (e.g., `primary`, `neutral`, `accent`) used throughout the application.
- **Typography**: Specifies the font families (`Poppins` for headings, `Roboto` for body), weights, and a responsive font size scale.
- **Layout**: Contains layout-related constants such as `borderRadius`, container padding, and other spacing units.

While the project uses the Tailwind CSS CDN (and thus doesn't have a `tailwind.config.js` file for direct integration), this theme file provides a clear reference for developers to ensure all new components adhere to the established design standards. Fonts are globally applied in `index.html`.

## Components Overview

- **`Header.tsx`**: A fixed, responsive navigation bar with active link highlighting and smooth scroll functionality.
- **`Hero.tsx`**: The full-screen introductory section with a parallax background and animated text.
- **`Services.tsx`**: Displays the company's key services in a clean card layout.
- **`Projects.tsx`**: A filterable portfolio gallery with a clickable modal for viewing project details.
- **`About.tsx`**: Provides company background and mission statement.
- **`Testimonials.tsx`**: An interactive carousel showcasing client testimonials.
- **`Contact.tsx`**: Contains contact information and a form with validation and submission logic.
- **`Footer.tsx`**: A modern, multi-column footer with navigation, contact info, and social media links.
- **`icons/`**: A collection of reusable SVG icon components used throughout the application.
