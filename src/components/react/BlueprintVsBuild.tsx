"use client";

import { Check, X } from "lucide-react";

export function BlueprintVsBuild() {
	const features = [
		{ label: "Architecture & design", blueprint: "✓", build: "✓" },
		{ label: "IaC starter templates", blueprint: "✓", build: "✓" },
		{ label: "Implementation guide", blueprint: "✓", build: "✓" },
		{
			label: "Review checkpoints",
			blueprint: "Defined checkpoints",
			build: "Weekly reviews + milestone validation",
		},
		{
			label: "Async access",
			blueprint: "✗",
			build: "✓ Slack/email for questions",
		},
		{
			label: "Weekly sync calls",
			blueprint: "✗",
			build: "✓ Throughout build phase",
		},
		{
			label: "Team training sessions",
			blueprint: "Knowledge transfer session(s)",
			build: "Ongoing training woven into delivery",
		},
		{
			label: "Implementation validation",
			blueprint: "Review at defined checkpoints",
			build: "Validate every critical implementation",
		},
		{
			label: "Decision log",
			blueprint: "✗",
			build: "✓ Running document of decisions + rationale",
		},
		{
			label: "Pair sessions",
			blueprint: "✗",
			build: "✓ Guided implementation session(s)",
		},
		{
			label: "Post-implementation review",
			blueprint: "✗",
			build: "✓ Full validation + hardening review",
		},
		{
			label: "Best for",
			blueprint: "Teams with engineering capacity who need the plan",
			build: "Teams who want senior guidance during implementation",
		},
	];

	const renderValue = (val: string) => {
		if (val === "✓")
			return (
				<Check className="w-5 h-5 text-[var(--aurora-green-solid)] mx-auto" />
			);
		if (val === "✗")
			return <X className="w-5 h-5 text-[var(--text-faint)] mx-auto" />;
		if (val.startsWith("✓ "))
			return (
				<div className="flex items-start justify-center gap-2 text-left md:text-center w-full">
					<Check className="w-4 h-4 mt-0.5 text-[var(--aurora-green-solid)] shrink-0" />
					<span className="flex-1">{val.substring(2)}</span>
				</div>
			);
		return <span className="text-white/80">{val}</span>;
	};

	return (
		<section className="section-padding border-t border-[var(--border-default)]">
			<div className="content-width">
				<div className="text-center mb-16">
					<h2 className="font-sans font-bold text-3xl md:text-5xl mb-4 tracking-tight">
						Two Ways To Engage.{" "}
						<span className="text-gradient-aurora">One Clear Difference.</span>
					</h2>
					<p className="text-white/60 max-w-2xl mx-auto leading-relaxed">
						Every engagement starts with a Blueprint — the architecture,
						templates, and implementation guide your team needs. What happens
						next is up to you.
					</p>
				</div>

				<div className="max-w-5xl mx-auto">
					{/* Desktop Table */}
					<div className="hidden md:block glass-card overflow-hidden">
						<div className="grid grid-cols-12 gap-4 p-6 border-b border-white/[0.06] bg-white/[0.01]">
							<div className="col-span-4"></div>
							<div className="col-span-4 text-center font-bold text-lg text-[var(--text-stellar)]">
								Blueprint
							</div>
							<div className="col-span-4 text-center font-bold text-lg text-[var(--aurora-blue-solid)]">
								Build Partnership
							</div>
						</div>

						<div className="divide-y divide-white/[0.04]">
							{features.map((f, i) => (
								<div
									key={i}
									className="grid grid-cols-12 gap-4 p-6 items-center hover:bg-white/[0.02] transition-colors"
								>
									<div className="col-span-4 text-sm font-medium text-[var(--text-muted)]">
										{f.label}
									</div>
									<div className="col-span-4 text-sm text-center px-4">
										{renderValue(f.blueprint)}
									</div>
									<div className="col-span-4 text-sm text-center px-4">
										{renderValue(f.build)}
									</div>
								</div>
							))}
						</div>
					</div>

					{/* Mobile Cards */}
					<div className="md:hidden space-y-6">
						<div className="glass-card p-6 border-t-2 border-t-white/10">
							<h3 className="text-xl font-bold text-[var(--text-stellar)] mb-6 text-center">
								Blueprint
							</h3>
							<div className="space-y-4 divide-y divide-white/[0.04]">
								{features.map((f, i) => (
									<div key={i} className="pt-4 first:pt-0">
										<p className="text-xs text-[var(--text-faint)] mb-1 uppercase tracking-wider">
											{f.label}
										</p>
										<div className="text-sm">{renderValue(f.blueprint)}</div>
									</div>
								))}
							</div>
						</div>

						<div className="glass-card glass-card-tinted-blue p-6 border-t-2 border-t-[var(--aurora-blue-solid)]/40 ring-1 ring-[var(--aurora-blue-solid)]/10 shadow-[0_0_30px_-10px_rgba(59,130,246,0.1)]">
							<h3 className="text-xl font-bold text-[var(--aurora-blue-solid)] mb-6 text-center">
								Build Partnership
							</h3>
							<div className="space-y-4 divide-y divide-white/[0.04]">
								{features.map((f, i) => (
									<div key={i} className="pt-4 first:pt-0">
										<p className="text-xs text-[var(--text-faint)] mb-1 uppercase tracking-wider">
											{f.label}
										</p>
										<div className="text-sm">{renderValue(f.build)}</div>
									</div>
								))}
							</div>
						</div>
					</div>

					<div className="mt-8 glass-card p-6 border-l-2 border-l-[var(--aurora-blue-solid)]/50 text-sm leading-relaxed max-w-3xl mx-auto">
						<p className="font-semibold text-[var(--text-stellar)] mb-2">
							For sovereignty engagements specifically, Build Partnership adds:
						</p>
						<ul className="space-y-1.5 text-[var(--text-muted)] list-disc pl-4">
							<li>Real-time guidance through migration execution</li>
							<li>Validation at each migration phase</li>
							<li>
								Hands-on troubleshooting during critical migration windows
							</li>
							<li>Post-migration hardening review and security validation</li>
							<li>
								Training on the new infrastructure for your operations team
							</li>
						</ul>
					</div>
				</div>
			</div>
		</section>
	);
}
