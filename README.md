# TicketQ

![TicketQ Logo](public/next.svg)

A modern concert ticket booking and management application built with Next.js, React, TypeScript, and TailwindCSS. TicketQ features stunning animations powered by GSAP and a responsive design for an immersive user experience.

## Features

### Concert Showcase
- Interactive hero section with animated elements
- Featured artists display with staggered animations
- Detailed event information with date and venue
- Complete lineup of performing artists with images
- Schedule rundown with performance times
- Featured artist spotlight with biography and top hits

### Ticket Management
- Ticket browsing and purchasing interface
- Ticket statistics dashboard
- Filtering options for ticket status
- Support ticket system for customer assistance

### Technical Features
- Smooth scroll animations using GSAP and ScrollTrigger
- Responsive design for all device sizes
- TypeScript for type safety
- Modern UI with TailwindCSS
- Next.js 15 with App Router and Server Components

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
│   │   ├── tickets/      # Tickets page
│   │   ├── globals.css   # Global styles
│   │   ├── layout.tsx    # Root layout
│   │   └── page.tsx      # Home page
├── next.config.ts        # Next.js configuration
├── package.json          # Dependencies and scripts
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
- Scroll-triggered animations for all major sections
- Staggered animations for artist cards and schedule items
- Continuous animations for decorative elements

All animations are set up in the `useEffect` hook in the home page component with proper cleanup.

## License

MIT

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [GSAP](https://greensock.com/gsap/)
- [React Icons](https://react-icons.github.io/react-icons/)