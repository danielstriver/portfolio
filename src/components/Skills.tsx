import { motion } from "framer-motion";
import { useTranslation } from "../hooks/useTranslation";
import type { SkillGroup } from "../types/language.types";

export const Skills = () => {
  const { t } = useTranslation();
  const skills = t("skills") as SkillGroup[];

  return (
    <section id="skills" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">{t("sections.skills")}</h2>
          <div className="mx-auto h-1 w-20 rounded-full bg-primary" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skillGroup, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group rounded-2xl border border-[var(--border)] bg-[var(--card)] p-8 transition-all hover:bg-[var(--card-strong)]"
            >
              <h3 className="mb-6 text-lg font-bold uppercase tracking-widest text-primary">
                {skillGroup.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {skillGroup.items.map((skill: string, i: number) => (
                  <span
                    key={i}
                    className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1 text-sm text-muted-foreground transition-colors group-hover:border-primary/20"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
