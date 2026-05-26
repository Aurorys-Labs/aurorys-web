"use client";

import { RainbowButton } from "@/components/ui/rainbow-button";
import solutionsData from "@/lib/data/solutions-hub.json";
import { domainPill } from "@/lib/domain-colors";
import { AnimatePresence, motion } from "framer-motion";
import {
	ArrowLeft,
	ArrowRight,
	Boxes,
	Compass,
	Eye,
	FileText,
	Flame,
	GitBranch,
	Handshake,
	MessageSquare,
	Orbit,
	Rocket,
	ShieldCheck,
	Sparkles,
	Stars,
	Zap,
} from "lucide-react";
import type React from "react";
import { useEffect, useRef, useState } from "react";

const iconMap: Record<string, React.ElementType> = {
	Sparkles,
	Compass,
	GitBranch,
	ShieldCheck,
	Rocket,
	Orbit,
	FileText,
	Zap,
	Handshake,
	Eye,
	Flame,
	Stars,
	MessageSquare,
};

// Styling configs matching bento cards mapping
const styleConfig: Record<
	string,
	{
		bgGradClass: string;
		iconContainerBorder: string;
		iconBg: string;
		radialColor: string;
		themeClass: string;
	}
> = {
	"first-light": {
		bgGradClass: "from-sky-500/10 via-sky-500/5 to-transparent",
		iconContainerBorder: "border-sky-500/30",
		iconBg:
			"linear-gradient(135deg, rgba(56, 189, 248, 0.2), rgba(14, 165, 233, 0.05))",
		radialColor: "56, 189, 248",
		themeClass: "glass-card-tinted-sky",
	},
	foundation: {
		bgGradClass: "from-violet-500/10 via-violet-500/5 to-transparent",
		iconContainerBorder: "border-violet-500/30",
		iconBg:
			"linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(109, 40, 217, 0.05))",
		radialColor: "139, 92, 246",
		themeClass: "glass-card-tinted-violet",
	},
	pulse: {
		bgGradClass: "from-emerald-500/10 via-emerald-500/5 to-transparent",
		iconContainerBorder: "border-emerald-500/30",
		iconBg:
			"linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(5, 150, 105, 0.05))",
		radialColor: "16, 185, 129",
		themeClass: "glass-card-tinted-green",
	},
	clearance: {
		bgGradClass: "from-amber-500/10 via-amber-500/5 to-transparent",
		iconContainerBorder: "border-amber-500/30",
		iconBg:
			"linear-gradient(135deg, rgba(245, 158, 11, 0.2), rgba(217, 119, 6, 0.05))",
		radialColor: "245, 158, 11",
		themeClass: "glass-card-tinted-gold",
	},
	"escape-velocity": {
		bgGradClass: "from-fuchsia-500/10 via-fuchsia-500/5 to-transparent",
		iconContainerBorder: "border-fuchsia-500/30",
		iconBg:
			"linear-gradient(135deg, rgba(217, 70, 239, 0.2), rgba(192, 132, 252, 0.05))",
		radialColor: "217, 70, 239",
		themeClass: "glass-card-tinted-fuchsia",
	},
	beacon: {
		bgGradClass: "from-cyan-500/10 via-cyan-500/5 to-transparent",
		iconContainerBorder: "border-cyan-500/30",
		iconBg:
			"linear-gradient(135deg, rgba(34, 211, 238, 0.15), rgba(8, 145, 178, 0.05))",
		radialColor: "34, 211, 238",
		themeClass: "glass-card-tinted-cyan",
	},
	"program-foundation": {
		bgGradClass: "from-amber-500/10 via-amber-500/5 to-transparent",
		iconContainerBorder: "border-amber-500/30",
		iconBg:
			"linear-gradient(135deg, rgba(245, 158, 11, 0.15), rgba(217, 119, 6, 0.05))",
		radialColor: "245, 158, 11",
		themeClass: "glass-card-tinted-gold",
	},
	sprint: {
		bgGradClass: "from-emerald-500/10 via-emerald-500/5 to-transparent",
		iconContainerBorder: "border-emerald-500/30",
		iconBg:
			"linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(5, 150, 105, 0.05))",
		radialColor: "16, 185, 129",
		themeClass: "glass-card-tinted-green",
	},
	"build-partnership": {
		bgGradClass: "from-violet-500/10 via-violet-500/5 to-transparent",
		iconContainerBorder: "border-violet-500/30",
		iconBg:
			"linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(109, 40, 217, 0.05))",
		radialColor: "139, 92, 246",
		themeClass: "glass-card-tinted-violet",
	},
	observability: {
		bgGradClass: "from-emerald-500/10 via-emerald-500/5 to-transparent",
		iconContainerBorder: "border-emerald-500/30",
		iconBg:
			"linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(5, 150, 105, 0.05))",
		radialColor: "16, 185, 129",
		themeClass: "glass-card-tinted-green",
	},
	surge: {
		bgGradClass: "from-rose-500/10 via-rose-500/5 to-transparent",
		iconContainerBorder: "border-rose-500/30",
		iconBg:
			"linear-gradient(135deg, rgba(244, 63, 94, 0.2), rgba(190, 24, 93, 0.05))",
		radialColor: "244, 63, 94",
		themeClass: "glass-card-tinted-rose",
	},
	"full-constellation": {
		bgGradClass: "from-violet-500/10 via-violet-500/5 to-transparent",
		iconContainerBorder: "border-violet-500/30",
		iconBg:
			"linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(109, 40, 217, 0.05))",
		radialColor: "139, 92, 246",
		themeClass: "glass-card-tinted-violet",
	},
	custom: {
		bgGradClass: "from-violet-500/10 via-violet-500/5 to-transparent",
		iconContainerBorder: "border-violet-500/30",
		iconBg:
			"linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(109, 40, 217, 0.05))",
		radialColor: "139, 92, 246",
		themeClass: "glass-card-tinted-violet",
	},
};

export function SolutionsHub() {
	const [activeViewId, setActiveViewId] = useState<string | null>(null);
	const [activeFilter, setActiveFilter] = useState<string>("all");
	const detailPaneRef = useRef<HTMLDivElement>(null);

	// Sync state with URL view parameter
	useEffect(() => {
		const syncUrlParams = () => {
			const params = new URLSearchParams(window.location.search);
			const viewParam = params.get("view");
			if (viewParam && solutionsData.cards.some((c) => c.id === viewParam)) {
				setActiveViewId(viewParam);
			} else {
				setActiveViewId(null);
			}
		};

		syncUrlParams();
		window.addEventListener("popstate", syncUrlParams);
		return () => window.removeEventListener("popstate", syncUrlParams);
	}, []);

	const handleSelectView = (id: string | null) => {
		setActiveViewId(id);
		const newUrl = id
			? `${window.location.pathname}?view=${id}`
			: window.location.pathname;
		window.history.pushState({ view: id }, "", newUrl);

		if (id) {
			setTimeout(() => {
				detailPaneRef.current?.scrollIntoView({
					behavior: "smooth",
					block: "start",
				});
			}, 50);
		}
	};

	const currentFilterTargets =
		solutionsData.problemPills.find((f) => f.id === activeFilter)?.targets ||
		[];

	const selectedSolution = solutionsData.cards.find(
		(c) => c.id === activeViewId,
	);

	return (
		<section
			className="section-padding relative min-h-screen"
			id="solutions-hub"
		>
			<div className="content-width px-6">
				{/* "I Need To..." Filter Section - only visible in Grid overview state */}
				{!activeViewId && (
					<div className="flex flex-col items-center gap-4 mb-12 mt-4">
						<h2 className="text-xl md:text-2xl font-bold font-sans tracking-tight text-[var(--text-stellar)] text-center">
							I Need To...
						</h2>
						<div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
							{solutionsData.problemPills.map((pill) => {
								const isActive = activeFilter === pill.id;
								return (
									<button
										key={pill.id}
										onClick={() => setActiveFilter(pill.id)}
										className={`px-5 py-2.5 rounded-full text-sm font-semibold font-sans transition-all duration-300 border cursor-pointer ${
											isActive
												? "glass-card glass-card-tinted-emerald border-[rgba(0,232,160,0.4)] text-[var(--aurora-green-solid)] shadow-[0_0_20px_-5px_rgba(0,232,160,0.3)]"
												: "glass-card hover:bg-white/[0.08] border-white/10 text-white/70 hover:text-white hover:shadow-[0_0_20px_-5px_rgba(255,255,255,0.1)]"
										}`}
									>
										{pill.label}
									</button>
								);
							})}
						</div>
					</div>
				)}

				<AnimatePresence mode="wait">
					{!activeViewId ? (
						/* --- STATE 1: Default Card Grid View --- */
						<motion.div
							key="grid-view"
							initial={{ opacity: 0, scale: 0.98, y: 10 }}
							animate={{ opacity: 1, scale: 1, y: 0 }}
							exit={{ opacity: 0, scale: 0.98, y: -10 }}
							transition={{ duration: 0.3, ease: "easeInOut" }}
							className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
						>
							{[...solutionsData.cards]
								.sort((a, b) => {
									if (activeFilter === "all") return 0;
									const aMatch = currentFilterTargets.includes(a.id);
									const bMatch = currentFilterTargets.includes(b.id);
									if (aMatch && !bMatch) return -1;
									if (!aMatch && bMatch) return 1;
									return 0;
								})
								.map((card) => {
									const config =
										styleConfig[card.id] || styleConfig["first-light"];
									const IconComp = iconMap[card.icon] || Sparkles;
									const isFilteredMatch =
										activeFilter === "all" ||
										currentFilterTargets.includes(card.id);

									let spanClass = "";
									if (card.id === "full-constellation") {
										spanClass =
											"md:col-span-2 lg:col-span-2 md:row-span-2 lg:row-span-2 lg:min-h-[260px]";
									} else if (card.id === "surge") {
										spanClass = "md:row-span-2 lg:row-span-2";
									} else if (card.id === "custom") {
										spanClass =
											"col-span-1 md:col-span-2 lg:col-span-3 lg:min-h-[260px]";
									} else if (
										[
											"escape-velocity",
											"first-light",
											"pulse",
											"build-partnership",
										].includes(card.id)
									) {
										spanClass = "md:col-span-2 lg:col-span-2 lg:min-h-[260px]";
									}

									return (
										<motion.div
											layout
											key={card.id}
											onClick={() =>
												isFilteredMatch && handleSelectView(card.id)
											}
											className={`glass-card p-6 rounded-2xl border border-white/[0.06] bg-[rgba(13,17,23,0.35)] flex flex-col justify-between min-h-[220px] transition-all duration-500 group relative ${
												spanClass
											} ${
												isFilteredMatch
													? "cursor-pointer hover:border-white/[0.15] hover:scale-[1.02] shadow-[0_4px_20px_rgba(0,0,0,0.2)]"
													: "opacity-20 pointer-events-none blur-[0.5px] scale-[0.98]"
											}`}
										>
											{/* Subtle internal light effect */}
											<div
												className="absolute -top-12 -left-12 w-24 h-24 rounded-full blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none"
												style={{
													background: `radial-gradient(circle, rgba(${config.radialColor}, 0.4) 0%, transparent 70%)`,
												}}
											/>

											<div className="space-y-4">
												<div className="flex items-center gap-3">
													<div
														className={`rounded-xl flex items-center justify-center w-10 h-10 border ${config.iconContainerBorder}`}
														style={{ background: config.iconBg }}
													>
														<IconComp className="w-5 h-5 text-[var(--text-stellar)]" />
													</div>
													<h3 className="text-base font-bold text-[var(--text-stellar)] font-sans">
														{card.title}
													</h3>
												</div>

												<p className="text-sm text-[var(--text-muted)] leading-relaxed font-sans">
													{card.subtitle}
												</p>
											</div>

											<div className="pt-4 border-t border-white/[0.04] mt-5 flex items-center justify-between">
												<span className="text-xs text-[var(--aurora-green-solid)] font-mono font-medium">
													{card.price.split(" · ")[0]}
												</span>
												<span className="text-xs font-semibold font-sans text-white/50 group-hover:text-white flex items-center gap-1 transition-colors">
													Explore Details
													<ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
												</span>
											</div>
										</motion.div>
									);
								})}
						</motion.div>
					) : (
						/* --- STATE 2: Tabbed Sidebar + Main Detail Pane View --- */
						<motion.div
							key="detail-view"
							ref={detailPaneRef}
							initial={{ opacity: 0, scale: 0.98, y: 10 }}
							animate={{ opacity: 1, scale: 1, y: 0 }}
							exit={{ opacity: 0, scale: 0.98, y: -10 }}
							transition={{ duration: 0.3, ease: "easeInOut" }}
							className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
						>
							{/* Left Sidebar Tab Selector */}
							<div className="lg:col-span-4 space-y-4 lg:sticky lg:top-28">
								<button
									onClick={() => handleSelectView(null)}
									className="glass-card inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 bg-white/[0.03] text-sm font-semibold text-white/70 hover:text-white hover:bg-white/[0.06] hover:border-white/20 transition-all duration-200 cursor-pointer w-full justify-center shadow-lg"
								>
									<ArrowLeft className="w-4 h-4" />
									Back to Overview Grid
								</button>

								<div className="glass-card p-3 rounded-2xl border border-white/[0.06] bg-[rgba(13,17,23,0.35)] space-y-1">
									<div className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)] font-mono px-3 py-1.5 border-b border-white/[0.05] mb-2">
										Select Offering
									</div>
									<div className="max-h-[50vh] lg:max-h-[60vh] overflow-y-auto pr-1 space-y-1">
										{solutionsData.cards.map((card) => {
											const isSelected = card.id === activeViewId;
											const IconComp = iconMap[card.icon] || Sparkles;
											const cardConfig =
												styleConfig[card.id] || styleConfig["first-light"];

											return (
												<button
													key={card.id}
													onClick={() => handleSelectView(card.id)}
													className={`w-full text-left px-3 py-2.5 rounded-xl flex items-center gap-3 transition-all duration-200 cursor-pointer font-sans ${
														isSelected
															? "border border-white/10 text-[var(--text-stellar)]"
															: "border border-transparent text-white/70 hover:text-white hover:bg-white/[0.03]"
													}`}
													style={{
														background: isSelected
															? `linear-gradient(90deg, rgba(${cardConfig.radialColor}, 0.1), rgba(${cardConfig.radialColor}, 0.02))`
															: "transparent",
													}}
												>
													<div
														className={`rounded-lg flex items-center justify-center w-8 h-8 border ${
															isSelected
																? `border-[rgba(${cardConfig.radialColor},0.4)]`
																: "border-white/10"
														} shrink-0`}
														style={{
															background: isSelected
																? `rgba(${cardConfig.radialColor},0.15)`
																: "rgba(255,255,255,0.02)",
														}}
													>
														<IconComp
															className="w-4 h-4 transition-colors"
															style={{
																color: isSelected
																	? `rgb(${cardConfig.radialColor})`
																	: "rgba(255,255,255,0.6)",
															}}
														/>
													</div>
													<span className="text-sm font-medium truncate">
														{card.title}
													</span>
												</button>
											);
										})}
									</div>
								</div>
							</div>

							{/* Right Detail Pane */}
							<div className="lg:col-span-8">
								{selectedSolution &&
									(() => {
										const config =
											styleConfig[selectedSolution.id] ||
											styleConfig["first-light"];
										return (
											<div
												className={`glass-card p-8 md:p-10 text-left space-y-8 relative overflow-hidden transition-all duration-300 ${config.themeClass}`}
											>
												{/* Ambient dynamic glow in panel */}
												<div
													className="absolute -top-32 -right-32 w-96 h-96 rounded-full blur-3xl opacity-40 transition-opacity duration-500 pointer-events-none"
													style={{
														background: `radial-gradient(circle, rgba(${config.radialColor}, 0.45) 0%, transparent 70%)`,
													}}
												/>

												<div className="space-y-4 relative z-10">
													<div className="flex flex-wrap items-center gap-3">
														{selectedSolution.domains.map((domain) => (
															<span key={domain} className={domainPill(domain)}>
																{domain}
															</span>
														))}
													</div>

													<h2 className="font-sans font-bold text-3xl md:text-4xl tracking-tight text-[var(--text-stellar)]">
														{selectedSolution.title}
													</h2>

													<div className="text-lg font-semibold bg-gradient-to-r from-[var(--aurum-gold-subtle)] to-[var(--aurum-gold-light)] bg-clip-text text-transparent">
														{selectedSolution.price}
													</div>
												</div>

												{/* When you need this */}
												<div
													className={`glass-card rounded-xl p-5 relative z-10 shadow-lg border border-[rgba(${config.radialColor},0.3)]`}
													style={{
														background: `linear-gradient(135deg, rgba(${config.radialColor}, 0.1), rgba(${config.radialColor}, 0.02))`,
													}}
												>
													<div
														className="text-xs uppercase tracking-wider font-mono font-bold mb-2 flex items-center gap-2"
														style={{ color: `rgb(${config.radialColor})` }}
													>
														<Sparkles className="w-4 h-4" /> When to choose:
													</div>
													<p className="text-sm font-sans text-white/90 leading-relaxed font-medium">
														{selectedSolution.whenYouNeedThis}
													</p>
												</div>

												{/* Core explanation */}
												<div className="space-y-4 relative z-10">
													<p className="text-base text-white/90 leading-relaxed font-sans">
														{selectedSolution.body}
													</p>
												</div>

												{/* Key Deliverables */}
												{selectedSolution.deliverables &&
													selectedSolution.deliverables.length > 0 && (
														<div className="border-t border-white/[0.06] pt-8 space-y-4 relative z-10">
															<h4 className="text-xs uppercase tracking-wider text-[var(--text-muted)] font-semibold font-mono">
																Key Deliverables
															</h4>
															<ul className="grid grid-cols-1 md:grid-cols-2 gap-3.5 text-sm text-white/80 font-sans">
																{selectedSolution.deliverables.map(
																	(item, i) => (
																		<li
																			key={i}
																			className="flex items-start gap-2.5"
																		>
																			<span className="inline-flex items-center justify-center p-0.5 text-white/70 shrink-0 mt-0.5">
																				<Boxes className="w-4 h-4" />
																			</span>
																			<span className="leading-snug">
																				{item}
																			</span>
																		</li>
																	),
																)}
															</ul>
														</div>
													)}

												{/* What this is not */}
												{selectedSolution.whatThisIsNot && (
													<div className="border-t border-white/[0.06] pt-8 space-y-2 relative z-10">
														<h4 className="text-xs uppercase tracking-wider text-rose-400/70 font-semibold font-mono">
															What this is not
														</h4>
														<p className="text-xs text-white/60 leading-relaxed italic font-sans">
															{selectedSolution.whatThisIsNot}
														</p>
													</div>
												)}

												{/* Comparative value table */}
												{selectedSolution.valueComparison && (
													<div className="border-t border-white/[0.06] pt-8 space-y-4 relative z-10">
														<div className="space-y-1">
															<h4 className="text-sm uppercase tracking-wider text-[var(--text-stellar)] font-bold font-sans">
																Value Context
															</h4>
															<p className="text-xs text-[var(--text-muted)] font-sans">
																We don't compare ourselves to competitors. We're
																showing you what it costs to procure these
																capabilities <em>A La Carte</em> from disjointed
																vendors vs our unified team approach.
															</p>
														</div>
														<div className="glass-card overflow-hidden border border-white/[0.06] bg-white/[0.01] rounded-xl">
															<div className="overflow-x-auto">
																<table className="w-full text-left border-collapse text-xs font-sans">
																	<thead>
																		<tr className="border-b border-white/[0.08] bg-white/[0.02] text-[var(--text-stellar)]">
																			<th className="py-3 px-4 font-semibold w-1/2">
																				If sourced separately
																			</th>
																			<th className="py-3 px-4 font-semibold text-center w-1/4">
																				Typical Vendor
																			</th>
																			<th className="py-3 px-4 font-semibold text-center w-1/4">
																				Aurorys Labs{" "}
																				<span className="text-[10px] text-[var(--text-muted)] block font-normal mt-0.5">
																					(Starting at)
																				</span>
																			</th>
																		</tr>
																	</thead>
																	<tbody className="divide-y divide-white/[0.04] text-white/80">
																		{selectedSolution.valueComparison.rows.map(
																			(row: any, i: number) => (
																				<tr
																					key={i}
																					className="hover:bg-white/[0.01] transition-colors"
																				>
																					<td className="py-3 px-4">
																						{row.item}
																					</td>
																					<td className="py-3 px-4 text-center text-white/50">
																						{row.vendor}
																					</td>
																					<td
																						className={`py-3 px-4 text-center font-semibold ${row.us === "Included" || row.us === "✓" ? "text-[var(--aurora-green-solid)]" : "text-white/80"}`}
																					>
																						{row.us}
																					</td>
																				</tr>
																			),
																		)}
																		<tr className="bg-white/[0.02] font-semibold text-[var(--text-stellar)] border-t border-white/[0.08]">
																			<td className="py-3 px-4">
																				Total Financial Cost
																			</td>
																			<td className="py-3 px-4 text-center text-white/50 line-through">
																				{
																					selectedSolution.valueComparison
																						.vendorTotal
																				}
																			</td>
																			<td className="py-3 px-4 text-center text-[var(--aurum-gold-light)] font-bold">
																				{
																					selectedSolution.valueComparison
																						.ourPrice
																				}
																			</td>
																		</tr>
																	</tbody>
																</table>
															</div>
															<div className="py-3 px-4 bg-white/[0.01] border-t border-white/[0.06] text-[10px] text-[var(--text-muted)] text-center leading-relaxed">
																{selectedSolution.valueComparison.note}
															</div>
														</div>
													</div>
												)}

												{/* CTA Button */}
												<div className="pt-8 border-t border-white/[0.06] flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
													<div className="text-left font-sans">
														<div className="text-xs text-[var(--text-muted)] font-mono">
															{selectedSolution.ctaTrackText ||
																"Interested in this track?"}
														</div>
														<div className="text-sm font-semibold text-[var(--text-stellar)] mt-0.5">
															{selectedSolution.ctaMappingText ||
																"Initiate consultation mapping."}
														</div>
													</div>
													<RainbowButton
														variant="glass"
														size="lg"
														className="rounded-xl w-full md:w-auto justify-center"
														asChild
													>
														<a
															href={
																selectedSolution.hasDedicatedPage
																	? selectedSolution.detailPageLink
																	: `#contact?subject=SOLUTIONS_${selectedSolution.id.toUpperCase()}`
															}
															onClick={(e) => {
																if (!selectedSolution.hasDedicatedPage) {
																	e.preventDefault();
																	const contactSection =
																		document.getElementById("contact");
																	if (contactSection) {
																		const subjSelect = document.getElementById(
																			"subject",
																		) as HTMLSelectElement | null;
																		const msgArea = document.getElementById(
																			"message",
																		) as HTMLTextAreaElement | null;
																		if (subjSelect) {
																			subjSelect.value = `SOLUTIONS_${selectedSolution.id.toUpperCase()}`;
																			subjSelect.dispatchEvent(
																				new Event("change"),
																			);
																		}
																		if (msgArea) {
																			msgArea.value = `I am looking to explore details on the ${selectedSolution.title} offering for our systems...`;
																		}
																		contactSection.scrollIntoView({
																			behavior: "smooth",
																		});
																	}
																}
															}}
														>
															{selectedSolution.cta.label} &rarr;
														</a>
													</RainbowButton>
												</div>
											</div>
										);
									})()}
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</section>
	);
}
