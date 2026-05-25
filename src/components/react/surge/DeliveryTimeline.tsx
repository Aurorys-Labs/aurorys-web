import { motion } from "framer-motion";
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
		<div className="relative border-l border-white/[0.08] pl-8 ml-4 md:ml-12 space-y-16 py-4">
			{process.steps.map((step, idx) => {
				const isDay0Step = step.step === 3;

				return (
					<motion.div
						key={step.step}
						initial={{ opacity: 0, x: -20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6, delay: idx * 0.1 }}
						className="relative group"
					>
						{/* Timeline Step Dot/Number */}
						<div className="absolute -left-[53px] top-0 w-10 h-10 rounded-full bg-[rgba(8,12,16,0.9)] border border-white/[0.08] flex items-center justify-center font-heading font-semibold text-sm text-[var(--text-stellar)] group-hover:border-[var(--aurora-blue-solid)] group-hover:text-[var(--aurora-blue-solid)] transition-colors">
							{step.step}
						</div>

						<div className="space-y-4 max-w-3xl">
							{/* Step Title */}
							<h3 className="font-heading font-medium text-xl text-[var(--text-stellar)]">
								{step.title}
							</h3>

							{/* Day-0 Golden Snapshot gets the H3 prestige treatment */}
							{isDay0Step ? (
								<div className="space-y-4">
									<blockquote className="font-serif italic text-[var(--text-h3)] leading-[var(--leading-subheading)] text-[var(--text-stellar)] py-3 my-2 border-l border-[var(--aurum-gold-subtle)] pl-4">
										"Break the routing rules three months from now? Revert to
										Day-0. You hold the keys to your own safety net."
									</blockquote>
									<p className="text-white/70 text-sm leading-relaxed font-sans">
										{step.body}
									</p>
								</div>
							) : (
								<p className="text-white/70 text-sm leading-relaxed font-sans">
									{step.body}
								</p>
							)}

							{/* Training Items List (Step 4) */}
							{step.trainingItems && step.trainingItems.length > 0 && (
								<div className="bg-white/[0.02] border border-white/[0.04] rounded-xl p-6 mt-4">
									<div className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-3">
										Training Syllabus
									</div>
									<ul className="space-y-3">
										{step.trainingItems.map((item, i) => (
											<li
												key={i}
												className="flex items-start gap-2.5 text-sm text-white/80"
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
														d="M9 5l7 7-7 7"
													/>
												</svg>
												<span className="font-sans leading-snug">{item}</span>
											</li>
										))}
									</ul>
								</div>
							)}

							{/* Step Closing Note */}
							{step.closingNote && (
								<div className="text-xs text-[var(--text-muted)] italic font-sans border-t border-white/[0.04] pt-4 mt-2">
									{step.closingNote}
								</div>
							)}
						</div>
					</motion.div>
				);
			})}
		</div>
	);
}
