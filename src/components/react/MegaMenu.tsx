"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
	ArrowRight,
	BadgeCheck,
	BookOpen,
	ChevronDown,
	Compass,
	FileBadge,
	GitBranch,
	Globe,
	Layers,
	Mountain,
	Orbit,
	PenTool,
	Radio,
	Rocket,
	Search,
	Shield,
	ShieldCheck,
	Sparkles,
	Star,
	Target,
	Zap,
} from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export type MegaCategory = {
	id: string;
	label: string;
	href?: string;
	columns?: {
		title: string;
		items: {
			label: string;
			description: string;
			icon: React.ElementType;
			href: string;
			tag?: string;
			highlight?: boolean;
		}[];
	}[];
	spotlight?: {
		title: string;
		subtitle: string;
		description: string;
		cta: string;
		href: string;
	};
};

const megaNavItems: MegaCategory[] = [
	{
		id: "solutions",
		label: "Solutions",
		href: "/solutions",
		columns: [
			{
				title: "Core Blueprints",
				items: [
					{
						label: "First Light",
						description: "Security posture review & prioritized gap analysis",
						icon: Sparkles,
						href: "/solutions?view=first-light",
					},
					{
						label: "Foundation",
						description: "Secure architecture blueprint for your core stack",
						icon: Compass,
						href: "/solutions?view=foundation",
					},
					{
						label: "Pulse",
						description: "DevSecOps pipeline security & continuous validation",
						icon: GitBranch,
						href: "/solutions?view=pulse",
					},
					{
						label: "Clearance",
						description: "Audit-ready framework (SOC 2, ISO, NIST)",
						icon: BadgeCheck,
						href: "/solutions?view=clearance",
					},
					{
						label: "Program Foundation",
						description: "Backbone security program & governance controls",
						icon: ShieldCheck,
						href: "/solutions?view=program-foundation",
					},
				],
			},
			{
				title: "Tactical & Sovereignty",
				items: [
					{
						label: "Escape Velocity",
						description: "Break cloud vendor lock-in & optimize infrastructure",
						icon: Mountain,
						href: "/solutions?view=escape-velocity",
					},
					{
						label: "Surge Stacks",
						description: "Production-ready hardened infrastructure in days",
						icon: Zap,
						href: "/solutions/surge",
						tag: "Fast Track",
					},
					{
						label: "Security Sprints",
						description: "Focused 2-3 week engineering pushes",
						icon: Target,
						href: "/solutions/sprints",
					},
				],
			},
		],
		spotlight: {
			title: "The Constellation Approach",
			subtitle: "One Team. One Context.",
			description:
				"Stop managing 4 disjointed vendors. Get assessment, architecture, compliance, and pipeline security in one cohesive 6-month engine.",
			cta: "Explore Full Constellation",
			href: "/solutions/full-constellation",
		},
	},
	{
		id: "security-paths",
		label: "Security Paths",
		href: "/security-paths",
		columns: [
			{
				title: "Assessment & Architecture",
				items: [
					{
						label: "Clarity Path",
						description: "Discover unknown risks and prioritize action items",
						icon: Search,
						href: "/security-paths#clarity",
					},
					{
						label: "Blueprint Path",
						description: "Security designed into your foundation from day one",
						icon: PenTool,
						href: "/security-paths#blueprint",
					},
					{
						label: "Independence Path",
						description: "Migrate compute to hardware & clouds you control",
						icon: Mountain,
						href: "/security-paths#independence",
					},
				],
			},
			{
				title: "Compliance & Advisory",
				items: [
					{
						label: "Clearance Path",
						description: "Fast-track enterprise audit readiness & SOC 2",
						icon: BadgeCheck,
						href: "/security-paths#clearance",
					},
					{
						label: "Beacon Advisory",
						description:
							"Fractional security architect for your engineering team",
						icon: Radio,
						href: "/security-paths#beacon",
					},
				],
			},
		],
		spotlight: {
			title: "Not Sure Which Path?",
			subtitle: "Start With First Light",
			description:
				"We map your entire landscape and give you a prioritized roadmap with zero assumptions.",
			cta: "Start Assessment",
			href: "/security-paths#contact?subject=FIRST_LIGHT",
		},
	},
	{ id: "compliance", label: "Compliance", href: "/compliance" },
	{ id: "how-we-work", label: "How We Work", href: "/how-we-work" },
	{ id: "roots", label: "Roots", href: "/roots" },
];

export function MegaMenu() {
	const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
	const [hoverTabId, setHoverTabId] = useState<string | null>(null);
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	const activeCategory = megaNavItems.find((cat) => cat.id === activeMenuId);

	return (
		<div
			className="flex items-center justify-center"
			onMouseLeave={() => {
				setHoverTabId(null);
				setActiveMenuId(null);
			}}
		>
			<ul className="flex items-center space-x-1">
				{megaNavItems.map((item) => {
					const hasSub = Boolean(item.columns);
					const isOpen = activeMenuId === item.id;
					const isHovered = hoverTabId === item.id;

					return (
						<li
							key={item.id}
							onMouseEnter={() => {
								setHoverTabId(item.id);
								if (hasSub) setActiveMenuId(item.id);
							}}
							className="relative"
						>
							<a
								href={item.href || "#"}
								className={`text-sm py-2 px-4 flex items-center justify-center gap-1.5 font-sans font-medium rounded-full transition-all duration-300 relative cursor-pointer ${
									isOpen || isHovered
										? "text-white"
										: "text-white/70 hover:text-white"
								}`}
							>
								<span>{item.label}</span>
								{hasSub && (
									<ChevronDown
										className={`h-3.5 w-3.5 transition-transform duration-300 ${
											isOpen
												? "rotate-180 text-[var(--aurora-green-solid)]"
												: "opacity-60"
										}`}
									/>
								)}
								{(isHovered || isOpen) && (
									<motion.div
										layoutId="nav-hover-pill"
										className="absolute inset-0 bg-white/10 rounded-full -z-10"
										transition={{ type: "spring", stiffness: 350, damping: 30 }}
									/>
								)}
							</a>
						</li>
					);
				})}
			</ul>

			{/* DECOUPLED Standalone Panel via Portal to body allowing true native backdrop-blur */}
			{mounted &&
				createPortal(
					<AnimatePresence>
						{activeCategory?.columns && (
							<div
								className="fixed top-16 md:top-20 left-1/2 -translate-x-1/2 z-[9999] w-[92vw] max-w-4xl pointer-events-auto"
								onMouseEnter={() => {
									if (activeMenuId) setActiveMenuId(activeMenuId);
								}}
								onMouseLeave={() => {
									setActiveMenuId(null);
									setHoverTabId(null);
								}}
							>
								<motion.div
									layoutId="mega-menu-panel"
									initial={{ opacity: 0, y: 10, scale: 0.98 }}
									animate={{ opacity: 1, y: 0, scale: 1 }}
									exit={{
										opacity: 0,
										y: 8,
										scale: 0.98,
										transition: { duration: 0.15 },
									}}
									transition={{ duration: 0.25, ease: "easeOut" }}
									className="glass-card glass-card-tinted-violet p-6 md:p-8 rounded-3xl border border-white/10 bg-[rgba(13,17,23,0.50)] backdrop-blur-3xl shadow-[0_25px_60px_rgba(0,0,0,0.7)] relative overflow-hidden text-left"
								>
									{/* Background ambient glows */}
									<div className="absolute -top-24 -left-24 w-72 h-72 bg-[var(--aurora-green-solid)]/10 rounded-full blur-3xl pointer-events-none" />
									<div className="absolute -bottom-24 -right-24 w-72 h-72 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />

									<motion.div
										key={activeCategory.id}
										initial={{ opacity: 0, x: -6 }}
										animate={{ opacity: 1, x: 0 }}
										exit={{ opacity: 0, x: 6 }}
										transition={{ duration: 0.2 }}
										className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10"
									>
										{/* Navigation Columns */}
										<div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
											{activeCategory.columns.map((col) => (
												<div key={col.title} className="space-y-3">
													<h4 className="text-[11px] font-bold uppercase tracking-wider font-mono text-[var(--text-muted)] border-b border-white/[0.06] pb-2">
														{col.title}
													</h4>
													<ul className="space-y-1.5">
														{col.items.map((subItem) => {
															const Icon = subItem.icon;
															return (
																<li key={subItem.label}>
																	<a
																		href={subItem.href}
																		className="flex items-start gap-3.5 p-3 rounded-2xl transition-all duration-300 group border border-transparent hover:border-emerald-500/30 hover:bg-gradient-to-r hover:from-emerald-500/15 hover:via-emerald-500/10 hover:to-transparent group-hover:translate-x-1 relative overflow-hidden"
																	>
																		<div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border border-white/10 bg-white/[0.03] text-[var(--aurora-green-solid)] group-hover:border-emerald-400/40 group-hover:bg-emerald-500/10 group-hover:scale-105 transition-all duration-300">
																			<Icon className="w-4 h-4" />
																		</div>
																		<div className="flex-1 min-w-0">
																			<div className="flex items-center gap-2">
																				<span className="text-sm font-semibold leading-snug font-sans text-white/90 group-hover:text-white transition-colors">
																					{subItem.label}
																				</span>
																				{subItem.tag && (
																					<span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
																						{subItem.tag}
																					</span>
																				)}
																			</div>
																			<p className="text-xs text-[var(--text-muted)] group-hover:text-white/70 leading-relaxed mt-0.5 font-sans line-clamp-2 transition-colors">
																				{subItem.description}
																			</p>
																		</div>
																	</a>
																</li>
															);
														})}
													</ul>
												</div>
											))}
										</div>

										{/* Spotlight Box (Right Column) */}
										{activeCategory.spotlight && (
											<div className="lg:col-span-4 flex flex-col">
												<div className="p-6 rounded-2xl border border-amber-500/20 bg-gradient-to-b from-amber-500/10 via-amber-500/[0.03] to-transparent flex flex-col justify-between h-full relative overflow-hidden group">
													<div className="absolute top-0 right-0 w-36 h-36 bg-amber-500/15 rounded-full blur-2xl pointer-events-none group-hover:bg-amber-500/25 transition-all duration-500" />

													<div className="space-y-3 relative z-10">
														<div className="text-[10px] font-bold uppercase tracking-widest font-mono text-[var(--aurum-gold-light-solid)]">
															Featured Program
														</div>
														<h4 className="text-lg font-bold font-sans text-white">
															{activeCategory.spotlight.title}
														</h4>
														<p className="text-xs font-semibold text-[var(--aurum-gold-subtle-solid)]">
															{activeCategory.spotlight.subtitle}
														</p>
														<p className="text-xs text-white/70 font-sans leading-relaxed">
															{activeCategory.spotlight.description}
														</p>
													</div>

													<div className="pt-6 relative z-10 mt-4">
														<a
															href={activeCategory.spotlight.href}
															className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl text-xs font-semibold font-sans bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-amber-200 transition-all duration-200 group-hover:scale-[1.02]"
														>
															<span>{activeCategory.spotlight.cta}</span>
															<ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
														</a>
													</div>
												</div>
											</div>
										)}
									</motion.div>

									{/* Tasteful Bottom Quick Links Bar */}
									<div className="mt-6 pt-4 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-4 text-xs font-sans text-[var(--text-muted)] relative z-10">
										<div className="flex items-center gap-4">
											<a
												href="/how-we-work"
												className="flex items-center gap-1.5 hover:text-white transition-colors"
											>
												<BookOpen className="w-3.5 h-3.5 text-[var(--aurora-green-solid)]" />
												<span>Our Methodology</span>
											</a>
											<span className="text-white/20">•</span>
											<a
												href="/roots"
												className="flex items-center gap-1.5 hover:text-white transition-colors"
											>
												<ShieldCheck className="w-3.5 h-3.5 text-violet-400" />
												<span>Security Philosophy</span>
											</a>
										</div>
										<a
											href="/compliance"
											className="flex items-center gap-1 text-[var(--aurora-green-solid)] hover:underline font-medium"
										>
											<span>View Compliance Standards</span>
											<ArrowRight className="w-3 h-3" />
										</a>
									</div>
								</motion.div>
							</div>
						)}
					</AnimatePresence>,
					document.body,
				)}
		</div>
	);
}
