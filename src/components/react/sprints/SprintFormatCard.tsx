import { RainbowButton } from "@/components/ui/rainbow-button";
import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import React from "react";

interface Format {
	id: string;
	title: string;
	price: string;
	duration: string;
	focus: string;
	deliverables?: string[];
	whatThisIsNot?: string;
	whenToChoose?: string;
	cta: { label: string; href: string };
}

interface SprintFormatCardProps {
	formats: Format[];
}

export function SprintFormatCard({ formats }: SprintFormatCardProps) {
	return (
		<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
			{formats.map((format, idx) => (
				<motion.div
					key={format.id}
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: idx * 0.1 }}
					className="glass-card p-8 rounded-2xl border border-white/[0.06] backdrop-blur-xl bg-[rgba(13,17,23,0.35)] flex flex-col justify-between h-full hover:border-white/[0.12] transition-colors group relative overflow-hidden"
				>
					{/* Gold glowing accent behind the card title */}
					<div className="absolute -top-16 -left-16 w-32 h-32 bg-[var(--aurum-gold-subtle)]/5 rounded-full blur-2xl group-hover:bg-[var(--aurum-gold-subtle)]/10 transition-colors duration-300" />

					<div>
						{/* Duration badge */}
						<div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-white/[0.04] border border-white/[0.08] text-[var(--text-muted)] mb-6">
							<svg
								className="w-3.5 h-3.5 text-[var(--aurum-gold-light)]"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								strokeWidth="2"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
							{format.duration}
						</div>

						{/* Format Title */}
						<h3 className="font-heading font-medium text-2xl text-[var(--text-stellar)] mb-2">
							{format.title}
						</h3>

						{/* Price (Aurum Gold Gradient) */}
						<div className="font-heading font-semibold text-lg bg-gradient-to-r from-[var(--aurum-gold-subtle)] to-[var(--aurum-gold-light)] bg-clip-text text-transparent mb-6">
							{format.price}
						</div>

						{/* Focus Description */}
						<p className="text-white/70 text-sm leading-relaxed mb-6 font-sans">
							{format.focus}
						</p>

						{/* Deliverables List */}
						{format.deliverables && format.deliverables.length > 0 && (
							<>
								{/* Deliverables Title */}
								<div className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-4">
									Key Deliverables
								</div>
								<ul className="space-y-3 mb-8">
									{format.deliverables.map((item, i) => (
										<li
											key={i}
											className="flex items-start gap-2.5 text-sm text-white/80"
										>
											<Zap className="w-4 h-4 text-[var(--aurora-green-solid)] shrink-0 mt-0.5" />
											<span className="font-sans leading-snug">{item}</span>
										</li>
									))}
								</ul>
							</>
						)}
					</div>

					{/* Bottom Context & CTA */}
					<div>
						{format.whatThisIsNot && (
							<div className="text-xs text-white/50 border-t border-white/[0.06] pt-4 mb-6 font-sans italic leading-relaxed">
								<span className="font-semibold text-white/60 not-italic">
									What this is not:{" "}
								</span>
								{format.whatThisIsNot}
							</div>
						)}

						{format.whenToChoose && (
							<div className="text-xs text-white/50 border-t border-white/[0.06] pt-4 mb-6 font-sans italic leading-relaxed">
								<span className="font-semibold text-white/60 not-italic">
									When to choose:{" "}
								</span>
								{format.whenToChoose}
							</div>
						)}

						<RainbowButton
							variant="glass"
							size="lg"
							className="w-full rounded-xl justify-center"
							asChild
						>
							<a href={format.cta.href}>{format.cta.label}</a>
						</RainbowButton>
					</div>
				</motion.div>
			))}
		</div>
	);
}
