# Locaylo

**Real people. Real places. Real travel.**

A Next.js application connecting travelers with locals for authentic experiences around the world.

*This is a project for MSE 343.*

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Package Manager**: npm

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm

### Installation

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

## Project Structure

```
/app
  ├── /ui                 # Reusable UI components
  │   ├── SocialIcon.tsx  # Social media login icons
  │   ├── Keypad.tsx      # Custom numeric keypad
  │   └── BottomNav.tsx   # Bottom navigation bar
  ├── layout.tsx          # Root layout
  ├── page.tsx            # Main application page
  └── globals.css         # Global styles and Tailwind imports
/lib
  ├── types.ts            # TypeScript type definitions
  └── data.ts             # Mock data for activities
```

## Features

- **Authentication Flow**: Phone number and OTP verification
- **Role Selection**: Choose between Traveler or Local modes
- **Traveler Mode**: 
  - Browse trending activities worldwide
  - List and map views
  - Advanced filtering options
  - Language preferences
- **Local Mode**: 
  - Manage your activities
  - Schedule and edit events
  - View pending and scheduled activities

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Design Philosophy

This app follows a mobile-first design approach with a maximum width constraint for optimal viewing on mobile devices. All interactions are optimized for touch screens with appropriate hover and active states.

