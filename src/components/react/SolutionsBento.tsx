"use client";

import { domainPill, domainPillSmall } from "@/lib/domain-colors";
import { AnimatePresence, motion } from "framer-motion";
import {
	ArrowRight,
	ArrowUpRight,
	Asterisk,
	CheckCircle,
	Compass,
	GitBranch,
	Globe,
	MessageSquare,
	Orbit,
	Rocket,
	Search,
	Shield,
	ShieldCheck,
	Sparkles,
	Users,
	Workflow,
	Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import solutionsData from "../../lib/data/solutions.json";
import { RainbowButton } from "../ui/rainbow-button";

const iconMap: Record<string, React.ElementType> = {
	Shield,
	Search,
	Workflow,
	CheckCircle,
	Globe,
	Users,
	Zap,
	Rocket,
	MessageSquare,
	Sparkles,
	Compass,
	GitBranch,
	ShieldCheck,
	Orbit,
};

const cardStyleConfig: Record<
	string,
	{
		iconGradId: string;
		bgGradClass: string;
		iconContainerBorder: string;
		iconBg: string;
		radialColor: string;
	}
> = {
	"first-light": {
		iconGradId: "grad-first-light",
		bgGradClass: "from-sky-500/10 via-sky-500/5 to-transparent",
		iconContainerBorder: "border-sky-500/30",
		iconBg:
			"linear-gradient(135deg, rgba(59, 156, 246, 0.2), rgba(29, 141, 216, 0.05))",
		radialColor: "0, 166, 244",
	},
	foundation: {
		iconGradId: "grad-foundation",
		bgGradClass: "from-violet-500/10 via-violet-500/5 to-transparent",
		iconContainerBorder: "border-violet-500/30",
		iconBg:
			"linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(109, 40, 217, 0.05))",
		radialColor: "139, 92, 246",
	},
	pulse: {
		iconGradId: "grad-pulse",
		bgGradClass: "from-emerald-500/10 via-emerald-500/5 to-transparent",
		iconContainerBorder: "border-emerald-500/30",
		iconBg:
			"linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(5, 150, 105, 0.05))",
		radialColor: "16, 185, 129",
	},
	clearance: {
		iconGradId: "grad-clearance",
		bgGradClass: "from-amber-500/10 via-amber-500/5 to-transparent",
		iconContainerBorder: "border-amber-500/30",
		iconBg:
			"linear-gradient(135deg, rgba(201, 168, 76, 0.2), rgba(160, 120, 42, 0.05))",
		radialColor: "201, 168, 76",
	},
	"escape-velocity": {
		iconGradId: "grad-escape-velocity",
		bgGradClass: "from-fuchsia-500/10 via-fuchsia-500/5 to-transparent",
		iconContainerBorder: "border-fuchsia-500/30",
		iconBg:
			"linear-gradient(135deg, rgba(217, 70, 239, 0.2), rgba(192, 132, 252, 0.05))",
		radialColor: "217, 70, 239",
	},
	beacon: {
		iconGradId: "grad-beacon",
		bgGradClass: "from-cyan-500/10 via-cyan-500/5 to-transparent",
		iconContainerBorder: "border-cyan-500/30",
		iconBg:
			"linear-gradient(135deg, rgba(34, 211, 238, 0.15), rgba(8, 145, 178, 0.05))",
		radialColor: "34, 211, 238",
	},
	sprint: {
		iconGradId: "grad-sprint",
		bgGradClass: "from-emerald-500/10 via-emerald-500/5 to-transparent",
		iconContainerBorder: "border-emerald-500/30",
		iconBg:
			"linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(5, 150, 105, 0.05))",
		radialColor: "16, 185, 129",
	},
	surge: {
		iconGradId: "grad-surge",
		bgGradClass: "from-rose-500/10 via-rose-500/5 to-transparent",
		iconContainerBorder: "border-rose-500/30",
		iconBg:
			"linear-gradient(135deg, rgba(244, 63, 94, 0.2), rgba(190, 24, 93, 0.05))",
		radialColor: "244, 63, 94",
	},
	custom: {
		iconGradId: "grad-custom",
		bgGradClass: "from-violet-500/10 via-violet-500/5 to-transparent",
		iconContainerBorder: "border-violet-500/30",
		iconBg:
			"linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(109, 40, 217, 0.05))",
		radialColor: "139, 92, 246",
	},
};

const IconGradients = () => (
	<svg width="0" height="0" className="absolute pointer-events-none">
		<defs>
			<linearGradient id="grad-first-light" x1="0%" y1="0%" x2="100%" y2="100%">
				<stop offset="0%" stopColor="#E8EDF2" />
				<stop offset="100%" stopColor="#8B95A1" />
			</linearGradient>
			<linearGradient id="grad-foundation" x1="0%" y1="0%" x2="100%" y2="100%">
				<stop offset="0%" stopColor="#A78BFA" />
				<stop offset="100%" stopColor="#7C3AED" />
			</linearGradient>
			<linearGradient id="grad-pulse" x1="0%" y1="0%" x2="100%" y2="100%">
				<stop offset="0%" stopColor="#00E8A0" />
				<stop offset="100%" stopColor="#00B87D" />
			</linearGradient>
			<linearGradient id="grad-clearance" x1="0%" y1="0%" x2="100%" y2="100%">
				<stop offset="0%" stopColor="#C9A84C" />
				<stop offset="100%" stopColor="#A0782A" />
			</linearGradient>
			<linearGradient
				id="grad-escape-velocity"
				x1="0%"
				y1="0%"
				x2="100%"
				y2="100%"
			>
				<stop offset="0%" stopColor="#F472B6" />
				<stop offset="100%" stopColor="#E879A8" />
			</linearGradient>
			<linearGradient id="grad-beacon" x1="0%" y1="0%" x2="100%" y2="100%">
				<stop offset="0%" stopColor="#22D3EE" />
				<stop offset="100%" stopColor="#0891B2" />
			</linearGradient>
			<linearGradient id="grad-sprint" x1="0%" y1="0%" x2="100%" y2="100%">
				<stop offset="0%" stopColor="#00E8A0" />
				<stop offset="100%" stopColor="#00B87D" />
			</linearGradient>
			<linearGradient id="grad-surge" x1="0%" y1="0%" x2="100%" y2="100%">
				<stop offset="0%" stopColor="#F472B6" />
				<stop offset="100%" stopColor="#E879A8" />
			</linearGradient>
			<linearGradient id="grad-custom" x1="0%" y1="0%" x2="100%" y2="100%">
				<stop offset="0%" stopColor="#A78BFA" />
				<stop offset="100%" stopColor="#8B5CF6" />
			</linearGradient>
		</defs>
	</svg>
);

function MagicBentoCard({
	id,
	title,
	description,
	detail,
	bullets,
	icon,
	domains,
	price,
	ifSourcedSeparately,
	showSourcedSeparately,
	isExpanded,
	onToggle,
	cta,
	isDimmed = false,
}: {
	id: string;
	title: string;
	description: string;
	detail?: string;
	bullets?: string[];
	icon: string;
	domains: string[];
	price?: string;
	ifSourcedSeparately?: string;
	showSourcedSeparately?: boolean;
	isExpanded?: boolean;
	onToggle?: () => void;
	cta?: { label: string; href: string };
	isDimmed?: boolean;
}) {
	const IconComponent = iconMap[icon] || Shield;
	const config = cardStyleConfig[id] || cardStyleConfig["first-light"];

	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
	const [isHovered, setIsHovered] = useState(false);
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const checkMobile = () => setIsMobile(window.innerWidth < 768);
		checkMobile();
		window.addEventListener("resize", checkMobile);
		return () => window.removeEventListener("resize", checkMobile);
	}, []);

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		const rect = e.currentTarget.getBoundingClientRect();
		setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
	};

	const effectivelyExpanded = isMobile || isExpanded;

	return (
		<motion.div
			layout
			whileHover={isDimmed ? undefined : { y: -4 }}
			onMouseMove={handleMouseMove}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			className={`group relative p-[1px] rounded-2xl overflow-hidden cursor-pointer h-auto md:min-h-[480px] flex flex-col transition-all duration-500 ${
				effectivelyExpanded ? "w-full md:flex-[2]" : "w-full md:flex-[1]"
			} ${isDimmed ? "opacity-20 pointer-events-none scale-[0.98] blur-[0.5px]" : "opacity-100"} ${isHovered ? "ring-1 ring-white/20" : ""}`}
			onClick={onToggle}
		>
			<div
				className="absolute inset-0 transition-opacity duration-300 pointer-events-none -z-10"
				style={{
					opacity: !isDimmed && (isMobile || isHovered) ? 1 : 0,
					background: `radial-gradient(350px circle at ${isMobile ? "80% 80%" : `${mousePosition.x}px ${mousePosition.y}px`}, rgba(${config.radialColor}, 0.3), transparent 85%)`,
				}}
			/>
			<div className="absolute inset-0 rounded-2xl border border-white/[0.08] pointer-events-none -z-10 group-hover:border-white/[0.15] transition-colors duration-300" />

			<div className="relative rounded-[15px] bg-[rgba(13,17,23,0.35)] backdrop-blur-md p-6 h-full flex flex-col">
				<ArrowUpRight className="absolute top-4 right-4 w-5 h-5 text-white/20 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0" />
				<div
					className="absolute inset-0 pointer-events-none transition-opacity duration-300 -z-10"
					style={{
						opacity: !isDimmed && (isMobile || isHovered) ? 1 : 0,
						background: `radial-gradient(300px circle at ${isMobile ? "80% 80%" : `${mousePosition.x}px ${mousePosition.y}px`}, rgba(${config.radialColor}, 0.1), transparent 80%)`,
					}}
				/>
				<div
					className={`absolute inset-0 bg-gradient-to-br ${config.bgGradClass} opacity-[0.05] -z-20`}
				/>

				<div className="flex flex-col h-full relative z-10">
					<motion.div layout className="flex flex-col flex-1 h-full">
						<motion.div layout="position">
							{/* Icon + Title + Price row */}
							<div className="flex items-center gap-3 mb-2">
								<div
									className={`rounded-xl flex items-center justify-center w-11 h-11 border ${config.iconContainerBorder} shrink-0`}
									style={{ background: config.iconBg }}
								>
									<IconComponent
										className="w-5 h-5 shrink-0"
										stroke={`url(#${config.iconGradId})`}
										strokeWidth={2}
									/>
								</div>
								<h3 className="text-base font-bold text-[var(--text-stellar)] leading-tight flex-1 min-w-0 truncate">
									{title}
								</h3>
								{price && effectivelyExpanded && (
									<span className="text-[11px] font-semibold text-[var(--text-stellar)] bg-white/10 border border-white/20 px-2.5 py-1 rounded-md shrink-0 ml-auto whitespace-nowrap overflow-hidden text-ellipsis">
										{price}
									</span>
								)}
							</div>

							{/* Subtitle */}
							<p className="text-sm text-[var(--text-muted)] leading-relaxed mb-4">
								{description}
							</p>
						</motion.div>

						<AnimatePresence mode="popLayout" initial={false}>
							{effectivelyExpanded && detail && (
								<motion.div
									key="details"
									layout
									initial={{ opacity: 0, height: 0, filter: "blur(4px)" }}
									animate={{ opacity: 1, height: "auto", filter: "blur(0px)" }}
									exit={{
										opacity: 0,
										height: 0,
										filter: "blur(4px)",
										transition: { duration: 0.15 },
									}}
									transition={{
										duration: 0.4,
										ease: [0.25, 0.1, 0.25, 1],
										opacity: { delay: 0.2 },
									}}
									className="overflow-hidden"
								>
									<div className="mb-4 pt-1">
										<p className="text-sm text-[var(--text-muted)]/90 leading-relaxed border-t border-white/[0.04] pt-3 mb-3">
											{detail}
										</p>
										{bullets && bullets.length > 0 && (
											<ul className="space-y-2.5 mb-3">
												{bullets.map((bullet, i) => (
													<li
														key={i}
														className="flex items-start gap-2 text-sm text-[var(--text-muted)]"
													>
														<Asterisk className="w-3.5 h-3.5 mt-0.5 shrink-0 text-[var(--aurora-green-solid)]" />
														<span>{bullet}</span>
													</li>
												))}
											</ul>
										)}
										{ifSourcedSeparately && showSourcedSeparately && (
											<div className="text-xs text-white/50 border-t border-white/[0.04] pt-3 mt-3 font-sans italic leading-relaxed">
												<span className="font-semibold text-white/60 not-italic">
													If sourced separately:{" "}
												</span>
												{ifSourcedSeparately}
											</div>
										)}
									</div>
								</motion.div>
							)}
						</AnimatePresence>

						<motion.div
							layout="position"
							className={`flex flex-wrap items-center justify-between gap-2 w-full mt-auto ${effectivelyExpanded ? "pt-4" : "mt-0"}`}
						>
							<div className="flex flex-wrap gap-1.5 flex-1">
								{domains.map((domain) => (
									<span key={domain} className={domainPill(domain)}>
										{domain}
									</span>
								))}
							</div>
							{effectivelyExpanded && cta && (
								<div
									onClick={(e) => e.stopPropagation()}
									className="shrink-0 w-full md:w-auto mt-4 md:mt-0"
								>
									<RainbowButton
										variant="glass"
										size="sm"
										className="rounded-xl font-semibold w-full md:w-auto text-center"
										asChild
									>
										<a href={cta.href}>
											{cta.label}{" "}
											<ArrowRight className="inline-block w-4 h-4 ml-1.5" />
										</a>
									</RainbowButton>
								</div>
							)}
						</motion.div>
					</motion.div>
				</div>
			</div>
		</motion.div>
	);
}

function SkinnyBentoCard({
	id,
	title,
	description,
	icon,
	domains,
	cta,
	isDimmed = false,
}: {
	id: string;
	title: string;
	description: string;
	icon: string;
	domains: string[];
	cta?: { label: string; href: string };
	isDimmed?: boolean;
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
			whileHover={isDimmed ? undefined : { y: -2 }}
			onMouseMove={handleMouseMove}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			className={`relative w-full overflow-hidden cursor-pointer group py-5 px-6 transition-all duration-500 hover:bg-white/[0.04] ${
				isDimmed
					? "opacity-20 pointer-events-none scale-[0.99] blur-[0.5px]"
					: "opacity-100"
			}`}
			onClick={() => (window.location.href = cta?.href || "/contact")}
		>
			<div
				className="absolute inset-0 pointer-events-none transition-opacity duration-300 -z-10"
				style={{
					opacity: !isDimmed && isHovered ? 1 : 0,
					background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(${config.radialColor}, 0.18), transparent 80%)`,
				}}
			/>
			<div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
				<div className="flex items-center gap-4 shrink-0 md:w-64">
					<div
						className={`rounded-xl flex items-center justify-center w-10 h-10 border ${config.iconContainerBorder} transition-all duration-300 group-hover:shadow-[0_0_15px_-3px_rgba(${config.radialColor},0.3)]`}
						style={{ background: config.iconBg }}
					>
						<IconComponent
							className="w-5 h-5 shrink-0"
							stroke={`url(#${config.iconGradId})`}
							strokeWidth={2}
						/>
					</div>
					<div className="flex-1 min-w-0">
						<h3 className="text-sm font-bold text-[var(--text-stellar)] leading-tight">
							{title}
						</h3>
						<p className="text-xs text-[var(--text-muted)] mt-1 md:hidden line-clamp-2">
							{description}
						</p>
					</div>
				</div>

				<div className="hidden md:block flex-1 max-w-2xl px-4">
					<p className="text-xs text-[var(--text-muted)] leading-relaxed">
						{description}
					</p>
				</div>

				<div className="flex items-center justify-between md:justify-end gap-4 shrink-0 border-t border-white/[0.04] md:border-0 pt-2.5 md:pt-0">
					<div className="flex flex-wrap gap-1.5">
						{domains.map((domain) => (
							<span key={domain} className={domainPillSmall(domain)}>
								{domain}
							</span>
						))}
					</div>
					<div className="flex items-center gap-1 text-xs font-semibold text-[var(--aurora-green-solid)] transition-all group-hover:translate-x-0.5">
						<span>{cta?.label || "Learn More"}</span>
						<ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
					</div>
				</div>
			</div>
		</motion.div>
	);
}

const FILTER_MAP: Record<string, string[]> = {
	all: [
		"first-light",
		"foundation",
		"pulse",
		"clearance",
		"escape-velocity",
		"beacon",
		"sprint",
		"surge",
		"custom",
	],
	audit: ["first-light", "clearance", "sprint"],
	sovereign: ["foundation", "escape-velocity", "surge"],
	fractional: ["beacon", "custom"],
};

function ServiceRow({
	services,
	expandedIndex,
	setExpandedIndex,
	showSourcedSeparately,
	activeFilter,
}: {
	services: typeof solutionsData.cards;
	expandedIndex: number;
	setExpandedIndex: (index: number) => void;
	showSourcedSeparately?: boolean;
	activeFilter?: string;
}) {
	return (
		<div className="flex flex-col md:flex-row gap-4 w-full">
			{services.map((card, index) => {
				const isHighlighted =
					activeFilter === "all" ||
					(activeFilter && FILTER_MAP[activeFilter]?.includes(card.id));
				return (
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
						cta={card.cta}
						ifSourcedSeparately={card.ifSourcedSeparately}
						showSourcedSeparately={showSourcedSeparately}
						isExpanded={index === expandedIndex}
						onToggle={() => setExpandedIndex(index)}
						isDimmed={!isHighlighted}
					/>
				);
			})}
		</div>
	);
}

export function SolutionsBento({
	showSourcedSeparately = false,
	interactiveFilters = false,
}: {
	showSourcedSeparately?: boolean;
	interactiveFilters?: boolean;
}) {
	const coreCardIds = [
		"first-light",
		"foundation",
		"pulse",
		"clearance",
		"escape-velocity",
		"beacon",
	];
	const skinnyCardIds = ["sprint", "surge", "custom"];

	const coreCards = solutionsData.cards.filter((c) =>
		coreCardIds.includes(c.id),
	);
	const skinnyCards = solutionsData.cards.filter((c) =>
		skinnyCardIds.includes(c.id),
	);

	const row1 = coreCards.slice(0, 3);
	const coreCardsRow2 = coreCards.slice(3, 6);

	const [row1ExpandedIndex, setRow1ExpandedIndex] = useState(0);
	const [row2ExpandedIndex, setRow2ExpandedIndex] = useState(1);
	const [activeFilter, setActiveFilter] = useState("all");

	useEffect(() => {
		if (typeof window !== "undefined") {
			const params = new URLSearchParams(window.location.search);
			const offering = params.get("offering");
			if (offering) {
				const index1 = row1.findIndex((c) => c.id === offering);
				if (index1 !== -1) {
					setRow1ExpandedIndex(index1);
					setTimeout(() => {
						const section = document.getElementById("solutions-bento");
						if (section) {
							section.scrollIntoView({ behavior: "smooth" });
						}
					}, 100);
				}
				const index2 = coreCardsRow2.findIndex((c) => c.id === offering);
				if (index2 !== -1) {
					setRow2ExpandedIndex(index2);
					setTimeout(() => {
						const section = document.getElementById("solutions-bento");
						if (section) {
							section.scrollIntoView({ behavior: "smooth" });
						}
					}, 100);
				}
			}
		}
	}, [row1, coreCardsRow2]);

	return (
		<section id="solutions-bento" className="section-padding relative">
			<IconGradients />
			<div className="content-width">
				<div className="text-center mb-16">
					<h2 className="font-sans font-bold text-4xl md:text-5xl mb-4 tracking-tight">
						{solutionsData.sectionTitle.split(" ").map((w, i) =>
							i === 0 ? (
								<span key={i} className="text-gradient-aurora">
									{w}{" "}
								</span>
							) : (
								<span key={i}>{w} </span>
							),
						)}
					</h2>
					<p className="text-white/60 max-w-xl mx-auto text-base">
						{solutionsData.sectionSubtitle}
					</p>
				</div>

				{interactiveFilters && (
					<div className="flex flex-col items-center gap-3 mb-10">
						<div className="text-xs uppercase tracking-wider text-[var(--text-muted)] font-semibold">
							I Need To...
						</div>
						<div className="flex flex-wrap justify-center gap-2 max-w-2xl mx-auto">
							{[
								{ id: "all", label: "Browse All Solutions" },
								{ id: "audit", label: "Pass an Audit" },
								{ id: "sovereign", label: "Deploy Sovereign Infrastructure" },
								{ id: "fractional", label: "Get Fractional Leadership" },
							].map((tab) => {
								const active = activeFilter === tab.id;
								return (
									<button
										key={tab.id}
										onClick={() => {
											setActiveFilter(tab.id);
											// Auto-expand appropriate cards
											if (tab.id === "audit") {
												setRow1ExpandedIndex(0); // first-light
												setRow2ExpandedIndex(0); // clearance
											} else if (tab.id === "sovereign") {
												setRow1ExpandedIndex(1); // foundation
												setRow2ExpandedIndex(1); // escape-velocity
											} else if (tab.id === "fractional") {
												setRow2ExpandedIndex(2); // beacon
											}
										}}
										className={`px-4 py-2 rounded-full text-xs font-semibold font-sans transition-all duration-300 border cursor-pointer ${
											active
												? "bg-[rgba(0,232,160,0.1)] border-[rgba(0,232,160,0.4)] text-[var(--aurora-green-solid)] shadow-[0_0_15px_-3px_rgba(0,232,160,0.3)]"
												: "bg-white/[0.03] hover:bg-white/[0.08] border-white/[0.08] text-[var(--text-stellar)]"
										}`}
									>
										{tab.label}
									</button>
								);
							})}
						</div>
					</div>
				)}

				<div className="flex flex-col gap-4">
					<ServiceRow
						services={row1}
						expandedIndex={row1ExpandedIndex}
						setExpandedIndex={setRow1ExpandedIndex}
						showSourcedSeparately={showSourcedSeparately}
						activeFilter={activeFilter}
					/>
					<ServiceRow
						services={coreCardsRow2}
						expandedIndex={row2ExpandedIndex}
						setExpandedIndex={setRow2ExpandedIndex}
						showSourcedSeparately={showSourcedSeparately}
						activeFilter={activeFilter}
					/>

					<div className="relative p-[1px] rounded-3xl overflow-hidden mt-6">
						<div className="absolute inset-0 rounded-3xl border border-white/[0.08] pointer-events-none -z-10" />
						<div className="relative rounded-[23px] bg-[rgba(13,17,23,0.35)] backdrop-blur-md overflow-hidden">
							<div className="px-6 pt-6 pb-4 border-b border-white/[0.06] bg-white/[0.01]">
								<h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-white/80">
									Specialized & On-Demand
								</h3>
								<p className="text-xs text-[var(--text-muted)] mt-1">
									Focused engagements for specific needs and urgent timelines.
								</p>
							</div>
							<div className="divide-y divide-white/[0.06]">
								{skinnyCards.map((card) => {
									const isHighlighted =
										activeFilter === "all" ||
										FILTER_MAP[activeFilter]?.includes(card.id);
									return (
										<SkinnyBentoCard
											key={card.id}
											id={card.id}
											title={card.title}
											description={card.description}
											icon={card.icon}
											domains={card.domains}
											cta={card.cta}
											isDimmed={!isHighlighted}
										/>
									);
								})}
							</div>
						</div>
					</div>
				</div>

				<div className="mt-12 text-center">
					<RainbowButton
						variant="glass"
						size="lg"
						className="rounded-xl"
						asChild
					>
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
