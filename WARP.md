# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Development Commands

This project uses **Bun** as the package manager and runtime. All commands should be run from the project root.

### Core Development
- `bun run dev` - Start development server with Turbopack (runs on http://localhost:3000)
- `bun run build` - Build production application with Turbopack
- `bun run start` - Start production server (requires build first)

### Code Quality
- `bun run lint` - Run Biome linter to check code quality
- `bun run format` - Format code using Biome (writes changes)

### Package Management
- `bun install` - Install dependencies
- `bun add <package>` - Add a new dependency
- `bun add -d <package>` - Add a development dependency

## Architecture Overview

### Project Structure
- **Next.js 15** with App Router architecture
- **TypeScript** with strict configuration
- **Tailwind CSS v4** for styling
- **Biome** for linting and formatting (replaces ESLint/Prettier)
- **Turbopack** for fast development and builds

### Key Directories
- `src/app/` - Next.js App Router pages and layouts
  - `layout.tsx` - Root layout with font configuration
  - `page.tsx` - Home page component
  - `globals.css` - Global styles with Tailwind imports
- `public/` - Static assets (images, icons)

### Configuration Files
- `biome.json` - Biome configuration with Next.js and React rules
- `next.config.ts` - Next.js configuration (currently minimal)
- `tsconfig.json` - TypeScript configuration with `@/*` path mapping
- `tailwind.config.ts` - Tailwind CSS configuration

### Key Features
- **Path aliases**: `@/*` maps to `src/*`
- **Font optimization**: Uses Next.js font optimization with Geist fonts
- **Image optimization**: Uses Next.js Image component
- **TypeScript strict mode**: Enabled for better type safety
- **Biome integration**: Configured for Next.js and React best practices

### Development Notes
- Hot reloading works automatically in development mode
- Biome handles both linting and formatting in a single tool
- Turbopack is enabled for faster builds and development
- The project follows Next.js 15 App Router conventions
