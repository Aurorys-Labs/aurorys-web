"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RainbowButton } from "../ui/rainbow-button";
import {
  Shield, Search, Workflow, CheckCircle, Globe,
  Users, Zap, Rocket, MessageSquare, ChevronRight, Asterisk,
  Sparkles, Compass, GitBranch, ShieldCheck, Orbit,
} from "lucide-react";
import { domainPill, domainPillSmall } from "@/lib/domain-colors";
import solutionsData from "../../lib/data/solutions.json";

const iconMap: Record<string, React.ElementType> = {
  Shield, Search, Workflow, CheckCircle, Globe,
  Users, Zap, Rocket, MessageSquare, Sparkles, Compass,
  GitBranch, ShieldCheck, Orbit,
};

const cardStyleConfig: Record<string, {
  iconGradId: string;
  bgGradClass: string;
  iconContainerBorder: string;
  iconBg: string;
  radialColor: string;
}> = {
  "first-light": {
    iconGradId: "grad-first-light",
    bgGradClass: "from-sky-500/10 via-sky-500/5 to-transparent",
    iconContainerBorder: "border-sky-500/30",
    iconBg: "linear-gradient(135deg, rgba(59, 156, 246, 0.2), rgba(29, 141, 216, 0.05))",
    radialColor: "0, 166, 244",
  },
  "foundation": {
    iconGradId: "grad-foundation",
    bgGradClass: "from-violet-500/10 via-violet-500/5 to-transparent",
    iconContainerBorder: "border-violet-500/30",
    iconBg: "linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(109, 40, 217, 0.05))",
    radialColor: "139, 92, 246",
  },
  "pulse": {
    iconGradId: "grad-pulse",
    bgGradClass: "from-emerald-500/10 via-emerald-500/5 to-transparent",
    iconContainerBorder: "border-emerald-500/30",
    iconBg: "linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(5, 150, 105, 0.05))",
    radialColor: "16, 185, 129",
  },
  "clearance": {
    iconGradId: "grad-clearance",
    bgGradClass: "from-amber-500/10 via-amber-500/5 to-transparent",
    iconContainerBorder: "border-amber-500/30",
    iconBg: "linear-gradient(135deg, rgba(201, 168, 76, 0.2), rgba(160, 120, 42, 0.05))",
    radialColor: "201, 168, 76",
  },
  "escape-velocity": {
    iconGradId: "grad-escape-velocity",
    bgGradClass: "from-fuchsia-500/10 via-fuchsia-500/5 to-transparent",
    iconContainerBorder: "border-fuchsia-500/30",
    iconBg: "linear-gradient(135deg, rgba(217, 70, 239, 0.2), rgba(192, 132, 252, 0.05))",
    radialColor: "217, 70, 239",
  },
  "beacon": {
    iconGradId: "grad-beacon",
    bgGradClass: "from-cyan-500/10 via-cyan-500/5 to-transparent",
    iconContainerBorder: "border-cyan-500/30",
    iconBg: "linear-gradient(135deg, rgba(34, 211, 238, 0.15), rgba(8, 145, 178, 0.05))",
    radialColor: "34, 211, 238",
  },
  "sprint": {
    iconGradId: "grad-sprint",
    bgGradClass: "from-emerald-500/10 via-emerald-500/5 to-transparent",
    iconContainerBorder: "border-emerald-500/30",
    iconBg: "linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(5, 150, 105, 0.05))",
    radialColor: "16, 185, 129",
  },
  "surge": {
    iconGradId: "grad-surge",
    bgGradClass: "from-rose-500/10 via-rose-500/5 to-transparent",
    iconContainerBorder: "border-rose-500/30",
    iconBg: "linear-gradient(135deg, rgba(244, 63, 94, 0.2), rgba(190, 24, 93, 0.05))",
    radialColor: "244, 63, 94",
  },
  "custom": {
    iconGradId: "grad-custom",
    bgGradClass: "from-violet-500/10 via-violet-500/5 to-transparent",
    iconContainerBorder: "border-violet-500/30",
    iconBg: "linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(109, 40, 217, 0.05))",
    radialColor: "139, 92, 246",
  },
};

const IconGradients = () => (
  <svg width="0" height="0" className="absolute pointer-events-none">
    <defs>
      <linearGradient id="grad-first-light" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#E8EDF2" /><stop offset="100%" stopColor="#8B95A1" />
      </linearGradient>
      <linearGradient id="grad-foundation" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#A78BFA" /><stop offset="100%" stopColor="#7C3AED" />
      </linearGradient>
      <linearGradient id="grad-pulse" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00E8A0" /><stop offset="100%" stopColor="#00B87D" />
      </linearGradient>
      <linearGradient id="grad-clearance" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#C9A84C" /><stop offset="100%" stopColor="#A0782A" />
      </linearGradient>
      <linearGradient id="grad-escape-velocity" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#F472B6" /><stop offset="100%" stopColor="#E879A8" />
      </linearGradient>
      <linearGradient id="grad-beacon" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#22D3EE" /><stop offset="100%" stopColor="#0891B2" />
      </linearGradient>
      <linearGradient id="grad-sprint" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00E8A0" /><stop offset="100%" stopColor="#00B87D" />
      </linearGradient>
      <linearGradient id="grad-surge" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#F472B6" /><stop offset="100%" stopColor="#E879A8" />
      </linearGradient>
      <linearGradient id="grad-custom" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#A78BFA" /><stop offset="100%" stopColor="#8B5CF6" />
      </linearGradient>
    </defs>
  </svg>
);

function MagicBentoCard({
  id, title, description, detail, bullets, icon, domains, price,
  isExpanded, onToggle,
}: {
  id: string; title: string; description: string; detail?: string;
  bullets?: string[]; icon: string; domains: string[]; price?: string;
  isExpanded?: boolean; onToggle?: () => void;
}) {
  const IconComponent = iconMap[icon] || Shield;
  const config = cardStyleConfig[id] || cardStyleConfig["first-light"];

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const effectivelyExpanded = isMobile || isExpanded;

  return (
      <motion.div
        layout
        whileHover={{ y: -4 }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`relative p-[1px] rounded-2xl overflow-hidden cursor-pointer h-auto md:min-h-[480px] flex flex-col ${
          effectivelyExpanded ? "w-full md:flex-[2]" : "w-full md:flex-[1]"
        }`}
        onClick={onToggle}
      >
      <div
        className="absolute inset-0 transition-opacity duration-300 pointer-events-none -z-10"
        style={{
          opacity: isMobile || isHovered ? 1 : 0,
          background: `radial-gradient(350px circle at ${isMobile ? '80% 80%' : `${mousePosition.x}px ${mousePosition.y}px`}, rgba(${config.radialColor}, 0.3), transparent 85%)`,
        }}
      />
      <div className="absolute inset-0 rounded-2xl border border-white/[0.08] pointer-events-none -z-10" />

      <div className="relative rounded-[15px] bg-[rgba(13,17,23,0.35)] backdrop-blur-md p-6 h-full flex flex-col">
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 -z-10"
          style={{
            opacity: isMobile || isHovered ? 1 : 0,
            background: `radial-gradient(300px circle at ${isMobile ? '80% 80%' : `${mousePosition.x}px ${mousePosition.y}px`}, rgba(${config.radialColor}, 0.1), transparent 80%)`,
          }}
        />
        <div className={`absolute inset-0 bg-gradient-to-br ${config.bgGradClass} opacity-[0.05] -z-20`} />

        <div className="flex flex-col h-full relative z-10">
          <motion.div layout className="flex flex-col flex-1 justify-center">
            <motion.div layout="position">
              {/* Icon + Title + Price row */}
              <div className="flex items-center gap-3 mb-2">
                <div
                  className={`rounded-xl flex items-center justify-center w-11 h-11 border ${config.iconContainerBorder} shrink-0`}
                  style={{ background: config.iconBg }}
                >
                  <IconComponent className="w-5 h-5 shrink-0" stroke={`url(#${config.iconGradId})`} strokeWidth={2} />
                </div>
                <h3 className="text-base font-bold text-[var(--text-stellar)] leading-tight flex-1 min-w-0 truncate">{title}</h3>
                {price && effectivelyExpanded && (
                  <span className="text-[11px] font-semibold text-[var(--text-stellar)] bg-white/10 border border-white/20 px-2.5 py-1 rounded-md shrink-0 ml-auto whitespace-nowrap overflow-hidden text-ellipsis">{price}</span>
                )}
              </div>

              {/* Subtitle */}
              <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-4">{description}</p>
            </motion.div>

            <AnimatePresence mode="popLayout" initial={false}>
              {effectivelyExpanded && detail && (
                <motion.div
                  key="details"
                  layout
                  initial={{ opacity: 0, height: 0, filter: "blur(4px)" }}
                  animate={{ opacity: 1, height: "auto", filter: "blur(0px)" }}
                  exit={{ opacity: 0, height: 0, filter: "blur(4px)", transition: { duration: 0.15 } }}
                  transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1], opacity: { delay: 0.2 } }}
                  className="overflow-hidden"
                >
                  <div className="mb-4 pt-1">
                    <p className="text-sm text-[var(--text-muted)]/90 leading-relaxed border-t border-white/[0.04] pt-3 mb-3">{detail}</p>
                    {bullets && bullets.length > 0 && (
                      <ul className="space-y-2.5">
                        {bullets.map((bullet, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-[var(--text-muted)]">
                            <Asterisk className="w-3.5 h-3.5 mt-0.5 shrink-0 text-[var(--aurora-green-solid)]" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div layout="position" className={`flex flex-wrap gap-1.5 ${effectivelyExpanded ? 'pt-4' : 'mt-0'}`}>
              {domains.map((domain) => (
                <span key={domain} className={domainPill(domain)}>{domain}</span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

function SkinnyBentoCard({
  id, title, description, icon, domains, cta,
}: {
  id: string; title: string; description: string; icon: string; domains: string[];
  cta?: { label: string; href: string };
}) {
  const IconComponent = iconMap[icon] || Shield;
  const config = cardStyleConfig[id] || cardStyleConfig["first-light"];

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div
      whileHover={{ y: -2 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full overflow-hidden cursor-pointer group py-5 px-6 transition-colors duration-300 hover:bg-white/[0.02]"
      onClick={() => window.location.href = cta?.href || "/contact"}
    >
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300 -z-10"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(${config.radialColor}, 0.18), transparent 80%)`,
        }}
      />
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
        <div className="flex items-center gap-4 shrink-0 md:w-64">
          <div
            className={`rounded-xl flex items-center justify-center w-10 h-10 border ${config.iconContainerBorder} transition-all duration-300`}
            style={{ background: config.iconBg }}
          >
            <IconComponent className="w-5 h-5 shrink-0" stroke={`url(#${config.iconGradId})`} strokeWidth={2} />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-bold text-[var(--text-stellar)] leading-tight">{title}</h3>
            <p className="text-xs text-[var(--text-muted)] mt-1 md:hidden line-clamp-2">{description}</p>
          </div>
        </div>

        <div className="hidden md:block flex-1 max-w-2xl px-4">
          <p className="text-xs text-[var(--text-muted)] leading-relaxed">{description}</p>
        </div>

        <div className="flex items-center justify-between md:justify-end gap-4 shrink-0 border-t border-white/[0.04] md:border-0 pt-2.5 md:pt-0">
          <div className="flex flex-wrap gap-1.5">
            {domains.map((domain) => (
              <span key={domain} className={domainPillSmall(domain)}>{domain}</span>
            ))}
          </div>
          <div className="flex items-center gap-1 text-xs font-semibold text-[var(--aurora-green-solid)] transition-all group-hover:translate-x-0.5">
            <span>{cta?.label || "Learn More"}</span>
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ServiceRow({
  services, expandedIndex, setExpandedIndex
}: {
  services: typeof solutionsData.cards;
  expandedIndex: number;
  setExpandedIndex: (index: number) => void;
}) {
  return (
    <div className="flex flex-col md:flex-row gap-4 w-full">
      {services.map((card, index) => (
        <MagicBentoCard
          key={card.id}
          id={card.id}
          title={card.title}
          description={card.description}
          detail={card.detail}
          bullets={card.bullets}
          icon={card.icon}
          domains={card.domains}
          price={card.price}
          isExpanded={index === expandedIndex}
          onToggle={() => setExpandedIndex(index)}
        />
      ))}
    </div>
  );
}

export function SolutionsBento() {
  const coreCardIds = ["first-light", "foundation", "pulse", "clearance", "escape-velocity", "beacon"];
  const skinnyCardIds = ["sprint", "surge", "custom"];

  const coreCards = solutionsData.cards.filter((c) => coreCardIds.includes(c.id));
  const skinnyCards = solutionsData.cards.filter((c) => skinnyCardIds.includes(c.id));

  const row1 = coreCards.slice(0, 3);
  const row2 = coreCards.slice(3, 6);

  const [row1ExpandedIndex, setRow1ExpandedIndex] = useState(0);
  const [row2ExpandedIndex, setRow2ExpandedIndex] = useState(1);

  return (
    <section className="section-padding relative">
      <IconGradients />
      <div className="content-width">
        <div className="text-center mb-16">
          <h2 className="font-sans font-bold text-4xl md:text-5xl mb-4 tracking-tight">
            {solutionsData.sectionTitle.split(" ").map((w, i) =>
              i === 0 ? <span key={i} className="text-gradient-aurora">{w} </span> : <span key={i}>{w} </span>
            )}
          </h2>
          <p className="text-white/60 max-w-xl mx-auto text-base">{solutionsData.sectionSubtitle}</p>
        </div>

        <div className="flex flex-col gap-4">
          <ServiceRow services={row1} expandedIndex={row1ExpandedIndex} setExpandedIndex={setRow1ExpandedIndex} />
          <ServiceRow services={row2} expandedIndex={row2ExpandedIndex} setExpandedIndex={setRow2ExpandedIndex} />

          <div className="relative p-[1px] rounded-3xl overflow-hidden mt-6">
            <div className="absolute inset-0 rounded-3xl border border-white/[0.08] pointer-events-none -z-10" />
            <div className="relative rounded-[23px] bg-[rgba(13,17,23,0.35)] backdrop-blur-md overflow-hidden">
              <div className="px-6 pt-6 pb-4 border-b border-white/[0.06] bg-white/[0.01]">
                <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-white/80">Specialized & On-Demand</h3>
                <p className="text-xs text-[var(--text-muted)] mt-1">Focused engagements for specific needs and urgent timelines.</p>
              </div>
              <div className="divide-y divide-white/[0.06]">
                {skinnyCards.map((card) => (
                  <SkinnyBentoCard
                    key={card.id}
                    id={card.id}
                    title={card.title}
                    description={card.description}
                    icon={card.icon}
                    domains={card.domains}
                    cta={card.cta}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <RainbowButton variant="glass" size="lg" className="rounded-xl" asChild>
            <a href="/solutions">Explore All Solutions</a>
          </RainbowButton>
        </div>
      </div>
    </section>
  );
}

export function SolutionsBentoSkeleton() {
  return (
    <section className="section-padding relative">
      <div className="content-width">
        <div className="text-center mb-16 flex flex-col items-center">
          <div className="h-12 w-64 rounded-xl bg-white/[0.03] animate-pulse mb-4 border border-white/[0.05]" />
          <div className="h-6 w-96 rounded-xl bg-white/[0.02] animate-pulse border border-white/[0.04]" />
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col md:flex-row gap-4 w-full">
            <div className="h-[480px] w-full md:flex-[2] rounded-2xl bg-white/[0.03] animate-pulse border border-white/[0.05]" />
            <div className="h-[480px] w-full md:flex-[1] rounded-2xl bg-white/[0.03] animate-pulse border border-white/[0.05]" />
            <div className="h-[480px] w-full md:flex-[1] rounded-2xl bg-white/[0.03] animate-pulse border border-white/[0.05]" />
          </div>
          <div className="flex flex-col md:flex-row gap-4 w-full">
            <div className="h-[480px] w-full md:flex-[1] rounded-2xl bg-white/[0.03] animate-pulse border border-white/[0.05]" />
            <div className="h-[480px] w-full md:flex-[2] rounded-2xl bg-white/[0.03] animate-pulse border border-white/[0.05]" />
            <div className="h-[480px] w-full md:flex-[1] rounded-2xl bg-white/[0.03] animate-pulse border border-white/[0.05]" />
          </div>
        </div>
      </div>
    </section>
  );
}