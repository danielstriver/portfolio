import { motion } from "framer-motion";
import { COMMON_INFO } from "../constants";
import { ArrowDown, Mail } from "lucide-react";
import { useTranslation } from "../hooks/useTranslation";

const HERO_SOCIALS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/daniel-niyomugenga/", iconId: "linkedin-icon", external: true },
  { label: "GitHub", href: "https://github.com/danielstriver", iconId: "github-icon", external: true },
  { label: "Instagram", href: "https://www.instagram.com/danielthepentester/", iconId: "instagram-icon", external: true },
  { label: "Email", href: "mailto:daniel.succeeder@gmail.com", iconId: null, external: false },
] as const;

export const Hero = () => {
  const { t } = useTranslation();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden px-6 py-24">
      {/* Background glows — same vibe */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/3 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[140px]"
          style={{ background: "var(--hero-glow-primary)" }}
        />
        <div
          className="absolute top-1/4 right-1/4 h-[380px] w-[380px] rounded-full blur-[120px]"
          style={{ background: "var(--hero-glow-secondary)" }}
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        {/* Photo stacks on top on mobile, side-by-side on md+ */}
        <div className="flex flex-col items-center gap-14 md:flex-row md:items-center md:justify-between md:gap-12">

          {/* ── LEFT: Text ── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, ease: "easeOut" }}
            className="flex flex-col items-center text-center md:items-start md:text-left flex-1"
          >
            {/* Status pill */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.55 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--card)] px-4 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur-md"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.8)] animate-pulse" />
              Kigali, Rwanda · Open to opportunities
            </motion.div>

            {/* Name — stacked, two lines */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.8 }}
              className="mb-5 tracking-tight leading-[0.88]"
            >
              <span className="block text-5xl font-bold text-foreground md:text-6xl lg:text-[4.5rem]">
                Daniel
              </span>
              <span className="block bg-gradient-to-r from-primary via-violet-500 to-indigo-400 bg-clip-text text-transparent text-5xl font-extrabold md:text-6xl lg:text-[4.5rem]">
                NIYOMUGENGA
              </span>
            </motion.h1>

            {/* Role badges */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.38, duration: 0.6 }}
              className="mb-7 flex flex-wrap items-center justify-center gap-2 md:justify-start"
            >
              <span className="rounded-full border border-primary/25 bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
                Full-Stack Engineer
              </span>
              <span className="select-none text-muted-foreground/40">·</span>
              <span className="rounded-full border border-violet-500/25 bg-violet-500/10 px-4 py-1.5 text-sm font-semibold text-violet-600 dark:text-violet-400">
                Prompt Engineer
              </span>
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.48, duration: 0.65 }}
              className="mb-9 max-w-[26rem] text-base leading-relaxed text-muted-foreground md:text-[1.05rem]"
            >
              {t("ui.heroTagline")}
            </motion.p>

            {/* Social icon buttons */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.58, duration: 0.6 }}
              className="mb-9 flex items-center gap-3"
            >
              {HERO_SOCIALS.map(({ label, href, iconId, external }) => (
                <a
                  key={label}
                  href={href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noreferrer" : undefined}
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--card)] text-muted-foreground backdrop-blur-md transition-all duration-200 hover:border-primary/40 hover:text-primary hover:scale-110 hover:shadow-[0_0_18px_rgba(99,102,241,0.2)]"
                >
                  {iconId ? (
                    <svg className="h-[18px] w-[18px] shrink-0" aria-hidden="true">
                      <use href={`/icons.svg#${iconId}`} />
                    </svg>
                  ) : (
                    <Mail size={18} />
                  )}
                </a>
              ))}
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.68, duration: 0.6 }}
              className="flex flex-wrap gap-3"
            >
              <a
                href="#contact"
                className="rounded-full bg-foreground px-7 py-3 text-sm font-semibold text-background transition-all duration-200 hover:opacity-90 hover:scale-[1.03]"
              >
                {t("ui.getInTouch")}
              </a>
              <a
                href="#projects"
                className="rounded-full border border-[var(--border)] bg-[var(--card)] px-7 py-3 text-sm font-semibold backdrop-blur-md transition-all duration-200 hover:border-primary/40 hover:bg-[var(--surface-strong)] hover:scale-[1.03]"
              >
                {t("ui.viewWork")}
              </a>
            </motion.div>
          </motion.div>

          {/* ── RIGHT: Circular profile photo ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.85, ease: "easeOut" }}
            className="relative flex-shrink-0"
          >
            <div className="relative h-64 w-64 md:h-80 md:w-80 lg:h-[22rem] lg:w-[22rem]">
              {/* Outer spinning dashed ring */}
              <div
                className="absolute inset-0 rounded-full border-2 border-dashed border-primary/35"
                style={{ animation: "spin 18s linear infinite" }}
              />
              {/* Counter-rotating inner decorative ring */}
              <div
                className="absolute inset-[10px] rounded-full border border-dotted border-violet-400/20"
                style={{ animation: "spin 11s linear infinite reverse" }}
              />
              {/* Soft glow behind photo */}
              <div className="absolute inset-[22px] rounded-full bg-primary/8 blur-xl" />
              {/* Photo container */}
              <div className="absolute inset-[22px] overflow-hidden rounded-full border-2 border-primary/20 shadow-[0_0_60px_rgba(99,102,241,0.18)]">
                <img
                  src={COMMON_INFO.profileImage.src}
                  alt={COMMON_INFO.profileImage.alt}
                  className="h-full w-full object-cover object-top"
                />
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 1 }}
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-muted-foreground"
      >
        <span className="text-xs uppercase tracking-widest">{t("ui.scrollDown")}</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={18} />
        </motion.div>
      </motion.div>
    </section>
  );
};
