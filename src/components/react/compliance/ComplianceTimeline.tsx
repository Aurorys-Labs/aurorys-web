import { motion } from "framer-motion";
import React from "react";

interface Step {
	step: number;
	title: string;
	timeline: string;
	description: string;
}

interface ComplianceTimelineProps {
	timelineData: {
		title: string;
		subtitle: string;
		steps: Step[];
		closingNote: string;
	};
}

export function ComplianceTimeline({ timelineData }: ComplianceTimelineProps) {
	return (
		<div className="space-y-8 text-left">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				{timelineData.steps.map((step, idx) => (
					<motion.div
						key={step.step}
						initial={{ opacity: 0, y: 15 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.4, delay: idx * 0.08 }}
						className="glass-card p-6 rounded-2xl border border-white/[0.06] bg-[rgba(13,17,23,0.3)] hover:border-white/[0.12] transition-colors relative overflow-hidden text-left space-y-4 group"
					>
						<div className="absolute -top-24 -left-24 w-48 h-48 bg-[var(--aurora-blue-solid)]/5 rounded-full blur-3xl opacity-50 pointer-events-none" />

						<div className="flex justify-between items-center relative z-10">
							<span className="text-[10px] font-mono font-semibold uppercase tracking-[0.15em] px-2.5 py-1 rounded bg-[var(--aurora-blue-solid)]/10 border border-[var(--aurora-blue-solid)]/20 text-blue-300">
								Step {step.step} · {step.timeline}
							</span>
							<div className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/[0.08] flex items-center justify-center font-bold text-sm text-[var(--text-stellar)]">
								0{step.step}
							</div>
						</div>

						<div className="space-y-2 relative z-10">
							<h3 className="font-heading font-medium text-lg text-[var(--text-stellar)] group-hover:text-[var(--aurora-green-solid)] transition-colors">
								{step.title}
							</h3>
							<p className="text-white/70 text-sm leading-relaxed font-sans">
								{step.description}
							</p>
						</div>
					</motion.div>
				))}
			</div>

			{timelineData.closingNote && (
				<div className="text-sm text-[var(--text-muted)] italic font-sans max-w-2xl border-t border-white/[0.06] pt-6 text-left leading-relaxed">
					{timelineData.closingNote}
				</div>
			)}
		</div>
	);
}
