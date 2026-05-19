"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { Badge } from "@/components/ui/badge";
import heroData from "@/lib/data/hero.json";

interface Slide {
  id: string;
  headline: string;
  subtitle: string;
  tags: string[];
  ctaPrimary: { label: string; href: string };
  ctaSecondary?: { label: string; href: string };
}

const SLIDES: Slide[] = heroData.hero.slides as Slide[];

const tagStyles: Record<string, string> = {
  Architecture: "border-[var(--aurora-green-solid)]/30 text-[var(--aurora-green-solid)] bg-[var(--aurora-green-solid)]/5",
  Blueprints: "border-[var(--aurora-green-solid)]/30 text-[var(--aurora-green-solid)] bg-[var(--aurora-green-solid)]/5",
  "Ship Secure": "border-[var(--aurora-green-solid)]/30 text-[var(--aurora-green-solid)] bg-[var(--aurora-green-solid)]/5",
  Assessment: "border-[var(--aurora-blue-solid)]/30 text-[var(--aurora-blue-solid)] bg-[var(--aurora-blue-solid)]/5",
  "Risk Priority": "border-[var(--aurora-rose-solid)]/30 text-[var(--aurora-rose-solid)] bg-[var(--aurora-rose-solid)]/5",
  "Clear Roadmap": "border-[var(--aurora-cyan-solid)]/30 text-[var(--aurora-cyan-solid)] bg-[var(--aurora-cyan-solid)]/5",
  Sovereignty: "border-[var(--aurora-violet-solid)]/30 text-[var(--aurora-violet-solid)] bg-[var(--aurora-violet-solid)]/5",
  "Self-Hosted": "border-[var(--aurora-cyan-solid)]/30 text-[var(--aurora-cyan-solid)] bg-[var(--aurora-cyan-solid)]/5",
  Independence: "border-[var(--aurum-gold-solid)]/30 text-[var(--aurum-gold-solid)] bg-[var(--aurum-gold-solid)]/5",
};

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 80 : -80,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -80 : 80,
    opacity: 0,
  }),
};

const staggerItem = {
  hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  }),
};

export function HeroSlideshow() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [showScrollCue, setShowScrollCue] = useState(false);

  const goTo = useCallback((index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  }, [currentIndex]);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
    }, 9000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setShowScrollCue(true), 3000);
    return () => clearTimeout(t);
  }, []);

  const slide = SLIDES[currentIndex];

  return (
    <div className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden">
      <div className="relative z-10 content-width text-center pt-24 pb-32">
        <AnimatePresence mode="wait" custom={direction} initial={false}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex flex-col items-center"
          >
            <motion.h1
              custom={0}
              variants={staggerItem}
              initial="hidden"
              animate="visible"
              className="font-sans font-bold text-4xl md:text-6xl lg:text-7xl mb-6 leading-tight tracking-tight max-w-5xl text-gradient-aurora"
              style={{ backgroundSize: "200% auto" }}
            >
              {slide.headline}
            </motion.h1>

            <motion.p
              custom={1}
              variants={staggerItem}
              initial="hidden"
              animate="visible"
              className="text-lg md:text-xl text-white/70 max-w-2xl mb-6 leading-relaxed"
            >
              {slide.subtitle}
            </motion.p>

            <motion.div
              custom={2}
              variants={staggerItem}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap justify-center gap-2 mb-10"
            >
              {slide.tags.map((tag) => (
                <span
                  key={tag}
                  className={`text-xs px-3 py-1 rounded-full border font-medium ${tagStyles[tag] || "border-white/20 text-white/60 bg-white/[0.03]"}`}
                >
                  {tag}
                </span>
              ))}
            </motion.div>

            <motion.div
              custom={3}
              variants={staggerItem}
              initial="hidden"
              animate="visible"
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <RainbowButton variant="glass" size="lg" className="rounded-xl" asChild>
                <a href={slide.ctaPrimary.href}>{slide.ctaPrimary.label}</a>
              </RainbowButton>
              {slide.ctaSecondary && (
                <a
                  href={slide.ctaSecondary.href}
                  className="inline-flex items-center justify-center h-11 px-8 rounded-full border border-white/20 bg-white/[0.03] text-white/70 hover:text-white hover:bg-white/[0.06] hover:border-white/30 transition-all duration-200 text-sm font-medium"
                >
                  {slide.ctaSecondary.label}
                </a>
              )}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-10 left-0 right-0 z-10 flex justify-center gap-3">
        {SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => goTo(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-[var(--aurora-green-solid)] w-6"
                : "bg-white/25 hover:bg-white/50"
            }`}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showScrollCue ? 1 : 0 }}
        transition={{ duration: 0.8 }}
        className="absolute bottom-0 left-0 right-0 z-10 flex justify-center pointer-events-none"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="text-white/50"
        >
          <svg width="20" height="36" viewBox="0 0 20 36" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M4 12l6 6 6-6" />
            <path d="M4 18l6 6 6-6" />
            <path d="M4 24l6 6 6-6" />
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
}
