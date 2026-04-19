import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback, useRef } from "react";
import { X, ChevronLeft, ChevronRight, Expand } from "lucide-react";
import { useTranslation } from "../hooks/useTranslation";
import type { GalleryItem } from "../types/language.types";

// Walk/lifestyle photos — language-independent
const WALK_PHOTOS = [
  { src: "/images/Gallery/walk/kigali-walk-1.jpeg", alt: "Walking near Kigali Convention Centre" },
  { src: "/images/Gallery/walk/kigali-walk-2.jpeg", alt: "Exploring Kigali's premium district" },
  { src: "/images/Gallery/walk/kigali-walk-3.jpeg", alt: "Kigali city walk" },
  { src: "/images/Gallery/walk/kigali-walk-4.jpeg", alt: "Around Kigali Convention Centre" },
];

export const Gallery = () => {
  const { t } = useTranslation();
  const galleryItems = t("gallery") as GalleryItem[];

  // Merge all photos into a flat list for the lightbox
  const allPhotos: { src: string; alt: string; caption?: string }[] = [
    ...galleryItems,
    ...WALK_PHOTOS,
  ];

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);
  const touchStartX = useRef<number | null>(null);

  const openLightbox = (index: number) => {
    lastFocusedRef.current = document.activeElement as HTMLElement;
    setLightboxIndex(index);
  };
  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
    lastFocusedRef.current?.focus();
  }, []);

  const gotoPrev = useCallback((e?: React.MouseEvent | KeyboardEvent) => {
    e?.stopPropagation();
    setLightboxIndex((i) =>
      i !== null ? (i - 1 + allPhotos.length) % allPhotos.length : null
    );
  }, [allPhotos.length]);

  const gotoNext = useCallback((e?: React.MouseEvent | KeyboardEvent) => {
    e?.stopPropagation();
    setLightboxIndex((i) =>
      i !== null ? (i + 1) % allPhotos.length : null
    );
  }, [allPhotos.length]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 50) delta < 0 ? gotoNext() : gotoPrev();
    touchStartX.current = null;
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "ArrowLeft") gotoPrev(e);
      if (e.key === "ArrowRight") gotoNext(e);
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex, gotoPrev, gotoNext, closeLightbox]);

  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.classList.add("overflow-hidden");
      closeButtonRef.current?.focus();
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => { document.body.classList.remove("overflow-hidden"); };
  }, [lightboxIndex]);

  const hobbyTags = (t("ui.beyondCodeTags") as string).split("|");

  return (
    <section id="gallery" className="relative overflow-hidden px-6 py-24 bg-[var(--surface)]">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute right-0 top-0 h-[400px] w-[400px] translate-x-1/3 -translate-y-1/3 rounded-full bg-primary/6 blur-[120px]" />
        <div className="absolute left-0 bottom-0 h-[400px] w-[400px] -translate-x-1/3 translate-y-1/3 rounded-full bg-violet-500/5 blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <p className="mb-3 font-mono text-sm font-medium text-primary tracking-widest">
            {t("ui.galleryLabel") as string}
          </p>
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-5xl">
            {t("sections.gallery") as string}
          </h2>
          <div className="mx-auto h-1 w-20 rounded-full bg-gradient-to-r from-primary to-violet-500" />
        </motion.div>

        {/* ── Work highlights — horizontal scroll on mobile, editorial grid on md+ ── */}
        <div className="mb-28 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-2 md:overflow-visible md:pb-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" style={{ gridTemplateRows: "auto auto" }}>
          {/* Left: tall card spanning both rows */}
          {galleryItems[0] && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="group relative shrink-0 w-72 snap-start cursor-pointer overflow-hidden rounded-3xl md:w-auto md:row-span-2"
              onClick={() => openLightbox(0)}
            >
              <img
                src={galleryItems[0].src}
                alt={galleryItems[0].alt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                style={{ minHeight: "320px", maxHeight: "560px" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent opacity-50 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="absolute bottom-0 left-0 right-0 translate-y-2 p-5 transition-transform duration-300 group-hover:translate-y-0">
                <p className="text-sm font-semibold text-white/90">{galleryItems[0].caption}</p>
              </div>
              <div className="absolute right-4 top-4 rounded-full bg-black/30 p-2 text-white opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100">
                <Expand size={15} />
              </div>
            </motion.div>
          )}

          {/* Right: two stacked cards */}
          <div className="contents md:flex md:flex-col md:gap-4">
            {galleryItems.slice(1).map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: (i + 1) * 0.1 }}
                className="group relative shrink-0 w-72 snap-start cursor-pointer overflow-hidden rounded-3xl md:w-auto"
                style={{ height: "260px" }}
                onClick={() => openLightbox(i + 1)}
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent opacity-50 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute bottom-0 left-0 right-0 translate-y-2 p-5 transition-transform duration-300 group-hover:translate-y-0">
                  <p className="text-sm font-semibold text-white/90">{item.caption}</p>
                </div>
                <div className="absolute right-4 top-4 rounded-full bg-black/30 p-2 text-white opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100">
                  <Expand size={15} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Beyond Code ── */}
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: copy */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="mb-3 font-mono text-sm font-medium text-primary tracking-widest">
              {t("ui.beyondCodeLabel") as string}
            </p>
            <h3 className="mb-5 text-3xl font-bold tracking-tight md:text-4xl">
              {/* Split on "not" / "ntubaka" / "ne construis pas" for gradient highlight */}
              <BeyondCodeHeadline text={t("ui.beyondCodeHeadline") as string} />
            </h3>
            <p className="mb-8 text-base leading-relaxed text-muted-foreground">
              {t("ui.beyondCodeCopy") as string}
            </p>
            <div className="flex flex-wrap gap-2.5">
              {hobbyTags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[var(--border)] bg-[var(--card)] px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary/30 hover:bg-[var(--card-strong)]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right: walk photos 2×2 grid */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="grid grid-cols-2 gap-3"
          >
            {WALK_PHOTOS.map((photo, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group relative cursor-pointer overflow-hidden rounded-2xl"
                style={{ height: "clamp(150px, 22vw, 180px)" }}
                onClick={() => openLightbox(galleryItems.length + i)}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute right-2 top-2 rounded-full bg-black/30 p-1.5 text-white opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100">
                  <Expand size={13} />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 backdrop-blur-sm"
            onClick={closeLightbox}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <button
              ref={closeButtonRef}
              className="absolute right-5 top-5 z-[110] rounded-full bg-white/10 p-3 text-white backdrop-blur-xl hover:bg-white/20 transition-colors"
              onClick={closeLightbox}
              aria-label="Close"
            >
              <X size={22} />
            </button>

            <div className="absolute inset-x-4 top-1/2 z-[110] hidden md:flex -translate-y-1/2 justify-between pointer-events-none">
              <button
                className="pointer-events-auto rounded-full bg-white/10 p-4 text-white backdrop-blur-xl hover:bg-white/20 transition-all hover:scale-105 active:scale-95"
                onClick={gotoPrev}
                aria-label="Previous"
              >
                <ChevronLeft size={28} />
              </button>
              <button
                className="pointer-events-auto rounded-full bg-white/10 p-4 text-white backdrop-blur-xl hover:bg-white/20 transition-all hover:scale-105 active:scale-95"
                onClick={gotoNext}
                aria-label="Next"
              >
                <ChevronRight size={28} />
              </button>
            </div>

            <motion.div
              key={lightboxIndex}
              initial={{ x: 60, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -60, opacity: 0 }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              className="relative max-h-[88vh] max-w-[92vw] overflow-hidden rounded-2xl border border-white/10 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={allPhotos[lightboxIndex].src}
                alt={allPhotos[lightboxIndex].alt}
                className="max-h-[88vh] w-auto object-contain"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-6 py-4 text-center">
                {"caption" in allPhotos[lightboxIndex] && (allPhotos[lightboxIndex] as GalleryItem).caption && (
                  <p className="mb-1 text-sm font-medium text-white/90">
                    {(allPhotos[lightboxIndex] as GalleryItem).caption}
                  </p>
                )}
                <p className="text-xs text-white/40">
                  {lightboxIndex + 1} / {allPhotos.length}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

/* Highlights a negation keyword in the headline with a gradient span */
function BeyondCodeHeadline({ text }: { text: string }) {
  // One keyword per language — order matters (longer matches first)
  const keywords = ["ne construis pas", "no estoy", "ntubaka", "nicht", "não", "لا أبني", "不在编码", "नहीं बना", "sijengi", "not"];
  for (const kw of keywords) {
    const idx = text.toLowerCase().indexOf(kw);
    if (idx !== -1) {
      const before = text.slice(0, idx);
      const match = text.slice(idx, idx + kw.length);
      const after = text.slice(idx + kw.length);
      return (
        <>
          {before}
          <span className="bg-gradient-to-r from-primary to-violet-400 bg-clip-text text-transparent">
            {match}
          </span>
          {after}
        </>
      );
    }
  }
  return <>{text}</>;
}
