# L'Hymne - Development Standards

**Version:** 1.0.0
**Last Updated:** March 2, 2026
**Status:** Active

---

## Table of Contents

1. [Code Conventions](#code-conventions)
2. [TypeScript Guidelines](#typescript-guidelines)
3. [React Best Practices](#react-best-practices)
4. [Component Patterns](#component-patterns)
5. [Styling Standards](#styling-standards)
6. [Git Workflow](#git-workflow)
7. [Testing Strategy](#testing-strategy)
8. [Security Guidelines](#security-guidelines)
9. [Accessibility Standards](#accessibility-standards)
10. [Performance Guidelines](#performance-guidelines)

---

## Code Conventions

### File Naming

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `GeneratorLayout.tsx`, `ConfigForm.tsx` |
| Hooks | camelCase with `use` prefix | `useSettings.ts`, `useLyricsHistory.ts` |
| Services | camelCase | `geminiService.ts`, `exportService.ts` |
| Utils | camelCase | `formatDate.ts`, `validateEmail.ts` |
| Types/Interfaces | PascalCase | `AppSettings.ts`, `LyricsHistory.ts` |
| Constants | UPPER_SNAKE_CASE | `DEFAULT_SETTINGS.ts`, `EVENT_TYPES.ts` |
| Tests | `*.test.ts` or `*.spec.ts` | `geminiService.test.ts` |

### Directory Structure

```
src/
├── components/          # Shared, reusable components
├── features/            # Feature-based modules
│   └── feature-name/
│       ├── components/  # Feature-specific components
│       ├── hooks/       # Feature-specific hooks
│       ├── services/    # Feature-specific services
│       └── types/       # Feature-specific types
├── hooks/               # Shared hooks
├── services/            # Shared services
├── types/               # Shared types
├── utils/               # Utility functions
└── lib/                 # External library configurations
```

### Code Organization

**Within a file, organize in this order:**

1. Imports (external, internal, types, styles)
2. Type definitions
3. Constants
4. Component/Hook/Function
5. Exports

```typescript
// ✅ Good
import { useState } from 'react';
import { motion } from 'motion/react';

import { Sparkles, Loader2 } from 'lucide-react';

import type { GeneratorFormData } from '../types';

import { cn } from '@/utils/classNames';

const DEFAULT_EVENT_TYPE = 'Anniversaire';

export function ConfigForm({ onSubmit, isGenerating }: ConfigFormProps) {
  // Component logic
}
```

---

## TypeScript Guidelines

### Strict Mode Configuration

**Required `tsconfig.json` settings:**

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "useUnknownInCatchVariables": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "exactOptionalPropertyTypes": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true,
    "noPropertyAccessFromIndexSignature": true
  }
}
```

### Type Definitions

**Prefer interfaces for object shapes:**

```typescript
// ✅ Good
interface AppSettings {
  apiKey: string;
  model: string;
}

// ❌ Avoid (for public APIs)
type AppSettings = {
  apiKey: string;
  model: string;
};
```

**Use type aliases for unions and complex types:**

```typescript
// ✅ Good
type GenerationStatus = 'idle' | 'generating' | 'success' | 'error';

type EventHandler<T = unknown> = (data: T) => void | Promise<void>;
```

### Avoid `any`

```typescript
// ❌ Bad
function processData(data: any) {
  return data.value;
}

// ✅ Good
function processData<T>(data: { value: T }): T {
  return data.value;
}

// ✅ Good (when necessary)
function logError(error: unknown) {
  if (error instanceof Error) {
    console.error(error.message);
  } else {
    console.error('Unknown error:', error);
  }
}
```

### Nullable Handling

```typescript
// ❌ Bad
function getLyrics(result: Result | null): string {
  return result!.lyrics; // Non-null assertion
}

// ✅ Good
function getLyrics(result: Result | null): string | undefined {
  return result?.lyrics;
}

// ✅ Good (with default)
function getLyrics(result: Result | null): string {
  return result?.lyrics ?? 'No lyrics generated';
}
```

---

## React Best Practices

### Component Structure

**Functional Components with Hooks:**

```typescript
interface ConfigFormProps {
  onSubmit: (data: GeneratorFormData) => void;
  isGenerating: boolean;
}

export function ConfigForm({ onSubmit, isGenerating }: ConfigFormProps) {
  // 1. State declarations
  const [formData, setFormData] = useState<GeneratorFormData>(initialData);
  
  // 2. Custom hooks
  const { settings } = useSettings();
  
  // 3. Derived state
  const isValid = formData.subject.trim().length > 0;
  
  // 4. Effects
  useEffect(() => {
    // Side effects
  }, [dependencies]);
  
  // 5. Event handlers
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };
  
  // 6. Render
  return (
    <form onSubmit={handleSubmit}>
      {/* JSX */}
    </form>
  );
}
```

### Props Destructuring

```typescript
// ✅ Good - Destructure in function signature
export function ConfigForm({ onSubmit, isGenerating }: ConfigFormProps) {
  // ...
}

// ❌ Avoid - Destructure inside body
export function ConfigForm(props: ConfigFormProps) {
  const { onSubmit, isGenerating } = props;
  // ...
}
```

### Event Handlers

```typescript
// ✅ Good - Named handlers
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  onSubmit(formData);
};

<form onSubmit={handleSubmit}>

// ✅ Good - Inline for simple cases
<button onClick={() => setIsOpen(true)}>

// ❌ Avoid - Inline complex logic
<button onClick={() => {
  const data = processData(formData);
  saveToStorage(data);
  navigate('/result');
}}>
```

### Keys in Lists

```typescript
// ✅ Good - Stable unique ID
{items.map(item => (
  <ListItem key={item.id} data={item} />
))}

// ❌ Avoid - Index as key (unless list is static)
{items.map((item, index) => (
  <ListItem key={index} data={item} />
))}
```

---

## Component Patterns

### Compound Components

```typescript
// Usage
<Modal>
  <Modal.Header>Title</Modal.Header>
  <Modal.Body>Content</Modal.Body>
  <Modal.Footer>Actions</Modal.Footer>
</Modal>

// Implementation
interface ModalCompound {
  Header: React.FC<{ children: React.ReactNode }>;
  Body: React.FC<{ children: React.ReactNode }>;
  Footer: React.FC<{ children: React.ReactNode }>;
}

export const Modal: React.FC<ModalProps> & ModalCompound = (props) => {
  // ...
};

Modal.Header = ({ children }) => { /* ... */ };
Modal.Body = ({ children }) => { /* ... */ };
Modal.Footer = ({ children }) => { /* ... */ };
```

### Render Props Pattern

```typescript
interface StatusRenderProps {
  status: GenerationStatus;
  error: Error | null;
  retry: () => void;
}

interface StatusRendererProps {
  children: (props: StatusRenderProps) => React.ReactNode;
}

export function StatusRenderer({ children }: StatusRendererProps) {
  const [status, setStatus] = useState<GenerationStatus>('idle');
  
  return children({ status, error: null, retry: () => {} });
}

// Usage
<StatusRenderer>
  {({ status, error, retry }) => (
    <div>{status === 'generating' ? <Loader /> : <Content />}</div>
  )}
</StatusRenderer>
```

### Custom Hooks Pattern

```typescript
interface UseLyricsReturn {
  lyrics: string | null;
  isGenerating: boolean;
  error: Error | null;
  generate: (options: GenerateOptions) => Promise<void>;
  clear: () => void;
}

export function useLyrics(): UseLyricsReturn {
  const [lyrics, setLyrics] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  
  const generate = async (options: GenerateOptions) => {
    setIsGenerating(true);
    setError(null);
    try {
      const result = await generateLyrics(options);
      setLyrics(result);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsGenerating(false);
    }
  };
  
  const clear = () => {
    setLyrics(null);
    setError(null);
  };
  
  return { lyrics, isGenerating, error, generate, clear };
}
```

---

## Styling Standards

### TailwindCSS Classes Order

**Follow this order for consistency:**

1. Layout (`flex`, `grid`, `relative`, `absolute`)
2. Spacing (`m-*`, `p-*`, `space-*`, `gap-*`)
3. Sizing (`w-*`, `h-*`, `min-*`, `max-*`)
4. Typography (`text-*`, `font-*`, `tracking-*`, `leading-*`)
5. Colors (`text-*`, `bg-*`, `border-*`, `fill-*`, `stroke-*`)
6. Borders (`border`, `rounded-*`, `border-*`)
7. Effects (`shadow-*`, `blur-*`, `opacity-*`)
8. Transitions (`transition`, `duration-*`, `ease-*`)
9. Transforms (`transform`, `rotate-*`, `scale-*`)
10. States (`hover:*`, `focus:*`, `active:*`, `disabled:*`)

```typescript
// ✅ Good
<button className="
  flex items-center justify-center gap-2
  px-6 py-3
  text-xs font-bold uppercase tracking-widest
  text-white
  bg-gradient-to-r from-pink-600 to-purple-600
  rounded-xl
  shadow-lg
  hover:shadow-pink-500/40
  transition-all
  disabled:opacity-50 disabled:cursor-not-allowed
">
```

### Responsive Design

```typescript
// Mobile-first approach
<div className="
  text-sm           // Mobile (default)
  md:text-lg        // Tablet
  lg:text-xl        // Desktop
">
```

### Custom Classes (When Necessary)

```css
/* In index.css */
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.1) rgba(255, 255, 255, 0.02);
}

.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.02);
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1);
}
```

---

## Git Workflow

### Branch Naming

```
feature/lyrics-history          # New feature
fix/splash-screen-animation     # Bug fix
chore/update-dependencies       # Maintenance
docs/add-architecture-docs      # Documentation
refactor/gemini-service         # Code refactoring
test/add-unit-tests             # Tests
```

### Commit Message Format

**Follow Conventional Commits:**

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Build/config changes

**Examples:**

```bash
# ✅ Good
feat(generator): add lyrics history panel
fix(settings): prevent API key leakage in logs
docs(roadmap): update phase 2 timeline
refactor(services): extract error handling logic

# ❌ Bad
added stuff
fixed bug
update
```

### Pull Request Guidelines

**PR Template:**

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] 🎉 New feature
- [ ] 🐛 Bug fix
- [ ] 📝 Documentation
- [ ] ♻️ Refactoring
- [ ] ⚡ Performance
- [ ] ✅ Tests

## Testing
- [ ] Unit tests added/updated
- [ ] Manual testing performed
- [ ] E2E tests pass

## Checklist
- [ ] Code follows project guidelines
- [ ] Self-review completed
- [ ] Comments added where necessary
- [ ] No new warnings
- [ ] Documentation updated
```

---

## Testing Strategy

### Test File Organization

```
src/
├── __tests__/
│   ├── components/
│   │   ├── ConfigForm.test.tsx
│   │   └── ResultDisplay.test.tsx
│   ├── hooks/
│   │   ├── useSettings.test.ts
│   │   └── useLyrics.test.ts
│   └── services/
│       └── geminiService.test.ts
└── e2e/
    ├── generator.spec.ts
    └── settings.spec.ts
```

### Unit Test Pattern (Vitest)

```typescript
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useSettings } from './useSettings';

describe('useSettings', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should return default settings when no saved settings', () => {
    const { result } = renderHook(() => useSettings());
    
    expect(result.current.settings).toEqual({
      apiKey: '',
      model: 'gemini-3.1-pro-preview',
    });
  });

  it('should load saved settings from localStorage', () => {
    localStorage.setItem('hymne_settings', JSON.stringify({
      apiKey: 'test-key',
      model: 'gemini-3-flash-preview',
    }));

    const { result } = renderHook(() => useSettings());
    
    expect(result.current.settings.apiKey).toBe('test-key');
  });

  it('should save settings to localStorage on update', () => {
    const { result } = renderHook(() => useSettings());
    
    act(() => {
      result.current.setSettings({
        apiKey: 'new-key',
        model: 'gemini-3.0-pro-preview',
      });
    });

    const saved = JSON.parse(localStorage.getItem('hymne_settings')!);
    expect(saved).toEqual({
      apiKey: 'new-key',
      model: 'gemini-3.0-pro-preview',
    });
  });
});
```

### Component Test Pattern (React Testing Library)

```typescript
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ConfigForm } from './ConfigForm';

describe('ConfigForm', () => {
  const mockOnSubmit = vi.fn();

  it('should render all form fields', () => {
    render(<ConfigForm onSubmit={mockOnSubmit} isGenerating={false} />);
    
    expect(screen.getByLabelText(/événement/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/histoire/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/direction artistique/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/langue/i)).toBeInTheDocument();
  });

  it('should call onSubmit with form data on submit', () => {
    render(<ConfigForm onSubmit={mockOnSubmit} isGenerating={false} />);
    
    fireEvent.change(screen.getByLabelText(/histoire/i), {
      target: { value: 'Test subject' },
    });
    
    fireEvent.click(screen.getByRole('button', { name: /générer/i }));
    
    expect(mockOnSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        subject: 'Test subject',
      })
    );
  });

  it('should show loading state when generating', () => {
    render(<ConfigForm onSubmit={mockOnSubmit} isGenerating={true} />);
    
    expect(screen.getByText(/création en cours/i)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
```

---

## Security Guidelines

### API Key Handling

```typescript
// ✅ Good - Environment variable with fallback
const apiKey = apiKeyOverride || process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error('API key is required');
}

// ❌ Bad - Hardcoded key
const apiKey = 'sk-1234567890abcdef';

// ❌ Bad - Committed to .env
// GEMINI_API_KEY=sk-1234567890abcdef
```

### Input Sanitization

```typescript
// ✅ Good - Validate and sanitize
function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .trim()
    .slice(0, 1000); // Limit length
}

// ✅ Good - Validate before API call
if (!formData.subject.trim()) {
  throw new Error('Subject is required');
}
```

### Error Messages

```typescript
// ✅ Good - Generic error messages to users
try {
  await generateLyrics(data);
} catch (error) {
  console.error('Lyrics generation failed:', error);
  alert('Une erreur est survenue lors de la création.');
}

// ❌ Bad - Exposing internal errors
alert(`Error: ${error.message} at ${error.stack}`);
```

---

## Accessibility Standards

### WCAG 2.1 AA Compliance

#### Keyboard Navigation

```typescript
// ✅ Good - Focusable elements
<button
  onClick={handleClick}
  className="..."
>
  Click me
</button>

// ✅ Good - Custom keyboard handling
<div
  role="button"
  tabIndex={0}
  onClick={handleClick}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleClick();
    }
  }}
>
  Custom button
</div>
```

#### ARIA Labels

```typescript
// ✅ Good - Descriptive labels
<button
  onClick={() => setIsSettingsOpen(true)}
  aria-label="Open settings"
  aria-expanded={isSettingsOpen}
  className="..."
>
  <Settings className="w-5 h-5" />
</button>

// ✅ Good - Live regions for dynamic content
<div
  role="status"
  aria-live="polite"
  aria-atomic="true"
>
  {isGenerating ? 'Generating...' : 'Ready'}
</div>
```

#### Skip Navigation

```typescript
// Add to main layout
<a
  href="#main-content"
  className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-white text-black px-4 py-2 z-50"
>
  Skip to main content
</a>

<main id="main-content">
  {/* Main content */}
</main>
```

#### Reduced Motion

```css
/* In index.css */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Performance Guidelines

### Code Splitting

```typescript
// ✅ Good - Lazy load heavy components
const HistoryPanel = lazy(() => import('./features/history/HistoryPanel'));

// Usage with Suspense
<Suspense fallback={<Loader />}>
  <HistoryPanel />
</Suspense>
```

### Memoization

```typescript
// ✅ Good - Memoize expensive computations
const processedLyrics = useMemo(() => {
  return lyrics.split('\n').map(line => processLine(line));
}, [lyrics]);

// ✅ Good - Memoize callbacks
const handleSubmit = useCallback((data: FormData) => {
  onSubmit(data);
}, [onSubmit]);

// ✅ Good - Memoize components
const MemoizedResult = memo(ResultDisplay);
```

### Image Optimization

```typescript
// ✅ Good - SVG for logos/icons
<img src="/logo.svg" alt="L'Hymne Logo" className="w-16 h-16" />

// Future: WebP with fallback
<picture>
  <source srcSet="/image.webp" type="image/webp" />
  <img src="/image.jpg" alt="Description" />
</picture>
```

### Bundle Analysis

```bash
# Install bundle analyzer
npm install -D rollup-plugin-visualizer

# Add to vite.config.ts
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    visualizer({ open: true }),
  ],
});
```

---

## Documentation Standards

### Component Documentation

```typescript
/**
 * ConfigForm - Main configuration form for lyrics generation
 *
 * Allows users to select event type, input story details,
 * choose musical style, and select language.
 *
 * @param onSubmit - Callback when form is submitted
 * @param isGenerating - Loading state for submit button
 *
 * @example
 * ```tsx
 * <ConfigForm
 *   onSubmit={(data) => handleGenerate(data)}
 *   isGenerating={isGenerating}
 * />
 * ```
 */
export function ConfigForm({ onSubmit, isGenerating }: ConfigFormProps) {
  // ...
}
```

### README Sections

Every new feature should include:
1. **Description** - What it does
2. **Usage** - How to use it
3. **Props/API** - Interface documentation
4. **Examples** - Code examples
5. **Dependencies** - Required packages

---

## Review Checklist

### Pre-Commit Checklist

- [ ] Code compiles without errors
- [ ] Lint passes (`npm run lint`)
- [ ] No TypeScript errors
- [ ] No console.log statements (except in development)
- [ ] No TODO comments without issue reference
- [ ] Code is formatted (Prettier)

### Pre-Merge Checklist

- [ ] All tests pass
- [ ] Test coverage > 80%
- [ ] No accessibility violations
- [ ] Performance impact assessed
- [ ] Documentation updated
- [ ] Security review completed
- [ ] Cross-browser testing done

### Pre-Deploy Checklist

- [ ] All pre-merge checks passed
- [ ] Build succeeds (`npm run build`)
- [ ] Bundle size within budget
- [ ] Smoke tests pass
- [ ] Rollback plan ready
- [ ] Monitoring configured

---

## Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Web.dev Performance](https://web.dev/performance/)
- [Conventional Commits](https://www.conventionalcommits.org/)

---

*Generated by PRIDES Agent (Central Orchestrator)*
*March 2, 2026*
