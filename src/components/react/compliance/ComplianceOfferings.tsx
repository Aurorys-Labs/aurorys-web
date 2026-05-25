import { RainbowButton } from "@/components/ui/rainbow-button";
import { domainPill } from "@/lib/domain-colors";
import { motion } from "framer-motion";
import { BadgeCheck } from "lucide-react";
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
	ifSourcedSeparately?: string;
	oftenDiscoveredDuringAssessment?: boolean;
	cta: { label: string; href: string };
}

interface ComplianceOfferingsProps {
	offerings: Offering[];
}

export function ComplianceOfferings({ offerings }: ComplianceOfferingsProps) {
	return (
		<div className="space-y-8 text-left">
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

						{/* Desktop Horizontal Grid */}
						<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
							{/* Column 1: Metadata & Identity (Grid cols 1-4) */}
							<div className="lg:col-span-4 space-y-4">
								<div className="flex flex-wrap gap-1.5">
									{offering.pills.map((pill) => (
										<span key={pill} className={domainPill(pill)}>
											{pill}
										</span>
									))}
								</div>

								<div>
									<h3 className="font-heading font-medium text-2xl md:text-3xl text-[var(--text-stellar)]">
										{offering.title}
									</h3>
									<p className="text-[var(--text-muted)] text-sm italic font-sans mt-1">
										{offering.subtitle}
									</p>
								</div>

								<div className="font-heading font-semibold text-lg bg-gradient-to-r from-[var(--aurum-gold-subtle)] to-[var(--aurum-gold-light)] bg-clip-text text-transparent pt-1">
									{offering.price}
								</div>
							</div>

							{/* Column 2: Context & Descriptions (Grid cols 5-8) */}
							<div className="lg:col-span-5 space-y-4 border-t lg:border-t-0 lg:border-l border-white/[0.06] pt-6 lg:pt-0 lg:pl-8">
								<div className="text-xs text-[var(--text-muted)] font-sans italic border-l-2 border-[var(--aurum-gold-subtle)] pl-4 py-0.5 leading-relaxed">
									<span className="font-semibold text-white/70 not-italic block mb-1">
										When to choose:
									</span>
									{offering.whenYouNeedThis}
								</div>

								<p className="text-white/80 text-sm leading-relaxed font-sans">
									{offering.body}
								</p>

								{offering.whatThisIsNot && (
									<div className="text-xs text-white/50 border-t border-white/[0.04] pt-3 font-sans italic">
										<span className="font-semibold text-white/60 not-italic">
											What this is not:{" "}
										</span>
										{offering.whatThisIsNot}
									</div>
								)}

								{offering.ifSourcedSeparately && (
									<div className="text-xs text-white/40 border-t border-white/[0.04] pt-3 font-sans italic">
										<span className="font-semibold text-white/50 not-italic">
											Sourced separately:{" "}
										</span>
										{offering.ifSourcedSeparately}
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
