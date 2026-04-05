import { motion } from "framer-motion";
import { EXPERIENCE } from "../constants";
import { Briefcase, Calendar, MapPin } from "lucide-react";

export const Experience = () => {
  return (
    <section id="experience" className="py-24 px-4 bg-zinc-950/50">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">Professional Experience</h2>
          <div className="w-20 h-1 bg-indigo-500 mx-auto rounded-full" />
        </motion.div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-[2px] bg-zinc-800 md:-translate-x-1/2" />

          <div className="space-y-12">
            {EXPERIENCE.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative flex flex-col md:flex-row items-center gap-8 ${
                  index % 2 === 0 ? "md:flex-row-reverse text-left md:text-right" : "text-left"
                }`}
              >
                {/* Content Card */}
                <div className="w-full md:w-1/2 pl-8 md:pl-0">
                  <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900/40 backdrop-blur-sm hover:border-zinc-700 transition-all group">
                    <div className={`flex items-center gap-2 mb-2 ${index % 2 === 0 ? "md:justify-end" : ""}`}>
                      <Briefcase size={16} className="text-indigo-400" />
                      <span className="text-sm font-medium text-indigo-400 uppercase tracking-widest">{exp.company}</span>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-4 group-hover:text-indigo-400 transition-colors">{exp.title}</h3>
                    
                    <div className={`flex flex-col gap-1 mb-4 text-zinc-500 text-sm ${index % 2 === 0 ? "md:items-end" : "items-start"}`}>
                      <div className="flex items-center gap-2">
                        <Calendar size={14} />
                        <span>{exp.period}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin size={14} />
                        <span>{exp.location}</span>
                      </div>
                    </div>

                    <ul className={`space-y-2 text-zinc-400 text-sm list-none ${index % 2 === 0 ? "md:text-right" : ""}`}>
                      {exp.description.map((item, i) => (
                        <li key={i} className="leading-relaxed">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Timeline Dot */}
                <div className="absolute left-0 md:left-1/2 top-0 md:top-8 -translate-x-1/2 w-8 h-8 flex items-center justify-center z-10">
                  <div className="w-4 h-4 rounded-full bg-zinc-950 border-4 border-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.5)]" />
                </div>

                {/* Placeholder for layout balance */}
                <div className="hidden md:block w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
