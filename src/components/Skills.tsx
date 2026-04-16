import { motion } from "framer-motion";
import { Code2, Layers, Sparkles, Database, Cloud, Cpu, Globe } from "lucide-react";
import { useTranslation } from "../hooks/useTranslation";
import type { SkillGroup } from "../types/language.types";

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  // EN
  "AI & Prompt Engineering": <Sparkles size={16} />,
  "Languages": <Code2 size={16} />,
  "Frameworks & Libraries": <Layers size={16} />,
  "Databases & Backend": <Database size={16} />,
  "Cloud & DevOps": <Cloud size={16} />,
  "Robotics & Hardware": <Cpu size={16} />,
  "Spoken Languages": <Globe size={16} />,
  // RW
  "Indimi zo Guporogaramu": <Code2 size={16} />,
  "Inzego & Biblioteki": <Layers size={16} />,
  "Imbuga z'Amakuru & Backend": <Database size={16} />,
  "Robotics & Donanım": <Cpu size={16} />,
  "Indimi Mvugwa": <Globe size={16} />,
  // FR
  "IA & Prompt Engineering": <Sparkles size={16} />,
  "Langages": <Code2 size={16} />,
  "Frameworks & Bibliothèques": <Layers size={16} />,
  "Bases de Données & Backend": <Database size={16} />,
  "Robotique & Matériel": <Cpu size={16} />,
  "Langues Parlées": <Globe size={16} />,
};

const AI_CATEGORIES = new Set([
  "AI & Prompt Engineering",
  "IA & Prompt Engineering",
]);

const AI_HIGHLIGHT_TOOLS = ["Claude CLI", "Gemini CLI", "Codex CLI"];

export const Skills = () => {
  const { t } = useTranslation();
  const skills = t("skills") as SkillGroup[];

  const aiGroup = skills.find((g) => AI_CATEGORIES.has(g.category));
  const restGroups = skills.filter((g) => !AI_CATEGORIES.has(g.category));

  return (
    <section id="skills" className="py-24 px-6 bg-[var(--surface)]">
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
            // skills
          </p>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
            {t("sections.skills")}
          </h2>
          <div className="mx-auto h-1 w-20 rounded-full bg-gradient-to-r from-primary to-violet-500 mb-5" />
          <p className="mx-auto max-w-xl text-base text-muted-foreground">
            {t("sections.skillsTagline")}
          </p>
        </motion.div>

        {/* AI & Prompt Engineering — featured callout */}
        {aiGroup && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-8 rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/8 via-violet-500/5 to-transparent p-6 md:p-8"
          >
            <div className="flex items-center gap-2 mb-5">
              <span className="text-primary">
                <Sparkles size={18} />
              </span>
              <span className="text-sm font-bold uppercase tracking-widest text-primary">
                {aiGroup.category}
              </span>
              <span className="ml-2 rounded-full bg-primary/15 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">
                Core Edge
              </span>
            </div>

            {/* CLI tools highlighted */}
            <div className="flex flex-wrap gap-3 mb-5">
              {AI_HIGHLIGHT_TOOLS.map((tool) => (
                <span
                  key={tool}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-bold text-primary"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                  {tool}
                </span>
              ))}
            </div>

            {/* Remaining AI items as standard pills */}
            <div className="flex flex-wrap gap-2">
              {aiGroup.items
                .filter((item) => !AI_HIGHLIGHT_TOOLS.includes(item))
                .map((item) => (
                  <span
                    key={item}
                    className="rounded-md border border-primary/15 bg-primary/5 px-3 py-1 text-sm text-primary/80"
                  >
                    {item}
                  </span>
                ))}
            </div>
          </motion.div>
        )}

        {/* Remaining skill groups */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {restGroups.map((skillGroup, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 transition-all hover:border-primary/25 hover:bg-[var(--card-strong)]"
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="text-primary opacity-70 group-hover:opacity-100 transition-opacity">
                  {CATEGORY_ICONS[skillGroup.category] ?? <Code2 size={16} />}
                </span>
                <h3 className="text-sm font-bold uppercase tracking-widest text-primary">
                  {skillGroup.category}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {skillGroup.items.map((skill: string, i: number) => (
                  <span
                    key={i}
                    className="rounded-md border border-[var(--border)] bg-[var(--surface)] px-2.5 py-1 text-xs font-medium text-muted-foreground transition-colors group-hover:border-primary/20"
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
