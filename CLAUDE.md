# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Finsweet Developer Starter** project for client & power projects, built with TypeScript and modern web development tools. The project uses **pnpm** as the package manager (required).

## Common Commands

### Development
```bash
pnpm dev        # Start development server with live reload on localhost:3000
pnpm build      # Production build to dist/
pnpm check      # TypeScript type checking (no emit)
```

### Code Quality
```bash
pnpm lint       # Run ESLint and Prettier checks
pnpm lint:fix   # Auto-fix ESLint issues
pnpm format     # Format code with Prettier
```

### Testing
```bash
pnpm test       # Run Playwright tests
pnpm test:ui    # Run Playwright tests with UI
```

### Package Management
```bash
pnpm update -i -L -r    # Interactive package updates
```

## Architecture

### Entry Points
- **Main**: `src/index.ts` - Application entry point
- **Styles**: `src/styles/custom.css` - Custom CSS entry point

### Key Directories
- `src/animations/` - GSAP-powered animations (card stack, scroll reveals)
- `src/carousels/` - Swiper carousel implementations
- `src/finsweet/` - Finsweet-specific configurations and utilities
- `src/utils/` - Utility functions using Finsweet TS Utils
- `bin/build.js` - esbuild configuration with dev server

### Build System
- **Bundler**: esbuild (configured in `bin/build.js`)
- **Dev Server**: Built-in with live reload on port 3000
- **Output**: `dist/` directory for production builds

### Animation System
- **GSAP**: Primary animation library with ScrollTrigger plugin
- **Card Stack**: `src/animations/cardStack.ts` - Scroll-triggered stacking effects
- **Reveals**: `src/animations/revealAnimations.ts` - Fade-in animations for `.reveal` elements

### Carousel System
- **Swiper**: Touch slider library for all carousels
- **Configurations**: `src/carousels/index.ts` with different carousel types:
  - Middle carousel with 3D effects
  - Grid carousels (top/bottom) with responsive layouts

## Dependencies

### Core Libraries
- **@finsweet/ts-utils** - Finsweet utility library
- **gsap** - Animation library with ScrollTrigger
- **swiper** - Modern touch slider

### Development Tools
- **@finsweet/eslint-config** - ESLint configuration
- **@finsweet/tsconfig** - TypeScript configuration
- **esbuild** - Fast bundler and dev server
- **playwright** - E2E testing framework

## Configuration Files

- `tsconfig.json` - Extends Finsweet config with path aliases
- `eslint.config.js` - Uses Finsweet ESLint rules
- `playwright.config.ts` - Testing configuration
- `.changeset/config.json` - Version management setup

## Development Notes

- Always use `pnpm` instead of npm/yarn
- TypeScript is configured with strict mode
- ESLint and Prettier are enforced in CI
- All animations use GSAP with ScrollTrigger for performance
- Carousels are built with Swiper for touch/mobile support