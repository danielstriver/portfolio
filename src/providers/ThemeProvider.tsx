import {
  type PropsWithChildren,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ThemeContext } from "./theme-context";
import type {
  ResolvedTheme,
  ThemePreference,
} from "../types/theme.types";

const STORAGE_KEY = "portfolio-theme";

const getSystemTheme = (): ResolvedTheme =>
  window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

const getStoredTheme = (): ThemePreference => {
  const storedTheme = window.localStorage.getItem(STORAGE_KEY);

  return storedTheme === "light" || storedTheme === "dark" || storedTheme === "system"
    ? storedTheme
    : "system";
};

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const [theme, setTheme] = useState<ThemePreference>(() =>
    typeof window === "undefined" ? "system" : getStoredTheme(),
  );
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>(() =>
    typeof window === "undefined" ? "dark" : theme === "system" ? getSystemTheme() : theme,
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const applyTheme = (nextTheme: ThemePreference) => {
      const nextResolvedTheme = nextTheme === "system" ? getSystemTheme() : nextTheme;
      const root = document.documentElement;
      const themeColor = document.querySelector('meta[name="theme-color"]');

      root.classList.toggle("dark", nextResolvedTheme === "dark");
      root.dataset.theme = nextResolvedTheme;
      root.style.colorScheme = nextResolvedTheme;
      setResolvedTheme(nextResolvedTheme);

      if (themeColor) {
        themeColor.setAttribute("content", nextResolvedTheme === "dark" ? "#09090b" : "#f5f7fb");
      }
    };

    applyTheme(theme);

    window.localStorage.setItem(STORAGE_KEY, theme);

    const handleChange = () => {
      if (theme === "system") {
        applyTheme("system");
      }
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme]);

  const value = useMemo(
    () => ({
      theme,
      resolvedTheme,
      isDarkMode: resolvedTheme === "dark",
      setTheme,
      toggleTheme: () => {
        setTheme((currentTheme) => {
          const effectiveTheme = currentTheme === "system" ? getSystemTheme() : currentTheme;

          return effectiveTheme === "dark" ? "light" : "dark";
        });
      },
    }),
    [theme, resolvedTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
