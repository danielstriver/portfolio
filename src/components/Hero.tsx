import { motion } from "framer-motion";
import { COMMON_INFO } from "../constants";
import { ArrowDown } from "lucide-react";
import { useTranslation } from "../hooks/useTranslation";

export const Hero = () => {
  const { t } = useTranslation();

  return (
    <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden px-4">
      <div className="absolute inset-0 z-0">
        <div
          className="absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px]"
          style={{ background: "var(--hero-glow-primary)" }}
        />
        <div
          className="absolute top-1/3 left-1/4 h-[300px] w-[300px] rounded-full blur-[100px]"
          style={{ background: "var(--hero-glow-secondary)" }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="z-10 text-center"
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mb-4 text-sm font-medium uppercase tracking-widest text-primary"
        >
          {t("ui.welcome")}
        </motion.p>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6"
        >
          {COMMON_INFO.name.split(" ").map((word, i) => (
            <span key={i} className="inline-block mr-4">
              {word}
            </span>
          ))}
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mx-auto mb-10 max-w-2xl text-xl leading-relaxed text-muted-foreground md:text-2xl"
        >
          {t("title")}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex gap-4 justify-center"
        >
          <a
            href="#contact"
            className="rounded-full bg-foreground px-8 py-3 font-medium text-background transition-opacity hover:opacity-90"
          >
            {t("ui.getInTouch")}
          </a>
          <a
            href="#experience"
            className="rounded-full border border-[var(--border)] px-8 py-3 font-medium hover:bg-[var(--surface)]"
          >
            {t("ui.viewWork")}
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-muted-foreground"
      >
        <span className="text-xs uppercase tracking-widest">{t("ui.scrollDown")}</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={20} />
        </motion.div>
      </motion.div>
    </section>
  );
};
