# HANO Portfolio Website

## Overview

A high-end, responsive portfolio website for a multidisciplinary designer called "HANO". The application is a single-page landing site built with React and Express, featuring a dark atmospheric design aesthetic with scroll-triggered animations and a PostgreSQL backend for project data management.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript, bundled via Vite
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack React Query for server state and data fetching
- **Styling**: Hybrid approach combining Tailwind CSS for layout with CSS Modules for section-specific styling
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Animations**: Framer Motion for scroll-triggered and layout animations

### Component Structure
The frontend follows a section-based architecture where each major page section is isolated in its own folder under `client/src/components/sections/`:
- Each section contains an `index.tsx` and `styles.module.css`
- Sections are designed to be independently editable without affecting others
- Main sections: Navbar, Hero, ProjectStackReveal, ApproachNetwork, Playground, FooterContact

### Backend Architecture
- **Runtime**: Node.js with Express 5
- **Language**: TypeScript compiled with tsx
- **API Pattern**: RESTful endpoints defined in `shared/routes.ts` with Zod validation
- **Database ORM**: Drizzle ORM with PostgreSQL dialect
- **Build System**: Custom build script using esbuild for server and Vite for client

### Data Layer
- **Database**: PostgreSQL accessed via Drizzle ORM
- **Schema Location**: `shared/schema.ts` defines all database tables
- **Storage Pattern**: Repository pattern implemented in `server/storage.ts`
- **Current Schema**: Projects table with title, category, year, route, overview, role, and imageUrl fields

### Development vs Production
- Development: Vite dev server with HMR, proxied through Express
- Production: Static files served from `dist/public`, server bundle in `dist/index.cjs`

## External Dependencies

### Database
- **PostgreSQL**: Primary database, connection via `DATABASE_URL` environment variable
- **connect-pg-simple**: Session storage for Express sessions

### Third-Party Services
- **Google Fonts**: Bricolage Grotesque (display) and Inter (body) typography
- **Unsplash**: External image hosting for project thumbnails and hero imagery

### Key NPM Packages
- **Radix UI**: Accessible component primitives (dialog, dropdown, tabs, etc.)
- **Framer Motion**: Animation library for complex transitions
- **Drizzle ORM + drizzle-zod**: Database operations with schema validation
- **TanStack React Query**: Async state management
- **Tailwind CSS + class-variance-authority**: Utility-first styling with variant support