"use client";

import { InteractiveGlowButton } from "@/components/ui/interactive-glow-button";
import { RainbowButton } from "@/components/ui/rainbow-button";
import data from "@/lib/data/pricing.json";
import { domainPill } from "@/lib/domain-colors";
import {
	Asterisk,
	BadgeCheck,
	Eye,
	Mountain,
	PenTool,
	Radio,
	Search,
	Stars,
	Wrench,
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
	Search,
	PenTool,
	Mountain,
	BadgeCheck,
	Radio,
	Wrench,
	Eye,
	Stars,
};

const flagStyles: Record<string, string> = {
	"Start Here":
		"backdrop-blur-sm text-[10px] font-semibold uppercase tracking-[0.15em] px-3 py-1 rounded-full bg-gradient-to-r from-emerald-500/15 to-emerald-500/5 border border-emerald-500/40 text-emerald-300",
	Flagship:
		"backdrop-blur-sm text-[10px] font-semibold uppercase tracking-[0.15em] px-3 py-1 rounded-full bg-gradient-to-r from-violet-500/15 to-violet-500/5 border border-violet-500/40 text-violet-300",
	Ongoing:
		"backdrop-blur-sm text-[10px] font-semibold uppercase tracking-[0.15em] px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500/15 to-cyan-500/5 border border-cyan-500/40 text-cyan-300",
};

function PackageCard({
	pkg,
	wide,
}: { pkg: (typeof data.packages)[0]; wide?: boolean }) {
	const IconComponent = iconMap[pkg.icon] || Search;
	const isFlagship = pkg.variant === "flagship";

	return (
		<div
			className={`glass-card p-8 flex flex-col transition-all duration-300 ${isFlagship ? "glass-card-tinted-blue ring-1 ring-[var(--aurora-blue-solid)]/20 shadow-[0_0_40px_-10px_rgba(59,130,246,0.15)]" : "glass-card-tinted-cyan"}`}
		>
			<div className="h-7 mb-2">
				{pkg.flag && (
					<span className={flagStyles[pkg.flag] || ""}>{pkg.flag}</span>
				)}
			</div>

			<div className="flex flex-row items-start justify-between gap-4 mb-5">
				<div className="flex flex-col flex-1 min-w-0">
					<div className="flex items-center gap-3 mb-2">
						<div
							className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
							style={{
								background:
									"linear-gradient(135deg, rgba(0,232,160,0.1), rgba(167,139,250,0.1))",
								color: "var(--aurora-green-solid)",
							}}
						>
							<IconComponent className="w-5 h-5" />
						</div>
						<h3 className="text-xl font-bold truncate">{pkg.name}</h3>
					</div>
					<p className="text-sm text-[var(--text-muted)] leading-relaxed">
						{pkg.subtitle}
					</p>
				</div>
				<div className="text-right shrink-0 ml-2">
					<p className="text-[10px] font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-1.5 leading-none">
						Starting from
					</p>
					<p className="text-lg font-bold text-[var(--text-stellar)] leading-tight">
						{pkg.price}
					</p>
					<p className="text-xs text-[var(--text-muted)] mt-1.5 leading-none">
						{pkg.timeline}
					</p>
				</div>
			</div>

			<div className="flex flex-wrap gap-1.5 mb-5">
				{(pkg.domains || []).map((domain: string) => (
					<span key={domain} className={domainPill(domain)}>
						{domain}
					</span>
				))}
			</div>

			{isFlagship && pkg.body && (
				<p className="text-sm text-[var(--text-muted)] mb-5 leading-relaxed border-t border-white/[0.04] pt-4">
					{pkg.body}
				</p>
			)}

			<ul className="space-y-2 mb-6 flex-1">
				{pkg.bullets.map((b: string) => (
					<li
						key={b}
						className="flex items-start gap-2 text-sm text-[var(--text-muted)] leading-relaxed"
					>
						<Asterisk className="w-3.5 h-3.5 mt-0.5 shrink-0 text-[var(--aurora-green-solid)]" />
						<span>{b}</span>
					</li>
				))}
			</ul>

			{pkg.variant === "primary" || pkg.variant === "flagship" ? (
				<RainbowButton
					variant="glass"
					size={isFlagship ? "lg" : "default"}
					className="rounded-xl w-full"
					asChild
				>
					<a href={pkg.href}>{pkg.cta}</a>
				</RainbowButton>
			) : (
				<InteractiveGlowButton
					href={pkg.href}
					className="h-10 rounded-full w-full"
				>
					{pkg.cta}
				</InteractiveGlowButton>
			)}
		</div>
	);
}

export function PricingPath() {
	const {
		sectionTitle,
		sectionSubtitle,
		packages,
		addons,
		fullConstellation,
		everyEngagement,
		footer,
	} = data;

	return (
		<section className="section-padding border-t border-[var(--border-default)]">
			<div className="content-width">
				<div className="text-center mb-16">
					<h2 className="font-sans font-bold text-4xl md:text-5xl mb-4 tracking-tight">
						{sectionTitle.split(" ").map((w: string, i: number) =>
							i === 1 ? (
								<span key={i} className="text-gradient-aurora">
									{w}{" "}
								</span>
							) : (
								<span key={i}>{w} </span>
							),
						)}
					</h2>
					<p className="text-white/60 max-w-xl mx-auto">{sectionSubtitle}</p>
				</div>

				<div className="max-w-6xl mx-auto space-y-4">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
						<PackageCard pkg={packages[0]} />
						<PackageCard pkg={packages[1]} />
					</div>
					<PackageCard pkg={packages[2]} wide />
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
						<PackageCard pkg={packages[3]} />
						<PackageCard pkg={packages[4]} />
					</div>
				</div>

				{/* Add-ons */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-6xl mx-auto mt-4">
					{addons.map((addon: (typeof addons)[0]) => {
						const AddonIcon = iconMap[addon.icon] || Wrench;
						return (
							<div
								key={addon.name}
								className="glass-card glass-card-tinted-cyan p-8 flex flex-col"
							>
								<div className="flex flex-row items-start justify-between gap-4 mb-4">
									<div className="flex flex-col flex-1 min-w-0">
										<div className="flex items-center gap-3 mb-2">
											<div
												className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
												style={{
													background:
														"linear-gradient(135deg, rgba(0,232,160,0.1), rgba(167,139,250,0.1))",
													color: "var(--aurora-green-solid)",
												}}
											>
												<AddonIcon className="w-5 h-5" />
											</div>
											<h3 className="text-lg font-bold">{addon.name}</h3>
										</div>
										<p className="text-xs text-[var(--text-muted)]">
											{addon.subtitle}
										</p>
									</div>
									<div className="text-right shrink-0 ml-2">
										<p className="text-[10px] font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-1.5 leading-none">
											Starting from
										</p>
										<p className="text-lg font-bold text-[var(--text-stellar)] leading-tight max-w-[120px] whitespace-pre-wrap">
											{addon.price
												.replace("Starting from ", "")
												.replace(" + ", "\n+ ")}
										</p>
									</div>
								</div>
								<p className="text-sm text-[var(--text-muted)] mb-5 leading-relaxed flex-1">
									{addon.body}
								</p>
								<div className="mt-auto">
									<InteractiveGlowButton
										href={addon.href}
										className="h-10 w-full rounded-full"
									>
										{addon.cta}
									</InteractiveGlowButton>
								</div>
							</div>
						);
					})}
				</div>

				{/* Full Constellation */}
				<div className="max-w-6xl mx-auto mt-4">
					<div className="glass-card glass-card-tinted-violet p-10">
						<div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
							<div className="flex-1">
								<span className="inline-block mb-4 backdrop-blur-sm text-[10px] font-semibold uppercase tracking-[0.15em] px-3 py-1 rounded-full bg-gradient-to-r from-violet-500/15 to-violet-500/5 border border-violet-500/40 text-violet-300">
									Complete Package
								</span>
								<div className="flex items-center gap-3 mb-3">
									<Stars className="w-6 h-6 text-[var(--aurora-violet-solid)]" />
									<h3 className="text-2xl font-bold">
										{fullConstellation.name}
									</h3>
								</div>
								<p className="text-sm text-[var(--text-muted)] mb-4 max-w-lg leading-relaxed">
									{fullConstellation.body || fullConstellation.subtitle}
								</p>
								{fullConstellation.includes && (
									<div className="flex flex-wrap gap-2 mb-6">
										{fullConstellation.includes.map((item: string) => (
											<span
												key={item}
												className="backdrop-blur-sm text-xs px-2.5 py-0.5 rounded-full border shadow-sm bg-gradient-to-r from-violet-500/15 to-violet-500/5 border-violet-500/40 text-violet-300 font-semibold"
											>
												{item}
											</span>
										))}
									</div>
								)}
							</div>
							<div className="text-center md:text-right shrink-0 md:min-w-[240px] flex flex-col justify-between">
								<div>
									<p className="text-[10px] font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-2">
										Starting from
									</p>
									<p className="text-4xl font-bold text-[var(--text-stellar)]">
										{fullConstellation.price}
									</p>
									<p className="text-sm font-medium text-[var(--text-muted)] mt-2">
										Engagement: {fullConstellation.timeline}
									</p>
								</div>
								<div className="mt-12">
									<RainbowButton
										variant="glass"
										size="lg"
										className="rounded-xl w-full"
										asChild
									>
										<a href={fullConstellation.href}>{fullConstellation.cta}</a>
									</RainbowButton>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Every Engagement Includes */}
				<div className="max-w-6xl mx-auto mt-8 space-y-4">
					<div className="glass-card glass-card-tinted-blue p-8">
						<h4 className="font-semibold text-sm mb-4 text-[var(--text-stellar)]">
							Every engagement includes
						</h4>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
							{everyEngagement.map((item: (typeof everyEngagement)[0]) => (
								<div key={item.title}>
									<p className="text-sm font-medium text-[var(--text-stellar)] mb-1">
										{item.title}
									</p>
									<p className="text-xs text-[var(--text-muted)] leading-relaxed">
										{item.desc}
									</p>
								</div>
							))}
						</div>
					</div>
					<p className="text-xs text-center text-[var(--text-muted)] max-w-lg mx-auto leading-relaxed">
						{footer}
					</p>
				</div>
			</div>
		</section>
	);
}
