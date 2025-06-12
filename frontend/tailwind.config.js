/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        'primary': '#2563EB', // Deep blue (primary) - blue-600
        'primary-50': '#EFF6FF', // Very light blue (50-level shade) - blue-50
        'primary-100': '#DBEAFE', // Light blue (100-level shade) - blue-100
        'primary-500': '#3B82F6', // Medium blue (500-level shade) - blue-500
        'primary-700': '#1D4ED8', // Dark blue (700-level shade) - blue-700
        'primary-900': '#1E3A8A', // Very dark blue (900-level shade) - blue-900
        
        // Secondary Colors
        'secondary': '#64748B', // Sophisticated slate (secondary) - slate-500
        'secondary-50': '#F8FAFC', // Very light slate (50-level shade) - slate-50
        'secondary-100': '#F1F5F9', // Light slate (100-level shade) - slate-100
        'secondary-200': '#E2E8F0', // Light slate (200-level shade) - slate-200
        'secondary-300': '#CBD5E1', // Medium light slate (300-level shade) - slate-300
        'secondary-600': '#475569', // Medium dark slate (600-level shade) - slate-600
        'secondary-700': '#334155', // Dark slate (700-level shade) - slate-700
        'secondary-800': '#1E293B', // Very dark slate (800-level shade) - slate-800
        
        // Accent Colors
        'accent': '#F59E0B', // Warm amber (accent) - amber-500
        'accent-50': '#FFFBEB', // Very light amber (50-level shade) - amber-50
        'accent-100': '#FEF3C7', // Light amber (100-level shade) - amber-100
        'accent-200': '#FDE68A', // Light amber (200-level shade) - amber-200
        'accent-600': '#D97706', // Medium dark amber (600-level shade) - amber-600
        'accent-700': '#B45309', // Dark amber (700-level shade) - amber-700
        
        // Background Colors
        'background': '#FAFBFC', // Soft off-white (background) - gray-50
        'surface': '#FFFFFF', // Pure white (surface) - white
        
        // Text Colors
        'text-primary': '#1E293B', // Rich charcoal (text primary) - slate-800
        'text-secondary': '#64748B', // Medium slate (text secondary) - slate-500
        'text-muted': '#94A3B8', // Light slate (text muted) - slate-400
        
        // Status Colors
        'success': '#059669', // Confident green (success) - emerald-600
        'success-50': '#ECFDF5', // Very light green (50-level shade) - emerald-50
        'success-100': '#D1FAE5', // Light green (100-level shade) - emerald-100
        'success-500': '#10B981', // Medium green (500-level shade) - emerald-500
        'success-700': '#047857', // Dark green (700-level shade) - emerald-700
        
        'warning': '#D97706', // Balanced orange (warning) - amber-600
        'warning-50': '#FFFBEB', // Very light orange (50-level shade) - amber-50
        'warning-100': '#FEF3C7', // Light orange (100-level shade) - amber-100
        'warning-500': '#F59E0B', // Medium orange (500-level shade) - amber-500
        'warning-700': '#B45309', // Dark orange (700-level shade) - amber-700
        
        'error': '#DC2626', // Clear red (error) - red-600
        'error-50': '#FEF2F2', // Very light red (50-level shade) - red-50
        'error-100': '#FEE2E2', // Light red (100-level shade) - red-100
        'error-500': '#EF4444', // Medium red (500-level shade) - red-500
        'error-700': '#B91C1C', // Dark red (700-level shade) - red-700
        
        // Border Colors
        'border': '#E2E8F0', // Light slate border - slate-200
        'border-light': '#F1F5F9', // Very light slate border - slate-100
      },
      fontFamily: {
        'heading': ['Inter', 'system-ui', 'sans-serif'],
        'body': ['Inter', 'system-ui', 'sans-serif'],
        'caption': ['Inter', 'system-ui', 'sans-serif'],
        'data': ['JetBrains Mono', 'Consolas', 'Monaco', 'monospace'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        'lg': '8px',
        'md': '6px',
        'sm': '4px',
      },
      boxShadow: {
        'sm': '0 1px 3px rgba(0, 0, 0, 0.1)',
        'md': '0 4px 12px rgba(0, 0, 0, 0.15)',
        'lg': '0 10px 25px rgba(0, 0, 0, 0.1)',
        'elevation-1': '0 1px 3px rgba(0, 0, 0, 0.1)',
        'elevation-2': '0 4px 12px rgba(0, 0, 0, 0.15)',
        'elevation-3': '0 10px 25px rgba(0, 0, 0, 0.1)',
      },
      animation: {
        'pulse-slow': 'pulse 1.5s ease-in-out infinite',
        'fade-in': 'fadeIn 150ms ease-out',
        'slide-up': 'slideUp 300ms cubic-bezier(0.4, 0, 0.2, 1)',
        'slide-down': 'slideDown 300ms cubic-bezier(0.4, 0, 0.2, 1)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      transitionDuration: {
        '150': '150ms',
        '300': '300ms',
      },
      transitionTimingFunction: {
        'ease-out': 'ease-out',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      zIndex: {
        '100': '100',
        '200': '200',
        '300': '300',
        '400': '400',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}