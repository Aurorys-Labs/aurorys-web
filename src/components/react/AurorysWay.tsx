"use client";

import { useState, useEffect } from "react";
import { Shield, Lock, FileText, UserCheck, Eye, Sparkles, Database, Globe, Wrench, TrendingUp, Asterisk } from "lucide-react";
import { motion } from "framer-motion";
import { domainPill } from "@/lib/domain-colors";
import data from "@/lib/data/aurorys-way.json";
import ShieldNetwork from "./vfx/shield-network";
import HierarchyStars from "./vfx/heirarchy-stars";

const iconMap: Record<string, React.ElementType> = {
  Shield, Lock, FileText, UserCheck, Eye, Sparkles, Database, Globe, Wrench, TrendingUp,
};

function LargeCard({ icon, title, subtitle, body, bullets, isMobile }: typeof data.largeCards[0] & { isMobile?: boolean }) {
  const IconComponent = iconMap[icon] || Shield;
  return (
    <motion.div initial="rest" whileHover="hover" animate={isMobile ? "hover" : "rest"} className="glass-card glass-card-tinted-violet p-8 flex flex-col relative overflow-hidden group h-[480px]">
      {/* VFX Background */}
      {title.includes("Security") ? (
        <div className="absolute -right-20 -bottom-20 w-[400px] h-[400px] opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-700 pointer-events-none">
          <ShieldNetwork className="w-full h-full text-violet-400" strokeColor="stroke-violet-400" />
        </div>
      ) : (
        <div className="absolute -right-10 -bottom-10 w-[350px] h-[350px] opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-700 pointer-events-none">
          <HierarchyStars className="w-full h-full text-violet-400" />
        </div>
      )}

      <div className="flex-1 flex flex-col justify-end z-10">
        <motion.div variants={{ rest: { y: 0 }, hover: { y: -10 } }} transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}>
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 shrink-0" style={{ background: "linear-gradient(135deg, rgba(167,139,250,0.15), rgba(0,232,160,0.1))", color: "var(--aurora-violet-solid)" }}>
            <IconComponent className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold mb-2 text-[var(--text-stellar)]">{title}</h3>
          <p className="text-sm text-[var(--text-muted)] leading-relaxed">{subtitle}</p>
        </motion.div>
      </div>

      <motion.div 
        variants={{ rest: { opacity: 0, height: 0, y: 10, filter: "blur(4px)" }, hover: { opacity: 1, height: "auto", y: 0, filter: "blur(0px)" } }}
        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        className="z-10 mt-4 overflow-hidden border-t border-white/[0.04] pt-4"
      >
        <p className="text-sm text-[var(--text-muted)] mb-4 leading-relaxed">{body}</p>
        <ul className="space-y-2">
          {bullets.map((b: string) => (
            <li key={b} className="flex items-start gap-2 text-sm text-[var(--text-muted)]">
              <Asterisk className="w-3.5 h-3.5 mt-0.5 shrink-0 text-[var(--aurora-violet-solid)]" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  );
}

function MediumCard({ icon, title, subtitle, body, isMobile }: typeof data.mediumCards[0] & { isMobile?: boolean }) {
  const IconComponent = iconMap[icon] || Sparkles;
  return (
    <motion.div initial="rest" whileHover="hover" animate={isMobile ? "hover" : "rest"} className="glass-card glass-card-tinted-violet p-6 flex flex-col relative overflow-hidden group h-[300px]">
      <div className="flex-1 flex flex-col justify-end z-10">
        <motion.div variants={{ rest: { y: 0 }, hover: { y: -8 } }} transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}>
          <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 shrink-0" style={{ background: "linear-gradient(135deg, rgba(0,232,160,0.1), rgba(167,139,250,0.1))", color: "var(--aurora-green-solid)" }}>
            <IconComponent className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold mb-1 text-[var(--text-stellar)]">{title}</h3>
          <p className="text-xs text-[var(--text-muted)] leading-relaxed">{subtitle}</p>
        </motion.div>
      </div>
      <motion.div
        variants={{ rest: { opacity: 0, height: 0, y: 8, filter: "blur(4px)" }, hover: { opacity: 1, height: "auto", y: 0, filter: "blur(0px)" } }}
        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        className="z-10 mt-3 overflow-hidden border-t border-white/[0.04] pt-3"
      >
        <p className="text-xs text-[var(--text-muted)] leading-relaxed">{body}</p>
      </motion.div>
    </motion.div>
  );
}

function SmallCard({ icon, title, body, isMobile }: typeof data.smallCards[0] & { isMobile?: boolean }) {
  const IconComponent = iconMap[icon] || Shield;
  return (
    <motion.div initial="rest" whileHover="hover" animate={isMobile ? "hover" : "rest"} className="glass-card glass-card-tinted-violet p-5 flex flex-col items-center text-center relative overflow-hidden group h-[220px] justify-center">
      <motion.div variants={{ rest: { y: 0 }, hover: { y: -4 } }} transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }} className="flex flex-col items-center">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-2 shrink-0" style={{ background: "linear-gradient(135deg, rgba(0,232,160,0.08), rgba(167,139,250,0.08))", color: "var(--text-muted)" }}>
          <IconComponent className="w-4 h-4" />
        </div>
        <h4 className="text-sm font-semibold mb-1 text-[var(--text-stellar)]">{title}</h4>
      </motion.div>
      <motion.div
        variants={{ rest: { opacity: 0, height: 0, filter: "blur(2px)" }, hover: { opacity: 1, height: "auto", filter: "blur(0px)" } }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        className="overflow-hidden mt-1"
      >
        <p className="text-xs text-[var(--text-muted)] leading-relaxed">{body}</p>
      </motion.div>
    </motion.div>
  );
}

export function AurorysWay() {
  const { sectionTitle, sectionSubtitle, largeCards, mediumCards, smallCards } = data;
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section className="section-padding border-t border-[var(--border-default)]">
      <div className="content-width">
        <div className="text-center mb-16">
          <h2 className="font-sans font-bold text-4xl md:text-5xl mb-4 tracking-tight">
            The <span className="text-gradient-aurora">{sectionTitle.split("The ")[1] || sectionTitle}</span>
          </h2>
          <p className="text-white/60 max-w-xl mx-auto">{sectionSubtitle}</p>
        </div>

        {/* Tier 1 — Large cards (2 columns) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {largeCards.map((card, i) => <LargeCard key={i} {...card} isMobile={isMobile} />)}
        </div>

        {/* Tier 2 — Medium cards (2 columns, 2 rows) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {mediumCards.map((card, i) => <MediumCard key={i} {...card} isMobile={isMobile} />)}
        </div>

        {/* Tier 3 — Small cards (4 columns on desktop) */}
        {smallCards && smallCards.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {smallCards.map((card, i) => <SmallCard key={i} {...card} isMobile={isMobile} />)}
          </div>
        )}
      </div>
    </section>
  );
}