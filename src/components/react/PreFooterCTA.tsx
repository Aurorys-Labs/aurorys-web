"use client";

import { RainbowButton } from "@/components/ui/rainbow-button";
import data from "@/lib/data/pre-footer.json";

export function PreFooterCTA() {
	const { title, subtitle, ctaPrimary, ctaSecondary } = data;

	return (
		<section className="section-padding border-t border-[var(--border-default)]">
			<div className="content-width text-center">
				<h2 className="font-sans font-bold text-3xl md:text-5xl mb-6 max-w-2xl mx-auto tracking-tight leading-tight">
					{title}
				</h2>
				<p className="text-white/60 text-lg mb-10 max-w-xl mx-auto">
					{subtitle}
				</p>
				<div className="flex flex-col sm:flex-row gap-4 justify-center">
					<RainbowButton
						variant="glass"
						size="lg"
						className="rounded-xl"
						asChild
					>
						<a href={ctaPrimary.href}>{ctaPrimary.label}</a>
					</RainbowButton>
					<a
						href={ctaSecondary.href}
						className="inline-flex items-center justify-center h-11 px-8 rounded-full border border-white/20 bg-white/[0.03] text-white/70 hover:text-white hover:bg-white/[0.06] hover:border-white/30 transition-all duration-200 text-sm font-medium"
					>
						{ctaSecondary.label}
					</a>
				</div>
			</div>
		</section>
	);
}
