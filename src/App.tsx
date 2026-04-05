import { useEffect, useState } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Experience } from "./components/Experience";
import { Skills } from "./components/Skills";
import { Education } from "./components/Education";
import { Contact } from "./components/Contact";
import { SocialLinks } from "./components/SocialLinks";

function App() {
  const { scrollYProgress } = useScroll();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 selection:bg-indigo-500/30 selection:text-indigo-200">
      <motion.div
        className="fixed top-0 left-0 right-0 z-[60] h-1 origin-left bg-indigo-500"
        style={{ scaleX }}
      />

      <Navbar />

      <main>
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Education />
        <Contact />
      </main>

      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 rounded-full border border-zinc-800 bg-zinc-900 p-4 text-indigo-400 shadow-2xl transition-all hover:border-indigo-500/50 hover:bg-zinc-800"
          >
            <ArrowUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>

      <footer className="border-t border-zinc-900 bg-zinc-950 px-4 py-12">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 md:flex-row">
          <div className="text-center text-sm text-zinc-500 md:text-left">
            Copyright {new Date().getFullYear()} Daniel Niyomugenga. All rights reserved.
          </div>
          <SocialLinks />
        </div>
      </footer>
    </div>
  );
}

export default App;
