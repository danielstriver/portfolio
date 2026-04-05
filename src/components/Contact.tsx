import { motion } from "framer-motion";
import { PERSONAL_INFO } from "../constants";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export const Contact = () => {
  return (
    <section id="contact" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">Get in Touch</h2>
          <div className="w-20 h-1 bg-indigo-500 mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h3 className="text-2xl font-bold mb-6">Let's connect</h3>
            <p className="text-zinc-400 max-w-md leading-relaxed">
              Whether you have a question or just want to say hi, I'll try my best to get back to you!
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-2xl bg-zinc-900 flex items-center justify-center border border-zinc-800 group-hover:border-indigo-500 transition-colors">
                  <Mail className="text-indigo-400" size={20} />
                </div>
                <div>
                  <p className="text-sm text-zinc-500 font-medium uppercase tracking-widest">Email</p>
                  <a href={`mailto:${PERSONAL_INFO.email}`} className="text-lg hover:text-indigo-400 transition-colors">
                    {PERSONAL_INFO.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-2xl bg-zinc-900 flex items-center justify-center border border-zinc-800 group-hover:border-indigo-500 transition-colors">
                  <Phone className="text-indigo-400" size={20} />
                </div>
                <div>
                  <p className="text-sm text-zinc-500 font-medium uppercase tracking-widest">Phone</p>
                  <a href={`tel:${PERSONAL_INFO.phone}`} className="text-lg hover:text-indigo-400 transition-colors">
                    {PERSONAL_INFO.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-2xl bg-zinc-900 flex items-center justify-center border border-zinc-800 group-hover:border-indigo-500 transition-colors">
                  <MapPin className="text-indigo-400" size={20} />
                </div>
                <div>
                  <p className="text-sm text-zinc-500 font-medium uppercase tracking-widest">Address</p>
                  <p className="text-lg">{PERSONAL_INFO.address}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form (Simplified) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-3xl border border-zinc-800 bg-zinc-900/20 backdrop-blur-sm"
          >
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-400">Your Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-400">Email Address</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-400">Message</label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all resize-none"
                  placeholder="How can I help you?"
                />
              </div>
              <button
                type="submit"
                className="w-full py-4 px-6 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all transform active:scale-[0.98]"
              >
                Send Message
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
