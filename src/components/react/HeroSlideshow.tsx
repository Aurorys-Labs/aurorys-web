"use client";

import { InteractiveGlowButton } from "@/components/ui/interactive-glow-button";
import { RainbowButton } from "@/components/ui/rainbow-button";
import heroData from "@/lib/data/hero.json";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";

interface Slide {
	id: string;
	headline: string;
	subtitle: string;
	tags: string[];
	ctaPrimary: { label: string; href: string };
	ctaSecondary?: { label: string; href: string };
	tagline?: string;
}

const ALL_SLIDES: Slide[] = heroData.hero.slides as Slide[];
const SLIDES = ALL_SLIDES.slice(0, 3);

import { domainPill } from "@/lib/domain-colors";

const slideVariants = {
	enter: (direction: number) => ({ x: direction > 0 ? 80 : -80, opacity: 0 }),
	center: { x: 0, opacity: 1 },
	exit: (direction: number) => ({ x: direction > 0 ? -80 : 80, opacity: 0 }),
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

	const goTo = useCallback(
		(index: number) => {
			setDirection(index > currentIndex ? 1 : -1);
			setCurrentIndex(index);
		},
		[currentIndex],
	);

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
			<div className="relative z-10 content-width text-center pt-24 pb-32 grid">
				<AnimatePresence custom={direction} initial={false}>
					<motion.div
						key={currentIndex}
						custom={direction}
						variants={slideVariants}
						initial="enter"
						animate="center"
						exit="exit"
						transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
						className="flex flex-col items-center [grid-area:1/1]"
					>
						<motion.h2
							custom={0}
							variants={staggerItem}
							initial="hidden"
							animate="visible"
							className="font-heading font-bold max-w-5xl text-[var(--text-stellar)] mb-6"
							style={{
								fontSize: "var(--text-display)",
								lineHeight: "var(--leading-display)",
								letterSpacing: "var(--tracking-display)",
							}}
						>
							{slide.id === "architecture" && (
								<>
									<span className="bg-gradient-to-r from-[var(--aurora-green-solid)] via-[var(--aurora-blue-solid)] to-[var(--aurora-violet-solid)] bg-clip-text text-transparent">
										Security that scales with you —
									</span>{" "}
									<span className="font-serif italic font-normal text-white">
										not after you.
									</span>
								</>
							)}
							{slide.id === "assessment" && (
								<>
									<span className="bg-gradient-to-r from-[var(--aurora-green-solid)] via-[var(--aurora-blue-solid)] to-[var(--aurora-violet-solid)] bg-clip-text text-transparent">
										You don't know what you don't know.
									</span>{" "}
									<span className="font-serif italic font-normal text-white">
										Start here.
									</span>
								</>
							)}
							{slide.id === "compliance" && (
								<>
									<span className="bg-gradient-to-r from-[var(--aurora-green-solid)] via-[var(--aurora-blue-solid)] to-[var(--aurora-violet-solid)] bg-clip-text text-transparent">
										Compliance,
									</span>{" "}
									<span className="font-serif italic font-normal text-white">
										without the chaos.
									</span>
								</>
							)}
							{slide.id === "advisory" && (
								<>
									<span className="bg-gradient-to-r from-[var(--aurora-green-solid)] via-[var(--aurora-blue-solid)] to-[var(--aurora-violet-solid)] bg-clip-text text-transparent">
										Security leadership
									</span>{" "}
									<span className="font-serif italic font-normal text-white">
										without the full-time hire.
									</span>
								</>
							)}
							{slide.id === "sovereignty" && (
								<>
									<span className="bg-gradient-to-r from-[var(--aurora-green-solid)] via-[var(--aurora-blue-solid)] to-[var(--aurora-violet-solid)] bg-clip-text text-transparent">
										From cloud dependency to
									</span>{" "}
									<span className="font-serif italic font-normal text-white">
										infrastructure you own.
									</span>
								</>
							)}
							{![
								"architecture",
								"assessment",
								"compliance",
								"advisory",
								"sovereignty",
							].includes(slide.id) && (
								<span className="bg-gradient-to-r from-[var(--aurora-green-solid)] via-[var(--aurora-blue-solid)] to-[var(--aurora-violet-solid)] bg-clip-text text-transparent">
									{slide.headline}
								</span>
							)}
						</motion.h2>

						<motion.p
							custom={1}
							variants={staggerItem}
							initial="hidden"
							animate="visible"
							className="text-lg md:text-xl text-white/70 max-w-2xl mb-6 leading-relaxed"
						>
							{slide.subtitle}
						</motion.p>

						{slide.tagline && (
							<motion.p
								custom={1.5}
								variants={staggerItem}
								initial="hidden"
								animate="visible"
								className="font-serif italic text-xl md:text-2xl text-[var(--text-stellar)] max-w-xl text-center mb-6"
							>
								{slide.tagline}
							</motion.p>
						)}

						<motion.div
							custom={2}
							variants={staggerItem}
							initial="hidden"
							animate="visible"
							className="flex flex-wrap justify-center gap-2 mb-10"
						>
							{slide.tags.map((tag) => (
								<span key={tag} className={domainPill(tag)}>
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
							<RainbowButton
								variant="glass"
								size="lg"
								className="rounded-xl"
								asChild
							>
								<a href={slide.ctaPrimary.href}>{slide.ctaPrimary.label}</a>
							</RainbowButton>
							{slide.ctaSecondary && (
								<RainbowButton
									variant="glass_alt"
									size="lg"
									className="rounded-xl"
									href={slide.ctaSecondary.href}
								>
									{slide.ctaSecondary.label}
								</RainbowButton>
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
					transition={{
						duration: 2,
						repeat: Number.POSITIVE_INFINITY,
						ease: "easeInOut",
					}}
					className="text-white/50"
				>
					<svg
						width="20"
						height="36"
						viewBox="0 0 20 36"
						fill="none"
						stroke="currentColor"
						strokeWidth="1.5"
					>
						<path d="M4 12l6 6 6-6" />
						<path d="M4 18l6 6 6-6" />
						<path d="M4 24l6 6 6-6" />
					</svg>
				</motion.div>
			</motion.div>
		</div>
	);
}
