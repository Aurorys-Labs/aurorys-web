import { motion } from "framer-motion";
import type React from "react";

interface Checkin {
	day: number;
	title: string;
	description: string;
}

interface Rule {
	id: string;
	title: string;
	icon: string;
	body: string;
	requirements?: string[];
	checkins?: Checkin[];
	closingNote?: string;
}

interface RulesOfEngagementProps {
	rules: Rule[];
}

const iconMap: Record<string, React.ReactNode> = {
	ShieldCheck: (
		<svg
			className="w-6 h-6 text-[var(--aurora-green-solid)]"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
			strokeWidth="1.5"
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
			/>
		</svg>
	),
	Users: (
		<svg
			className="w-6 h-6 text-[var(--aurora-blue-solid)]"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
			strokeWidth="1.5"
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
			/>
		</svg>
	),
	CalendarCheck: (
		<svg
			className="w-6 h-6 text-[var(--aurora-violet-solid)]"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
			strokeWidth="1.5"
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
			/>
		</svg>
	),
	Clock: (
		<svg
			className="w-6 h-6 text-[var(--aurora-rose-solid)]"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
			strokeWidth="1.5"
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
			/>
		</svg>
	),
};

export function RulesOfEngagement({ rules }: RulesOfEngagementProps) {
	return (
		<div className="space-y-12">
			{rules.map((rule, idx) => {
				const isTimebox = rule.id === "timebox-guarantee";

				return (
					<motion.div
						key={rule.id}
						initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6, delay: idx * 0.1 }}
						className="glass-card p-8 rounded-2xl border border-white/[0.06] backdrop-blur-xl bg-[rgba(13,17,23,0.3)] flex flex-col md:flex-row gap-6 items-start relative overflow-hidden"
					>
						{/* Icon wrapper */}
						<div className="p-3 bg-white/[0.04] border border-white/[0.08] rounded-xl shrink-0 mt-1">
							{iconMap[rule.icon] ?? iconMap.ShieldCheck}
						</div>

						<div className="space-y-4 w-full">
							{/* Rule Title */}
							<h3 className="font-heading font-medium text-xl text-[var(--text-stellar)]">
								{rule.title}
							</h3>

							{/* Prestige Statement mapping for Timebox Guarantee */}
							{isTimebox ? (
								<div className="space-y-4">
									{/* H2 Prestige line */}
									<blockquote className="font-serif italic text-[var(--text-h2)] leading-[var(--leading-subheading)] tracking-[var(--tracking-subheading)] text-[var(--text-stellar)] py-4 my-2 border-l border-[var(--aurum-gold-subtle)] pl-4">
										"The clock doesn't lie."
									</blockquote>
									<p className="text-white/70 text-sm leading-relaxed font-sans">
										{rule.body}
									</p>
								</div>
							) : (
								<p className="text-white/70 text-sm leading-relaxed font-sans">
									{rule.body}
								</p>
							)}

							{/* Requirements list (if present) */}
							{rule.requirements && (
								<div className="bg-white/[0.02] border border-white/[0.04] rounded-xl p-6 mt-4">
									<div className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-3">
										Prerequisites for Starting
									</div>
									<ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
										{rule.requirements.map((req, i) => (
											<li
												key={i}
												className="flex items-center gap-2 text-sm text-white/80"
											>
												<svg
													className="w-4 h-4 text-[var(--aurora-blue-solid)] shrink-0"
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
												<span className="font-sans">{req}</span>
											</li>
										))}
									</ul>
								</div>
							)}

							{/* Checkins timeline (if present) */}
							{rule.checkins && (
								<div className="relative border-l border-white/[0.08] pl-6 ml-3 mt-6 space-y-6">
									{rule.checkins.map((checkin, i) => (
										<div key={i} className="relative group">
											{/* Timeline Dot */}
											<div className="absolute -left-[31px] top-1.5 w-3.5 h-3.5 rounded-full bg-[rgba(13,17,23,0.9)] border-2 border-[var(--aurora-violet-solid)] group-hover:scale-125 transition-transform" />

											{/* Content */}
											<div>
												<div className="flex items-center gap-2 mb-1">
													<span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded bg-[var(--aurora-violet-solid)]/10 border border-[var(--aurora-violet-solid)]/20 text-violet-300">
														Day {checkin.day}
													</span>
													<h4 className="text-sm font-semibold text-[var(--text-stellar)]">
														{checkin.title}
													</h4>
												</div>
												<p className="text-xs text-white/60 font-sans leading-relaxed">
													{checkin.description}
												</p>
											</div>
										</div>
									))}
								</div>
							)}

							{/* Closing Note (if present) */}
							{rule.closingNote && (
								<div className="text-xs text-[var(--text-muted)] italic pt-2 font-sans">
									{rule.closingNote}
								</div>
							)}
						</div>
					</motion.div>
				);
			})}
		</div>
	);
}
