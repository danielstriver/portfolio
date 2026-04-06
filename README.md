# Daniel Niyomugenga Portfolio

Production portfolio built with React, TypeScript, Vite, Tailwind CSS, and Framer Motion. The application preserves a minimal, motion-led visual system while now supporting system-aware theming, logo-based branding, and a production-ready contact flow through Vercel Functions and Resend.

## Project Overview

- Purpose: showcase Daniel Niyomugenga's experience, skills, education, and contact channels in a fast, responsive portfolio.
- Design direction: refined existing UI without redesigning the original layout, typography rhythm, or animation language.
- Runtime model: static frontend served by Vercel with a serverless `/api/contact` endpoint for form submission.

## Architecture

### Frontend

- `src/App.tsx`: page composition, scroll progress indicator, and shell layout.
- `src/components/`: presentation components for portfolio sections and shared UI pieces.
- `src/providers/ThemeProvider.tsx`: central theme state management.
- `src/hooks/useTheme.ts`: theme consumer hook.
- `src/hooks/useContactForm.ts`: contact form state, validation, submission, and UX feedback.
- `src/utils/contact-schema.ts`: shared Zod schema used by both client and server.
- `src/utils/site.ts`: metadata and site-level configuration.
- `src/types/`: shared types for theme and contact contracts.

### Backend / Infrastructure

- `api/contact.ts`: Vercel serverless function that validates input, applies honeypot and rate limiting, and sends email through Resend.
- Vercel: hosting, serverless execution, and deployment.
- GitHub: source control and deployment source.

## Tech Stack

### Frontend

- React 19
- TypeScript
- Vite
- Tailwind CSS v4
- Framer Motion
- Lucide React

### Backend / Infrastructure

- Vercel
- Vercel Functions
- Resend
- GitHub

### Future Stack Reference

- Namecheap for domain management
- Vercel for hosting
- Neon for future database needs
- Upstash for future cache / rate limiting hardening
- Stripe for future payments
- Resend for emails
- GitHub for CI/CD and source control

## Dark Mode Implementation

- Uses class-based dark mode with `html.dark`.
- Defaults to system preference on first load.
- Persists explicit user preference in `localStorage` under `portfolio-theme`.
- Prevents theme flash with an inline bootstrap script in `index.html`.
- Exposes theme state through:
  - `src/providers/ThemeProvider.tsx`
  - `src/providers/theme-context.ts`
  - `src/hooks/useTheme.ts`
  - `src/types/theme.types.ts`

## Contact Form Implementation

- Client and server share one Zod schema from `src/utils/contact-schema.ts`.
- Frontend validation runs before network submission.
- Backend validation runs again inside `api/contact.ts`.
- Spam protection includes:
  - honeypot `company` field
  - basic in-memory IP rate limiting
- UX states include:
  - disabled/loading submit button
  - inline validation errors
  - success/error toast feedback
- Email delivery uses Resend and routes to `CONTACT_EMAIL`.

## Deployment Flow

1. Local development with `npm run dev`
2. Validation with `npm run lint` and `npm run build`
3. Push feature branches to GitHub
4. Merge into `main`
5. Deploy to Vercel with production alias pointing to the live site

## Environment Variables

Create a `.env.local` file for local development and configure the same values in Vercel project settings:

```bash
RESEND_API_KEY=your_resend_api_key
CONTACT_EMAIL=your_destination_email@example.com
```

## Engineering Principles Used

- Clean architecture through separation of UI, state, validation, and server concerns
- Single responsibility for providers, hooks, shared schemas, and typed contracts
- DRY validation by reusing one schema across client and server
- Minimal dependency strategy by adding only `zod` and `resend`
- Accessibility through labels, aria attributes, semantic buttons, and focus states
- Performance-conscious implementation with static assets, SVG logos, and lightweight client state

## Folder Structure

```text
src/
  components/
  constants/
  hooks/
  providers/
  types/
  utils/
  App.tsx
  index.css
  main.tsx
api/
  contact.ts
public/
  favicon.ico
  logo.svg
  logo-dark.svg
  images/
```

## Development Workflow

```bash
npm install
npm run dev
npm run lint
npm run build
```

Recommended git workflow for iterative work:

```bash
git checkout -b feature/dark-mode
git checkout -b feature/logo
git checkout -b feature/contact-form
```

Conventional commits used for this project:

- `feat: add dark mode toggle`
- `feat: add personal logo`
- `feat: implement contact form`

## Notes

- The contact form requires valid Resend credentials to deliver email in production.
- The current live deployment is hosted on Vercel at `https://danielstriver.vercel.app`.
