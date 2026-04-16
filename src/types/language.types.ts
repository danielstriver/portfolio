export const languages = ["en", "rw", "fr", "es", "de", "pt"] as const;

export type Language = (typeof languages)[number];

export interface ExperienceItem {
  title: string;
  company: string;
  location: string;
  period: string;
  description: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  website?: string;
  type?: string;
  tags?: string[];
}

export interface ProjectItem {
  title: string;
  description: string;
  image: string;
  link?: string;
  github?: string;
  tags?: string[];
  status?: string;
  /** "Solo" | "Team" */
  type?: string;
  /** One-liner pain statement shown above the title */
  problem?: string;
  /** Short "who is it for" phrase */
  target?: string;
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export interface GalleryItem {
  src: string;
  alt: string;
  caption?: string;
}

export interface CertificationItem {
  name: string;
  issuer: string;
  year: number;
}

export interface TranslationData {
  title: string;
  about: string;
  experience: ExperienceItem[];
  education: EducationItem[];
  projects: ProjectItem[];
  gallery: GalleryItem[];
  certifications: CertificationItem[];
  skills: SkillGroup[];
  nav: Record<string, string>;
  sections: Record<string, string>;
  contact: Record<string, string>;
  footer: Record<string, string>;
  ui: Record<string, string>;
}

export type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  t: (key: string) => any;
};
