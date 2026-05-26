import { motion } from "framer-motion";
import React from "react";

interface NistRow {
	function: string;
	coverage: string;
}

interface FrameworkAlignmentProps {
	data: {
		title: string;
		subtitle: string;
		nistTable: NistRow[];
		cisBody: string;
		owaspBody: string;
		complianceBody: string;
	};
}

export function FrameworkAlignment({ data }: FrameworkAlignmentProps) {
	const functionColors: Record<string, string> = {
		Identify: "text-[var(--aurora-purple-solid)]",
		Protect: "text-[var(--aurora-blue-solid)]",
		Detect: "text-[var(--aurora-cyan-solid)]",
		Respond: "text-teal-400",
		Recover: "text-[var(--aurora-green-solid)]",
	};

	return (
		<div className="space-y-12 text-left">
			{/* Header */}
			<div className="max-w-3xl">
				<h2 className="font-sans font-bold text-3xl md:text-4xl tracking-tight text-[var(--text-stellar)] mb-4">
					{data.title}
				</h2>
				<p className="text-[var(--text-muted)] text-[var(--text-body)] font-sans">
					{data.subtitle}
				</p>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:items-center items-start">
				{/* NIST CSF Table (Grid columns 1-7) */}
				<div className="lg:col-span-7">
					<div className="glass-card rounded-2xl border border-white/[0.06] backdrop-blur-xl bg-[rgba(13,17,23,0.25)] overflow-hidden">
						<div className="overflow-x-auto">
							<table className="w-full text-left border-collapse">
								<thead>
									<tr className="border-b border-white/[0.08] bg-white/[0.02]">
										<th className="py-4 px-6 text-sm font-semibold text-[var(--text-stellar)] w-1/3">
											NIST CSF Function
										</th>
										<th className="py-4 px-6 text-sm font-semibold text-[var(--text-stellar)] w-2/3">
											How We Cover It
										</th>
									</tr>
								</thead>
								<tbody className="divide-y divide-white/[0.04] font-sans">
									{data.nistTable.map((row) => (
										<tr
											key={row.function}
											className="hover:bg-white/[0.01] transition-colors"
										>
											<td
												className={`py-4 px-6 text-sm font-semibold ${functionColors[row.function] || "text-[var(--text-stellar)]"}`}
											>
												{row.function}
											</td>
											<td className="py-4 px-6 text-sm text-white/80 leading-relaxed">
												{row.coverage}
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</div>

				{/* CIS, OWASP & SOC 2/ISO 27001 Cards (Grid columns 8-12) */}
				<div className="lg:col-span-5 space-y-6">
					{/* CIS Card */}
					<div className="glass-card p-6 rounded-2xl border border-white/[0.06] backdrop-blur-xl bg-[rgba(13,17,23,0.3)] relative overflow-hidden">
						<div className="absolute -top-16 -left-16 w-32 h-32 bg-[var(--aurora-blue-solid)]/5 rounded-full blur-2xl pointer-events-none" />
						<div className="space-y-3 relative z-10">
							<h3 className="font-sans font-bold text-lg text-[var(--text-stellar)] flex items-center gap-2">
								<span className="w-2 h-2 rounded-full bg-[var(--aurora-blue-solid)] animate-pulse" />
								CIS Controls Alignment
							</h3>
							<p className="text-white/70 text-sm leading-relaxed font-sans">
								{data.cisBody}
							</p>
						</div>
					</div>

					{/* OWASP & MITRE Card */}
					<div className="glass-card p-6 rounded-2xl border border-white/[0.06] backdrop-blur-xl bg-[rgba(13,17,23,0.3)] relative overflow-hidden">
						<div className="absolute -top-16 -left-16 w-32 h-32 bg-[var(--aurora-violet-solid)]/5 rounded-full blur-2xl pointer-events-none" />
						<div className="space-y-3 relative z-10">
							<h3 className="font-sans font-bold text-lg text-[var(--text-stellar)] flex items-center gap-2">
								<span className="w-2 h-2 rounded-full bg-[var(--aurora-violet-solid)] animate-pulse" />
								OWASP & MITRE ATT&CK
							</h3>
							<p className="text-white/70 text-sm leading-relaxed font-sans">
								{data.owaspBody}
							</p>
						</div>
					</div>

					{/* Compliance Alignment Card (SOC 2 & ISO 27001) */}
					<div className="glass-card p-6 rounded-2xl border border-white/[0.06] backdrop-blur-xl bg-[rgba(13,17,23,0.3)] relative overflow-hidden">
						<div className="absolute -top-16 -left-16 w-32 h-32 bg-[var(--aurora-green-solid)]/5 rounded-full blur-2xl pointer-events-none" />
						<div className="space-y-3 relative z-10">
							<h3 className="font-sans font-bold text-lg text-[var(--text-stellar)] flex items-center gap-2">
								<span className="w-2 h-2 rounded-full bg-[var(--aurora-green-solid)] animate-pulse" />
								SOC 2 & ISO 27001 Alignment
							</h3>
							<p className="text-white/70 text-sm leading-relaxed font-sans">
								{data.complianceBody}
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
