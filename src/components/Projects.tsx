import { motion } from "framer-motion";
import { ExternalLink, Rocket } from "lucide-react";
import { useTranslation } from "../hooks/useTranslation";
import type { ProjectItem } from "../types/language.types";

export const Projects = () => {
  const { t } = useTranslation();
  const projects = t("projects") as ProjectItem[];

  return (
    <section id="projects" className="relative overflow-hidden px-4 py-24">
      {/* Background Glow */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 blur-[120px] pointer-events-none z-[-1]">
        <div className="h-[400px] w-[600px] rounded-full bg-primary/10 opacity-30" />
      </div>

      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-5xl">
            {t("sections.projects")}
          </h2>
          <div className="mx-auto h-1 w-20 rounded-full bg-primary" />
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ProjectCard = ({ project, index }: { project: ProjectItem; index: number }) => {
  const { t } = useTranslation();
  const isComingSoon = project.status === "Coming Soon" || project.status === "Uzaza vuba" || project.status === "Prochainement";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)] backdrop-blur-sm transition-all hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/20"
    >
      {/* Image Container */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className={`h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 ${
            isComingSoon ? "grayscale opacity-40 blur-[1px]" : ""
          }`}
        />
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        
        {isComingSoon && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <span className="rounded-full bg-primary/20 px-4 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-primary backdrop-blur-md border border-primary/30 shadow-[0_0_15px_rgba(var(--primary-rgb),0.3)]">
              {project.status}
            </span>
          </div>
        )}

        {!isComingSoon && project.link && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-300 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0">
             <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-bold text-white shadow-xl shadow-primary/20 hover:scale-105 transition-transform"
            >
              <ExternalLink size={16} />
              {t("ui.viewWork")}
            </a>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-4 flex flex-wrap gap-2">
          {project.tags?.map((tag, i) => (
            <span
              key={i}
              className="rounded-md bg-primary/5 px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-primary border border-primary/10"
            >
              {tag}
            </span>
          ))}
        </div>

        <h3 className="mb-3 text-lg font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
          {project.title}
        </h3>
        
        <p className="mb-6 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-3">
          {project.description}
        </p>

        {!isComingSoon && project.link && (
           <div className="mt-auto">
             <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group/btn inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary transition-all hover:gap-3"
            >
              {t("ui.viewWork")}
              <Rocket size={14} className="transition-transform group-hover/btn:-translate-y-1 group-hover/btn:translate-x-1" />
            </a>
           </div>
        )}
      </div>

      {/* Border Glow Effect */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
    </motion.div>
  );
};
