import { motion } from "framer-motion";
import { PERSONAL_INFO } from "../constants";

export const About = () => {
  return (
    <section id="about" className="py-24 px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-8 tracking-tight">
              Driven by <span className="text-primary">Curiosity</span>,<br />
              Focused on <span className="text-primary">Innovation</span>.
            </h2>
            <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
              <p>{PERSONAL_INFO.about}</p>
              <div className="grid grid-cols-2 gap-8 border-t border-[var(--border)] pt-8">
                <div>
                  <p className="mb-1 text-xs uppercase tracking-widest text-muted-foreground">Nationality</p>
                  <p className="font-medium text-foreground">{PERSONAL_INFO.nationality}</p>
                </div>
                <div>
                  <p className="mb-1 text-xs uppercase tracking-widest text-muted-foreground">Born</p>
                  <p className="font-medium text-foreground">January 1, 2004</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative w-full lg:w-1/2 flex justify-center"
          >
            <div className="relative w-64 md:w-80">
              <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-primary/20 to-fuchsia-500/10 blur-2xl" />
              <div className="relative overflow-hidden rounded-[2rem] border border-primary/20 bg-[var(--card)] shadow-[var(--shadow)] backdrop-blur-md">
                <img
                  src={PERSONAL_INFO.profileImage.src}
                  alt={PERSONAL_INFO.profileImage.alt}
                  width={PERSONAL_INFO.profileImage.width}
                  height={PERSONAL_INFO.profileImage.height}
                  loading="lazy"
                  decoding="async"
                  className="h-auto w-full object-cover"
                />
              </div>
            </div>
            
            <div className="absolute -top-10 -right-10 h-20 w-20 rounded-full bg-primary/5 blur-2xl" />
            <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-fuchsia-500/5 blur-3xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
