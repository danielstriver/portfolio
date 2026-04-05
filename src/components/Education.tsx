import { motion } from "framer-motion";
import { EDUCATION, CERTIFICATIONS } from "../constants";
import { GraduationCap, Award, ExternalLink } from "lucide-react";

export const Education = () => {
  return (
    <section id="education" className="py-24 px-4 bg-zinc-950/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">Education & Certifications</h2>
          <div className="w-20 h-1 bg-indigo-500 mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Education */}
          <div>
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
              <GraduationCap className="text-indigo-400" />
              Academic Path
            </h3>
            <div className="space-y-6">
              {EDUCATION.map((edu, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900/40 hover:border-zinc-700 transition-all"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-lg font-bold text-indigo-400">{edu.degree}</h4>
                    <span className="text-sm text-zinc-500 font-medium">{edu.period}</span>
                  </div>
                  <p className="text-zinc-300 mb-4">{edu.institution}</p>
                  {edu.website && (
                    <a
                      href={edu.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-zinc-500 flex items-center gap-1 hover:text-indigo-400 transition-colors"
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
              <Award className="text-indigo-400" />
              Certifications
            </h3>
            <div className="grid grid-cols-1 gap-4">
              {CERTIFICATIONS.map((cert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center gap-4 p-4 rounded-xl border border-zinc-800 bg-zinc-900/20 hover:bg-zinc-900/40 transition-colors"
                >
                  <div className="w-2 h-2 rounded-full bg-indigo-500" />
                  <span className="text-zinc-300 text-sm md:text-base leading-relaxed">{cert}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
