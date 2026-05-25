"use client";

import data from "@/lib/data/how-we-work.json";
import { Compass, GraduationCap, PenTool, Radio, Search } from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
	Search,
	PenTool,
	Compass,
	GraduationCap,
	Radio,
};

export function HowWeWork() {
	const { sectionTitle, sectionSubtitle, steps, sharedResponsibility } = data;

	return (
		<section className="section-padding border-t border-[var(--border-default)]">
			<div className="content-width">
				<div className="text-center mb-16">
					<h2 className="font-sans font-bold text-4xl md:text-5xl mb-4 tracking-tight">
						How <span className="text-gradient-aurora">We Work</span>
					</h2>
					<p className="text-white/60 max-w-xl mx-auto">{sectionSubtitle}</p>
				</div>

				<div className="max-w-3xl mx-auto">
					<div className="glass-card p-8">
						<div className="space-y-0">
							{steps.map((step, i) => {
								const IconComponent = iconMap[step.icon] || Search;
								return (
									<div
										key={step.title}
										className="flex items-start gap-5 py-6 first:pt-0 last:pb-0"
									>
										<div className="flex flex-col items-center shrink-0">
											<div
												className="w-12 h-12 rounded-xl flex items-center justify-center"
												style={{
													background:
														"linear-gradient(135deg, rgba(0,232,160,0.1), rgba(167,139,250,0.1))",
													color: "var(--aurora-green-solid)",
												}}
											>
												<IconComponent className="w-5 h-5" />
											</div>
											{i < steps.length - 1 && (
												<div className="w-px flex-1 min-h-[100px] my-1 bg-gradient-to-b from-[var(--aurora-green-solid)]/40 via-[var(--aurora-violet-solid)]/25 to-transparent" />
											)}
										</div>
										<div className="pt-1">
											<h3 className="text-lg font-bold mb-1">{step.title}</h3>
											<p className="text-sm text-[var(--text-muted)] leading-relaxed">
												{step.body}
											</p>
										</div>
									</div>
								);
							})}
						</div>
					</div>

					<div className="mt-4 glass-card p-8">
						<h4 className="font-semibold text-base mb-2 text-[var(--text-stellar)]">
							{sharedResponsibility.title}
						</h4>
						<p className="text-sm text-[var(--text-muted)] leading-relaxed mb-3">
							{sharedResponsibility.body}
						</p>
						<a
							href="/how-we-work"
							className="text-sm font-medium text-[var(--aurora-green-solid)] hover:underline"
						>
							Read more about our approach
						</a>
					</div>
				</div>
			</div>
		</section>
	);
}
