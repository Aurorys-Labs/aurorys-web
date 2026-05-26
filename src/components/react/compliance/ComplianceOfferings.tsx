import { RainbowButton } from "@/components/ui/rainbow-button";
import { domainPill } from "@/lib/domain-colors";
import { motion } from "framer-motion";
import { BadgeCheck, Compass, ShieldCheck, Sparkles, Zap } from "lucide-react";
import React from "react";

interface Offering {
	id: string;
	title: string;
	subtitle: string;
	pills: string[];
	price: string;
	whenYouNeedThis: string;
	body: string;
	deliverables?: string[];
	whatThisIsNot?: string;
	ifSourcedSeparately?:
		| string
		| {
				items: string[];
				totalSeparate: string;
				constellationPrice: string;
		  };
	oftenDiscoveredDuringAssessment?: boolean;
	cta: { label: string; href: string };
}

interface ComplianceOfferingsProps {
	offerings: Offering[];
}

export function ComplianceOfferings({ offerings }: ComplianceOfferingsProps) {
	return (
		<div className="space-y-8 text-left relative">
			{/* Global SVG Gradients for background icons */}
			<svg
				style={{ width: 0, height: 0, position: "absolute" }}
				aria-hidden="true"
			>
				<defs>
					<linearGradient
						id="grad-clearance"
						x1="0%"
						y1="0%"
						x2="100%"
						y2="100%"
					>
						<stop offset="0%" stopColor="#ebb64bff" />
						<stop offset="100%" stopColor="#ffc60dff" />
					</linearGradient>
					<linearGradient
						id="grad-foundation"
						x1="0%"
						y1="0%"
						x2="100%"
						y2="100%"
					>
						<stop offset="0%" stopColor="var(--aurora-blue-solid)" />
						<stop offset="100%" stopColor="var(--aurora-violet-solid)" />
					</linearGradient>
					<linearGradient id="grad-sprint" x1="0%" y1="0%" x2="100%" y2="100%">
						<stop offset="0%" stopColor="#297b2eff" />
						<stop offset="100%" stopColor="#086c0eff" />
					</linearGradient>
				</defs>
			</svg>
			{offerings.map((offering, idx) => {
				const isClearance = offering.id === "clearance";
				const isSprint = offering.id === "compliance-sprint";
				const themeClass = isClearance
					? "glass-card-tinted-gold border-amber-500/15"
					: isSprint
						? "glass-card-tinted-green border-emerald-500/15"
						: "glass-card-tinted-blue border-blue-500/15";

				return (
					<motion.div
						key={offering.id}
						id={offering.id}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: idx * 0.1 }}
						className={`glass-card p-8 rounded-2xl border transition-all duration-300 relative overflow-hidden group ${themeClass}`}
					>
						{/* Ambient Glow */}
						<div
							className={`absolute -top-24 -left-24 w-48 h-48 rounded-full blur-3xl transition-colors duration-300 pointer-events-none ${
								isClearance
									? "bg-[var(--aurora-green-solid)]/5 group-hover:bg-[var(--aurora-green-solid)]/10"
									: "bg-[var(--aurora-blue-solid)]/5 group-hover:bg-[var(--aurora-blue-solid)]/10"
							}`}
						/>

						{/* Background Icon Container - Restricted to left 1/3 on desktop */}
						<div className="absolute inset-y-0 left-0 w-full lg:w-[33.333%] overflow-hidden rounded-l-2xl z-0 pointer-events-none">
							<div className="absolute top-1/2 -translate-y-1/2 right-4 lg:-right-[15%] opacity-[0.03] group-hover:opacity-[0.09] scale-100 group-hover:scale-105 group-hover:rotate-[2deg] transition-all duration-700 ease-out flex items-center justify-center h-48 w-48 lg:h-[120%] lg:w-auto lg:aspect-square">
								{offering.id === "clearance" && (
									<ShieldCheck
										className="w-full h-full stroke-[url(#grad-clearance)] text-transparent"
										strokeWidth={0.5}
									/>
								)}
								{offering.id === "program-foundation" && (
									<Compass
										className="w-full h-full stroke-[url(#grad-foundation)] text-transparent"
										strokeWidth={0.5}
									/>
								)}
								{offering.id === "compliance-sprint" && (
									<Zap
										className="w-full h-full stroke-[url(#grad-sprint)] text-transparent"
										strokeWidth={0.5}
									/>
								)}
							</div>
						</div>

						{/* Desktop Horizontal Grid */}
						<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative z-10">
							{/* Column 1: Metadata & Identity (Grid cols 1-4) */}
							<div className="lg:col-span-4 space-y-4 relative flex flex-col justify-center h-full py-2">
								<div className="flex flex-wrap gap-1.5 relative z-10">
									{offering.pills.map((pill) => (
										<span key={pill} className={domainPill(pill)}>
											{pill}
										</span>
									))}
								</div>

								<div className="relative z-10">
									<h3 className="font-heading font-medium text-2xl md:text-3xl text-[var(--text-stellar)] drop-shadow-sm">
										{offering.title}
									</h3>
									<p className="text-[var(--text-muted)] text-sm italic font-sans mt-1">
										{offering.subtitle}
									</p>
								</div>

								<div className="font-heading font-semibold text-lg bg-gradient-to-r from-[var(--aurum-gold-subtle)] to-[var(--aurum-gold-light)] bg-clip-text text-transparent pt-1 relative z-10 drop-shadow-sm">
									{offering.price}
								</div>
							</div>

							{/* Column 2: Context & Descriptions (Grid cols 5-8) */}
							<div className="lg:col-span-5 space-y-5 border-t lg:border-t-0 lg:border-l border-white/[0.06] pt-6 lg:pt-0 lg:pl-8">
								<div className="glass-card rounded-xl p-5 relative z-10 shadow-lg border border-white/10 bg-white/[0.02]">
									<div className="text-xs uppercase tracking-wider font-mono font-bold mb-2 flex items-center gap-2 text-[var(--text-stellar)]">
										<Sparkles className="w-4 h-4" /> When to choose:
									</div>
									<div className="text-sm font-sans text-white/90 leading-relaxed font-medium">
										{offering.whenYouNeedThis}
									</div>
								</div>

								<p className="text-white/90 text-base leading-relaxed font-sans font-medium">
									{offering.body}
								</p>

								{offering.whatThisIsNot && (
									<div className="text-sm text-white/70 border-t border-white/[0.04] pt-4 font-sans italic">
										<span className="font-semibold text-white/80 not-italic">
											What this is not:{" "}
										</span>
										{offering.whatThisIsNot}
									</div>
								)}

								{offering.ifSourcedSeparately && (
									<div className="border-t border-white/[0.06] pt-5 mt-5">
										<div className="text-sm font-semibold text-[var(--text-stellar)] mb-2">
											A la carte comparison:
										</div>
										{typeof offering.ifSourcedSeparately === "string" ? (
											<p className="text-sm text-white/60 leading-relaxed italic">
												{offering.ifSourcedSeparately}
											</p>
										) : (
											<div className="space-y-4">
												<ul className="space-y-1.5 text-sm text-white/70">
													{offering.ifSourcedSeparately.items.map((item, i) => (
														<li
															key={i}
															className="list-disc list-inside leading-snug"
														>
															{item}
														</li>
													))}
												</ul>
												<div className="text-sm border-t border-white/[0.04] pt-3 space-y-1">
													<div className="text-white/60 italic">
														Sourced separately:{" "}
														<span className="line-through">
															{offering.ifSourcedSeparately.totalSeparate}
														</span>
													</div>
													<div className="font-semibold bg-gradient-to-r from-[var(--aurum-gold-subtle)] to-[var(--aurum-gold-light)] bg-clip-text text-transparent">
														Integrated bundle:{" "}
														{offering.ifSourcedSeparately.constellationPrice}
													</div>
												</div>
											</div>
										)}
									</div>
								)}
							</div>

							{/* Column 3: Inclusions & CTA (Grid cols 9-12) */}
							<div className="lg:col-span-3 space-y-6 border-t lg:border-t-0 lg:border-l border-white/[0.06] pt-6 lg:pt-0 lg:pl-8 flex flex-col justify-between h-full min-h-[220px]">
								{offering.deliverables && offering.deliverables.length > 0 && (
									<div>
										<div className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-3">
											Key Inclusions
										</div>
										<ul className="space-y-2.5">
											{offering.deliverables.map((item, i) => (
												<li
													key={i}
													className="flex items-start gap-2 text-xs text-white/90 leading-snug"
												>
													<BadgeCheck className="w-4 h-4 text-[var(--aurora-green-solid)] shrink-0 mt-0.5" />
													<span className="font-sans">{item}</span>
												</li>
											))}
										</ul>
									</div>
								)}

								<RainbowButton
									variant="glass"
									size="lg"
									className="w-full rounded-xl justify-center mt-auto"
									asChild
								>
									<a
										href={offering.cta.href}
										onClick={(e) => {
											if (offering.cta.href.includes("#contact")) {
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
														subjSelect.value = offering.id
															.toUpperCase()
															.replace("-", "_");
														subjSelect.dispatchEvent(new Event("change"));
													}
													if (msgArea) {
														msgArea.value = `We are interested in mapping out compliance boundaries for ${offering.title}...`;
													}
													contactSection.scrollIntoView({ behavior: "smooth" });
												}
											}
										}}
									>
										{offering.cta.label}
									</a>
								</RainbowButton>
							</div>
						</div>
					</motion.div>
				);
			})}
		</div>
	);
}
