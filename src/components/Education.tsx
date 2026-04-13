import { motion } from "framer-motion";
import { useTranslation } from "../hooks/useTranslation";
import type { EducationItem } from "../types/language.types";
import { GraduationCap, Award, ExternalLink } from "lucide-react";

export const Education = () => {
  const { t } = useTranslation();
  const education = t("education") as EducationItem[];
  const certifications = t("certifications") as string[];

  return (
    <section id="education" className="px-4 py-24" style={{ background: "color-mix(in srgb, var(--section) 72%, transparent)" }}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">{t("sections.education")}</h2>
          <div className="mx-auto h-1 w-20 rounded-full bg-primary" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Education */}
          <div>
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
              <GraduationCap className="text-primary" />
              {t("sections.academic")}
            </h3>
            <div className="space-y-6">
              {education.map((edu, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 transition-all hover:border-primary/20 hover:bg-[var(--card-strong)]"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-lg font-bold text-primary">{edu.degree}</h4>
                    <span className="text-sm font-medium text-muted-foreground">{edu.period}</span>
                  </div>
                  <p className="mb-4 text-muted-foreground">{edu.institution}</p>
                  {edu.website && (
                    <a
                      href={edu.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary"
                    >
                      <ExternalLink size={12} />
                      {new URL(edu.website).hostname}
                    </a>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
              <Award className="text-primary" />
              {t("sections.certifications")}
            </h3>
            <div className="grid grid-cols-1 gap-4">
              {certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center gap-4 rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 transition-colors hover:bg-[var(--card-strong)]"
                >
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  <span className="text-sm leading-relaxed text-muted-foreground md:text-base">{cert}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
