import { motion } from "framer-motion";
import React from "react";

interface ComparisonRow {
	label: string;
	surge: string;
	full: string;
}

interface SurgeVsFullTableProps {
	comparisonData: {
		title: string;
		rows: ComparisonRow[];
		closingNote: string;
	};
}

export function SurgeVsFullTable({ comparisonData }: SurgeVsFullTableProps) {
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
							<th className="py-4 px-6 text-sm font-semibold text-[var(--text-stellar)] w-1/4">
								Aspect
							</th>
							<th className="py-4 px-6 text-sm font-semibold text-[var(--text-stellar)] w-3/8">
								Surge
							</th>
							<th className="py-4 px-6 text-sm font-semibold text-[var(--text-stellar)] w-3/8">
								Full Constellation
							</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-white/[0.04]">
						{comparisonData.rows.map((row) => (
							<tr
								key={row.label}
								className="hover:bg-white/[0.01] transition-colors"
							>
								<td className="py-4 px-6 text-sm text-[var(--text-stellar)] font-semibold font-sans">
									{row.label}
								</td>
								<td className="py-4 px-6 text-sm text-white/80 font-sans leading-relaxed">
									{row.surge}
								</td>
								<td className="py-4 px-6 text-sm text-white/80 font-sans leading-relaxed">
									{row.full}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			{comparisonData.closingNote && (
				<div className="py-4 px-6 bg-white/[0.01] border-t border-white/[0.06] text-xs text-[var(--text-muted)] text-center font-sans leading-relaxed">
					{comparisonData.closingNote}
				</div>
			)}
		</motion.div>
	);
}
