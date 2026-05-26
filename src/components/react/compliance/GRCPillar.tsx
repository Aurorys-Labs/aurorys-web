import { motion } from "framer-motion";
import { BadgeCheck } from "lucide-react";
import React from "react";

interface Framework {
	name: string;
	description: string;
}

interface Pillar {
	id: string;
	title: string;
	body: string;
	visualType: "pyramid" | "radar" | "timeline";
	items?: string[];
	frameworks?: Framework[];
	closingNote: string;
}

interface GRCPillarProps {
	pillars: Pillar[];
}

// Custom interactive diagrams
function renderVisual(type: "pyramid" | "radar" | "timeline") {
	if (type === "pyramid") {
		return (
			<svg
				className="w-40 h-40 mx-auto opacity-80"
				viewBox="0 0 100 100"
				fill="none"
			>
				{/* Top Tier */}
				<polygon
					points="50,15 38,38 62,38"
					fill="url(#violet-grad)"
					stroke="rgba(139, 92, 246, 0.4)"
					strokeWidth="1"
				/>
				{/* Middle Tier */}
				<polygon
					points="36,42 64,42 74,65 26,65"
					fill="url(#blue-grad)"
					stroke="rgba(59, 130, 246, 0.4)"
					strokeWidth="1"
				/>
				{/* Bottom Tier */}
				<polygon
					points="24,69 76,69 86,92 14,92"
					fill="url(#green-grad)"
					stroke="rgba(16, 185, 129, 0.4)"
					strokeWidth="1"
				/>

				<defs>
					<linearGradient
						id="violet-grad"
						x1="50"
						y1="15"
						x2="50"
						y2="38"
						gradientUnits="userSpaceOnUse"
					>
						<stop stopColor="var(--aurora-violet-solid)" stopOpacity="0.4" />
						<stop stopColor="var(--aurora-violet-solid)" stopOpacity="0.05" />
					</linearGradient>
					<linearGradient
						id="blue-grad"
						x1="50"
						y1="42"
						x2="50"
						y2="65"
						gradientUnits="userSpaceOnUse"
					>
						<stop stopColor="var(--aurora-blue-solid)" stopOpacity="0.4" />
						<stop stopColor="var(--aurora-blue-solid)" stopOpacity="0.05" />
					</linearGradient>
					<linearGradient
						id="green-grad"
						x1="50"
						y1="69"
						x2="50"
						y2="92"
						gradientUnits="userSpaceOnUse"
					>
						<stop stopColor="var(--aurora-green-solid)" stopOpacity="0.4" />
						<stop stopColor="var(--aurora-green-solid)" stopOpacity="0.05" />
					</linearGradient>
				</defs>
			</svg>
		);
	}

	if (type === "radar") {
		return (
			<svg
				className="w-40 h-40 mx-auto opacity-80"
				viewBox="0 0 100 100"
				fill="none"
			>
				{/* Concentric Circles */}
				<circle
					cx="50"
					cy="50"
					r="40"
					stroke="white/10"
					strokeWidth="0.5"
					strokeDasharray="2 2"
				/>
				<circle
					cx="50"
					cy="50"
					r="28"
					stroke="white/10"
					strokeWidth="0.5"
					strokeDasharray="2 2"
				/>
				<circle
					cx="50"
					cy="50"
					r="16"
					stroke="white/10"
					strokeWidth="0.5"
					strokeDasharray="2 2"
				/>
				{/* Axes */}
				<line
					x1="50"
					y1="10"
					x2="50"
					y2="90"
					stroke="white/10"
					strokeWidth="0.5"
				/>
				<line
					x1="10"
					y1="50"
					x2="90"
					y2="50"
					stroke="white/10"
					strokeWidth="0.5"
				/>
				{/* Radar Shape */}
				<polygon
					points="50,22 72,38 68,68 32,58 24,34"
					fill="url(#violet-radar-grad)"
					stroke="var(--aurora-violet-solid)"
					strokeWidth="1.5"
				/>
				{/* Vertices */}
				<circle cx="50" cy="22" r="2" fill="var(--aurora-violet-solid)" />
				<circle cx="72" cy="38" r="2" fill="var(--aurora-violet-solid)" />
				<circle cx="68" cy="68" r="2" fill="var(--aurora-violet-solid)" />
				<circle cx="32" cy="58" r="2" fill="var(--aurora-violet-solid)" />
				<circle cx="24" cy="34" r="2" fill="var(--aurora-violet-solid)" />

				<defs>
					<linearGradient
						id="violet-radar-grad"
						x1="50"
						y1="20"
						x2="50"
						y2="80"
						gradientUnits="userSpaceOnUse"
					>
						<stop stopColor="var(--aurora-violet-solid)" stopOpacity="0.3" />
						<stop stopColor="var(--aurora-violet-solid)" stopOpacity="0" />
					</linearGradient>
				</defs>
			</svg>
		);
	}

	// Timeline
	return (
		<svg
			className="w-40 h-40 mx-auto opacity-80"
			viewBox="0 0 100 100"
			fill="none"
		>
			{/* Timeline line */}
			<path
				d="M15,50 Q30,20 50,50 T85,50"
				stroke="white/10"
				strokeWidth="1.5"
				strokeDasharray="3 3"
			/>
			{/* Pulse rings */}
			<circle
				cx="20"
				cy="45"
				r="5"
				fill="var(--aurora-green-solid)"
				fillOpacity="0.4"
			/>
			<circle cx="20" cy="45" r="2.5" fill="var(--aurora-green-solid)" />

			<circle
				cx="50"
				cy="50"
				r="5"
				fill="var(--aurora-blue-solid)"
				fillOpacity="0.4"
			/>
			<circle cx="50" cy="50" r="2.5" fill="var(--aurora-blue-solid)" />

			<circle
				cx="80"
				cy="55"
				r="5"
				fill="var(--aurora-violet-solid)"
				fillOpacity="0.4"
			/>
			<circle cx="80" cy="55" r="2.5" fill="var(--aurora-violet-solid)" />
		</svg>
	);
}

export function GRCPillar({ pillars }: GRCPillarProps) {
	return (
		<div className="space-y-16">
			{pillars.map((pillar, idx) => {
				const isCompliance = pillar.id === "compliance";

				return (
					<motion.div
						key={pillar.id}
						id={pillar.id}
						initial={{ opacity: 0, y: 25 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: idx * 0.1 }}
						className="glass-card p-8 md:p-10 rounded-3xl border border-white/[0.06] backdrop-blur-xl bg-[rgba(13,17,23,0.3)] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative overflow-hidden"
					>
						{/* Background visual highlight */}
						<div className="absolute -bottom-24 -right-24 w-64 h-64 bg-white/[0.01] rounded-full blur-3xl pointer-events-none" />

						{/* Left / Top visual block (Grid columns 1-4) */}
						<div className="lg:col-span-4 text-center">
							{pillar.id === "governance" && (
								<img
									src="/images/grc/governance_grc.png"
									alt="Governance"
									className="w-full max-w-[280px] mx-auto h-auto rounded-lg opacity-90 mb-4 drop-shadow-xl"
								/>
							)}
							{pillar.id === "risk" && (
								<img
									src="/images/grc/risk_grc.png"
									alt="Risk"
									className="w-full max-w-[280px] mx-auto h-auto rounded-lg opacity-90 mb-4 drop-shadow-xl"
								/>
							)}
							{pillar.id === "compliance" && (
								<img
									src="/images/grc/compliance_grc.png"
									alt="Compliance"
									className="w-full max-w-[280px] mx-auto h-auto rounded-lg opacity-90 mb-4 drop-shadow-xl"
								/>
							)}
						</div>

						{/* Right Content Block (Grid columns 5-12) */}
						<div className="lg:col-span-8 space-y-6 text-left">
							<h3 className="font-heading font-semibold text-2xl text-[var(--text-stellar)]">
								{pillar.title}
							</h3>

							<p className="text-white/80 text-sm leading-relaxed font-sans">
								{pillar.body}
							</p>

							{/* Render Items bullet list (Governance / Risk) */}
							{pillar.items && (
								<ul className="space-y-3 bg-white/[0.01] border border-white/[0.04] rounded-2xl p-6">
									<div className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-3">
										Focus Areas
									</div>
									{pillar.items.map((item, i) => {
										const [title, desc] = item.split(" — ");
										return (
											<li
												key={i}
												className="flex items-start gap-2 text-sm text-white/95 leading-relaxed"
											>
												<BadgeCheck className="w-4 h-4 text-[var(--aurora-blue-solid)] shrink-0 mt-0.5" />
												<span className="font-sans">
													<strong className="text-[var(--text-stellar)]">
														{title}
													</strong>
													{desc && ` — ${desc}`}
												</span>
											</li>
										);
									})}
								</ul>
							)}

							{/* Render Frameworks list (Compliance) */}
							{pillar.frameworks && (
								<div className="space-y-4 bg-white/[0.01] border border-white/[0.04] rounded-2xl p-6">
									<div className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
										Core Frameworks
									</div>
									<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
										{pillar.frameworks.map((fw, i) => (
											<div key={i} className="space-y-1">
												<h4 className="text-sm font-semibold text-[var(--text-stellar)]">
													{fw.name}
												</h4>
												<p className="text-xs text-white/60 leading-relaxed font-sans">
													{fw.description}
												</p>
											</div>
										))}
									</div>
								</div>
							)}

							{/* Closing note & Prestige Moment */}
							{isCompliance ? (
								<div className="space-y-4 border-t border-white/[0.06] pt-6 mt-4">
									{/* H3 Prestige block */}
									<blockquote className="font-serif italic text-[var(--text-h3)] leading-[var(--leading-subheading)] text-[var(--text-stellar)]">
										"{pillar.closingNote.split(" — ")[0]}"
									</blockquote>
									<p className="text-xs text-[var(--text-muted)] font-sans leading-relaxed">
										{pillar.closingNote.split(" — ")[1] || ""}
									</p>
								</div>
							) : (
								<div className="text-xs text-white/60 font-sans leading-relaxed italic border-t border-white/[0.06] pt-6 mt-4">
									{pillar.closingNote}
								</div>
							)}
						</div>
					</motion.div>
				);
			})}
		</div>
	);
}
