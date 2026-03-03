# L'Hymne - Créateur de Souvenirs

<div align="center">

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)
[![Version](https://img.shields.io/badge/version-1.0.0-green.svg)
[![Platform](https://img.shields.io/badge/platform-Web%20%7C%20Desktop-orange.svg)

</div>

AI-powered lyrics generator for creating personalized songs for special events. Transform precious moments into unforgettable melodies with the power of artificial intelligence.

## About

L'Hymne helps you create meaningful, personalized lyrics for weddings, birthdays, anniversaries, graduations, and all life's special moments. Whether you want to celebrate love, friendship, or a milestone achievement, our AI generates beautiful, heartfelt lyrics tailored to your story.

## Features

### Core Features

- **AI-Powered Lyrics Generation** - Create unique, personalized lyrics using Google Gemini AI
- **Multiple Event Types** - Support for weddings, birthdays, anniversaries, graduations, and more
- **Song History** - Save and manage all your created songs
- **Export Options** - Download your lyrics in various formats
- **Beautiful UI** - Intuitive, modern interface with smooth animations

### Desktop Features

- **Native Desktop App** - Built with Tauri for a native experience
- **Local Database** - SQLite-based storage for offline access
- **Window Management** - Minimize, maximize, and close controls

## Tech Stack

| Category   | Technology     |
| ---------- | -------------- |
| Frontend   | React 19       |
| Build Tool | Vite           |
| Styling    | Tailwind CSS 4 |
| Desktop    | Tauri 2.0      |
| Language   | TypeScript     |
| Database   | Better-SQLite3 |
| AI         | Google Gemini  |
| Animation  | Motion         |
| Icons      | Lucide React   |

## Prerequisites

- Node.js 18+
- npm or yarn
- For desktop app: Rust toolchain

## Getting Started

### Installation

```bash
# Clone the repository
git clone https://github.com/Dream-Pixels-Forge/hymne.git

# Navigate to project directory
cd hymne

# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev

# Run with custom port
npm run dev -- --port=3000

# Run TypeScript type checking
npm run lint

# Format code
npm run format
```

### Building

```bash
# Build for web
npm run build

# Preview production build
npm run preview

# Clean build artifacts
npm run clean
```

### Desktop App

```bash
# Run desktop app in development mode
npm run tauri:dev

# Build desktop app for production
npm run tauri:build
```

## Project Structure

```
hymne/
├── src/                  # Source code
│   ├── components/      # React components
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utilities and helpers
│   ├── styles/          # CSS and styles
│   └── App.tsx          # Main application
├── public/              # Static assets
├── server/              # Express server (if needed)
├── src-tauri/           # Tauri desktop app source
├── package.json         # Project dependencies
├── vite.config.ts       # Vite configuration
├── tailwind.config.js   # Tailwind CSS configuration
└── tsconfig.json        # TypeScript configuration
```

## Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_GEMINI_API_KEY=your_api_key_here
```

### API Keys

This project uses Google Gemini AI for lyrics generation. You'll need to:

1. Get an API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Add it to your `.env` file

## Testing

```bash
# Run tests
npm run test

# Run tests with UI
npm run test:ui

# Run tests in watch mode
npm run test:run

# Run tests with coverage
npm run test:coverage
```

## License

Licensed under the Apache License 2.0. See [LICENSE](LICENSE) for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Acknowledgments

- [Google Gemini AI](https://gemini.google.com/) for AI capabilities
- [Tauri](https://tauri.app/) for desktop app framework
- [Vite](https://vitejs.dev/) for fast build tooling
- [Tailwind CSS](https://tailwindcss.com/) for styling

---

<div align="center">

Made with ❤️ by L'Hymne Team

</div>
