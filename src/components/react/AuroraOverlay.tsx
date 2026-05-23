"use client";

import { useState, useEffect, useRef } from "react";

export function AuroraOverlay() {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [fading, setFading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || reducedMotion) return;

    const handleTimeUpdate = () => {
      if (video.duration > 0 && video.currentTime >= video.duration - 0.5 && !fading) {
        setFading(true);
      }
      if (fading && video.currentTime < 0.5) {
        setFading(false);
      }
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    return () => video.removeEventListener("timeupdate", handleTimeUpdate);
  }, [reducedMotion, fading]);

  if (reducedMotion) {
    return (
      <div
        className="fixed inset-0 -z-5 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 30%, rgba(0,232,160,0.03) 0%, transparent 60%)",
        }}
      />
    );
  }

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      loop
      playsInline
      className={`fixed inset-0 -z-5 w-full h-full object-cover pointer-events-none transition-opacity duration-700 ${
        fading ? "opacity-20" : "opacity-25"
      }`}
    >
      <source src="/videos/aurora-30fps-alpha.webm" type="video/webm" />
    </video>
  );
}
