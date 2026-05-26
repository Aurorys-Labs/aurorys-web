"use client";

import { RainbowButton } from "@/components/ui/rainbow-button";
import { useEffect, useState } from "react";

import {
	BadgeCheck,
	Compass,
	FileBadge,
	GitBranch,
	Mountain,
	PenTool,
	Radio,
	Search,
	Sparkles,
	Star,
	Target,
	Zap,
} from "lucide-react";
import { DropdownNavigation, type NavItem } from "./DropdownNavigation";

const navItems: NavItem[] = [
	{
		id: 1,
		label: "Solutions",
		href: "/solutions",
		subMenus: [
			{
				title: "Offerings",
				items: [
					{
						label: "First light",
						description: "Understand your posture",
						icon: Sparkles,
						href: "/solutions?view=first-light",
					},
					{
						label: "Foundation",
						description: "Build security into your foundation",
						icon: Compass,
						href: "/solutions?view=foundation",
					},
					{
						label: "Pulse",
						description: "Shipping secure with confidence",
						icon: GitBranch,
						href: "/solutions?view=pulse",
					},
					{
						label: "Program Foundation",
						description: "Backbone security program",
						icon: FileBadge,
						href: "/solutions?view=program-foundation",
					},
				],
			},
			{
				title: "Add On Engagements",
				items: [
					{
						label: "Surge",
						description: "High-impact tactical sprints",
						icon: Zap,
						href: "/solutions/surge",
					},
					{
						label: "Sprints",
						description: "Focused engineering pushes",
						icon: Target,
						href: "/solutions/sprints",
					},
					{
						label: "Full Constellation",
						description: "End-to-end security partnership",
						icon: Star,
						href: "/solutions/full-constellation",
					},
				],
			},
		],
	},
	{
		id: 2,
		label: "Security Paths",
		href: "/security-paths",
		subMenus: [
			{
				title: "Core Packages",
				items: [
					{
						label: "Clarity",
						description: "See where you stand. Know what to fix first.",
						icon: Search,
						href: "/security-paths#clarity",
					},
					{
						label: "Blueprint",
						description: "Security designed into your foundation.",
						icon: PenTool,
						href: "/security-paths#blueprint",
					},
					{
						label: "Independence",
						description: "Break free from cloud dependency.",
						icon: Mountain,
						href: "/security-paths#independence",
					},
				],
			},
			{
				title: "Specialized & Ongoing",
				items: [
					{
						label: "Clearance",
						description: "Audit-ready. Enterprise-deal-ready.",
						icon: BadgeCheck,
						href: "/security-paths#clearance",
					},
					{
						label: "Beacon",
						description: "Your long-term security architect.",
						icon: Radio,
						href: "/security-paths#beacon",
					},
				],
			},
		],
	},
	{ id: 3, label: "Compliance", href: "/compliance" },
	{ id: 4, label: "How We Work", href: "/how-we-work" },
	{ id: 5, label: "Roots", href: "/roots" },
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
						? "mx-4 mt-4 px-6 py-2 rounded-2xl backdrop-blur-xl bg-[rgba(13,17,23,0.55)] border border-white/[0.06] border-t-white/[0.10]"
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

				<div className="hidden md:flex items-center ml-auto mr-4">
					<DropdownNavigation navItems={navItems} />
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
