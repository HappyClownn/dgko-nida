# Birthday Photo Quiz Game

## Overview

An interactive multiplayer party game inspired by Kahoot and Jackbox Games, designed for birthday celebrations. Players guess zoomed-in photos through a dual-screen experience: a host display (projector/TV) showing questions and game state, and individual player screens (mobile phones) serving as controllers with answer buttons. The game features a risk/reward mechanic where players can answer at different zoom levels, earning more points for correct answers at higher zoom (more difficult) levels.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack:**
- React 18 with TypeScript
- Vite for build tooling and development server
- TanStack Query for state management
- Wouter for client-side routing
- Framer Motion for animations and transitions

**UI Framework:**
- Shadcn/ui component library (Radix UI primitives)
- Tailwind CSS for styling with custom design tokens
- Custom theme supporting light/dark modes
- Typography: Poppins (display/headlines) and Inter (body/UI)

**Design System:**
- Party-themed color palette (vibrant purple primary, hot pink secondary)
- Game state colors (green for correct, red for incorrect, orange for timer)
- Zoom level risk indicators (red-orange for high points/risk, yellow for mid, green for safe)
- Responsive layouts optimized for both projector displays and mobile devices

**Component Architecture:**
- Page-level components: HostScreen, PlayerScreen
- Reusable game components: GameHeader, PhotoDisplay, AnswerGrid, Leaderboard, PlayerLobby, WaitingLobby, ResultsScreen
- Atomic UI components from Shadcn/ui library
- Separation of host view and player view rendering logic

### Backend Architecture

**Technology Stack:**
- Node.js with Express.js framework
- TypeScript for type safety
- WebSocket server using 'ws' library for real-time communication

**Real-Time Communication:**
- WebSocket-based bidirectional messaging between host and players
- Custom WebSocket message types defined in shared schema
- Connection tracking by game code
- Broadcast functionality for game-wide updates
- Individual client messaging for player-specific events

**Data Storage:**
- In-memory storage implementation (MemStorage class)
- Designed with storage interface (IStorage) for future database integration
- Drizzle ORM configuration present but not actively used
- PostgreSQL connection configured via environment variables

**Game State Management:**
- Server maintains authoritative game state
- Game phases: lobby, question, answering, results, finished
- Player management (add, update, track answers)
- Question progression and zoom level tracking
- Score calculation based on answer timing and zoom level

### External Dependencies

**Third-Party UI Libraries:**
- Radix UI primitives for accessible components (dialogs, dropdowns, tooltips, etc.)
- Framer Motion for animation effects
- Embla Carousel for potential image galleries
- CMDK for command palette functionality
- Vaul for drawer components

**Development Tools:**
- Replit-specific plugins for development experience
- ESBuild for server bundling
- TSX for TypeScript execution in development

**Design Resources:**
- Google Fonts CDN (Poppins, Inter)
- Unsplash for sample question images

**Database (Configured but Optional):**
- Neon Database (@neondatabase/serverless) - PostgreSQL provider
- Drizzle ORM for database operations
- connect-pg-simple for session storage
- Migration system via drizzle-kit

**Session Management:**
- WebSocket-based session tracking (no traditional HTTP sessions)
- Game codes for player-host connection
- Player ID and game code stored in WebSocket connection metadata

**Deployment:**
- Designed for Replit deployment
- Development and production build scripts
- Environment variable configuration for database URL
- Vite middleware integration for development HMR