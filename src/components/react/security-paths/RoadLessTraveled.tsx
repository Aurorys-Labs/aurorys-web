import { motion } from "framer-motion";
import React from "react";
import { RainbowButton } from "../../ui/rainbow-button";

interface Route {
	title: string;
	description: string;
	link: string;
	cta: string;
}

interface RoadLessTraveledProps {
	data: {
		title: string;
		body: string;
		body2: string;
		body3: string;
		routes: Route[];
		quote: string;
		quoteAttribution: string;
		closingNote: string;
	};
}

export function RoadLessTraveled({ data }: RoadLessTraveledProps) {
	return (
		<div className="space-y-16">
			{/* Two-Column Intro & Quote */}
			<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
				<div className="lg:col-span-6 space-y-6 text-left">
					<h2 className="font-heading font-semibold text-[var(--text-h2)] leading-[var(--leading-subheading)] tracking-[var(--tracking-subheading)] text-[var(--text-stellar)]">
						{data.title}
					</h2>
					<p className="text-white/80 text-sm leading-relaxed font-sans">
						{data.body}
					</p>
					<p className="text-white/80 text-sm leading-relaxed font-sans">
						{data.body2}
					</p>
				</div>

				{/* Display Scale Prestige Quote */}
				<div className="lg:col-span-6 py-12 my-4 relative overflow-hidden glass-card rounded-2xl px-8 text-center flex flex-col items-center justify-center min-h-[220px]">
					<div className="absolute inset-0 bg-[var(--aurora-violet-solid)]/5 blur-3xl opacity-30 rounded-full" />
					<blockquote className="font-serif italic text-2xl md:text-3xl text-[var(--text-stellar)] max-w-lg leading-relaxed relative z-10">
						"{data.quote}"
					</blockquote>
					<cite className="block mt-4 text-xs font-sans text-[var(--text-muted)] tracking-wider uppercase font-semibold not-italic relative z-10">
						— {data.quoteAttribution}
					</cite>
				</div>
			</div>

			{/* Routes Cards Grid */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
				{data.routes.map((route, idx) => (
					<motion.div
						key={route.title}
						initial={{ opacity: 0, y: 15 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: idx * 0.1 }}
						className="glass-card p-8 rounded-2xl border border-white/[0.06] backdrop-blur-xl bg-[rgba(13,17,23,0.3)] flex flex-col justify-between items-start h-full hover:border-white/[0.12] transition-colors group relative overflow-hidden text-left"
					>
						<div className="absolute -top-16 -left-16 w-32 h-32 bg-[var(--aurora-violet-solid)]/5 rounded-full blur-2xl group-hover:bg-[var(--aurora-violet-solid)]/10 transition-colors duration-300" />

						<div className="space-y-4">
							<h3 className="font-heading font-medium text-xl text-[var(--text-stellar)]">
								{route.title}
							</h3>
							<p className="text-white/70 text-sm leading-relaxed font-sans">
								{route.description}
							</p>
						</div>

						<div className="mt-6 w-full">
							<RainbowButton
								variant="glass_alt"
								className="rounded-xl w-full justify-center group"
								asChild
							>
								<a href={route.link}>
									<span>{route.cta}</span>
									<svg
										className="w-4.5 h-4.5 ml-1 transition-transform group-hover:translate-x-1"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										strokeWidth="2.5"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M9 5l7 7-7 7"
										/>
									</svg>
								</a>
							</RainbowButton>
						</div>
					</motion.div>
				))}
			</div>

			{/* Closing Statement */}
			<div className="text-center max-w-2xl mx-auto border-t border-white/[0.06] pt-8">
				<p className="text-white/60 text-sm italic font-sans leading-relaxed">
					{data.closingNote}
				</p>
			</div>
		</div>
	);
}
