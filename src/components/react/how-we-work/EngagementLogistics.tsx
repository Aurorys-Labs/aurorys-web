import { motion } from "framer-motion";
import React from "react";

interface Milestone {
	percentage: string;
	title: string;
	desc: string;
}

interface EngagementLogisticsProps {
	data: {
		title: string;
		subtitle: string;
		milestones: Milestone[];
		gateChecks: string[];
		phasedRollouts: string;
	};
}

export function EngagementLogistics({ data }: EngagementLogisticsProps) {
	return (
		<div className="space-y-12 text-left">
			{/* Header */}
			<div className="max-w-3xl">
				<h2 className="font-sans font-bold text-3xl md:text-4xl tracking-tight text-[var(--text-stellar)] mb-4">
					{data.title}
				</h2>
				<p className="text-[var(--text-muted)] text-[var(--text-body)] font-sans">
					{data.subtitle}
				</p>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
				{/* Milestone Billing (Grid columns 1-6) */}
				<div className="lg:col-span-6 space-y-6">
					<div className="glass-card p-8 rounded-2xl border border-white/[0.06] backdrop-blur-xl bg-[rgba(13,17,23,0.3)] space-y-6">
						<h3 className="font-sans font-bold text-lg text-[var(--text-stellar)]">
							Milestone-Based Billing
						</h3>
						<p className="text-white/70 text-sm font-sans leading-relaxed">
							We don't bill by the hour. We bill by the milestone. Payment
							checkpoints are tied strictly to delivery — not to time spent.
						</p>

						{/* Segmented Milestone Graph */}
						<div className="space-y-2 pt-1 pb-2">
							<div className="flex justify-between text-[10px] font-mono uppercase tracking-wider text-[var(--text-muted)]">
								<span>Start (40%)</span>
								<span>Midpoint (30%)</span>
								<span>Handoff (30%)</span>
							</div>
							<div className="h-2.5 w-full rounded-full bg-white/[0.04] p-0.5 flex gap-1 border border-white/[0.06] overflow-hidden">
								<div
									className="h-full rounded-full bg-gradient-to-r from-[#a0782a] to-[#c9a84c] opacity-85 hover:opacity-100 transition-opacity duration-300"
									style={{ width: "40%" }}
									title="Engagement Start: 40%"
								/>
								<div
									className="h-full rounded-full bg-gradient-to-r from-[#c9a84c] to-[#e8c97a] opacity-85 hover:opacity-100 transition-opacity duration-300"
									style={{ width: "30%" }}
									title="Midpoint Milestone: 30%"
								/>
								<div
									className="h-full rounded-full bg-gradient-to-r from-[#e8c97a] to-white/50 opacity-85 hover:opacity-100 transition-opacity duration-300"
									style={{ width: "30%" }}
									title="Final Handoff: 30%"
								/>
							</div>
						</div>

						<div className="space-y-4 pt-2">
							{data.milestones.map((milestone, idx) => (
								<motion.div
									key={milestone.title}
									initial={{ opacity: 0, x: -10 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{ duration: 0.4, delay: idx * 0.08 }}
									className="flex gap-2.5 items-center border-l-2 border-[var(--aurum-gold-subtle-solid)] pl-4 py-1.5"
								>
									<div className="font-sans font-bold text-xl bg-gradient-to-r from-[var(--aurum-gold-subtle-solid)] to-[var(--aurum-gold-light-solid)] bg-clip-text text-transparent w-12 shrink-0">
										{milestone.percentage}
									</div>
									<div className="space-y-1 font-sans">
										<h4 className="text-sm font-bold text-[var(--text-stellar)]">
											{milestone.title}
										</h4>
										<p className="text-xs text-white/60 leading-relaxed">
											{milestone.desc}
										</p>
									</div>
								</motion.div>
							))}
						</div>
					</div>
				</div>

				{/* Gate Checks & Phased Rollouts (Grid columns 7-12) */}
				<div className="lg:col-span-6 space-y-6">
					{/* Gate Checks */}
					<div className="glass-card p-8 rounded-2xl border border-white/[0.06] backdrop-blur-xl bg-[rgba(13,17,23,0.3)] space-y-6">
						<h3 className="font-sans font-bold text-lg text-[var(--text-stellar)]">
							Gate Checks — Before We Start
						</h3>
						<p className="text-white/70 text-sm font-sans leading-relaxed">
							We don't start the clock until we have the baseline inputs we need
							to succeed.
						</p>

						<ul className="space-y-3 font-sans text-sm text-white/90">
							{data.gateChecks.map((check, i) => (
								<li key={i} className="flex items-start gap-2.5">
									<svg
										className="w-4 h-4 text-[var(--aurora-green-solid)] shrink-0 mt-1"
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
									<span className="leading-snug">{check}</span>
								</li>
							))}
						</ul>
					</div>

					{/* Phased Rollouts */}
					<div className="glass-card p-8 rounded-2xl border border-white/[0.06] backdrop-blur-xl bg-[rgba(13,17,23,0.3)] space-y-4">
						<h3 className="font-sans font-bold text-lg text-[var(--text-stellar)]">
							Phased Rollouts, Not Big Bangs
						</h3>
						<p className="text-white/80 text-sm font-sans leading-relaxed">
							{data.phasedRollouts}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
