import { Languages } from "lucide-react";
import { useTranslation } from "../hooks/useTranslation";
import type { Language } from "../types/language.types";
import { languages } from "../types/language.types";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const LANG_LABELS: Record<Language, string> = {
  en: "English",
  rw: "Kinyarwanda",
  fr: "Français",
};

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
      >
        <Languages size={18} />
        <span className="hidden lg:inline">{LANG_LABELS[language]}</span>
        <span className="lg:hidden uppercase">{language}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div 
              className="fixed inset-0 z-10" 
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute right-0 top-full mt-2 z-20 w-40 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card-strong)] shadow-[var(--shadow)] backdrop-blur-xl"
            >
              <div className="flex flex-col p-2">
                {languages.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      setLanguage(lang);
                      setIsOpen(false);
                    }}
                    className={`flex items-center justify-between rounded-lg px-4 py-2.5 text-sm font-medium transition-all hover:bg-primary/10 hover:text-primary ${
                      language === lang ? "bg-primary/10 text-primary" : "text-muted-foreground"
                    }`}
                  >
                    {LANG_LABELS[lang]}
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
