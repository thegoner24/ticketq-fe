# TicketQ



A modern concert ticket booking and management application built with Next.js, React, TypeScript, and TailwindCSS. TicketQ features stunning animations powered by GSAP and a responsive design for an immersive user experience. The application focuses on providing a seamless ticket purchasing experience for concert-goers with a visually appealing interface.

## Features

### Concert Showcase
- Interactive hero section with animated elements using GSAP animations
- Featured artists display with staggered animations and star ratings
- Detailed event information with date and venue (Wembley Stadium, December 19, 2025)
- Complete lineup of performing artists with high-quality images and profiles
- Schedule rundown with performance times and interactive elements
- Featured artist spotlight with biography and top hits
- Cultural impact section highlighting the significance of the event

### Ticket Management
- Ticket browsing and purchasing interface with detailed ticket information
- Ticket statistics dashboard showing available tickets by category (VIP, Premium, Standard)
- Filtering options for ticket types and status (Used/Available)
- Individual ticket detail pages with unique ticket IDs
- Ticket listing page for viewing purchased tickets
- Support ticket system for customer assistance
- User authentication system with login and registration (see [Mockup Login Data](#mockup-login-data))

### Technical Features
- Smooth scroll animations using GSAP and ScrollTrigger with cleanup on component unmount
- Complex animation timelines with staggered effects and scroll-based triggers
- Fully responsive design for all device sizes (mobile, tablet, desktop)
- TypeScript for type safety and improved developer experience
- Modern UI with TailwindCSS utility classes and custom gradients
- Next.js 15 with App Router and Server Components architecture
- Client-side state management for filtering and user interactions
- Optimized image loading with Next.js Image component and remote patterns

## Technologies Used

- **Frontend Framework**: Next.js 15.4.5
- **UI Library**: React 19.1.0
- **Styling**: TailwindCSS 4
- **Animations**: GSAP 3.13.0
- **Icons**: React Icons 5.5.0
- **Language**: TypeScript 5
- **Development**: Turbopack for fast refresh

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/ticketq.git
   cd ticketq
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application

### Build for Production

```bash
npm run build
npm start
# or
yarn build
yarn start
```

## Project Structure

```
├── public/               # Static assets
├── src/                  # Source code
│   ├── app/              # Next.js App Router
│   │   ├── components/   # Shared components
│   │   │   ├── Footer.tsx           # Site footer component
│   │   │   ├── HydrationSuppressor.tsx # Component to prevent hydration issues
│   │   │   ├── LoginMockup.tsx     # Login interface mockup
│   │   │   ├── Navbar.tsx          # Navigation bar component
│   │   │   └── TicketStats.tsx     # Ticket statistics display
│   │   ├── context/     # React context providers
│   │   ├── data/        # Data files and mock APIs
│   │   ├── login/       # Login page
│   │   ├── register/    # Registration page
│   │   ├── tickets/     # Tickets related pages
│   │   │   ├── [id]/    # Individual ticket details page
│   │   │   ├── create/  # Create new ticket page
│   │   │   ├── list/    # User's tickets listing page
│   │   │   └── page.tsx # Main tickets page
│   │   ├── utils/       # Utility functions
│   │   ├── globals.css  # Global styles
│   │   ├── layout.tsx   # Root layout
│   │   └── page.tsx     # Home page with concert showcase
├── next.config.ts        # Next.js configuration
├── package.json          # Dependencies and scripts
├── postcss.config.mjs    # PostCSS configuration for TailwindCSS
├── eslint.config.mjs     # ESLint configuration
└── tsconfig.json         # TypeScript configuration
```

## Image Configuration

This project uses Next.js Image Optimization. External image domains are configured in `next.config.ts`:

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn-images.dzcdn.net',
      },
      {
        protocol: 'https',
        hostname: 'deathrowrecords.com',
      },
      {
        protocol: 'https',
        hostname: 'www.aljazeera.com',
      }
    ],
  },
};

export default nextConfig;
```

## Animation System

The project uses GSAP for animations, including:

- Initial load animations for hero section and featured artists
- Scroll-triggered animations for all major sections using ScrollTrigger plugin
- Staggered animations for artist cards and schedule items with customized timing
- Continuous animations for decorative elements like rotating stars
- Scale and opacity transitions for content sections
- Directional animations (x/y axis movements) based on scroll position

All animations are set up in the `useEffect` hook in the home page component with proper cleanup through the following pattern:

```typescript
useEffect(() => {
  gsap.registerPlugin(ScrollTrigger);
  
  // Animation setup code
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
  // ... animation code ...
  
  return () => {
    // Proper cleanup to prevent memory leaks
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  };
}, []);
```

The animation system is organized into a main timeline for initial animations and separate scroll-triggered animations for content that appears as the user scrolls down the page.

## Performance Optimizations

- Next.js App Router with automatic code splitting
- Turbopack for faster development experience (`next dev --turbopack`)
- Image optimization with Next.js Image component
- Lazy loading of off-screen content
- Proper animation cleanup to prevent memory leaks
- Conditional rendering for complex UI elements

## Mockup Login Data

For demonstration purposes, the application includes mockup user accounts that can be used to test the login functionality. All users share the same password: `password123`.

| Name | Email | Role | Avatar |
|------|-------|------|-------|
| John Doe | john@example.com | admin | https://i.pravatar.cc/150?img=1 |
| Jane Smith | jane@example.com | user | https://i.pravatar.cc/150?img=5 |
| Mike Johnson | mike@example.com | user | N/A |

The login mockup component provides a dropdown to select these users and automatically fills in the default password. This is implemented in `src/app/components/LoginMockup.tsx` and the user data is stored in `src/app/data/users.ts`.

```typescript
// Example usage of the authentication system
const user = authenticateUser(email, password);
if (user) {
  // User authenticated successfully
  console.log(`Logged in as ${user.name} (${user.role})`);
} else {
  // Authentication failed
  console.log('Invalid credentials');
}
```

## Development Workflow

### Code Style and Linting

The project uses ESLint for code quality and consistency. Run linting with:

```bash
npm run lint
```

### Recommended VS Code Extensions

- ESLint
- Prettier
- Tailwind CSS IntelliSense
- TypeScript Vue Plugin (Volar)

## License

MIT

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [GSAP](https://greensock.com/gsap/)
- [React Icons](https://react-icons.github.io/react-icons/)
- [TypeScript](https://www.typescriptlang.org/)