export const languages = ["en", "rw", "fr", "es", "de", "pt", "sw", "ar", "zh", "hi"] as const;

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

export interface NavTranslations {
  about: string;
  experience: string;
  projects: string;
  skills: string;
  education: string;
  gallery: string;
  contact: string;
  hireMe: string;
}

export interface SectionsTranslations {
  experience: string;
  experienceTagline: string;
  projects: string;
  projectsTagline: string;
  gallery: string;
  skills: string;
  skillsTagline: string;
  education: string;
  contact: string;
  about: string;
  academic: string;
  certifications: string;
}

export interface ContactTranslations {
  title: string;
  subtitle: string;
  description: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  subject: string;
  message: string;
  send: string;
  sending: string;
  success: string;
  error: string;
  validationError: string;
  namePlaceholder: string;
  emailPlaceholder: string;
  messagePlaceholder: string;
}

export interface FooterTranslations {
  rights: string;
  visits: string;
}

export interface UiTranslations {
  welcome: string;
  getInTouch: string;
  viewWork: string;
  scrollDown: string;
  nationality: string;
  born: string;
  curiosity: string;
  innovation: string;
  drivenBy: string;
  focusedOn: string;
  heroStatus: string;
  heroTagline: string;
  aboutLabel: string;
  aboutHeadlineMain: string;
  aboutHeadlineAccent: string;
  aboutStat: string;
  aboutStatLabel: string;
  aboutTags: string;
  /** Pipe-separated phrases to bold in the about section */
  aboutHighlights: string;
  viewLive: string;
  viewCode: string;
  soloProject: string;
  teamProject: string;
  builtFor: string;
  beyondCodeLabel: string;
  beyondCodeHeadline: string;
  beyondCodeCopy: string;
  beyondCodeTags: string;
  experienceLabel: string;
  projectsLabel: string;
  skillsLabel: string;
  galleryLabel: string;
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
  nav: NavTranslations;
  sections: SectionsTranslations;
  contact: ContactTranslations;
  footer: FooterTranslations;
  ui: UiTranslations;
}

export type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => unknown;
};
