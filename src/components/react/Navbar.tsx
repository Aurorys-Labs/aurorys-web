"use client";

import { RainbowButton } from "@/components/ui/rainbow-button";
import { useEffect, useState } from "react";

const navItems = [
	{ name: "Solutions", href: "/solutions" },
	{ name: "Compliance", href: "/compliance" },
	{ name: "Your Path", href: "/security-paths" },
	{ name: "How We Work", href: "/how-we-work" },
	{ name: "Roots", href: "/roots" },
	{ name: "Trust Center", href: "/trust" },
];

export function Navbar() {
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 60);
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	return (
		<nav
			className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 hidden md:flex ${
				scrolled ? "justify-center pointer-events-none" : "justify-center"
			}`}
		>
			<div
				className={`pointer-events-auto transition-all duration-500 flex items-center gap-8 ${
					scrolled
						? "mx-4 mt-4 px-6 py-3 rounded-2xl backdrop-blur-xl bg-[rgba(13,17,23,0.55)] border border-white/[0.06] border-t-white/[0.10]"
						: "w-full px-6 md:px-12 py-4 bg-transparent"
				}`}
			>
				<a href="/" className="flex items-center gap-2 shrink-0">
					<img
						src="/images/logos/normal updated colors.svg"
						alt="Aurorys Labs"
						className="h-6 w-auto"
					/>
					<span
						className={`font-semibold text-sm tracking-tight transition-colors ${
							scrolled ? "text-[var(--text-stellar)]" : "text-white/90"
						}`}
					>
						Aurorys Labs
					</span>
				</a>

				<div className="hidden md:flex items-center gap-6 ml-auto mr-6">
					{navItems.map((item) => (
						<a
							key={item.name}
							href={item.href}
							className="relative text-sm text-white/60 hover:text-white transition-colors duration-150 group"
						>
							{item.name}
							<span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[var(--aurora-green-solid)] group-hover:w-full transition-all duration-200" />
						</a>
					))}
				</div>

				<RainbowButton
					variant="glass"
					size="sm"
					className="rounded-xl shrink-0"
					asChild
				>
					<a href="/contact">Start a Conversation</a>
				</RainbowButton>
			</div>
		</nav>
	);
}
