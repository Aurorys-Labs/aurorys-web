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
		<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left">
			{/* Left Column: Story & Prestige Statement */}
			<div className="lg:col-span-5 space-y-6">
				<h2 className="font-heading font-bold text-4xl md:text-5xl text-[var(--text-stellar)] tracking-tight">
					{data.title}
				</h2>
				<p className="text-white/80 text-sm leading-relaxed font-sans">
					{data.body}
				</p>

				{/* H3 Prestige statement */}
				<blockquote className="font-serif italic text-xl md:text-2xl lg:text-3xl text-[var(--text-stellar)] leading-relaxed py-6 border-t border-b border-white/[0.08] my-8">
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
								<span className="inline-flex items-center justify-center p-1 text-[var(--aurora-green-solid)] shrink-0 mt-0.5">
									<svg
										className="w-4 h-4"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										strokeWidth="2.5"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M12 4v16m8-8H4m11.314-5.657l-11.314 11.314m0-11.314l11.314 11.314"
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
