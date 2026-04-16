import { useTranslation } from "../hooks/useTranslation";
import type { Language } from "../types/language.types";
import { languages } from "../types/language.types";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const LANG_FLAG_SRC: Record<Language, string> = {
  en: "https://flagcdn.com/w40/gb.png",
  rw: "https://flagcdn.com/w40/rw.png",
  fr: "https://flagcdn.com/w40/fr.png",
  es: "https://flagcdn.com/w40/es.png",
  de: "https://flagcdn.com/w40/de.png",
  pt: "https://flagcdn.com/w40/pt.png",
};

const LANG_LABELS: Record<Language, string> = {
  en: "English",
  rw: "Kinyarwanda",
  fr: "Français",
  es: "Español",
  de: "Deutsch",
  pt: "Português",
};

function Flag({ lang, className = "w-5 h-3.5" }: { lang: Language; className?: string }) {
  return (
    <img
      src={LANG_FLAG_SRC[lang]}
      alt={`${LANG_LABELS[lang]} flag`}
      className={`${className} rounded-[2px] object-cover shrink-0 shadow-sm`}
      loading="eager"
    />
  );
}

export const LanguageSwitcher = () => {
  const { language, setLanguage } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex h-11 items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--card)] px-3 text-sm font-medium text-muted-foreground backdrop-blur-md hover:border-primary/30 hover:text-primary transition-all"
        aria-label="Change language"
        aria-expanded={isOpen}
      >
        <Flag lang={language} />
        <span className="hidden lg:inline text-sm">{LANG_LABELS[language]}</span>
        <span className="lg:hidden text-xs font-bold uppercase">{language}</span>
        <ChevronDown
          size={13}
          className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 top-full mt-2 z-20 w-56 max-w-[calc(100vw-2rem)] overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card-strong)] shadow-[var(--shadow)] backdrop-blur-xl"
            >
              <div className="grid grid-cols-2 gap-1 p-2">
                {languages.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      setLanguage(lang);
                      setIsOpen(false);
                    }}
                    className={`flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-left transition-all hover:bg-primary/10 hover:text-primary ${
                      language === lang
                        ? "bg-primary/10 text-primary ring-1 ring-primary/20"
                        : "text-muted-foreground"
                    }`}
                  >
                    <Flag lang={lang} className="w-6 h-4" />
                    <span className="text-xs font-medium leading-tight">{LANG_LABELS[lang]}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
