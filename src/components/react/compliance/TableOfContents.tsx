"use client";

import type React from "react";
import { useEffect, useState } from "react";

interface TOCItem {
	id: string;
	label: string;
}

interface TableOfContentsProps {
	items: TOCItem[];
}

export function TableOfContents({ items }: TableOfContentsProps) {
	const [activeId, setActiveId] = useState<string>("");

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				// Find first visible entry that intersects
				const visible = entries.find((e) => e.isIntersecting);
				if (visible) {
					setActiveId(visible.target.id);
				}
			},
			{
				rootMargin: "-80px 0px -50% 0px", // Trigger when header passes upper-middle of viewport
				threshold: 0.1,
			},
		);

		items.forEach((item) => {
			const el = document.getElementById(item.id);
			if (el) observer.observe(el);
		});

		return () => observer.disconnect();
	}, [items]);

	const handleScrollTo = (
		e: React.MouseEvent<HTMLAnchorElement>,
		id: string,
	) => {
		e.preventDefault();
		const el = document.getElementById(id);
		if (el) {
			const offset = 100; // Account for header
			const bodyRect = document.body.getBoundingClientRect().top;
			const elementRect = el.getBoundingClientRect().top;
			const elementPosition = elementRect - bodyRect;
			const offsetPosition = elementPosition - offset;

			window.scrollTo({
				top: offsetPosition,
				behavior: "smooth",
			});
			// Update URL hash state silently
			window.history.pushState(null, "", `#${id}`);
		}
	};

	return (
		<div className="space-y-4">
			<div className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)] font-mono border-b border-white/[0.05] pb-2">
				On This Page
			</div>
			<ul className="space-y-2.5">
				{items.map((item) => {
					const isActive = activeId === item.id;
					return (
						<li key={item.id} className="relative pl-4 font-sans text-sm">
							{/* Indicator line */}
							<div
								className={`absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-3 rounded-full transition-all duration-300 ${
									isActive
										? "bg-[var(--aurora-green-solid)] scale-y-125"
										: "bg-transparent scale-y-75"
								}`}
							/>
							<a
								href={`#${item.id}`}
								onClick={(e) => handleScrollTo(e, item.id)}
								className={`transition-colors duration-200 ${
									isActive
										? "text-[var(--text-stellar)] font-semibold"
										: "text-white/50 hover:text-white/80"
								}`}
							>
								{item.label}
							</a>
						</li>
					);
				})}
			</ul>
		</div>
	);
}
