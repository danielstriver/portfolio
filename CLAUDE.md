# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server (Vite)
npm run build     # Type-check + production build (tsc -b && vite build)
npm run lint      # ESLint
npm run preview   # Serve the production build locally
```

There are no tests.

## Architecture

Single-page portfolio app: React 19 + TypeScript + Vite + Tailwind CSS v4 + Framer Motion. Deployed to Vercel at `https://danielstriver.vercel.app`.

### Content & i18n

**All portfolio content and translations live in `src/constants/index.ts`.**

- `COMMON_INFO` — personal info (name, email, phone, socials)
- `DATA` — a `Record<Language, TranslationData>` with full translations for all six languages: English (`en`), Kinyarwanda (`rw`), French (`fr`), Spanish (`es`), German (`de`), and Portuguese (`pt`). Every string the UI renders (section headings, nav labels, contact copy, experience entries, projects, gallery, skills, education) is duplicated here for each language.

When adding new content or UI copy, add it to **all six** language entries in `DATA` and update the `TranslationData` interface in `src/types/language.types.ts` if new keys are needed.

### Translation system

- `LanguageProvider` (`src/providers/LanguageProvider.tsx`) reads/writes language preference to `localStorage` and sets `document.documentElement.lang`.
- `useTranslation` hook (`src/hooks/useTranslation.ts`) exposes `t(key)` using dot-notation path traversal into `DATA[language]`.
- `LanguageSwitcher` component lets users switch between all six languages.

### Theme system

- `ThemeProvider` (`src/providers/ThemeProvider.tsx`) manages `light` / `dark` / `system` preference stored in `localStorage` under key `portfolio-theme`.
- Theme is applied by toggling the `dark` class on `<html>` and setting `data-theme`.
- CSS variables are defined in `src/index.css` under `:root` (light) and `html.dark` (dark). Tailwind's `@theme` block maps these to utility classes (`bg-background`, `text-primary`, etc.). For non-Tailwind values (translucent surfaces, shadows), components use `var(--border)`, `var(--card)`, `var(--surface)`, etc. directly inline.

### Contact form

- Frontend: `useContactForm` hook (`src/hooks/useContactForm.ts`) handles Zod validation (`src/utils/contact-schema.ts`), field errors, and POSTs to `/api/contact`. Success/error feedback is shown via `Toast` (`src/components/Toast.tsx`).
- Backend: `api/contact.ts` — a Vercel Edge Function using the Resend SDK. Requires two env vars:
  - `RESEND_API_KEY` — Resend API key
  - `CONTACT_EMAIL` — destination email address
- Rate limit: 3 requests per IP per 10-minute window (in-memory, resets on cold start).
- The `company` field is a hidden honeypot; non-empty values are silently accepted but not emailed.

### Visitor counter

`VisitorCounter` component (`src/components/VisitorCounter.tsx`) hits `https://api.counterapi.dev/v1/daniel-niyomugenga-portfolio/visits/up` on mount. Renders nothing if the API call fails.

### WhatsApp button

`WhatsAppButton` (`src/components/WhatsAppButton.tsx`) is a fixed floating button (bottom-right, `z-50`) that links to `COMMON_INFO.whatsappUrl`. Sits below the scroll-to-top button in the stacking order.

### Page structure

`App.tsx` composes all sections in order: `Navbar → Hero → About → Experience → Projects → Skills → Education → Gallery → Contact`. The footer is rendered inline in `App.tsx` (no separate `Footer` component). Each section is a standalone component in `src/components/` identified by its `id` attribute for anchor navigation.

Provider nesting order in `main.tsx`: `ThemeProvider → LanguageProvider → App`.

### Language auto-detection

`LanguageProvider` initialises language from `localStorage` key `"language"`, falling back to `navigator.language` prefix, then `"en"`. The `t(key)` function returns the key string unchanged when a path is missing — useful for catching missing translations at runtime.

### Utilities & metadata

- `cn(...inputs)` in `src/lib/utils.ts` — clsx + tailwind-merge helper; use this whenever composing conditional Tailwind classes.
- `SITE_CONFIG` in `src/utils/site.ts` — SEO/OG metadata constants (site title, description, URL, keywords). Update here when changing site-level metadata.
