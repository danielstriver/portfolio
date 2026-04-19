import { motion } from "framer-motion";
import { COMMON_INFO } from "../constants";
import { useTranslation } from "../hooks/useTranslation";

/** Bold-wraps specific technical phrases within a paragraph string. */
function RichParagraph({ text, highlights }: { text: string; highlights: string[] }) {
  if (highlights.length === 0) {
    return <p className="text-base leading-relaxed text-muted-foreground md:text-[1.05rem]">{text}</p>;
  }

  const escaped = highlights.map((h) => h.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const regex = new RegExp(`(${escaped.join("|")})`, "g");
  const parts = text.split(regex);
  const highlightSet = new Set(highlights);

  return (
    <p className="text-base leading-relaxed text-muted-foreground md:text-[1.05rem]">
      {parts.map((part, i) =>
        highlightSet.has(part) ? (
          <strong key={i} className="font-semibold text-primary">
            {part}
          </strong>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </p>
  );
}

export const About = () => {
  const { t } = useTranslation();

  const aboutText = t("about") as string;
  const paragraphs = aboutText.split("\n\n").filter(Boolean);
  const tags = (t("ui.aboutTags") as string).split("|");
  const highlights = (t("ui.aboutHighlights") as string).split("|").filter(Boolean);

  return (
    <section id="about" className="py-24 px-6 overflow-hidden">
      <div className="mx-auto max-w-6xl">

        {/* ── Top: label + headline ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <p className="mb-4 font-mono text-sm font-medium text-primary tracking-widest">
            {t("ui.aboutLabel") as string}
          </p>
          <h2 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl leading-tight">
            <span className="text-foreground">{t("ui.aboutHeadlineMain") as string} </span>
            <span className="bg-gradient-to-r from-primary via-violet-500 to-indigo-400 bg-clip-text text-transparent">
              {t("ui.aboutHeadlineAccent") as string}
            </span>
          </h2>
        </motion.div>

        {/* ── Two columns ── */}
        <div className="flex flex-col gap-14 lg:flex-row lg:items-start lg:gap-16">

          {/* LEFT: Photo + stat badge */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative w-full flex-shrink-0 lg:w-[42%] flex justify-center lg:justify-start"
          >
            {/* Glow behind photo */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/15 to-violet-500/8 blur-3xl" />

            {/* Photo */}
            <div className="relative overflow-hidden rounded-3xl border border-primary/15 bg-[var(--card)] shadow-[var(--shadow)] backdrop-blur-md w-full max-w-sm lg:max-w-none">
              <img
                src={COMMON_INFO.profileImage.src}
                alt={COMMON_INFO.profileImage.alt}
                loading="lazy"
                decoding="async"
                className="h-auto w-full object-cover object-top"
                style={{ aspectRatio: "4/5" }}
              />
              {/* Subtle gradient overlay at bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/30 to-transparent" />
            </div>

            {/* Stat badge overlay — bottom right of photo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="absolute bottom-5 right-5 lg:right-auto lg:-right-4 rounded-2xl border border-[var(--border)] bg-[var(--card-strong)] px-5 py-4 shadow-[var(--shadow)] backdrop-blur-xl"
            >
              <p className="text-3xl font-extrabold text-primary leading-none">
                {t("ui.aboutStat") as string}
              </p>
              <p className="mt-1 text-xs font-medium text-muted-foreground leading-snug max-w-[8rem]">
                {t("ui.aboutStatLabel") as string}
              </p>
            </motion.div>
          </motion.div>

          {/* RIGHT: Story + tags */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-center flex-1 min-w-0"
          >
            {/* Story paragraphs */}
            <div className="space-y-5 mb-10">
              {paragraphs.map((para, i) => (
                <RichParagraph key={i} text={para} highlights={highlights} />
              ))}
            </div>

            {/* Divider */}
            <div className="mb-8 h-px w-full bg-[var(--border)]" />

            {/* Tag row */}
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => {
                const isPersonal = tag.includes("🇷🇼") || tag.includes("⚡");
                return (
                  <span
                    key={tag}
                    className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors ${
                      isPersonal
                        ? "border-violet-500/20 bg-violet-500/8 text-violet-600 dark:text-violet-400"
                        : "border-[var(--border)] bg-[var(--card)] text-muted-foreground hover:border-primary/30 hover:text-foreground"
                    }`}
                  >
                    {tag}
                  </span>
                );
              })}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
