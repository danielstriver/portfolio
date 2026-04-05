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
              Driven by <span className="text-indigo-500">Curiosity</span>,<br /> 
              Focused on <span className="text-indigo-500">Innovation</span>.
            </h2>
            <div className="space-y-6 text-lg text-zinc-400 leading-relaxed">
              <p>{PERSONAL_INFO.about}</p>
              <div className="grid grid-cols-2 gap-8 pt-8 border-t border-zinc-800">
                <div>
                  <p className="text-xs uppercase tracking-widest text-zinc-500 mb-1">Nationality</p>
                  <p className="text-zinc-200 font-medium">{PERSONAL_INFO.nationality}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-zinc-500 mb-1">Born</p>
                  <p className="text-zinc-200 font-medium">January 1, 2004</p>
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
              <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-indigo-500/20 to-purple-500/10 blur-2xl" />
              <div className="relative overflow-hidden rounded-[2rem] border border-indigo-500/20 bg-zinc-900/60 shadow-2xl">
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
            
            {/* Decorative dots/lines */}
            <div className="absolute -top-10 -right-10 w-20 h-20 bg-indigo-500/5 blur-2xl rounded-full" />
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-500/5 blur-3xl rounded-full" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
