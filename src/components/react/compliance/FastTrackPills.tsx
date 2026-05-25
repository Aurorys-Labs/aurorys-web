import type React from "react";

interface PillOption {
	label: string;
	anchorId: string;
	icon: string;
}

interface FastTrackPillsProps {
	options: PillOption[];
}

const iconMap: Record<string, React.ReactNode> = {
	ShieldCheck: (
		<svg
			className="w-4 h-4 text-[var(--aurora-green-solid)]"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
			strokeWidth="2"
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
			/>
		</svg>
	),
	Flame: (
		<svg
			className="w-4 h-4 text-[var(--aurora-rose-solid)]"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
			strokeWidth="2"
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
			/>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
			/>
		</svg>
	),
	Sparkles: (
		<svg
			className="w-4 h-4 text-[var(--aurora-blue-solid)]"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
			strokeWidth="2"
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
			/>
		</svg>
	),
	FileText: (
		<svg
			className="w-4 h-4 text-[var(--text-stellar)]"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
			strokeWidth="2"
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
			/>
		</svg>
	),
	BookOpen: (
		<svg
			className="w-4 h-4 text-violet-400"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
			strokeWidth="2"
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
			/>
		</svg>
	),
	Route: (
		<svg
			className="w-4 h-4 text-sky-400"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
			strokeWidth="2"
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 4L9 7"
			/>
		</svg>
	),
};

export function FastTrackPills({ options }: FastTrackPillsProps) {
	const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
		if (id.startsWith("/")) {
			// Navigate to external path naturally
			return;
		}
		e.preventDefault();
		const target = document.getElementById(id);
		if (target) {
			target.scrollIntoView({ behavior: "smooth", block: "start" });
		}
	};

	return (
		<div className="flex flex-wrap justify-center gap-3">
			{options.map((option) => (
				<a
					key={option.anchorId}
					href={
						option.anchorId.startsWith("/")
							? option.anchorId
							: `#${option.anchorId}`
					}
					onClick={(e) => handleScroll(e, option.anchorId)}
					className="backdrop-blur-md bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.08] hover:border-white/[0.12] transition-colors rounded-full px-4 py-2 inline-flex items-center gap-2 text-sm font-sans font-medium text-white/90"
				>
					{iconMap[option.icon]}
					<span>{option.label}</span>
				</a>
			))}
		</div>
	);
}
