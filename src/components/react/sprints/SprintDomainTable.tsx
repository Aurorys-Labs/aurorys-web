import { motion } from "framer-motion";
import React from "react";

interface Domain {
	name: string;
	assessment: boolean;
	buildPartnership: boolean;
}

interface SprintDomainTableProps {
	domainData: {
		title: string;
		subtitle: string;
		domains: Domain[];
		closingNote: string;
	};
}

export function SprintDomainTable({ domainData }: SprintDomainTableProps) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 15 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className="glass-card rounded-2xl border border-white/[0.06] backdrop-blur-xl bg-[rgba(13,17,23,0.25)] overflow-hidden"
		>
			<div className="overflow-x-auto">
				<table className="w-full text-left border-collapse">
					<thead>
						<tr className="border-b border-white/[0.08] bg-white/[0.02]">
							<th className="py-4 px-6 text-sm font-semibold text-[var(--text-stellar)]">
								Domain
							</th>
							<th className="py-4 px-6 text-sm font-semibold text-[var(--text-stellar)] text-center w-40">
								Assessment
							</th>
							<th className="py-4 px-6 text-sm font-semibold text-[var(--text-stellar)] text-center w-48">
								Build Partnership
							</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-white/[0.04]">
						{domainData.domains.map((domain, idx) => (
							<tr
								key={domain.name}
								className="hover:bg-white/[0.01] transition-colors"
							>
								<td className="py-4 px-6 text-sm text-white/80 font-medium font-sans">
									{domain.name}
								</td>
								<td className="py-4 px-6 text-center">
									{domain.assessment ? (
										<span className="inline-flex items-center justify-center p-1 rounded-full bg-[var(--aurora-green-solid)]/10 text-[var(--aurora-green-solid)]">
											<svg
												className="w-4 h-4"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
												strokeWidth="3"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													d="M5 13l4 4L19 7"
												/>
											</svg>
										</span>
									) : (
										<span className="text-white/20">—</span>
									)}
								</td>
								<td className="py-4 px-6 text-center">
									{domain.buildPartnership ? (
										<span className="inline-flex items-center justify-center p-1 rounded-full bg-[var(--aurora-blue-solid)]/10 text-[var(--aurora-blue-solid)]">
											<svg
												className="w-4 h-4"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
												strokeWidth="3"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													d="M5 13l4 4L19 7"
												/>
											</svg>
										</span>
									) : (
										<span className="text-white/20">—</span>
									)}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			{domainData.closingNote && (
				<div className="py-4 px-6 bg-white/[0.01] border-t border-white/[0.06] text-xs text-[var(--text-muted)] text-center font-sans">
					{domainData.closingNote}
				</div>
			)}
		</motion.div>
	);
}
