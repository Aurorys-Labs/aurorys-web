"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";
import { cn } from "@/lib/utils";

interface InteractiveGlowButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  className?: string;
  glowColor?: string;
  href?: string;
}

export const InteractiveGlowButton = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, InteractiveGlowButtonProps>(
  ({ className, glowColor, href, children, ...props }, ref) => {
    const divRef = useRef<HTMLDivElement>(null);
    
    const mouseX = useMotionValue(200);
    const mouseY = useMotionValue(24);
    
    const springX = useSpring(mouseX, { stiffness: 100, damping: 25 });
    const springY = useSpring(mouseY, { stiffness: 100, damping: 25 });

    useEffect(() => {
      if (divRef.current) {
        mouseX.set(divRef.current.offsetWidth * 0.85);
        mouseY.set(divRef.current.offsetHeight / 2);
      }
    }, [mouseX, mouseY]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (divRef.current) {
        const rect = divRef.current.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
      }
    };

    const handleMouseLeave = () => {
      if (divRef.current) {
        mouseX.set(divRef.current.offsetWidth * 0.85);
        mouseY.set(divRef.current.offsetHeight / 2);
      }
    };

    // Multi-hue radial gradient
    const gradient = useMotionTemplate`radial-gradient(90px circle at ${springX}px ${springY}px, rgba(19, 209, 2, 0.57) 0%, rgba(34, 211, 238, 0.2) 70%, rgba(167, 139, 250, 0.1) 90%, transparent 100%)`;

    const commonClasses = cn(
      "relative w-full inline-flex items-center justify-center h-12 px-8 rounded-xl font-semibold text-sm transition-all duration-300",
      "bg-white/[0.03] text-[var(--text-stellar)] border border-white/10 hover:border-white/20 hover:bg-white/[0.05]",
      className
    );

    return (
      <div
        ref={divRef}
        className="relative inline-block w-full sm:w-auto group"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {href ? (
          <a ref={ref as any} href={href} className={commonClasses} {...(props as any)}>
            <GlowEffect gradient={gradient} />
            <span className="relative z-10">{children}</span>
          </a>
        ) : (
          <button ref={ref as any} className={commonClasses} {...props}>
            <GlowEffect gradient={gradient} />
            <span className="relative z-10">{children}</span>
          </button>
        )}
      </div>
    );
  }
);

function GlowEffect({ gradient }: any) {
  return (
    <>
      {/* Default hover glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none rounded-xl"
        style={{
          background: gradient,
          opacity: 1, // Always visible
        }}
      />
      {/* Extra border glow mask */}
      <motion.div
        className="absolute inset-0 rounded-xl pointer-events-none border border-transparent"
        style={{
          WebkitMaskImage: gradient,
          WebkitMaskComposite: "source-in",
          maskImage: gradient,
          background: "linear-gradient(120deg, #00E8A0, #22D3EE, #A78BFA)",
          padding: "1px",
          WebkitMaskClip: "content-box, border-box",
          opacity: 1, // Always visible
        }}
      />
    </>
  );
}
InteractiveGlowButton.displayName = "InteractiveGlowButton";
