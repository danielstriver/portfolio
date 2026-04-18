import { motion } from "framer-motion";
import { ExternalLink, Users, User, ArrowUpRight } from "lucide-react";
import { useTranslation } from "../hooks/useTranslation";
import type { ProjectItem } from "../types/language.types";

const GithubIcon = ({ size = 15 }: { size?: number }) => (
  <svg width={size} height={size} aria-hidden="true" className="shrink-0">
    <use href="/icons.svg#github-icon" />
  </svg>
);

export const Projects = () => {
  const { t } = useTranslation();
  const projects = t("projects") as ProjectItem[];
  const [featured, comingSoon]: [ProjectItem[], ProjectItem[]] = [
    projects.filter((p) => !p.status),
    projects.filter((p) => !!p.status),
  ];

  return (
    <section id="projects" className="relative overflow-hidden px-6 py-24 bg-[var(--surface)]">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/8 blur-[140px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <p className="mb-3 font-mono text-sm font-medium text-primary tracking-widest">
            {t("ui.projectsLabel") as string}
          </p>
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-5xl">
            {t("sections.projects") as string}
          </h2>
          <div className="mx-auto h-1 w-20 rounded-full bg-gradient-to-r from-primary to-violet-500 mb-5" />
          <p className="mx-auto max-w-xl text-base text-muted-foreground">{t("sections.projectsTagline") as string}</p>
        </motion.div>

        {/* All 3 cards in the same grid — consistent size */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {featured.map((project, index) => (
            <FeaturedCard key={project.title} project={project} index={index} />
          ))}
          {comingSoon.map((project, index) => (
            <ComingSoonCard key={project.title} project={project} index={featured.length + index} />
          ))}
        </div>
      </div>
    </section>
  );
};

/* ── Featured card — answers all 7 product-eye questions ── */
const FeaturedCard = ({ project, index }: { project: ProjectItem; index: number }) => {
  const { t } = useTranslation();
  const isTeam = project.type === "Team";

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--card)] backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10"
    >
      {/* ── Image ── */}
      <div className="relative aspect-[16/9] overflow-hidden">
        <img
          src={project.image}
          alt={`Screenshot of ${project.title}`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Gradient overlay — always present, stronger on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-90" />

        {/* Hover CTAs centred on image */}
        <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 translate-y-3 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-primary/30 transition-transform hover:scale-105"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink size={15} />
              {t("ui.viewLive") as string}
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-2.5 text-sm font-bold text-white backdrop-blur-md transition-transform hover:scale-105"
              onClick={(e) => e.stopPropagation()}
            >
              <GithubIcon size={15} />
              {t("ui.viewCode") as string}
            </a>
          )}
        </div>

        {/* Solo / Team badge — top-right */}
        <div className="absolute right-4 top-4">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold backdrop-blur-md ${
              isTeam
                ? "border-violet-400/30 bg-violet-500/20 text-violet-200"
                : "border-primary/30 bg-primary/20 text-primary-foreground"
            }`}
          >
            {isTeam ? <Users size={11} /> : <User size={11} />}
            {isTeam ? t("ui.teamProject") as string : t("ui.soloProject") as string}
          </span>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="flex flex-1 flex-col p-6">
        {/* Problem statement */}
        {project.problem && (
          <div className="mb-4 flex items-start gap-2 rounded-xl border border-amber-500/15 bg-amber-500/8 px-3.5 py-2.5">
            <span className="mt-0.5 text-amber-500 text-xs font-bold uppercase tracking-wider shrink-0">Problem</span>
            <p className="text-xs leading-relaxed text-amber-600 dark:text-amber-400">{project.problem}</p>
          </div>
        )}

        {/* Title */}
        <h3 className="mb-3 text-xl font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
          {project.title}
        </h3>

        {/* Description */}
        <p className="mb-4 flex-1 text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>

        {/* Who it's for */}
        {project.target && (
          <p className="mb-4 text-xs text-muted-foreground">
            <span className="font-semibold text-foreground">{t("ui.builtFor") as string}</span>{" "}
            {project.target}
          </p>
        )}

        {/* Tech stack tags */}
        {project.tags && project.tags.length > 0 && (
          <div className="mb-5 flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-[var(--border)] bg-[var(--surface-strong)] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Bottom row: links */}
        <div className="mt-auto flex items-center gap-4 border-t border-[var(--border)] pt-4">
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-all hover:gap-2.5"
            >
              {t("ui.viewLive") as string}
              <ArrowUpRight size={15} className="transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
            </a>
          )}
          {project.link && project.github && (
            <span className="h-4 w-px bg-[var(--border)]" />
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <GithubIcon size={14} />
              {t("ui.viewCode") as string}
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
};

/* ── Coming-soon card ── */
const ComingSoonCard = ({ project, index }: { project: ProjectItem; index: number }) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative flex flex-col overflow-hidden rounded-3xl border border-dashed border-[var(--border)] bg-[var(--card)]/50 backdrop-blur-sm"
    >
      {/* Muted image */}
      <div className="relative aspect-[16/9] overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="h-full w-full object-cover grayscale opacity-20 blur-[1px]"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-primary backdrop-blur-md">
            {project.status}
          </span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="mb-2 text-lg font-bold text-foreground/60">{project.title}</h3>
        <p className="text-sm leading-relaxed text-muted-foreground/60">{project.description}</p>
      </div>
    </motion.article>
  );
};
