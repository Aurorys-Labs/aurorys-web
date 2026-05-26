import { motion } from "framer-motion";
import React from "react";

interface SubSection {
	id: string;
	title: string;
	body: string;
}

interface VerticalSlicesProps {
	data: {
		title: string;
		subtitle: string;
		sections: SubSection[];
	};
}

export function VerticalSlices({ data }: VerticalSlicesProps) {
	return (
		<div className="space-y-16">
			{/* Section Header */}
			<div className="max-w-3xl mb-12 text-left">
				<h2 className="font-sans font-bold text-3xl md:text-4xl tracking-tight text-[var(--text-stellar)] mb-4">
					{data.title}
				</h2>
				<p className="text-[var(--text-muted)] text-[var(--text-body)] font-sans">
					{data.subtitle}
				</p>
			</div>

			{/* Three sub-sections */}
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
				{data.sections.map((section, idx) => {
					const isGrilling = section.id === "grilling-phase";
					const isKnowledge = section.id === "knowledge-transfer";
					const isSlices = section.id === "vertical-slices";

					return (
						<motion.div
							key={section.id}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: idx * 0.1 }}
							className="glass-card p-8 rounded-2xl border border-white/[0.06] backdrop-blur-xl bg-[rgba(13,17,23,0.3)] flex flex-col justify-between hover:border-white/[0.12] transition-colors relative overflow-hidden text-left"
						>
							<div className="absolute -top-16 -left-16 w-32 h-32 bg-[var(--aurora-blue-solid)]/5 rounded-full blur-2xl pointer-events-none" />

							<div className="space-y-4">
								{/* Icon indicator */}
								<div className="w-10 h-10 rounded-lg bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-[var(--text-stellar)]">
									{isSlices && (
										<svg
											className="w-5 h-5 text-[var(--aurora-green-solid)]"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
											strokeWidth="2"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M4 6h16M4 12h16M4 18h7"
											/>
										</svg>
									)}
									{isGrilling && (
										<svg
											className="w-5 h-5 text-[var(--aurora-rose-solid)]"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
											strokeWidth="2"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
											/>
										</svg>
									)}
									{isKnowledge && (
										<svg
											className="w-5 h-5 text-[var(--aurora-violet-solid)]"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
											strokeWidth="2"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
											/>
										</svg>
									)}
								</div>

								<h3 className="font-sans font-bold text-xl text-[var(--text-stellar)]">
									{section.title}
								</h3>

								{/* Vertical slices gets the prestige statement */}
								{isSlices && (
									<blockquote
										className="font-serif italic text-[1.125rem] leading-relaxed text-[var(--text-stellar)] py-2 border-l border-[var(--aurum-gold-subtle-solid)] pl-3"
										style={{ textShadow: "0 2px 10px rgba(0, 0, 0, 0.9)" }}
									>
										"Working security capabilities every week, not a pile of
										PDFs on the final day."
									</blockquote>
								)}

								{/* Grilling phase gets the H3 prestige statement */}
								{isGrilling && (
									<blockquote
										className="font-serif italic text-[1.125rem] leading-relaxed text-[var(--text-stellar)] py-2 border-l border-[var(--aurum-gold-subtle-solid)] pl-3"
										style={{ textShadow: "0 2px 10px rgba(0, 0, 0, 0.9)" }}
									>
										"We'd rather lose an engagement than sign one that isn't the
										right fit."
									</blockquote>
								)}

								{/* Knowledge transfer gets the H2 prestige statement */}
								{isKnowledge && (
									<blockquote
										className="font-serif italic text-[1.125rem] leading-relaxed text-[var(--text-stellar)] py-2 border-l border-[var(--aurum-gold-subtle-solid)] pl-3"
										style={{ textShadow: "0 2px 10px rgba(0, 0, 0, 0.9)" }}
									>
										"Knowledge transfer isn't a separate session — it's woven
										into every step."
									</blockquote>
								)}

								<p className="text-white/70 text-sm leading-relaxed font-sans">
									{section.body}
								</p>
							</div>
						</motion.div>
					);
				})}
			</div>
		</div>
	);
}
