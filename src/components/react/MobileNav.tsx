"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { 
  X, 
  Menu, 
  LayoutGrid, 
  Shield, 
  Workflow, 
  Compass, 
  Route, 
  Sparkles, 
  MessageSquare
} from "lucide-react";
import { RainbowButton } from "@/components/ui/rainbow-button";

const radialNodes = [
  { name: "Solutions", href: "/solutions", icon: LayoutGrid },
  { name: "Sovereignty", href: "/sovereignty", icon: Shield },
  { name: "How We Work", href: "/how-we-work", icon: Workflow },
  { name: "Roots", href: "/roots", icon: Compass },
  { name: "Security Path", href: "/#pricing", icon: Route },
  { name: "The Aurorys Way", href: "/#aurorys-way", icon: Sparkles },
];

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [isRadialOpen, setIsRadialOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [showDemo, setShowDemo] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const demoControls = useAnimation();

  useEffect(() => {
    // Only run on mobile
    if (window.innerWidth >= 768) return;

    const hasSeenDemo = localStorage.getItem("hasSeenNavDemo_v2");
    
    if (!hasSeenDemo) {
      let isAnimating = false;
      const handleScroll = () => {
        if (window.scrollY > 200 && !isAnimating) {
          isAnimating = true;
          window.removeEventListener("scroll", handleScroll);
          localStorage.setItem("hasSeenNavDemo_v2", "true");
          
          setShowDemo(true);
          sequenceDemo();
        }
      };
      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const sequenceDemo = async () => {
    // wait a moment before dimming
    await new Promise(resolve => setTimeout(resolve, 300));
    setIsRadialOpen(true);
    
    // Simulate highlighting a node
    await new Promise(resolve => setTimeout(resolve, 600));
    setActiveIndex(3); // Highlight "Roots"
    
    await new Promise(resolve => setTimeout(resolve, 800));
    setActiveIndex(null);
    setIsRadialOpen(false);
    
    setTimeout(() => {
      setShowDemo(false);
    }, 500);
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    if (isOpen) return; // Don't trigger radial if modal is open
    // Delay radial open slightly to allow tap
    const timer = setTimeout(() => {
      setIsRadialOpen(true);
      if ("vibrate" in navigator) navigator.vibrate(50);
    }, 250);
    
    containerRef.current?.setAttribute("data-timer", timer.toString());
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    const timer = containerRef.current?.getAttribute("data-timer");
    if (timer) clearTimeout(parseInt(timer));
    
    if (isRadialOpen) {
      setIsRadialOpen(false);
      // Navigate if a node is active
      if (activeIndex !== null) {
        if ("vibrate" in navigator) navigator.vibrate(30);
        window.location.href = radialNodes[activeIndex].href;
      }
      setActiveIndex(null);
    } else {
      // It was a tap!
      setIsOpen((prev) => !prev);
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isRadialOpen || !containerRef.current) return;
    
    // Calculate angle from the center of the thumb-dock to the pointer
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;
    
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance < 40) {
      setActiveIndex(null);
      return;
    }
    
    // Calculate angle in radians (0 is right, PI is left)
    // dy is negative because screen Y goes down, but math Y goes up
    let angle = Math.atan2(-dy, dx);
    if (angle < 0) angle += Math.PI * 2;
    
    // Map angle to a node
    // Our nodes span from roughly Math.PI * 0.85 to Math.PI * 0.15
    const startAngle = Math.PI * 0.85;
    const endAngle = Math.PI * 0.15;
    const totalAngle = startAngle - endAngle;
    const angleStep = totalAngle / (radialNodes.length - 1);
    
    // Find closest node
    let closestIdx = -1;
    let minDiff = Infinity;
    
    for (let i = 0; i < radialNodes.length; i++) {
      const nodeAngle = startAngle - (i * angleStep);
      let diff = Math.abs(angle - nodeAngle);
      // handle wrap around just in case
      if (diff > Math.PI) diff = Math.PI * 2 - diff;
      
      if (diff < minDiff && diff < Math.PI * 0.15) { // Threshold to snap
        minDiff = diff;
        closestIdx = i;
      }
    }
    
    if (closestIdx !== activeIndex) {
      if (closestIdx !== -1 && "vibrate" in navigator) navigator.vibrate(10);
      setActiveIndex(closestIdx);
    }
  };

  const radius = 130;
  const startAngle = Math.PI * 0.85;
  const endAngle = Math.PI * 0.15;
  const angleStep = (startAngle - endAngle) / (radialNodes.length - 1);

  return (
    <div className="md:hidden">
      {/* Dim Lights Overlay for Demo */}
      <AnimatePresence>
        {showDemo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[55] bg-black/60 pointer-events-none backdrop-blur-[2px]"
          />
        )}
      </AnimatePresence>

      {/* Full Screen Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-4 top-16 z-[60] bg-[rgba(13,17,23,0.55)] backdrop-blur-2xl rounded-[32px] flex flex-col pt-8 px-6 pb-8 border border-white/[0.08] shadow-2xl"
          >
            <div 
              className="flex justify-between items-center mb-8"
            >
              <div className="flex items-center gap-2">
                <img src="/images/logos/normal updated colors.svg" alt="Aurorys Labs" className="h-6 w-auto" />
                <span className="font-semibold text-white/90">Aurorys Labs</span>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/80 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto pr-2 pb-16">
              <div className="grid grid-cols-2 gap-3">
                {radialNodes.map((node, idx) => (
                  <motion.a
                    key={node.name}
                    href={node.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + idx * 0.05 }}
                    onClick={() => setIsOpen(false)}
                    className="p-4 rounded-[20px] flex flex-col items-start gap-3 transition-colors bg-[rgba(255,255,255,0.03)] border border-white/[0.06] text-white/90 hover:bg-[rgba(255,255,255,0.08)] backdrop-blur-md"
                  >
                    <node.icon className="w-5 h-5 text-[var(--aurora-green-solid)]" />
                    <span className="font-medium text-[15px] leading-tight tracking-tight">{node.name}</span>
                  </motion.a>
                ))}
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + radialNodes.length * 0.05 }}
                className="mt-6 flex justify-center"
              >
                <RainbowButton className="w-full justify-center py-6 rounded-2xl text-base" asChild>
                  <a href="/?subject=PING_HELLO#contact" onClick={() => setIsOpen(false)}>
                    Start a Conversation
                  </a>
                </RainbowButton>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Thumb Dock */}
      <div className="fixed bottom-6 left-0 right-0 z-[70] flex justify-center pointer-events-none">
        <div className="relative pointer-events-auto">
          {/* Radial Menu */}
          <AnimatePresence>
            {isRadialOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.5, y: 50 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="absolute bottom-[32px] translate-y-1/2 left-1/2 -translate-x-1/2 w-[340px] h-[340px] rounded-full bg-[rgba(13,17,23,0.45)] backdrop-blur-3xl border border-white/[0.08] shadow-[0_0_40px_rgba(0,0,0,0.5)]"
              />
            )}
          </AnimatePresence>
          <AnimatePresence>
            {isRadialOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute bottom-6 left-1/2 -translate-x-1/2 w-0 h-0"
              >
                {radialNodes.map((node, i) => {
                  const angle = startAngle - (i * angleStep);
                  const x = Math.cos(angle) * radius;
                  const y = -Math.sin(angle) * radius; // negative because screen Y goes down
                  const isActive = activeIndex === i;
                  
                  return (
                    <motion.div
                      key={node.name}
                      initial={{ opacity: 0, x: 0, y: 0, scale: 0.5 }}
                      animate={{ 
                        opacity: 1, 
                        x, 
                        y, 
                        scale: isActive ? 1.2 : 1 
                      }}
                      exit={{ opacity: 0, x: 0, y: 0, scale: 0.5 }}
                      transition={{ 
                        type: "spring", 
                        damping: 20, 
                        stiffness: 300,
                        delay: i * 0.02
                      }}
                      className="absolute left-[-28px] top-[-28px]"
                    >
                      <div className={`w-14 h-14 flex flex-col items-center justify-center gap-1 transition-colors duration-200 ${
                        isActive 
                          ? "text-[var(--aurora-green-solid)] drop-shadow-[0_0_12px_rgba(0,232,160,0.6)]" 
                          : "text-white/60"
                      }`}>
                        <node.icon className={`w-6 h-6 transition-transform duration-300 ${isActive ? "scale-110" : "scale-100"}`} strokeWidth={isActive ? 2.5 : 2} />
                      </div>
                      
                      {/* Tooltip for the node */}
                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 5 }}
                            className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#0d1117]/90 border border-white/10 px-3 py-1 rounded-lg text-xs font-medium text-white/90 backdrop-blur-md"
                          >
                            {node.name}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Trigger Button */}
          <div
            ref={containerRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            className="touch-none group" // touch-none prevents page scrolling while dragging
          >
            <motion.div 
              animate={showDemo ? { scale: [1, 1.1, 1], boxShadow: ["0 8px 32px rgba(0,0,0,0.3)", "0 0 0 15px rgba(0,232,160,0.2)", "0 0 0 30px rgba(0,232,160,0)"] } : { scale: 1, boxShadow: "0 8px 32px rgba(0,0,0,0.3)" }}
              transition={{ duration: 1.5, repeat: showDemo ? Infinity : 0 }}
              className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
                isOpen || isRadialOpen
                  ? "bg-[rgba(13,17,23,0.8)] backdrop-blur-xl border border-white/[0.1]"
                  : "bg-[rgba(13,17,23,0.6)] backdrop-blur-xl border border-white/[0.1] border-t-white/[0.15]"
              }`}
            >
              {isOpen ? (
                <X className="w-7 h-7 text-white" />
              ) : (
                <img src="/images/logos/normal updated colors.svg" alt="Menu" className={`w-8 h-8 transition-opacity ${isRadialOpen ? "opacity-50" : "opacity-100"}`} />
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
