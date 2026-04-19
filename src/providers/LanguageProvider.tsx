import React, { useState, useCallback, useEffect } from "react";
import type { Language } from "../types/language.types";
import { languages } from "../types/language.types";
import { LanguageContext } from "./language-context";
import { DATA } from "../constants";

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("language") as Language;
      if (languages.includes(saved)) return saved;

      const browserLang = navigator.language.split("-")[0] as Language;
      if (languages.includes(browserLang as Language)) return browserLang as Language;
    }
    return "en";
  });

  const setLanguage = useCallback((newLang: Language) => {
    setLanguageState(newLang);
    localStorage.setItem("language", newLang);
    document.documentElement.lang = newLang;
    document.documentElement.dir = newLang === "ar" ? "rtl" : "ltr";
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  }, [language]);

  const t = useCallback((key: string) => {
    const keys = key.split(".");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let value: any = DATA[language];
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return key;
      }
    }
    return value;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
