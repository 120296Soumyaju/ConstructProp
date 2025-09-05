// src/theme/index.ts

/**
 * Design System & UI/UX Theme
 * 
 * This file centralizes the design tokens for the BenoitConstruction application.
 * It serves as a single source of truth for colors, typography, spacing, and other
 * layout-related values.
 * 
 * Since this project uses the Tailwind CSS CDN, this file acts as a reference
 * for developers to ensure consistency rather than being programmatically consumed
 * by a build tool. The values here should match the Tailwind classes used in the components.
 */

// 1. Color Palette
// -----------------------------------------------------------------------------
// The palette is based on Tailwind's default color names for ease of use.
const colors = {
  primary: {
    DEFAULT: '#F59E0B', // amber-500
    light: '#FBBF24',   // amber-400
    dark: '#D97706',    // amber-600
    contrastText: '#FFFFFF',
  },
  neutral: {
    // Using slate for a cool, professional gray palette
    '50': '#F8FAFC',  // slate-50
    '100': '#F1F5F9', // slate-100
    '200': '#E2E8F0', // slate-200
    '300': '#CBD5E1', // slate-300
    '400': '#94A3B8', // slate-400
    '500': '#64748B', // slate-500
    '600': '#475569', // slate-600
    '700': '#334155', // slate-700
    '800': '#1E293B', // slate-800
    '900': '#0F172A', // slate-900
  },
  background: {
    DEFAULT: '#F8FAFC', // slate-50
    paper: '#FFFFFF',
  },
  text: {
    primary: '#1E293B',   // slate-800
    secondary: '#475569', // slate-600
    light: '#64748B',    // slate-500
  },
  status: {
    success: '#10B981', // green-500
    error: '#EF4444',   // red-500
  }
};

// 2. Typography
// -----------------------------------------------------------------------------
const typography = {
  fonts: {
    heading: "'Poppins', sans-serif", // For h1, h2, etc.
    body: "'Roboto', sans-serif",    // For p, span, etc.
  },
  // Corresponds to Tailwind's font-size classes (e.g., text-sm, text-lg)
  fontSizes: {
    xs: '0.75rem',  // 12px
    sm: '0.875rem', // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',  // 18px
    xl: '1.25rem',   // 20px
    '2xl': '1.5rem',    // 24px
    '3xl': '1.875rem',  // 30px
    '4xl': '2.25rem',   // 36px
    '5xl': '3rem',      // 48px
    '6xl': '3.75rem',   // 60px
    '7xl': '4.5rem',    // 72px
  },
};

// 3. Layout & Spacing
// -----------------------------------------------------------------------------
const layout = {
  // Corresponds to Tailwind's rounded classes (e.g., rounded-md, rounded-lg)
  borderRadius: {
    sm: '0.25rem',  // 4px
    md: '0.375rem', // 6px
    lg: '0.5rem',   // 8px
    full: '9999px',
  },
  // Based on the container class in Tailwind
  container: {
    padding: '1rem', // px-4
    smPadding: '1.5rem', // sm:px-6
    lgPadding: '2rem', // lg:px-8
  },
};

export const theme = {
  colors,
  typography,
  layout,
};
