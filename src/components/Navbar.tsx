import { motion, AnimatePresence, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useState } from "react";
import { useTheme } from "../hooks/useTheme";
import { useTranslation } from "../hooks/useTranslation";
import { LanguageSwitcher } from "./LanguageSwitcher";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const { isDarkMode, toggleTheme } = useTheme();
  const { t } = useTranslation();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  const logoSrc = isDarkMode ? "/logo-dark.svg" : "/logo.svg";
  const themeLabel = isDarkMode ? "Switch to light mode" : "Switch to dark mode";

  const NAV_LINKS = [
    { name: t("nav.about") as string, href: "#about" },
    { name: t("nav.experience") as string, href: "#experience" },
    { name: t("nav.projects") as string, href: "#projects" },
    { name: t("nav.skills") as string, href: "#skills" },
    { name: t("nav.education") as string, href: "#education" },
    { name: t("nav.gallery") as string, href: "#gallery" },
    { name: t("nav.contact") as string, href: "#contact" },
  ];

  return (
    <nav
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "border-b border-[var(--border)] bg-background/80 py-4 backdrop-blur-md"
          : "bg-transparent py-6"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        <motion.a
          href="#"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="inline-flex items-center gap-3"
          aria-label="Go to homepage"
        >
          <img
            src={logoSrc}
            alt="Daniel Niyomugenga logo"
            className="h-11 w-11 rounded-full object-contain shadow-[0_12px_30px_rgba(15,23,42,0.12)]"
          />
          <div className="hidden sm:block text-left">
            <div className="text-sm font-bold tracking-[0.24em] text-foreground">DANIEL</div>
          </div>
        </motion.a>

        <div className="hidden items-center gap-4 md:flex">
          <div className="flex items-center gap-8">
            {NAV_LINKS.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                {link.name}
              </motion.a>
            ))}
          </div>

          <div className="flex items-center gap-3 ml-4">
            <LanguageSwitcher />

            <button
              type="button"
              onClick={toggleTheme}
              aria-label={themeLabel}
              className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-[var(--border)] bg-[var(--card)] text-muted-foreground backdrop-blur-md hover:border-primary/30 hover:text-primary transition-all"
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>

          <motion.a
            href="#contact"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-full bg-primary px-5 py-2 text-sm font-bold text-primary-foreground hover:opacity-90"
          >
            {t("nav.hireMe") as string}
          </motion.a>
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <LanguageSwitcher />
          
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={themeLabel}
            className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-[var(--border)] bg-[var(--card)] text-muted-foreground backdrop-blur-md hover:border-primary/30 hover:text-primary"
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button
            type="button"
            className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-[var(--border)] bg-[var(--card)] text-muted-foreground backdrop-blur-md"
            onClick={() => setIsMobileMenuOpen((current) => !current)}
            aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation"
          >
            {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-navigation"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.18 }}
            className="absolute left-0 right-0 top-full border-b border-[var(--border)] bg-[var(--card-strong)] px-6 py-5 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="rounded-xl px-3 py-2.5 text-base font-medium text-muted-foreground transition-colors hover:bg-primary/8 hover:text-foreground"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <div className="mt-3 pt-3 border-t border-[var(--border)]">
                <a
                  href="#contact"
                  className="inline-flex w-fit rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground hover:opacity-90 transition-opacity"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t("nav.hireMe") as string}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
