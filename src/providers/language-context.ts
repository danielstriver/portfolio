import { createContext } from "react";
import type { LanguageContextValue } from "../types/language.types";

export const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);
