import { motion } from "framer-motion";
import React from "react";

interface BundleAdvantageProps {
	data: {
		title: string;
		body: string;
		body2: string;
		advantages: string[];
	};
}

export function BundleAdvantage({ data }: BundleAdvantageProps) {
	return (
		<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-left">
			{/* Left Column: Story & Prestige Statement */}
			<div className="lg:col-span-5 space-y-6">
				<h2 className="font-heading font-semibold text-[var(--text-h2)] leading-[var(--leading-subheading)] tracking-[var(--tracking-subheading)] text-[var(--text-stellar)]">
					{data.title}
				</h2>
				<p className="text-white/80 text-sm leading-relaxed font-sans">
					{data.body}
				</p>

				{/* H3 Prestige statement */}
				<blockquote className="font-serif italic text-[var(--text-h3)] leading-[var(--leading-subheading)] text-[var(--text-stellar)] py-6 border-t border-b border-white/[0.08] my-6">
					"One team. One context. One cohesive security program."
				</blockquote>

				<p className="text-white/70 text-sm leading-relaxed font-sans italic">
					{data.body2}
				</p>
			</div>

			{/* Right Column: Key Advantages Card */}
			<div className="lg:col-span-7">
				<div className="glass-card p-8 rounded-2xl border border-white/[0.06] backdrop-blur-xl bg-[rgba(13,17,23,0.3)] space-y-6">
					<div className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
						The Aurorys Constellation Advantage
					</div>
					<ul className="space-y-4">
						{data.advantages.map((advantage, idx) => (
							<motion.li
								key={idx}
								initial={{ opacity: 0, x: 15 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.4, delay: idx * 0.08 }}
								className="flex items-start gap-3 text-sm text-white/90"
							>
								{/* Icon */}
								<span className="inline-flex items-center justify-center p-1 rounded bg-[var(--aurora-green-solid)]/10 text-[var(--aurora-green-solid)] shrink-0 mt-0.5">
									<svg
										className="w-3.5 h-3.5"
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
								</span>
								{/* Text */}
								<span className="font-sans leading-relaxed">{advantage}</span>
							</motion.li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
}
