# CLAUDE.md - Agentic Zero Landing Page

## Project Overview

**Agentic Zero Landing Page** is the website for Agentic Zero, a one-day summit on agentic finance: AI agents holding or directing value, making financial decisions, and executing transactions under defined permissions. The site promotes the second edition and archives the first.

### Event Details (second edition, upcoming)
- **Event**: Agentic Zero, second edition
- **Date**: 7 October 2026
- **Location**: The Avalon, 1244 Sutter Street, San Francisco
- **Context**: during SF Tech Week by a16z
- **Focus**: agentic finance, covering AI agents, payment and financial infrastructure, and the institutions adapting to them

### First edition (past, archived on the site)
- **Date**: 20 November 2025
- **Location**: La Rural, Buenos Aires, Argentina
- **Scale**: 28 speakers, over 1,000 attendees, 13,000 livestream viewers
- Its programme is preserved at `/first-edition/agenda` and must be described in the past tense.

### Copy conventions
- "Agentic finance" is the primary term. "Agentic economy" is the wider frame.
- Do not use "autonomous finance". The term is retired.
- The event is a "summit", not a "conference".
- Do not name specific protocols, standards or chains in copy. The second edition is aimed at institutions rather than a crypto-native audience.

## Architecture & Tech Stack

### Core Framework
- **Next.js 14.2.16** - React-based full-stack framework with App Router
- **React 18** - Latest React with concurrent features
- **TypeScript 5** - Full type safety throughout the application

### Styling & Design System
- **Tailwind CSS 3.4.17** - Utility-first CSS framework
- **shadcn/ui** - High-quality component library built on Radix UI
- **Custom CSS Variables** - Comprehensive design token system
- **Geist Font** - Modern sans-serif and monospace fonts

### Component Architecture
- **Radix UI Primitives** - Accessible, unstyled component primitives
- **Lucide React** - Consistent icon library
- **Class Variance Authority** - Component variant management
- **Tailwind Merge** - Intelligent class merging utilities

### Key Features
- **Responsive Design** - Mobile-first approach with breakpoint optimization
- **Loading Animation** - Custom SVG logo animation with stroke-dasharray effects
- **Intersection Observer** - Scroll-triggered animations and lazy loading
- **Accessibility Focus** - WCAG compliant with keyboard navigation
- **Performance Optimized** - Lighthouse score ≥90 target

## Project Structure

```
/Users/pili/Downloads/agentic-zero-landing/
├── app/                          # Next.js App Router
│   ├── globals.css              # Global styles with CSS custom properties
│   ├── layout.tsx               # Root layout with Geist fonts
│   └── page.tsx                 # Main landing page component (700+ lines)
├── components/                   # Reusable UI components
│   ├── ui/                      # shadcn/ui component library (30+ components)
│   └── theme-provider.tsx       # Theme management wrapper
├── hooks/                       # Custom React hooks
│   ├── use-mobile.tsx          # Mobile breakpoint detection
│   └── use-toast.ts            # Toast notification system
├── lib/                        # Utility functions
│   └── utils.ts                # Tailwind class merging utilities
├── public/                     # Static assets
│   └── images/                 # SVG logos and placeholder images
├── styles/                     # Additional stylesheets
│   └── globals.css            # Duplicate of app/globals.css
└── Configuration Files
    ├── components.json         # shadcn/ui configuration
    ├── next.config.mjs        # Next.js configuration
    ├── package.json           # Dependencies and scripts
    ├── postcss.config.mjs     # PostCSS configuration
    ├── tailwind.config.ts     # Tailwind CSS configuration
    └── tsconfig.json          # TypeScript configuration
```

## Development Commands

```bash
# Install dependencies
npm install
# or
pnpm install

# Start development server
npm run dev
# Opens http://localhost:3000

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## Key Components & Features

### 1. Hero Section (`app/page.tsx`)
- **Animated Background**: CSS grid pattern with moving animation
- **Dynamic Typography**: AGENTIC ZERO with gradient effects
- **Logo Integration**: SVG logo with hover scaling effects
- **Call-to-Action**: Email capture and contact buttons

### 2. Speaker Management
- **Speaker Modal**: Keyboard-accessible modal with detailed speaker bios
- **Speaker Grid**: Responsive card layout with hover effects
- **Social Links**: Twitter and LinkedIn integration
- **Intersection Observer**: Scroll-triggered animations

### 3. Form Systems
- **Email Capture**: Validation with regex, loading states, success feedback
- **Speaker Applications**: Multi-field form with character limits
- **Error Handling**: Client-side validation with user feedback

### 4. Design System (`app/globals.css`)
- **CSS Custom Properties**: 80+ design tokens for colors, spacing, typography
- **Color Palette**: Dark theme with purple accent gradients (#9F98FF → #ADA7FF)
- **Animation System**: Keyframe animations with reduced-motion support
- **Component Styles**: Glass morphism effects with backdrop-filter

### 5. Performance Features
- **Loading Screen**: Custom SVG animation (2.5s duration)
- **Lazy Loading**: Images and content with intersection observer
- **Optimized Images**: Next.js Image component with unoptimized flag
- **Bundle Optimization**: Tree-shaking and code splitting

## Accessibility & UX

### Accessibility Features
- **Keyboard Navigation**: Full keyboard support for all interactive elements
- **Focus Management**: Visible focus indicators with outline styles
- **Screen Reader Support**: Semantic HTML and ARIA labels
- **Reduced Motion**: Respects `prefers-reduced-motion` media query
- **Color Contrast**: WCAG AA compliant color combinations

### User Experience
- **Mobile-First Design**: Responsive breakpoints at 600px, 960px
- **Smooth Animations**: 250ms transitions with easing curves
- **Visual Feedback**: Hover states, loading spinners, success messages
- **Performance**: Optimized animations and lazy loading

## Configuration Details

### Next.js Configuration (`next.config.mjs`)
```javascript
{
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  images: { unoptimized: true }
}
```

### Tailwind Configuration (`tailwind.config.ts`)
- **Design System Integration**: CSS custom properties mapped to Tailwind
- **Component Paths**: Includes app/, components/, pages/ directories
- **Plugin Integration**: tailwindcss-animate for enhanced animations

### TypeScript Configuration (`tsconfig.json`)
- **Strict Mode**: Full type checking enabled
- **Path Mapping**: `@/*` aliases for clean imports
- **Next.js Integration**: Optimized for App Router

## Content & Data

### Speakers Data
- **6 Featured Speakers**: AI researchers, CEOs, and thought leaders
- **Company Affiliations**: Anthropic, DeepMind, Microsoft, Stanford HAI
- **Bio Information**: Detailed backgrounds and social media links

### Sponsors
- **4 Major Sponsors**: OpenAI, Anthropic, Google DeepMind, Microsoft Research
- **Visual Integration**: Logo display with hover tooltips
- **Brand Messaging**: Aligned with AI/web3 intersection theme

## Development Notes

### Code Quality
- **TypeScript Coverage**: 100% TypeScript with strict mode
- **Component Architecture**: Modular, reusable components
- **State Management**: React hooks for local state
- **Error Boundaries**: Graceful error handling

### Performance Considerations
- **Bundle Size**: Optimized dependencies with tree-shaking
- **Rendering**: Server-side rendering with Next.js App Router
- **Caching**: Static asset optimization
- **Critical CSS**: Inline critical styles for faster loading

### Browser Support
- **Modern Browsers**: ES6+ features with Next.js polyfills
- **Progressive Enhancement**: Graceful degradation for older browsers
- **WebP Support**: Modern image formats with fallbacks

## Future Enhancements

### Potential Improvements
1. **CMS Integration**: Headless CMS for speaker/sponsor management
2. **Ticket System**: Integration with payment processing
3. **Live Streaming**: Video integration for remote attendance
4. **Social Features**: Real-time social media integration
5. **Analytics**: Enhanced tracking and conversion optimization

### Technical Debt
- **CSS Organization**: Consider CSS-in-JS migration for better component isolation
- **State Management**: Consider Zustand/Redux for complex state
- **Testing**: Add Jest/React Testing Library test suite
- **CI/CD**: Implement automated deployment pipeline

## Deployment

### Build Process
```bash
npm run build    # Creates .next/ directory
npm start        # Serves production build
```

### Environment Requirements
- **Node.js**: 18+ recommended
- **Package Manager**: npm or pnpm
- **Build Target**: Static export compatible
- **Hosting**: Vercel, Netlify, or any static host

This landing page represents a high-quality, production-ready implementation focused on performance, accessibility, and modern web standards while effectively communicating the Agentic Zero conference brand and mission.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
