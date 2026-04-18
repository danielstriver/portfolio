import { motion } from "framer-motion";
import { useTranslation } from "../hooks/useTranslation";
import type { CertificationItem, EducationItem } from "../types/language.types";
import { GraduationCap, ExternalLink, Shield, Trophy, Star, Cpu, FlaskConical, Sparkles } from "lucide-react";

const CERT_ICONS: { match: string; icon: React.ReactNode; color: string }[] = [
  { match: "ISC2",     icon: <Shield size={16} />,       color: "text-sky-500 bg-sky-500/10 border-sky-500/20" },
  { match: "IOC",      icon: <Trophy size={16} />,       color: "text-amber-500 bg-amber-500/10 border-amber-500/20" },
  { match: "Maxwell",  icon: <Star size={16} />,         color: "text-violet-400 bg-violet-400/10 border-violet-400/20" },
  { match: "AIMS",     icon: <Cpu size={16} />,          color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20" },
  { match: "School",   icon: <FlaskConical size={16} />, color: "text-rose-400 bg-rose-400/10 border-rose-400/20" },
];

function certStyle(issuer: string) {
  const entry = CERT_ICONS.find((c) => issuer.includes(c.match));
  return entry ?? {
    icon: <Star size={16} />,
    color: "text-primary bg-primary/10 border-primary/20",
  };
}

export const Education = () => {
  const { t } = useTranslation();
  const education = t("education") as EducationItem[];
  const certifications = t("certifications") as CertificationItem[];

  return (
    <section id="education" className="px-6 py-24" style={{ background: "var(--section)" }}>
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="mb-3 font-mono text-sm font-medium text-primary tracking-widest">
            // education
          </p>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
            {t("sections.education") as string}
          </h2>
          <div className="mx-auto h-1 w-20 rounded-full bg-gradient-to-r from-primary to-violet-500" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Academic path */}
          <div>
            <h3 className="mb-8 flex items-center gap-3 text-xl font-bold">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <GraduationCap size={18} />
              </span>
              {t("sections.academic") as string}
            </h3>

            <div className="space-y-4">
              {education.map((edu, index) =>
                edu.type === "continuous" ? (
                  <motion.div
                    key={edu.institution}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group relative overflow-hidden rounded-2xl border border-violet-500/40 bg-gradient-to-br from-violet-500/5 via-[var(--card)] to-amber-500/5 p-5 transition-all hover:border-violet-400/60 hover:shadow-[0_0_28px_rgba(139,92,246,0.12)]"
                  >
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-violet-500/0 via-violet-500/5 to-amber-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    <div className="relative">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="flex items-center gap-2">
                          <Sparkles size={15} className="text-violet-400 shrink-0 mt-0.5" />
                          <h4 className="text-base font-bold leading-snug text-foreground group-hover:text-violet-400 transition-colors">
                            {edu.degree}
                          </h4>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0 rounded-full border border-violet-500/30 bg-violet-500/10 px-2.5 py-1">
                          <span className="relative flex h-1.5 w-1.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75" />
                            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-violet-500" />
                          </span>
                          <span className="text-[10px] font-bold uppercase tracking-widest text-violet-400">Live</span>
                        </div>
                      </div>
                      <p className="mb-3 text-sm text-muted-foreground pl-5">{edu.institution}</p>
                      {edu.tags && (
                        <div className="flex flex-wrap gap-1.5 pl-5">
                          {edu.tags.map((tag: string) => (
                            <span
                              key={tag}
                              className="rounded-full border border-violet-500/25 bg-violet-500/10 px-2 py-0.5 text-[11px] font-medium text-violet-400"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key={edu.institution}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 transition-all hover:border-primary/25 hover:bg-[var(--card-strong)]"
                  >
                    <div className="flex items-start justify-between gap-3 mb-1">
                      <h4 className="text-base font-bold leading-snug text-foreground group-hover:text-primary transition-colors">
                        {edu.degree}
                      </h4>
                      <span className="shrink-0 rounded-full border border-[var(--border)] bg-[var(--surface)] px-2.5 py-0.5 text-[11px] font-semibold text-muted-foreground">
                        {edu.period}
                      </span>
                    </div>
                    <p className="mb-3 text-sm text-muted-foreground">{edu.institution}</p>
                    {edu.website && (
                      <a
                        href={edu.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-muted-foreground/60 hover:text-primary transition-colors"
                      >
                        <ExternalLink size={11} />
                        {new URL(edu.website).hostname}
                      </a>
                    )}
                  </motion.div>
                )
              )}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h3 className="mb-8 flex items-center gap-3 text-xl font-bold">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Shield size={18} />
              </span>
              {t("sections.certifications") as string}
            </h3>

            <div className="space-y-3">
              {certifications.map((cert, index) => {
                const style = certStyle(cert.issuer);
                return (
                  <motion.div
                    key={cert.name}
                    initial={{ opacity: 0, x: 32 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: index * 0.07, ease: "easeOut" }}
                    whileHover={{ x: 4, transition: { duration: 0.18 } }}
                    className="group flex items-center gap-4 rounded-2xl border border-[var(--border)] bg-[var(--card)] px-5 py-4 transition-colors hover:border-primary/25 hover:bg-[var(--card-strong)]"
                  >
                    <motion.span
                      whileHover={{ scale: 1.15, rotate: 6 }}
                      transition={{ type: "spring", stiffness: 400, damping: 15 }}
                      className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border ${style.color}`}
                    >
                      {style.icon}
                    </motion.span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground leading-snug truncate group-hover:text-primary transition-colors">
                        {cert.name}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">{cert.issuer}</p>
                    </div>
                    <span className="shrink-0 rounded-full border border-[var(--border)] bg-[var(--surface)] px-2.5 py-0.5 text-[11px] font-bold tabular-nums text-muted-foreground group-hover:border-primary/20 transition-colors">
                      {cert.year}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
