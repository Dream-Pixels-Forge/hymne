# L'Hymne - Technical Architecture

**Version:** 1.0.0  
**Last Updated:** March 2, 2026  
**Audience:** Developers, Architects, Technical Stakeholders

---

## System Overview

L'Hymne is a single-page application (SPA) built with React 19 and TypeScript, designed to generate personalized song lyrics using Google's Gemini AI. The application follows a component-based architecture with feature-based organization.

### Architecture Style
- **Pattern:** Component-Based Architecture
- **State Management:** React Hooks + LocalStorage
- **Styling:** TailwindCSS 4 (Utility-First)
- **Animations:** Motion (Framer Motion)
- **Build Tool:** Vite 6

---

## High-Level Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER INTERFACE                          │
│  ┌─────────────┐  ┌──────────────┐  ┌─────────────────────────┐ │
│  │   Splash    │  │  Generator   │  │    Settings Modal       │ │
│  │   Screen    │→ │   Layout     │← │    (API + Model)        │ │
│  └─────────────┘  └──────────────┘  └─────────────────────────┘ │
│                          │                                       │
│         ┌────────────────┼────────────────┐                     │
│         ▼                ▼                ▼                     │
│  ┌─────────────┐  ┌──────────────┐  ┌─────────────────────────┐ │
│  │  ConfigForm │  │ ResultDisplay│  │    History Panel        │ │
│  │  (Input)    │  │  (Output)    │  │    (Future)             │ │
│  └─────────────┘  └──────────────┘  └─────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      BUSINESS LOGIC LAYER                       │
│  ┌─────────────────┐  ┌──────────────┐  ┌─────────────────────┐ │
│  │  useSettings    │  │ useLyrics    │  │    useExport        │ │
│  │  (Hook)         │  │ History      │  │    (Hook)           │ │
│  │                 │  │ (Hook)       │  │                     │ │
│  └─────────────────┘  └──────────────┘  └─────────────────────┘ │
│         │                   │                    │               │
│         └───────────────────┼────────────────────┘               │
│                             ▼                                    │
│                  ┌─────────────────────┐                        │
│                  │   geminiService.ts  │                        │
│                  │   (AI Integration)  │                        │
│                  └─────────────────────┘                        │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                       EXTERNAL SERVICES                         │
│  ┌─────────────────┐  ┌──────────────┐  ┌─────────────────────┐ │
│  │  Google Gemini  │  │  LocalStorage│  │   Clipboard API     │ │
│  │  AI API         │  │  (Persistence)│  │                     │ │
│  └─────────────────┘  └──────────────┘  └─────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

---

## Directory Structure

```
hymne/
├── public/                     # Static assets
│   └── logo.svg               # Application logo
├── src/
│   ├── components/            # Shared UI components
│   │   ├── SplashScreen.tsx   # 6-second cinematic intro
│   │   └── SettingsModal.tsx  # Configuration modal
│   │
│   ├── features/              # Feature-based modules
│   │   └── generator/         # Core lyrics generation feature
│   │       ├── GeneratorLayout.tsx
│   │       └── components/
│   │           ├── ConfigForm.tsx      # User input form
│   │           └── ResultDisplay.tsx   # Lyrics output display
│   │
│   ├── hooks/                 # Custom React hooks
│   │   └── useSettings.ts     # Settings persistence
│   │
│   ├── services/              # External service integrations
│   │   └── geminiService.ts   # Gemini AI API wrapper
│   │
│   ├── App.tsx                # Root component
│   ├── main.tsx               # Application entry point
│   └── index.css              # Global styles + Tailwind
│
├── roadmap/                   # Documentation (this folder)
│   ├── PROJECT_STATUS.md
│   ├── ROADMAP.md
│   ├── ARCHITECTURE.md
│   └── DEVELOPMENT_STANDARDS.md
│
├── .env.example              # Environment variables template
├── .gitignore                # Git ignore rules
├── index.html                # HTML entry point
├── package.json              # Dependencies + scripts
├── tsconfig.json             # TypeScript configuration
└── vite.config.ts            # Vite build configuration
```

---

## Component Architecture

### Component Hierarchy

```
App
├── AnimatePresence (Motion)
│   └── SplashScreen (conditional)
└── GeneratorLayout (conditional)
    ├── Header
    │   ├── Logo
    │   ├── Title
    │   └── SettingsButton
    ├── ConfigForm (left column)
    │   ├── EventTypeSelect
    │   ├── SubjectTextarea
    │   ├── StyleSelect
    │   ├── LanguageSelect
    │   └── GenerateButton
    └── ResultDisplay (right column)
        ├── EmptyState
        ├── GeneratingState
        └── ResultState
            ├── StylePrompt + CopyButton
            └── Lyrics + CopyButton
```

### Component Types

#### 1. Layout Components
**Purpose:** Structure and organize the UI

| Component | File | Responsibility |
|-----------|------|----------------|
| `GeneratorLayout` | `/src/features/generator/GeneratorLayout.tsx` | Main app layout, state orchestration |
| `SplashScreen` | `/src/components/SplashScreen.tsx` | Intro animation sequence |

#### 2. Form Components
**Purpose:** User input and configuration

| Component | File | Responsibility |
|-----------|------|----------------|
| `ConfigForm` | `/src/features/generator/components/ConfigForm.tsx` | Event configuration form |
| `SettingsModal` | `/src/components/SettingsModal.tsx` | App settings configuration |

#### 3. Display Components
**Purpose:** Present results and information

| Component | File | Responsibility |
|-----------|------|----------------|
| `ResultDisplay` | `/src/features/generator/components/ResultDisplay.tsx` | Lyrics and style display |

#### 4. Utility Components
**Purpose:** Reusable UI elements

| Component | File | Responsibility |
|-----------|------|----------------|
| `Typewriter` | (inline in SplashScreen) | Typewriter text effect |
| `CopyButton` | (inline in ResultDisplay) | Copy to clipboard |
| `TypewriterText` | (inline in ResultDisplay) | Typewriter lyrics display |

---

## Data Flow

### Lyrics Generation Flow

```
User Input (ConfigForm)
        │
        ▼
┌───────────────────┐
│  formData state   │
│  - eventType      │
│  - subject        │
│  - style          │
│  - language       │
└───────────────────┘
        │
        ▼ (on submit)
┌───────────────────┐
│  handleGenerate   │
│  (GeneratorLayout)│
└───────────────────┘
        │
        ▼
┌───────────────────┐
│  generateLyrics() │
│  (geminiService)  │
└───────────────────┘
        │
        ▼
┌───────────────────┐
│  Google Gemini AI │
│  API Request      │
└───────────────────┘
        │
        ▼
┌───────────────────┐
│  Response Parsing │
│  (STYLE/LYRICS)   │
└───────────────────┘
        │
        ▼
┌───────────────────┐
│  result state     │
│  (GeneratorLayout)│
└───────────────────┘
        │
        ▼
┌───────────────────┐
│  ResultDisplay    │
│  (Render Lyrics)  │
└───────────────────┘
```

### Settings Persistence Flow

```
App Initialization
        │
        ▼
┌───────────────────┐
│  useSettings()    │
│  Hook Init        │
└───────────────────┘
        │
        ▼
┌───────────────────┐
│  localStorage     │
│  Get 'hymne_      │
│  settings'        │
└───────────────────┘
        │
        ├─────┐
        │     │
     Found   Not Found
        │     │
        ▼     ▼
   Parse   DEFAULT_
   JSON    SETTINGS
        │     │
        └─────┘
              │
              ▼
       settings state
              │
              ▼
       (User modifies)
              │
              ▼
       setSettings()
              │
              ▼
       useEffect trigger
              │
              ▼
       localStorage.setItem()
```

---

## State Management

### State Architecture

L'Hymne uses a **distributed state management** approach with React Hooks:

```
┌─────────────────────────────────────────────────────────┐
│                    Application State                    │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Local Component State (useState)                      │
│  ┌─────────────────────────────────────────────────┐   │
│  │ ConfigForm: formData                            │   │
│  │ ResultDisplay: displayedText, copied            │   │
│  │ SplashScreen: displayed (typewriter)            │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  Feature State (useState in Layout)                    │
│  ┌─────────────────────────────────────────────────┐   │
│  │ GeneratorLayout:                                │   │
│  │   - isGenerating (boolean)                      │   │
│  │   - result (object | null)                      │   │
│  │   - isSettingsOpen (boolean)                    │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  Persistent State (Custom Hook + localStorage)         │
│  ┌─────────────────────────────────────────────────┐   │
│  │ useSettings:                                    │   │
│  │   - apiKey (string)                             │   │
│  │   - model (string)                              │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### State Interfaces

```typescript
// Settings State
interface AppSettings {
  apiKey: string;
  model: string;
}

// Form State
interface GeneratorFormData {
  eventType: string;
  subject: string;
  style: string;
  language: string;
}

// Result State
interface GeneratorResult {
  style: string;
  lyrics: string;
}

// Lyrics History (Future)
interface LyricsHistoryItem {
  id: string;
  eventType: string;
  subject: string;
  style: string;
  language: string;
  lyrics: string;
  createdAt: number;
}
```

---

## Service Layer

### Gemini AI Service

**File:** `/src/services/geminiService.ts`

**Responsibility:** Abstract AI API interactions

```typescript
// Function Signature
async function generateLyrics(
  eventType: string,      // e.g., "Anniversaire"
  subject: string,        // User's story/details
  style: string,          // Musical style prompt
  language: string,       // e.g., "Français"
  apiKeyOverride?: string,// Optional custom API key
  modelOverride?: string  // Optional model selection
): Promise<string>        // Generated lyrics
```

**Internal Flow:**
1. Validate API key
2. Initialize GoogleGenAI client
3. Construct system prompt (lyricist persona)
4. Construct user query (event details)
5. Call Gemini API
6. Parse response (split STYLE/LYRICS)
7. Return lyrics text

**System Prompt Structure:**
```
Tu es un parolier expert spécialisé dans les grands événements de vie.

RÈGLES:
1. PAS DE CLICHÉS - Évite les rimes trop simples
2. FORMAT BALISES SUNO - [Balise-DétailTechnique]
3. TON - Adapté à l'événement
4. ZERO SUNO - Ne jamais écrire "Suno"
5. STRUCTURE - Intro, Verse, Chorus, Bridge, Outro
```

---

## Styling Architecture

### Design Tokens

```css
/* Colors */
--background: #050505
--foreground: #f5f5f5
--accent-pink: #ec4899
--accent-purple: #a855f7

/* Typography */
--font-sans: "Inter"
--font-serif: "Cormorant Garamond"
--font-mono: "JetBrains Mono"

/* Spacing Scale */
Base: 4px (0.25rem)
Scale: 4, 8, 12, 16, 24, 32, 48, 64...

/* Animation */
Duration: 150ms, 300ms, 600ms, 1000ms, 2500ms
Easing: spring, easeInOut, easeOut
```

### TailwindCSS Configuration

**File:** `/src/index.css`

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=JetBrains+Mono:wght@400&display=swap');
@import "tailwindcss";

@theme {
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-serif: "Cormorant Garamond", ui-serif, Georgia, serif;
  --font-mono: "JetBrains Mono", ui-monospace, SFMono-Regular, monospace;
}
```

### Component Styling Patterns

**Atmospheric Background:**
```tsx
<div className="absolute inset-0 z-0 pointer-events-none">
  <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] 
                  bg-purple-900/20 blur-[120px] rounded-full 
                  mix-blend-screen" />
  <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] 
                  bg-pink-900/20 blur-[120px] rounded-full 
                  mix-blend-screen" />
</div>
```

**Glassmorphism Card:**
```tsx
<div className="bg-white/[0.02] border border-white/10 
                backdrop-blur-sm rounded-3xl shadow-2xl">
```

---

## Animation Architecture

### Motion Library Usage

**File:** Various components

**Animation Types:**

1. **Entrance Animations**
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.2 }}
>
```

2. **Exit Animations**
```tsx
<AnimatePresence mode="wait">
  {showSplash && (
    <SplashScreen 
      onComplete={() => setShowSplash(false)} 
    />
  )}
</AnimatePresence>

// In SplashScreen
exit={{ opacity: 0, transition: { duration: 1.5 } }}
```

3. **Spring Physics**
```tsx
transition={{ 
  type: "spring", 
  stiffness: 200, 
  damping: 20 
}}
```

4. **Staggered Animations**
```tsx
// Parent
<motion.div variants={containerVariants}>
  <motion.div variants={itemVariants} />
  <motion.div variants={itemVariants} />
</motion.div>
```

### Splash Screen Animation Layers

```
Layer 1 (0-6s): RÉSONANCE typography (blur + scale)
Layer 2 (0-6s): Hex grid typewriter (density)
Layer 3 (0.5-6s): HUD elements (system status)
Layer 4 (1-6s): Musical tags (scattered)
Layer 5 (2.5-6s): Poetic text (floating)
Foreground (1.5-6s): Title reveal (scale + blur)
Exit (6-7.5s): Fade out
```

---

## Build & Deployment

### Vite Configuration

**File:** `/vite.config.ts`

```typescript
export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react(), tailwindcss()],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    // Tauri configurations
    clearScreen: false,
    server: {
      strictPort: true,
      hmr: process.env.DISABLE_HMR !== 'true',
    },
    envPrefix: ['VITE_', 'TAURI_'],
  };
});
```

### Build Process

```
npm run dev
  │
  ├─→ Vite Dev Server
  ├─→ HMR (Hot Module Replacement)
  ├─→ Port 3000
  └─→ 0.0.0.0 (network accessible)

npm run build
  │
  ├─→ TypeScript Check
  ├─→ Bundle Optimization
  ├─→ CSS Purging (Tailwind)
  ├─→ Asset Optimization
  └─→ Output: /dist

npm run preview
  │
  └─→ Local production preview
```

### Environment Variables

```bash
# .env (local development)
GEMINI_API_KEY=your_api_key_here

# .env.example (committed to repo)
GEMINI_API_KEY="MY_GEMINI_API_KEY"
```

---

## Security Architecture

### API Key Management

**Current Approach:**
```
┌─────────────────────────────────────────────┐
│            API Key Flow                     │
├─────────────────────────────────────────────┤
│                                             │
│  1. Environment Variable (Development)      │
│     process.env.GEMINI_API_KEY              │
│                                             │
│  2. Settings Modal (User Override)          │
│     localStorage → settings.apiKey          │
│                                             │
│  3. Service Layer (Usage)                   │
│     apiKeyOverride || process.env.KEY       │
│                                             │
└─────────────────────────────────────────────┘
```

**Security Considerations:**
- ⚠️ Client-side API keys are exposed
- ✅ Keys stored in localStorage (not cookies)
- ✅ Optional user-provided keys
- ⚠️ No server-side proxy (yet)

**Recommendations for Production:**
1. Implement server-side API proxy
2. Add rate limiting
3. Use API key rotation
4. Implement request signing

---

## Performance Considerations

### Bundle Optimization

**Current State:**
- Total Bundle: ~230 KB (gzipped)
- Code Splitting: Ready (Vite)
- Tree Shaking: Enabled

**Optimization Strategies:**
1. Lazy load heavy components
2. Dynamic imports for routes
3. Image optimization (SVG already optimized)
4. CSS purging (Tailwind automatic)

### Runtime Performance

**Animation Performance:**
- Using CSS transforms (GPU accelerated)
- Will-change hints for animated elements
- Reduced motion support (future)

**Rendering Optimization:**
- React.memo for pure components
- useMemo for expensive calculations
- useCallback for event handlers

---

## Future Architecture Plans

### Phase 2 Additions

```
src/
├── features/
│   ├── history/           # Lyrics history
│   ├── export/            # Export functionality
│   ├── share/             # Social sharing
│   ├── audio/             # Audio preview
│   └── templates/         # Template library
├── hooks/
│   ├── useLyricsHistory.ts
│   ├── useExport.ts
│   └── useAudioPreview.ts
└── services/
    ├── exportService.ts
    ├── shareService.ts
    └── sunoService.ts
```

### Phase 3 Additions

```
src/
├── features/
│   ├── auth/              # User authentication
│   ├── collaboration/     # Real-time collaboration
│   ├── customization/     # Advanced options
│   └── voice/             # Voice input
├── hooks/
│   ├── useAuth.ts
│   └── useCollaboration.ts
└── services/
    ├── authService.ts
    └── speechService.ts
```

### State Management Evolution

**Current:** React Hooks + localStorage

**Future Options:**
- **Zustand:** Lightweight, simple
- **Jotai:** Atomic state, great for complex apps
- **Redux Toolkit:** If collaboration features need complex state

---

## Testing Strategy (Future)

### Testing Pyramid

```
         ┌───┐
        │ E2E │        Playwright
       ├───────┤
      │Integration│   React Testing Library
     ├─────────────┤
    │   Unit Tests   │  Vitest
   └─────────────────┘
```

### Test Coverage Goals

| Layer | Target | Tools |
|-------|--------|-------|
| Unit Tests | 80% | Vitest |
| Component Tests | 70% | React Testing Library |
| E2E Tests | Critical paths | Playwright |

---

## Monitoring & Observability (Future)

### Error Tracking
- **Tool:** Sentry
- **Features:** Error reporting, performance monitoring

### Analytics
- **Tool:** Plausible (privacy-focused)
- **Metrics:** Page views, events, conversions

### Performance Monitoring
- **Tool:** Web Vitals
- **Metrics:** LCP, FID, CLS, FCP

---

## API Reference

### Gemini AI API

**Endpoint:** `https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent`

**Request:**
```typescript
{
  model: "gemini-3.1-pro-preview",
  contents: userQuery,
  config: {
    systemInstruction: systemPrompt
  }
}
```

**Response:**
```typescript
{
  text: string,
  // Parsed to extract lyrics
}
```

### LocalStorage Schema

**Key:** `hymne_settings`

**Value:**
```typescript
{
  apiKey: string,
  model: string
}
```

**Future Keys:**
- `hymne_history`: LyricsHistoryItem[]
- `hymne_templates`: CustomTemplate[]

---

## Glossary

| Term | Definition |
|------|------------|
| **MVP** | Minimum Viable Product |
| **SPA** | Single Page Application |
| **HMR** | Hot Module Replacement |
| **OG** | Open Graph (social sharing metadata) |
| **WCAG** | Web Content Accessibility Guidelines |
| **LCP** | Largest Contentful Paint |
| **FID** | First Input Delay |
| **CLS** | Cumulative Layout Shift |

---

## References

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Documentation](https://vitejs.dev)
- [TailwindCSS Documentation](https://tailwindcss.com)
- [Motion (Framer Motion)](https://motion.dev)
- [Gemini AI API](https://ai.google.dev/gemini-api/docs)

---

*Generated by PRIDES Agent (Central Orchestrator)*  
*March 2, 2026*
