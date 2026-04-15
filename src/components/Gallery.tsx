import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X, Maximize2 } from "lucide-react";
import { useTranslation } from "../hooks/useTranslation";
import type { GalleryItem } from "../types/language.types";

export const Gallery = () => {
  const { t } = useTranslation();
  const galleryItems = t("gallery") as GalleryItem[];
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  return (
    <section id="gallery" className="relative overflow-hidden px-4 py-24 bg-[var(--surface)]">
      {/* Background Glow */}
      <div className="absolute right-0 top-0 -translate-y-1/2 translate-x-1/2 blur-[150px] pointer-events-none z-[-1]">
        <div className="h-[500px] w-[500px] rounded-full bg-primary/5 opacity-20" />
      </div>

      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-5xl">
            {t("sections.gallery")}
          </h2>
          <div className="mx-auto h-1.5 w-24 rounded-full bg-primary shadow-[0_0_15px_rgba(var(--primary-rgb),0.5)]" />
        </motion.div>

        <div className="columns-1 gap-6 sm:columns-2 lg:columns-3 xl:columns-4 space-y-6">
          {galleryItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="group relative break-inside-avoid overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)] transition-all hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10 cursor-pointer"
              onClick={() => setSelectedImage(item)}
            >
              <div className="relative overflow-hidden">
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex flex-col justify-end p-6">
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-sm font-medium text-white/90 translate-y-2 transition-transform duration-300 group-hover:translate-y-0">
                      {item.caption}
                    </p>
                    <div className="rounded-full bg-primary/20 p-2 text-primary backdrop-blur-md border border-primary/30 translate-y-2 transition-transform duration-300 group-hover:translate-y-0">
                      <Maximize2 size={16} />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 backdrop-blur-sm"
            onClick={() => setSelectedImage(null)}
          >
            <motion.button
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="absolute right-6 top-6 z-[110] rounded-full bg-white/10 p-3 text-white backdrop-blur-xl hover:bg-white/20 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
            >
              <X size={24} />
            </motion.button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative max-h-[90vh] max-w-[95vw] overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-black/50"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="max-h-[90vh] w-auto object-contain"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-8 text-center">
                <h3 className="text-xl font-bold text-white mb-2">
                  {selectedImage.caption}
                </h3>
                <p className="text-sm text-white/60">
                  {selectedImage.alt}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
