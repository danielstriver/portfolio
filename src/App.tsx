import { useEffect, useState } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Experience } from "./components/Experience";
import { Projects } from "./components/Projects";
import { Gallery } from "./components/Gallery";
import { Skills } from "./components/Skills";
import { Education } from "./components/Education";
import { Contact } from "./components/Contact";
import { SocialLinks } from "./components/SocialLinks";
import { useTranslation } from "./hooks/useTranslation";
import { COMMON_INFO } from "./constants";
import { VisitorCounter } from "./components/VisitorCounter";

function App() {
  const { scrollYProgress } = useScroll();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { t } = useTranslation();
  
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
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary">
      <motion.div
        className="fixed top-0 left-0 right-0 z-[60] h-1 origin-left bg-primary"
        style={{ scaleX }}
      />

      <Navbar />

      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Education />
        <Gallery />
        <Contact />
      </main>

      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 cursor-pointer rounded-full border border-[var(--border)] bg-[var(--card-strong)] p-4 text-primary shadow-[var(--shadow)] backdrop-blur-md transition-all hover:border-primary/40 hover:bg-[var(--surface-strong)]"
            aria-label="Scroll back to top"
          >
            <ArrowUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>

      <footer className="border-t border-[var(--border)] bg-background px-4 py-12">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-8 md:flex-row">
          <div className="flex flex-col gap-4 items-center md:items-start">
            <div className="text-center text-sm text-muted-foreground md:text-left">
              Copyright {new Date().getFullYear()} {COMMON_INFO.name}. {t("footer.rights")}
            </div>
            <VisitorCounter />
          </div>
          <SocialLinks />
        </div>
      </footer>
    </div>
  );
}

export default App;
