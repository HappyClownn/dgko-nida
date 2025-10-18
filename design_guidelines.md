# Design Guidelines: Interactive Birthday Party Photo Quiz Game

## Design Approach

**Reference-Based Approach** drawing inspiration from:
- **Kahoot**: Vibrant colors, large buttons, celebration animations
- **Jackbox Games**: Playful typography, party atmosphere, dual-screen polish
- **Modern Quiz Apps**: Clean information hierarchy, exciting reveals

**Core Principle**: Create an energetic, celebration-focused experience that makes players feel excited to participate and compete.

## Color Palette

### Primary Colors (Party Theme)
- **Background Dark**: 240 15% 12% (Deep navy-blue)
- **Background Light**: 240 20% 98%
- **Primary Brand**: 280 85% 62% (Vibrant purple - main game accent)
- **Secondary Brand**: 340 90% 58% (Hot pink - celebration accent)

### Game State Colors
- **Correct Answer**: 142 76% 48% (Bright green)
- **Incorrect Answer**: 0 84% 60% (Bold red)
- **Warning/Timer**: 38 92% 58% (Energetic orange)
- **Neutral/Waiting**: 220 15% 65% (Cool gray)

### Zoom Level Indicators (Risk/Reward Visual Coding)
- **Max Zoom (Highest Points)**: 10 90% 55% (Red-orange - risky, hot)
- **Mid Zoom**: 45 95% 52% (Golden yellow - moderate)
- **Min Zoom (Lowest Points)**: 142 76% 48% (Green - safe)

## Typography

**Fonts** (via Google Fonts CDN):
- **Display/Headlines**: 'Poppins' (Bold 700, ExtraBold 800) - Playful, modern, highly readable on projector
- **Body/UI**: 'Inter' (Regular 400, SemiBold 600) - Clean, professional contrast

**Scale**:
- Hero/Game Title: text-6xl to text-8xl (host screen)
- Question Text: text-3xl to text-4xl
- Player Names/Scores: text-xl to text-2xl
- Answer Options: text-2xl to text-3xl (mobile buttons)
- UI Labels: text-sm to text-base

## Layout System

**Spacing Units**: Tailwind 4, 6, 8, 12, 16, 20, 24 (primary set)
- Maintain generous spacing for readability on projector
- Mobile: py-4, px-6 for answer buttons
- Host screen: p-8 to p-16 for major sections

**Grid Strategy**:
- Host Screen: Single column focus with sidebar for leaderboard
- Player Screen: Full-screen single column with large tap targets
- Leaderboard: Grid of 2-3 columns for player cards

## Component Library

### Host Screen Components

**1. Game Header**
- Logo/game title (top-left)
- Round counter "Round 3/10" (top-center)
- Timer with circular progress (top-right, 60-80px diameter)
- Background: Gradient overlay (purple to pink, 15% opacity)

**2. Photo Display Area**
- Center stage: 60-70% of screen height
- Animated zoom transitions between levels
- Zoom level indicator bar showing current zoom (1-5 levels)
- Point values displayed as badges on each zoom level
- Blur overlay that progressively reduces with each zoom out

**3. Answer Options Display**
- 2x2 grid below photo
- Color-coded buttons: Purple, Pink, Orange, Teal
- Large letters A, B, C, D (text-4xl)
- Answer text (text-xl)
- Pulse animation when answers arrive

**4. Live Player Status**
- Floating card showing "5/8 Players Answered"
- Individual player indicators (dots/avatars with checkmarks)
- Animated counter that updates in real-time

**5. Results Overlay**
- Full-screen takeover with confetti animation
- Highlight correct answer with green glow
- Show who answered correctly with celebration icons
- Updated leaderboard with animated score increases
- "Next Question" button (prominently placed)

**6. Leaderboard Sidebar**
- Persistent or toggle-able panel (right side)
- Top 8 players with podium styling for top 3
- Score display with trophy icons
- Player names with subtle gradients

### Player Screen Components

**1. Lobby/Waiting Screen**
- Name input field (rounded-xl, text-xl)
- "Join Game" button (w-full, py-6, vibrant gradient)
- Connected status indicator
- Waiting animation (pulsing dots)

**2. Answer Interface**
- Full-screen 2x2 grid of answer buttons
- Each button: min-h-32, rounded-2xl, bold shadows
- Color-matched to host screen (A=purple, B=pink, C=orange, D=teal)
- Large letter + answer text
- Disabled state after selection (grayscale with checkmark)

**3. Zoom Level Selection**
- Before answering: Display current zoom level
- Point multiplier badge (prominent, text-2xl)
- "Wait for next zoom?" timer countdown
- Risk indicator: Red (risky) → Yellow → Green (safe)

**4. Feedback Screens**
- "Waiting for others..." (animated ellipsis)
- "Correct! +50 points" (green explosion animation)
- "Wrong answer" (gentle red fade, show correct answer)
- Personal score update

## Animations & Transitions

**Zoom Transitions** (Photo Reveals):
- Scale transform from 3x to 1x over 0.8s
- Ease-out-cubic timing
- Slight blur reduction with each zoom

**Answer Selection**:
- Button: Scale 0.95 on tap, bounce back
- Ripple effect from center
- Checkmark fade-in (0.3s)

**Score Updates**:
- Number count-up animation (1.5s duration)
- Confetti burst for correct answers (canvas-based particles)
- Leaderboard position changes: Smooth reordering (0.5s slide)

**Waiting States**:
- Gentle pulse on player count indicator (2s loop)
- Rotating ellipsis for "waiting" text

**Avoid**: Excessive continuous animations that distract from gameplay

## Images

**Host Screen Hero/Background**:
- Subtle party-themed gradient background (purple/pink diagonal)
- Optional: Confetti/celebration graphics as decorative elements (low opacity)
- Photo display area: White/light background to ensure photo clarity

**Player Screen**:
- Clean solid colors (no hero images needed)
- Focus on functional clarity

**Photo Handling**:
- Progressive zoom levels stored as separate images or CSS transforms
- Blur filter overlay: blur(20px) → blur(0px) across 5 levels
- Ensure high contrast regardless of photo content

## Accessibility & Dark Mode

**Consistent Dark Mode** (primary mode for party atmosphere):
- All screens default to dark theme
- High contrast text (white/light gray on dark backgrounds)
- Color-blind safe: Rely on position + letters, not just color
- Focus indicators: 3px solid ring in brand colors

**Touch Targets**:
- Minimum 60px height for all interactive elements on mobile
- 80-100px for primary answer buttons

## Key Visual Principles

1. **Celebration First**: Every interaction should feel rewarding
2. **Clear Hierarchy**: Game state always obvious at a glance
3. **Synchronized Delight**: Host and player screens feel connected through shared color language
4. **Risk/Reward Clarity**: Zoom levels and point values instantly understandable through color and size
5. **Mobile Optimization**: Player screen buttons must be large, colorful, and impossible to mis-tap

## Responsive Breakpoints

- **Player Screens**: Mobile-only design (sm breakpoint max)
- **Host Screen**: Optimized for 1920x1080 landscape (no mobile consideration needed)
- Maintain 16:9 aspect ratio assumptions for host display