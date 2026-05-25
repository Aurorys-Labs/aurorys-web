import { RainbowButton } from "@/components/ui/rainbow-button";
import { domainPill } from "@/lib/domain-colors";
import { motion } from "framer-motion";
import React from "react";

interface Stack {
	id: string;
	title: string;
	subtitle: string;
	pills: string[];
	price: string;
	body: string;
	deliverables?: string[];
	status: "active" | "coming-soon";
	cta: { label: string; href: string };
}

interface SurgeStackCardProps {
	stacks: Stack[];
}

export function SurgeStackCard({ stacks }: SurgeStackCardProps) {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
			{stacks.map((stack, idx) => {
				const isComingSoon = stack.status === "coming-soon";
				const isLarge = stack.id === "aurorys-core"; // Make Aurorys Core span full row on desktop if possible

				return (
					<motion.div
						key={stack.id}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: idx * 0.08 }}
						className={`glass-card p-8 rounded-2xl border ${
							isComingSoon
								? "border-white/[0.03] opacity-60"
								: "border-white/[0.06] hover:border-white/[0.12]"
						} backdrop-blur-xl bg-[rgba(13,17,23,0.35)] flex flex-col justify-between h-full transition-all group relative overflow-hidden ${
							isLarge
								? "md:col-span-2 lg:col-span-3 lg:flex-row lg:gap-8 lg:items-center"
								: ""
						}`}
					>
						{/* Blue/violet ambient glow for active items, amber for coming soon */}
						<div
							className={`absolute -top-16 -left-16 w-32 h-32 rounded-full blur-2xl transition-colors duration-300 ${
								isComingSoon
									? "bg-amber-500/5 group-hover:bg-amber-500/10"
									: "bg-[var(--aurora-blue-solid)]/5 group-hover:bg-[var(--aurora-blue-solid)]/10"
							}`}
						/>

						<div className={isLarge ? "lg:w-1/2 space-y-4" : "space-y-4"}>
							{/* Status / Category Badges */}
							<div className="flex items-center justify-between gap-4 flex-wrap mb-2">
								<div className="flex flex-wrap gap-1.5">
									{stack.pills.map((pill) => (
										<span key={pill} className={domainPill(pill)}>
											{pill}
										</span>
									))}
								</div>

								{isComingSoon && (
									<span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-300">
										Coming Soon
									</span>
								)}
							</div>

							<div>
								{/* Stack Title */}
								<h3 className="font-heading font-medium text-2xl text-[var(--text-stellar)]">
									{stack.title}
								</h3>
								<p className="text-[var(--text-muted)] text-sm italic font-sans mt-0.5">
									{stack.subtitle}
								</p>
							</div>

							{/* Price (Aurum Gold Gradient) */}
							<div className="font-heading font-semibold text-lg bg-gradient-to-r from-[var(--aurum-gold-subtle)] to-[var(--aurum-gold-light)] bg-clip-text text-transparent">
								{stack.price}
							</div>

							{/* Description */}
							<p className="text-white/70 text-sm leading-relaxed font-sans">
								{stack.body}
							</p>
						</div>

						{/* Deliverables and CTA */}
						<div
							className={`mt-6 ${isLarge ? "lg:w-1/2 lg:mt-0 flex flex-col justify-between h-full" : "flex flex-col justify-between"}`}
						>
							{stack.deliverables && stack.deliverables.length > 0 && (
								<div className="mb-6">
									<div className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-3">
										Included Deliverables
									</div>
									<ul className="space-y-2.5">
										{stack.deliverables.map((item, i) => (
											<li
												key={i}
												className="flex items-start gap-2 text-sm text-white/80"
											>
												<svg
													className="w-4 h-4 text-[var(--aurora-blue-solid)] shrink-0 mt-0.5"
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

							<div className={!stack.deliverables ? "pt-12" : ""}>
								<RainbowButton
									variant={isComingSoon ? "glass" : "glass"}
									size="lg"
									className={`w-full rounded-xl justify-center ${isComingSoon ? "border-amber-500/20" : ""}`}
									asChild
								>
									<a href={stack.cta.href}>{stack.cta.label}</a>
								</RainbowButton>
							</div>
						</div>
					</motion.div>
				);
			})}
		</div>
	);
}
