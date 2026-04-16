import { motion } from "framer-motion";
import { useTranslation } from "../hooks/useTranslation";
import type { CertificationItem, EducationItem } from "../types/language.types";
import { GraduationCap, ExternalLink, Shield, Trophy, Star, Cpu, FlaskConical } from "lucide-react";

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
            {t("sections.education")}
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
              {t("sections.academic")}
            </h3>

            <div className="space-y-4">
              {education.map((edu, index) => (
                <motion.div
                  key={index}
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
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h3 className="mb-8 flex items-center gap-3 text-xl font-bold">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Shield size={18} />
              </span>
              {t("sections.certifications")}
            </h3>

            <div className="space-y-3">
              {certifications.map((cert, index) => {
                const style = certStyle(cert.issuer);
                return (
                  <motion.div
                    key={index}
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
