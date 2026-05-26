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
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
			{stacks.map((stack, idx) => {
				const isComingSoon = stack.status === "coming-soon";
				const isLarge = stack.id === "aurorys-core"; // Make Aurorys Core span full row

				// Bento grid dynamic spans
				let colSpanClass = "lg:col-span-3"; // default for first row
				if (idx === 2) colSpanClass = "lg:col-span-2"; // 1/3 width
				if (idx === 3) colSpanClass = "lg:col-span-4"; // 2/3 width
				if (isLarge) colSpanClass = "lg:col-span-6"; // full width

				return (
					<motion.div
						key={stack.id}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: idx * 0.08 }}
						className={`glass-card p-8 md:p-10 rounded-3xl border ${
							isComingSoon
								? "border-white/[0.03] opacity-60"
								: "border-blue-500/10 hover:border-blue-500/30"
						} backdrop-blur-xl bg-[rgba(13,17,23,0.35)] glass-card-tinted-blue flex flex-col justify-between h-full transition-all group relative overflow-hidden md:col-span-2 ${colSpanClass} ${
							isLarge ? "lg:flex-row lg:gap-12 lg:items-center" : ""
						}`}
					>
						{/* Uniform ambient glow */}
						<div
							className={`absolute -top-24 -left-24 w-48 h-48 rounded-full blur-3xl transition-colors duration-500 ${
								isComingSoon
									? "bg-amber-500/5 group-hover:bg-amber-500/10"
									: "bg-[var(--aurora-blue-solid)]/5 group-hover:bg-[var(--aurora-blue-solid)]/15"
							}`}
						/>

						<div className={isLarge ? "lg:w-1/2 space-y-6" : "space-y-6"}>
							{/* Status / Category Badges */}
							<div className="flex items-start justify-between gap-4 flex-wrap mb-2">
								<div className="flex flex-wrap gap-2">
									{stack.pills.map((pill) => (
										<span key={pill} className={domainPill(pill)}>
											{pill}
										</span>
									))}
								</div>

								{isComingSoon && (
									<span className="text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded bg-amber-500/10 border border-amber-500/20 text-amber-300">
										Coming Soon
									</span>
								)}
							</div>

							<div className="space-y-1">
								{/* Stack Title */}
								<h3 className="font-heading font-medium text-xl md:text-2xl text-[var(--text-stellar)]">
									{stack.title}
								</h3>
								<p className="text-white/60 text-sm font-sans mt-2 leading-relaxed">
									{stack.subtitle}
								</p>
							</div>

							{/* Price (Aurum Gold Gradient) */}
							<div className="font-heading font-semibold text-xl bg-gradient-to-r from-[var(--aurum-gold-subtle-solid)] to-[var(--aurum-gold-light-solid)] bg-clip-text text-transparent inline-block">
								{stack.price}
							</div>

							{/* Description */}
							<p className="text-white/80 text-sm md:text-base leading-relaxed font-sans">
								{stack.body}
							</p>
						</div>

						{/* Deliverables and CTA */}
						<div
							className={`mt-8 ${
								isLarge
									? "lg:w-1/2 lg:mt-0 flex flex-col justify-center h-full"
									: "flex flex-col justify-between"
							}`}
						>
							{stack.deliverables && stack.deliverables.length > 0 && (
								<div className="mb-8">
									<div className="text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)] mb-4 border-b border-white/[0.04] pb-2">
										Included Deliverables
									</div>
									<ul className="space-y-3">
										{stack.deliverables.map((item, i) => (
											<li
												key={i}
												className="flex items-start gap-3 text-sm text-white/80"
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

							<div className={!stack.deliverables ? "pt-8" : ""}>
								<RainbowButton
									variant={isComingSoon ? "glass_alt" : "glass"}
									size="lg"
									className={`w-full rounded-xl justify-center font-semibold tracking-wide ${
										isComingSoon
											? "border-amber-500/20 text-amber-200 hover:bg-amber-500/10 hover:text-amber-100"
											: ""
									}`}
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
