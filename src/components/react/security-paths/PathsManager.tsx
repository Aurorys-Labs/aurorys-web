import { RainbowButton } from "@/components/ui/rainbow-button";
import { domainPill } from "@/lib/domain-colors";
import { AnimatePresence, motion } from "framer-motion";
import {
	Activity,
	ArrowRight,
	Compass,
	Orbit,
	Rocket,
	ShieldCheck,
	Sparkles,
	Stars,
	TrendingUp,
	Zap,
} from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";

interface PathCardData {
	startingPoint: string;
	path: string;
	pathId: string;
}

interface PathDetailData {
	id: string;
	title: string;
	pills: string[];
	price: string;
	whenYouNeedThis: string;
	body: string;
	deliverables?: string[];
	ifSourcedSeparately?:
		| string
		| {
				items: string[];
				totalSeparate: string;
				constellationPrice: string;
		  };
	valueContext?: string;
	multiplePaths?: boolean;
	pathsLink?: string;
	formatsLink?: string;
	stacksLink?: string;
	detailPageLink?: string;
	cta: { label: string; href: string };
}

interface PathsManagerProps {
	pathCards: PathCardData[];
	paths: PathDetailData[];
}

const iconMap: Record<string, React.ElementType> = {
	"first-light": Sparkles,
	foundation: Compass,
	pulse: Activity,
	clearance: ShieldCheck,
	"escape-velocity": Rocket,
	beacon: Orbit,
	sprint: Zap,
	surge: TrendingUp,
	"full-constellation": Stars,
};

const themeClasses: Record<string, string> = {
	"first-light": "glass-card-tinted-sky",
	foundation: "glass-card-tinted-violet",
	pulse: "glass-card-tinted-green",
	clearance: "glass-card-tinted-gold",
	"escape-velocity": "glass-card-tinted-fuchsia",
	beacon: "glass-card-tinted-cyan",
	sprint: "glass-card-tinted-green",
	surge: "glass-card-tinted-rose",
	"full-constellation": "glass-card-tinted-violet",
};

const radialGlowColors: Record<string, string> = {
	"first-light": "rgba(14, 165, 233, 0.15)",
	foundation: "rgba(139, 92, 246, 0.15)",
	pulse: "rgba(16, 185, 129, 0.15)",
	clearance: "rgba(245, 158, 11, 0.15)",
	"escape-velocity": "rgba(217, 70, 239, 0.15)",
	beacon: "rgba(34, 211, 238, 0.15)",
	sprint: "rgba(16, 185, 129, 0.15)",
	surge: "rgba(244, 63, 94, 0.15)",
	"full-constellation": "rgba(139, 92, 246, 0.15)",
};

export function PathsManager({ pathCards, paths }: PathsManagerProps) {
	const [selectedPathId, setSelectedPathId] = useState<string>("first-light");

	// Sync with URL query parameter on mount and when query changes
	useEffect(() => {
		const getPathFromUrl = () => {
			const params = new URLSearchParams(window.location.search);
			const pathParam = params.get("path");
			if (pathParam && paths.some((p) => p.id === pathParam)) {
				setSelectedPathId(pathParam);
			}
		};

		getPathFromUrl();
		window.addEventListener("popstate", getPathFromUrl);
		return () => window.removeEventListener("popstate", getPathFromUrl);
	}, [paths]);

	const handleSelectPath = (id: string) => {
		setSelectedPathId(id);
		// Update URL state without page reload
		const newUrl = `${window.location.pathname}?path=${id}`;
		window.history.pushState({ path: id }, "", newUrl);
	};

	const currentPath = paths.find((p) => p.id === selectedPathId) || paths[0];

	return (
		<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
			{/* Left Column: Starting Point Cards */}
			<div className="lg:col-span-5 grid grid-cols-1 md:grid-cols-1 gap-4">
				{pathCards.map((card, idx) => {
					const isSelected = card.pathId === selectedPathId;
					const Icon = iconMap[card.pathId] || ShieldCheck;

					return (
						<motion.button
							key={card.pathId}
							onClick={() => handleSelectPath(card.pathId)}
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.4, delay: idx * 0.05 }}
							className={`text-left p-6 rounded-2xl transition-all duration-300 font-sans group ${
								isSelected
									? `glass-card border-none shadow-lg ${themeClasses[card.pathId] || ""}`
									: "glass-card border-white/[0.06] hover:border-white/[0.15] hover:bg-white/[0.02] text-white/80"
							}`}
						>
							<div className="text-xs text-[var(--text-muted)] uppercase tracking-wider mb-2">
								{card.startingPoint}
							</div>
							<div className="text-base font-semibold flex items-center justify-between w-full">
								<div className="flex items-center gap-2.5">
									<Icon className="w-5 h-5 opacity-80 shrink-0" />
									<span>{card.path}</span>
								</div>
								<div className="flex items-center gap-3">
									<span className="text-xs text-[var(--aurora-green-solid)] font-mono font-medium hidden sm:inline-block">
										{
											paths
												.find((p) => p.id === card.pathId)
												?.price.split(" · ")[0]
										}
									</span>
									<ArrowRight
										className={`w-4 h-4 transition-transform duration-300 ${
											isSelected
												? "translate-x-1 text-inherit"
												: "text-white/40 group-hover:translate-x-1"
										}`}
									/>
								</div>
							</div>
						</motion.button>
					);
				})}
			</div>

			{/* Right Column: Path Detail Sidebar (sticky on desktop) */}
			<div className="lg:col-span-7 lg:sticky lg:top-28">
				<AnimatePresence mode="wait">
					<motion.div
						key={currentPath.id}
						initial={{ opacity: 0, x: 20 }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: -20 }}
						transition={{ duration: 0.3 }}
						className={`glass-card p-8 text-left flex flex-col justify-between relative overflow-hidden min-h-[580px] transition-all duration-300 ${
							themeClasses[currentPath.id] || ""
						}`}
					>
						{/* Ambient Glow */}
						<div
							className="absolute -top-24 -right-24 w-64 h-64 rounded-full blur-3xl transition-all duration-500"
							style={{
								backgroundColor:
									radialGlowColors[currentPath.id] ||
									"rgba(16, 185, 129, 0.05)",
							}}
						/>

						<div className="space-y-6 z-10 relative">
							{/* Tags */}
							<div className="flex flex-wrap gap-1.5">
								{currentPath.pills.map((pill) => (
									<span key={pill} className={domainPill(pill)}>
										{pill}
									</span>
								))}
							</div>

							{/* Title & Price */}
							<div className="flex justify-between items-start gap-4">
								<h3 className="font-heading font-medium text-2xl text-[var(--text-stellar)]">
									{currentPath.title}
								</h3>
								<div className="font-heading font-semibold text-lg bg-gradient-to-r from-[var(--aurum-gold-subtle)] to-[var(--aurum-gold-light)] bg-clip-text text-transparent text-right shrink-0">
									{currentPath.price}
								</div>
							</div>

							{/* When you need this */}
							<div
								className={`glass-card rounded-xl p-5 relative z-10 shadow-lg border border-white/10`}
								style={{
									background: `linear-gradient(135deg, ${radialGlowColors[currentPath.id] || "rgba(255,255,255,0.05)"}, rgba(255,255,255,0.01))`,
								}}
							>
								<div className="text-xs uppercase tracking-wider font-mono font-bold mb-2 flex items-center gap-2 text-[var(--text-stellar)]">
									<Sparkles className="w-4 h-4" /> When to choose:
								</div>
								<div className="text-sm font-sans text-white/90 leading-relaxed font-medium">
									{currentPath.whenYouNeedThis}
								</div>
							</div>

							{/* Body Description */}
							<p className="text-white/90 text-sm leading-relaxed font-sans">
								{currentPath.body}
							</p>

							{/* Deliverables */}
							{currentPath.deliverables &&
								currentPath.deliverables.length > 0 && (
									<div className="border-t border-white/[0.06] pt-6">
										<div className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-3">
											Key Deliverables
										</div>
										<ul className="space-y-2.5">
											{currentPath.deliverables.map((item, i) => (
												<li
													key={i}
													className="flex items-start gap-2.5 text-sm text-white/90"
												>
													<svg
														className="w-4 h-4 text-[var(--aurora-green-solid)] shrink-0 mt-0.5"
														fill="none"
														viewBox="0 0 24 24"
														stroke="currentColor"
														strokeWidth="3"
													>
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															d="M5 13l4 4L19 7"
														/>
													</svg>
													<span className="font-sans leading-snug">{item}</span>
												</li>
											))}
										</ul>
									</div>
								)}

							{/* Value comparison or sourcing differences */}
							{currentPath.ifSourcedSeparately && (
								<div className="border-t border-white/[0.06] pt-6 space-y-3 font-sans">
									<div className="flex justify-between items-center gap-4">
										<div className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
											A la carte
										</div>
										<div className="text-xs font-semibold bg-gradient-to-r from-[var(--aurum-gold-subtle)] to-[var(--aurum-gold-light)] bg-clip-text text-transparent">
											{currentPath.price}
										</div>
									</div>
									{typeof currentPath.ifSourcedSeparately === "string" ? (
										<p className="text-xs text-white/60 leading-relaxed italic">
											{currentPath.ifSourcedSeparately}
										</p>
									) : (
										<div className="space-y-4">
											<ul className="space-y-1.5 text-xs text-white/50">
												{currentPath.ifSourcedSeparately.items.map(
													(item, i) => (
														<li
															key={i}
															className="list-disc list-inside leading-snug"
														>
															{item}
														</li>
													),
												)}
											</ul>
											<div className="text-xs border-t border-white/[0.04] pt-3 space-y-1">
												<div className="text-white/50 italic">
													Sourced separately:{" "}
													<span className="line-through">
														{currentPath.ifSourcedSeparately.totalSeparate}
													</span>
												</div>
												<div className="font-semibold bg-gradient-to-r from-[var(--aurum-gold-subtle)] to-[var(--aurum-gold-light)] bg-clip-text text-transparent">
													Full Constellation bundle:{" "}
													{currentPath.ifSourcedSeparately.constellationPrice}
												</div>
											</div>
										</div>
									)}
								</div>
							)}

							{/* Value Context advisory */}
							{currentPath.valueContext && (
								<div className="text-xs text-[var(--text-muted)] font-sans italic border-t border-white/[0.06] pt-4">
									{currentPath.valueContext}
								</div>
							)}

							{/* Special sub-paths and direct links */}
							{currentPath.multiplePaths && currentPath.pathsLink && (
								<div className="text-xs text-[var(--text-muted)] font-sans mt-2">
									Looking for specific architectures?{" "}
									<a
										href={currentPath.pathsLink}
										className="text-[var(--aurora-green-solid)] hover:text-white transition-colors duration-200"
									>
										Explore sovereignty paths →
									</a>
								</div>
							)}
							{currentPath.id === "sprint" && currentPath.formatsLink && (
								<div className="text-xs text-[var(--text-muted)] font-sans mt-2">
									Need details on formats?{" "}
									<a
										href={currentPath.formatsLink}
										className="text-[var(--aurora-green-solid)] hover:text-white transition-colors duration-200"
									>
										See Sprint formats →
									</a>
								</div>
							)}
							{currentPath.id === "surge" && currentPath.stacksLink && (
								<div className="text-xs text-[var(--text-muted)] font-sans mt-2">
									Need configuration options?{" "}
									<a
										href={currentPath.stacksLink}
										className="text-[var(--aurora-green-solid)] hover:text-white transition-colors duration-200"
									>
										See Surge stacks →
									</a>
								</div>
							)}
							{currentPath.id === "full-constellation" &&
								currentPath.detailPageLink && (
									<div className="text-xs text-[var(--text-muted)] font-sans mt-2">
										Learn more about our doctrine:{" "}
										<a
											href={currentPath.detailPageLink}
											className="text-[var(--aurora-green-solid)] hover:text-white transition-colors duration-200"
										>
											Read Full Constellation Doctrine →
										</a>
									</div>
								)}
						</div>

						<div className="mt-8 z-10 relative">
							<RainbowButton
								variant="glass"
								size="lg"
								className="w-full rounded-xl justify-center"
								asChild
							>
								<a href={currentPath.cta.href}>{currentPath.cta.label}</a>
							</RainbowButton>
							<div className="text-center mt-4">
								<p className="text-[10px] text-white/40 italic font-sans">
									* All prices are starting estimates. Final pricing is
									evaluated based on scope after discovery.
								</p>
							</div>
						</div>
					</motion.div>
				</AnimatePresence>
			</div>
		</div>
	);
}
