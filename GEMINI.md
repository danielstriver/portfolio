# GEMINI.md

## Project Overview
This is a modern, high-performance portfolio website for **Daniel Niyomugenga**, a Software Engineer and Robotics Enthusiast. The project is built with **React 19**, **TypeScript**, **Vite**, and **Tailwind CSS v4**. It features a minimal, motion-led design powered by **Framer Motion** and supports system-aware dark mode.

### Key Technologies
- **Frontend:** React 19, TypeScript, Vite, Tailwind CSS v4, Framer Motion, Lucide React.
- **Backend:** Vercel Serverless Functions (Node.js/TypeScript).
- **Email Service:** Resend.
- **Validation:** Zod (shared between frontend and backend).
- **Hosting:** Vercel.

### Architecture
- **Component-Driven:** Sections like `Hero`, `About`, `Experience`, etc., are modular components in `src/components/`.
- **Centralized Data:** All personal information, experience, and education data reside in `src/constants/index.ts`.
- **State Management:** Custom hooks (`useTheme`, `useContactForm`) and Context API (`ThemeProvider`) manage global and local state.
- **Serverless API:** A single endpoint `api/contact.ts` handles form submissions with rate limiting and honeypot spam protection.

---

## Building and Running

### Prerequisites
- Node.js (Latest LTS recommended)
- npm

### Environment Variables
Create a `.env.local` file in the root directory:
```bash
RESEND_API_KEY=your_resend_api_key
CONTACT_EMAIL=your_destination_email@example.com
```

### Key Commands
- `npm install`: Install dependencies.
- `npm run dev`: Start the local development server.
- `npm run build`: Build the project for production (Type-checks and Vite build).
- `npm run lint`: Run ESLint to check for code quality issues.
- `npm run preview`: Preview the production build locally.

---

## Development Conventions

### Styling & Theming
- **Tailwind CSS v4:** Uses the latest Tailwind version. Prefer utility classes for most styling.
- **Theming:** Implements class-based dark mode (`html.dark`). CSS variables (e.g., `var(--primary)`, `var(--border)`) are defined in `src/index.css` and `src/App.css` to handle theme-specific colors.
- **Glow Effects:** Section-specific glow effects are implemented using absolute positioned divs with blur filters and theme-aware backgrounds.

### Animation Strategy
- **Framer Motion:** Used for entry animations (`initial`, `animate`), scroll-triggered animations, and layout transitions.
- **Performance:** Keep animations lightweight. Use `AnimatePresence` for exit animations.

### Data Management
- **Constants First:** Never hardcode personal data in components. Always update `src/constants/index.ts`.
- **Type Safety:** Use the shared types in `src/types/` for all data structures and API contracts.

### Contact Form & API
- **Shared Validation:** Always use `contactFormSchema` from `src/utils/contact-schema.ts` for both frontend validation (in `useContactForm.ts`) and backend validation (in `api/contact.ts`).
- **Error Handling:** Use the `ContactApiResponse` type for consistent API responses.
- **Spam Protection:** The `company` field in the contact form is a hidden honeypot. If it's filled, the submission is silently ignored (returned as success but not sent).

### Component Structure
- **Functional Components:** Use arrow functions and TypeScript interfaces for props.
- **Hooks:** Extract complex logic into custom hooks (e.g., `src/hooks/`).
- **Icons:** Use `lucide-react` for consistent iconography.

### Code Quality
- **Linting:** Ensure all changes pass `npm run lint`.
- **Type Checking:** Run `npm run build` locally to verify TypeScript integrity before pushing changes.
- **Conventional Commits:** Follow the `feat:`, `fix:`, `chore:`, etc., convention for commit messages.
