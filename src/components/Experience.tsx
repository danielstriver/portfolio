import { motion } from "framer-motion";
import { EXPERIENCE } from "../constants";
import { Briefcase, Calendar, MapPin } from "lucide-react";

export const Experience = () => {
  return (
    <section id="experience" className="px-4 py-24" style={{ background: "var(--section)" }}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">Professional Experience</h2>
          <div className="mx-auto h-1 w-20 rounded-full bg-primary" />
        </motion.div>

        <div className="relative">
          <div className="absolute bottom-0 left-0 top-0 w-[2px] md:left-1/2 md:-translate-x-1/2" style={{ background: "var(--border)" }} />

          <div className="space-y-12">
            {EXPERIENCE.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative flex flex-col md:flex-row items-center gap-8 text-left ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                <div className="w-full md:w-1/2 pl-8 md:pl-0">
                  <div className="group rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 backdrop-blur-sm transition-all hover:border-primary/25 hover:bg-[var(--card-strong)]">
                    <div className="flex items-center gap-2 mb-2">
                      <Briefcase size={16} className="text-primary" />
                      <span className="text-sm font-medium uppercase tracking-widest text-primary">{exp.company}</span>
                    </div>
                    
                    <h3 className="mb-4 text-xl font-bold group-hover:text-primary">{exp.title}</h3>
                    
                    <div className="mb-4 flex flex-col gap-1 text-sm text-muted-foreground items-start">
                      <div className="flex items-center gap-2">
                        <Calendar size={14} />
                        <span>{exp.period}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin size={14} />
                        <span>{exp.location}</span>
                      </div>
                    </div>

                    <ul className="list-none space-y-2 text-sm text-muted-foreground">
                      {exp.description.map((item, i) => (
                        <li key={i} className="leading-relaxed">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="absolute left-0 md:left-1/2 top-0 md:top-8 -translate-x-1/2 w-8 h-8 flex items-center justify-center z-10">
                  <div className="h-4 w-4 rounded-full border-4 border-primary shadow-[0_0_15px_rgba(99,102,241,0.35)]" style={{ background: "var(--background)" }} />
                </div>

                <div className="hidden md:block w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
