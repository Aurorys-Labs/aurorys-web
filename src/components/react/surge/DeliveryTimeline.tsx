import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import React from "react";

interface Step {
	step: number;
	title: string;
	body: string;
	trainingItems?: string[];
	closingNote?: string;
}

interface DeliveryTimelineProps {
	process: {
		title: string;
		subtitle: string;
		steps: Step[];
	};
}

export function DeliveryTimeline({ process }: DeliveryTimelineProps) {
	return (
		<div className="glass-card p-6 md:p-12 rounded-3xl border border-white/[0.06] bg-[rgba(13,17,23,0.25)] relative overflow-hidden">
			{/* Ambient background glow */}
			<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-md bg-[var(--aurora-blue-solid)]/5 blur-3xl rounded-full pointer-events-none" />

			<div className="relative pl-10 md:pl-16 space-y-16 py-4">
				{/* Glowing Timeline Line */}
				<div className="absolute left-[19px] md:left-[27px] top-4 bottom-8 w-px bg-gradient-to-b from-[var(--aurora-blue-solid)]/10 via-[var(--aurora-blue-solid)]/40 to-transparent" />

				{process.steps.map((step, idx) => {
					const isDay0Step = step.step === 3;

					return (
						<motion.div
							key={step.step}
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.6, delay: idx * 0.1 }}
							className="relative group z-10"
						>
							{/* Timeline Step Dot/Number */}
							<div className="absolute -left-[48px] md:-left-[56px] top-0 w-10 h-10 rounded-full bg-[#0a0f16] border border-blue-500/30 flex items-center justify-center font-heading font-semibold text-sm text-[var(--text-stellar)] group-hover:border-[var(--aurora-blue-solid)] group-hover:text-[var(--aurora-blue-solid)] transition-colors shadow-[0_0_15px_rgba(59,130,246,0.1)] group-hover:shadow-[0_0_20px_rgba(59,130,246,0.25)] z-20">
								{step.step}
							</div>

							<div className="space-y-4 max-w-3xl">
								{/* Step Title */}
								<h3 className="font-heading font-medium text-2xl text-[var(--text-stellar)]">
									{step.title}
								</h3>

								{/* Day-0 Golden Snapshot gets the H3 prestige treatment */}
								{isDay0Step ? (
									<div className="space-y-6">
										<blockquote className="font-serif italic text-lg md:text-xl leading-relaxed text-[var(--text-stellar)] py-5 my-4 border-l-2 border-[var(--aurum-gold-subtle-solid)] pl-6 bg-gradient-to-r from-[var(--aurum-gold-subtle-solid)]/5 to-transparent rounded-r-xl">
											"Break the routing rules three months from now? Revert to
											Day-0. You hold the keys to your own safety net."
										</blockquote>
										<p className="text-white/80 text-sm md:text-base leading-relaxed font-sans">
											{step.body}
										</p>
									</div>
								) : (
									<p className="text-white/80 text-base leading-relaxed font-sans">
										{step.body}
									</p>
								)}

								{/* Training Items List (Step 4) */}
								{step.trainingItems && step.trainingItems.length > 0 && (
									<div className="glass-card bg-[rgba(13,17,23,0.4)] border border-white/[0.06] rounded-2xl p-6 md:p-8 mt-6 relative overflow-hidden">
										<div className="absolute top-0 right-0 w-32 h-32 bg-[var(--aurora-blue-solid)]/10 blur-2xl rounded-full" />
										<div className="text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)] mb-4 relative z-10">
											Training Syllabus
										</div>
										<ul className="space-y-4 relative z-10">
											{step.trainingItems.map((item, i) => (
												<li
													key={i}
													className="flex items-start gap-3 text-sm md:text-base text-white/80"
												>
													<ArrowRight className="w-5 h-5 text-[var(--aurora-blue-solid)] shrink-0 mt-0.5" />
													<span className="font-sans leading-relaxed">
														{item}
													</span>
												</li>
											))}
										</ul>
									</div>
								)}

								{/* Step Closing Note */}
								{step.closingNote && (
									<div className="text-sm md:text-base text-[var(--text-muted)] italic font-sans border-t border-white/[0.04] pt-6 mt-4">
										{step.closingNote}
									</div>
								)}
							</div>
						</motion.div>
					);
				})}
			</div>
		</div>
	);
}
