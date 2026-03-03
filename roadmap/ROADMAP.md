# L'Hymne - Development Roadmap

**Version:** 1.0.0  
**Last Updated:** March 2, 2026  
**Project Status:** MVP Phase (Core Features Complete)

---

## Overview

This roadmap outlines the phased development plan for L'Hymne, from the current MVP to a production-ready application. Each phase is designed to deliver incremental value while maintaining code quality and user experience.

---

## Phase 1: Foundation ✅ (COMPLETED)

**Timeline:** Weeks 1-2  
**Status:** ✅ Complete

### Delivered Features

| Feature | File | Status |
|---------|------|--------|
| Cinematic Splash Screen | `/src/components/SplashScreen.tsx` | ✅ |
| Main Generator Layout | `/src/features/generator/GeneratorLayout.tsx` | ✅ |
| Configuration Form | `/src/features/generator/components/ConfigForm.tsx` | ✅ |
| Result Display | `/src/features/generator/components/ResultDisplay.tsx` | ✅ |
| Settings Modal | `/src/components/SettingsModal.tsx` | ✅ |
| Gemini AI Service | `/src/services/geminiService.ts` | ✅ |
| Settings Hook | `/src/hooks/useSettings.ts` | ✅ |
| Design System | `/src/index.css` | ✅ |

### Technical Achievements
- React 19 + TypeScript setup
- TailwindCSS 4 integration
- Motion animation library
- Gemini AI integration
- Responsive design system
- LocalStorage persistence

---

## Phase 2: MVP Completion (CURRENT PRIORITY)

**Timeline:** Weeks 3-5  
**Priority:** 🔴 HIGH

### 2.1 Lyrics History System

**Goal:** Allow users to view, manage, and revisit their created lyrics.

**Tasks:**
- [ ] Create `useLyricsHistory` hook
- [ ] Design history data structure (localStorage)
- [ ] Build HistoryPanel component
- [ ] Add delete/clear functionality
- [ ] Implement search/filter by event type
- [ ] Add timestamp and metadata display

**Files to Create:**
```
src/hooks/useLyricsHistory.ts
src/features/history/
  ├── HistoryPanel.tsx
  ├── HistoryItem.tsx
  └── components/
      ├── HistorySearch.tsx
      └── HistoryFilters.tsx
```

**Estimated Effort:** 3-4 days

---

### 2.2 Export Functionality

**Goal:** Enable users to download their creations in multiple formats.

**Tasks:**
- [ ] Install export dependencies (jspdf, html2canvas)
- [ ] Create `useExport` hook
- [ ] Build ExportModal component
- [ ] Implement PDF export (lyrics + styling)
- [ ] Implement TXT export (plain text)
- [ ] Implement Image export (styled card)
- [ ] Add export metadata (date, event, style)

**Files to Create:**
```
src/hooks/useExport.ts
src/features/export/
  ├── ExportModal.tsx
  └── services/
      ├── pdfExporter.ts
      ├── textExporter.ts
      └── imageExporter.ts
```

**Dependencies to Add:**
```json
{
  "jspdf": "^2.5.1",
  "html2canvas": "^1.4.1"
}
```

**Estimated Effort:** 4-5 days

---

### 2.3 Share to Social Media

**Goal:** Enable easy sharing of creations on social platforms.

**Tasks:**
- [ ] Create ShareModal component
- [ ] Implement Web Share API (native sharing)
- [ ] Add platform-specific sharing:
  - [ ] WhatsApp (text + link)
  - [ ] Facebook (OG tags + link)
  - [ ] Twitter/X (text + link)
  - [ ] Instagram (image export guidance)
  - [ ] Email (mailto link)
- [ ] Generate shareable image cards
- [ ] Add copy link functionality

**Files to Create:**
```
src/features/share/
  ├── ShareModal.tsx
  └── services/
      └── shareService.ts
```

**Estimated Effort:** 2-3 days

---

### 2.4 Audio Preview Integration (Suno API)

**Goal:** Generate audio previews of lyrics using Suno AI.

**Tasks:**
- [ ] Research Suno API access/options
- [ ] Create `useAudioPreview` hook
- [ ] Build AudioPlayer component
- [ ] Implement audio generation queue
- [ ] Add playback controls (play, pause, stop)
- [ ] Show generation progress
- [ ] Handle audio download

**Files to Create:**
```
src/hooks/useAudioPreview.ts
src/features/audio/
  ├── AudioPlayer.tsx
  └── services/
      └── sunoService.ts
```

**Note:** Suno API access may require partnership or alternative TTS solution.

**Alternative Options:**
- Google Cloud Text-to-Speech
- Amazon Polly
- ElevenLabs API
- Azure Cognitive Services

**Estimated Effort:** 5-7 days (depends on API access)

---

### 2.5 Template Library

**Goal:** Provide pre-built templates for common scenarios.

**Tasks:**
- [ ] Design template data structure
- [ ] Create 20+ event-specific templates
- [ ] Build TemplateBrowser component
- [ ] Implement template preview
- [ ] Add template customization
- [ ] Allow user to save custom templates

**Files to Create:**
```
src/features/templates/
  ├── TemplateBrowser.tsx
  ├── TemplateCard.tsx
  ├── TemplatePreview.tsx
  └── data/
      └── templates.ts
```

**Template Categories:**
- Birthday (Kids, Adults, Milestone)
- Wedding (Couple, Vows renewal)
- Love (Anniversary, Proposal, Valentine's)
- Family (New Baby, Baptism, Parents)
- Achievement (Graduation, Promotion)
- Memorial (Tribute, Remembrance)

**Estimated Effort:** 4-5 days

---

## Phase 3: Enhanced Features

**Timeline:** Weeks 6-10  
**Priority:** 🟡 MEDIUM

### 3.1 User Authentication (Optional)

**Goal:** Enable cloud sync and cross-device access.

**Options:**
- **Option A:** Firebase Auth (Recommended)
- **Option B:** Supabase Auth
- **Option C:** Auth0

**Tasks:**
- [ ] Choose authentication provider
- [ ] Implement sign-up/login flow
- [ ] Add social login (Google, Apple)
- [ ] Create user profile management
- [ ] Implement cloud storage sync
- [ ] Add logout and session management

**Files to Create:**
```
src/features/auth/
  ├── AuthProvider.tsx
  ├── LoginForm.tsx
  ├── SignupForm.tsx
  └── UserProfile.tsx
src/hooks/useAuth.ts
src/services/authService.ts
```

**Estimated Effort:** 5-7 days

---

### 3.2 Collaboration Features

**Goal:** Enable multiple users to co-create lyrics.

**Tasks:**
- [ ] Design collaboration data model
- [ ] Implement shareable project links
- [ ] Build real-time editing (Yjs/CRDT)
- [ ] Add contributor management
- [ ] Create version history
- [ ] Implement comment/suggestion system

**Files to Create:**
```
src/features/collaboration/
  ├── CollaborationProvider.tsx
  ├── ProjectShare.tsx
  └── components/
      ├── ContributorList.tsx
      ├── VersionHistory.tsx
      └── Comments.tsx
```

**Estimated Effort:** 7-10 days

---

### 3.3 Advanced Customization

**Goal:** Give users more creative control over output.

**Tasks:**
- [ ] Add mood selector (Happy, Sad, Romantic, Energetic)
- [ ] Implement rhyme scheme options (AABB, ABAB, Free)
- [ ] Add verse count selector
- [ ] Create custom structure builder
- [ ] Implement reference artist/style input
- [ ] Add explicit content toggle

**Files to Create:**
```
src/features/customization/
  ├── AdvancedOptions.tsx
  ├── MoodSelector.tsx
  ├── StructureBuilder.tsx
  └── RhymeSchemeSelector.tsx
```

**Estimated Effort:** 4-6 days

---

### 3.4 Voice Input

**Goal:** Allow users to dictate their story instead of typing.

**Tasks:**
- [ ] Integrate Web Speech API
- [ ] Build VoiceInput component
- [ ] Implement speech-to-text
- [ ] Add language detection
- [ ] Create transcription editor
- [ ] Handle punctuation automatically

**Files to Create:**
```
src/features/voice/
  ├── VoiceInput.tsx
  └── services/
      └── speechService.ts
```

**Browser Support:** Chrome, Edge, Safari (limited Firefox)

**Estimated Effort:** 3-4 days

---

### 3.5 Multi-language Expansion

**Goal:** Support 10+ languages for global reach.

**Tasks:**
- [ ] Add language detection
- [ ] Implement i18n for UI (react-i18next)
- [ ] Expand language selectors:
  - [ ] Portuguese
  - [ ] German
  - [ ] Italian
  - [ ] Arabic
  - [ ] Hindi
  - [ ] Mandarin
- [ ] Test AI output quality per language
- [ ] Add RTL support (Arabic, Hebrew)

**Files to Create:**
```
src/locales/
  ├── en/translation.json
  ├── fr/translation.json
  ├── es/translation.json
  ├── pt/translation.json
  └── ...
src/i18n.ts
```

**Estimated Effort:** 5-7 days

---

## Phase 4: Production Ready

**Timeline:** Weeks 11-14  
**Priority:** 🟢 LOW (Pre-Launch)

### 4.1 Comprehensive Testing

**Goal:** Ensure application reliability and quality.

**Tasks:**
- [ ] Set up Vitest testing framework
- [ ] Write unit tests for hooks (80% coverage)
- [ ] Write component tests (React Testing Library)
- [ ] Implement E2E tests (Playwright)
- [ ] Add visual regression tests
- [ ] Set up CI/CD pipeline

**Files to Create:**
```
src/
  ├── __tests__/
  │   ├── hooks/
  │   ├── components/
  │   └── services/
  └── e2e/
      └── *.spec.ts
```

**Dependencies to Add:**
```json
{
  "vitest": "^1.0.0",
  "@testing-library/react": "^14.0.0",
  "@testing-library/jest-dom": "^6.0.0",
  "@playwright/test": "^1.40.0"
}
```

**Estimated Effort:** 7-10 days

---

### 4.2 Performance Optimization

**Goal:** Achieve excellent Core Web Vitals scores.

**Tasks:**
- [ ] Implement code splitting (route-based)
- [ ] Add lazy loading for heavy components
- [ ] Optimize bundle size (tree-shaking)
- [ ] Implement image optimization
- [ ] Add service worker (offline support)
- [ ] Optimize animation performance
- [ ] Implement virtual scrolling for lists
- [ ] Add performance monitoring

**Tools:**
- Vite bundle analyzer
- Lighthouse CI
- Web Vitals library

**Estimated Effort:** 4-6 days

---

### 4.3 Accessibility Audit

**Goal:** Achieve WCAG 2.1 AA compliance.

**Tasks:**
- [ ] Run automated audit (axe-core)
- [ ] Manual keyboard navigation testing
- [ ] Screen reader testing (NVDA, VoiceOver)
- [ ] Add ARIA labels throughout
- [ ] Implement focus management
- [ ] Add skip navigation
- [ ] Ensure color contrast compliance
- [ ] Add reduced motion support
- [ ] Create accessibility statement

**Dependencies to Add:**
```json
{
  "@axe-core/react": "^4.7.0"
}
```

**Estimated Effort:** 3-5 days

---

### 4.4 SEO Optimization

**Goal:** Improve discoverability and sharing.

**Tasks:**
- [ ] Add meta tags (title, description, OG)
- [ ] Implement structured data (JSON-LD)
- [ ] Create sitemap.xml
- [ ] Add robots.txt
- [ ] Optimize for social sharing cards
- [ ] Implement canonical URLs
- [ ] Add PWA manifest

**Files to Create:**
```
public/
  ├── sitemap.xml
  ├── robots.txt
  └── manifest.json
```

**Estimated Effort:** 2-3 days

---

### 4.5 Analytics Integration

**Goal:** Understand user behavior and improve product.

**Tasks:**
- [ ] Choose analytics provider (Plausible, Fathom, GA4)
- [ ] Implement event tracking
- [ ] Track key metrics:
  - Lyrics generated
  - Export actions
  - Share actions
  - Feature usage
- [ ] Create analytics dashboard
- [ ] Set up conversion funnels
- [ ] Implement error tracking (Sentry)

**Dependencies to Add:**
```json
{
  "@sentry/react": "^7.0.0",
  "plausible-tracker": "^0.3.0"
}
```

**Estimated Effort:** 2-3 days

---

## Future Considerations (Post-V1)

### Desktop Application (Tauri)
- Cross-platform desktop app
- Native file system access
- Offline-first architecture
- System tray integration

### Mobile Application (React Native)
- iOS and Android apps
- Native push notifications
- Camera integration for sharing
- Mobile-optimized UX

### API Platform
- Public API for developers
- Webhook integrations
- Zapier/Make connections
- Enterprise plans

### Monetization
- Freemium model (limited free generations)
- Premium subscription (unlimited + advanced features)
- One-time purchases (export packs, templates)
- Enterprise licensing

---

## Milestone Summary

| Phase | Timeline | Key Deliverables | Status |
|-------|----------|------------------|--------|
| Phase 1 | Weeks 1-2 | Core MVP | ✅ Complete |
| Phase 2 | Weeks 3-5 | History, Export, Share, Audio, Templates | 🔄 In Progress |
| Phase 3 | Weeks 6-10 | Auth, Collaboration, Advanced Features | ⏳ Pending |
| Phase 4 | Weeks 11-14 | Testing, Performance, A11y, SEO | ⏳ Pending |

---

## Risk Assessment

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| Suno API unavailable | High | Medium | Use alternative TTS services |
| Gemini API rate limits | Medium | Low | Implement caching, queue system |
| Browser compatibility | Low | Low | Progressive enhancement |
| Performance issues | Medium | Low | Early profiling, optimization |
| Accessibility gaps | Medium | Medium | Regular audits, expert review |

---

## Success Metrics

### Phase 2 Completion
- [ ] Users can view last 50 generated lyrics
- [ ] Export to PDF, TXT, Image working
- [ ] Share to 5+ platforms functional
- [ ] Audio preview generation < 30s
- [ ] 20+ templates available

### Production Launch
- [ ] Lighthouse score > 90 (all categories)
- [ ] WCAG 2.1 AA compliant
- [ ] Test coverage > 80%
- [ ] Bundle size < 300 KB (gzipped)
- [ ] First contentful paint < 1.5s

---

*Generated by PRIDES Agent (Central Orchestrator)*  
*March 2, 2026*
