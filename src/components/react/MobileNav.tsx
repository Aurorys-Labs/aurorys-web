"use client";

import { RainbowButton } from "@/components/ui/rainbow-button";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import {
	BadgeCheck,
	BookOpen,
	Compass,
	GitBranch,
	LayoutGrid,
	Menu,
	MessageSquare,
	Mountain,
	Orbit,
	PenTool,
	Radio,
	Route,
	Scale,
	Search,
	Shield,
	ShieldCheck,
	Sparkles,
	Target,
	Workflow,
	X,
	Zap,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

// Flick / Radial Menu Nodes
const radialNodes = [
	{ name: "Solutions", href: "/solutions", icon: LayoutGrid },
	{ name: "Paths", href: "/security-paths", icon: Route },
	{ name: "Contact", href: "/contact", icon: MessageSquare },
	{ name: "Compliance", href: "/compliance", icon: Shield },
	{ name: "How We Work", href: "/how-we-work", icon: Workflow },
	{ name: "Roots", href: "/roots", icon: Compass },
];

// Mega Menu Tabs Data
const MEGA_MENU_TABS = [
	{ id: "paths", label: "Paths" },
	{ id: "solutions", label: "Solutions" },
	{ id: "company", label: "Company" },
	{ id: "legal", label: "Legal" },
];

const MEGA_MENU_CONTENT: Record<
	string,
	{
		label: string;
		href: string;
		icon: React.ElementType;
		description?: string;
		highlight?: boolean;
	}[]
> = {
	paths: [
		{
			label: "Clarity Path",
			href: "/security-paths#clarity",
			icon: Search,
			description: "Discover unknown risks.",
		},
		{
			label: "Blueprint Path",
			href: "/security-paths#blueprint",
			icon: PenTool,
			description: "Security designed in.",
		},
		{
			label: "Independence Path",
			href: "/security-paths#independence",
			icon: Mountain,
			description: "Break cloud dependency.",
		},
		{
			label: "Clearance Path",
			href: "/security-paths#clearance",
			icon: Shield,
			description: "Audit-ready framework.",
		},
		{
			label: "Beacon Path",
			href: "/security-paths#beacon",
			icon: Radio,
			description: "Ongoing advisory.",
		},
	],
	solutions: [
		{
			label: "First Light",
			href: "/solutions?view=first-light",
			icon: Sparkles,
			description: "Posture assessment.",
		},
		{
			label: "Foundation",
			href: "/solutions?view=foundation",
			icon: Compass,
			description: "Architecture blueprint.",
		},
		{
			label: "Pulse",
			href: "/solutions?view=pulse",
			icon: GitBranch,
			description: "DevSecOps pipelines.",
		},
		{
			label: "Clearance",
			href: "/solutions?view=clearance",
			icon: BadgeCheck,
			description: "Audit-ready.",
		},
		{
			label: "Program Foundation",
			href: "/solutions?view=program-foundation",
			icon: ShieldCheck,
			description: "Backbone security.",
		},
		{
			label: "Escape Velocity",
			href: "/solutions?view=escape-velocity",
			icon: Mountain,
			description: "Sovereignty.",
		},
		{
			label: "Surge Stacks",
			href: "/solutions/surge",
			icon: Zap,
			description: "Hardened infra.",
			highlight: true,
		},
		{
			label: "Security Sprints",
			href: "/solutions/sprints",
			icon: Target,
			description: "Focused engineering.",
		},
		{
			label: "Full Constellation",
			href: "/solutions/full-constellation",
			icon: Orbit,
			description: "The complete engine.",
			highlight: true,
		},
	],
	company: [
		{
			label: "Roots",
			href: "/roots",
			icon: Compass,
			description: "Our origin story.",
		},
		{
			label: "How We Work",
			href: "/how-we-work",
			icon: Workflow,
			description: "Our methodology.",
		},
		{
			label: "Contact",
			href: "/contact",
			icon: MessageSquare,
			description: "Start a conversation.",
		},
		{
			label: "Blog",
			href: "/blog",
			icon: BookOpen,
			description: "Engineering insights.",
		},
	],
	legal: [
		{
			label: "Privacy Policy",
			href: "/legal/privacy",
			icon: Shield,
			description: "Data protection.",
		},
		{
			label: "Terms of Service",
			href: "/legal/terms",
			icon: Scale,
			description: "Usage terms.",
		},
		{
			label: "Cookie Policy",
			href: "/legal/cookies",
			icon: LayoutGrid,
			description: "Tracking info.",
		},
	],
};

export function MobileNav() {
	const [isOpen, setIsOpen] = useState(false);
	const [isRadialOpen, setIsRadialOpen] = useState(false);
	const [activeIndex, setActiveIndex] = useState<number | null>(null);
	const [showDemo, setShowDemo] = useState(false);
	const [activeTab, setActiveTab] = useState("paths");

	const containerRef = useRef<HTMLDivElement>(null);
	const isPointerDown = useRef(false);
	const isDragging = useRef(false);

	useEffect(() => {
		// Only run on mobile
		if (window.innerWidth >= 768) return;

		const hasSeenDemo = localStorage.getItem("hasSeenNavDemo_v3");

		if (!hasSeenDemo) {
			let isAnimating = false;
			const handleScroll = () => {
				if (window.scrollY > 200 && !isAnimating) {
					isAnimating = true;
					window.removeEventListener("scroll", handleScroll);
					localStorage.setItem("hasSeenNavDemo_v3", "true");

					setShowDemo(true);
					sequenceDemo();
				}
			};
			window.addEventListener("scroll", handleScroll, { passive: true });
			return () => window.removeEventListener("scroll", handleScroll);
		}
	}, []);

	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}
		return () => {
			document.body.style.overflow = "";
		};
	}, [isOpen]);

	const sequenceDemo = async () => {
		await new Promise((resolve) => setTimeout(resolve, 300));
		setIsRadialOpen(true);
		await new Promise((resolve) => setTimeout(resolve, 600));
		setActiveIndex(3);
		await new Promise((resolve) => setTimeout(resolve, 800));
		setActiveIndex(null);
		setIsRadialOpen(false);
		setTimeout(() => setShowDemo(false), 500);
	};

	const handlePointerDown = (e: React.PointerEvent) => {
		if (isOpen) return; // Don't trigger radial if modal is open
		isPointerDown.current = true;
		isDragging.current = false;

		// Delay radial open slightly to allow tap
		const timer = setTimeout(() => {
			if (isPointerDown.current) {
				setIsRadialOpen(true);
				if ("vibrate" in navigator) navigator.vibrate(50);
			}
		}, 200); // reduced to 200ms to feel snappier

		containerRef.current?.setAttribute("data-timer", timer.toString());
	};

	const handlePointerUp = (e: React.PointerEvent) => {
		isPointerDown.current = false;
		const timer = containerRef.current?.getAttribute("data-timer");
		if (timer) clearTimeout(Number.parseInt(timer));

		if (isRadialOpen) {
			setIsRadialOpen(false);
			// Navigate if a node is active
			if (activeIndex !== null) {
				if ("vibrate" in navigator) navigator.vibrate(30);
				window.location.href = radialNodes[activeIndex].href;
			}
			setActiveIndex(null);
		} else if (!isDragging.current) {
			// It was a clean tap!
			setIsOpen((prev) => !prev);
		}
		isDragging.current = false;
	};

	const handlePointerMove = (e: React.PointerEvent) => {
		if (!isPointerDown.current || !containerRef.current) return;

		const rect = containerRef.current.getBoundingClientRect();
		const centerX = rect.left + rect.width / 2;
		const centerY = rect.top + rect.height / 2;

		const dx = e.clientX - centerX;
		const dy = e.clientY - centerY;
		const distance = Math.sqrt(dx * dx + dy * dy);

		// If dragged beyond a small threshold, consider it a drag/flick
		if (distance > 15) {
			isDragging.current = true;

			// If radial menu isn't open yet, force it open immediately (flick gesture)
			if (!isRadialOpen && !isOpen) {
				setIsRadialOpen(true);
				const timer = containerRef.current?.getAttribute("data-timer");
				if (timer) clearTimeout(Number.parseInt(timer));
				if ("vibrate" in navigator) navigator.vibrate(50);
			}
		}

		if (!isRadialOpen && !isOpen) return; // wait for next frame

		if (distance < 40) {
			setActiveIndex(null);
			return;
		}

		// Calculate angle in radians (0 is right, PI is left)
		// dy is negative because screen Y goes down
		let angle = Math.atan2(-dy, dx);
		if (angle < 0) angle += Math.PI * 2;

		// Map angle to a node
		// Nodes span from roughly Math.PI * 0.9 to Math.PI * 0.1
		const startAngle = Math.PI * 0.95;
		const endAngle = Math.PI * 0.05;
		const totalAngle = startAngle - endAngle;
		const angleStep = totalAngle / (radialNodes.length - 1);

		let closestIdx = -1;
		let minDiff = Number.POSITIVE_INFINITY;

		for (let i = 0; i < radialNodes.length; i++) {
			const nodeAngle = startAngle - i * angleStep;
			let diff = Math.abs(angle - nodeAngle);
			if (diff > Math.PI) diff = Math.PI * 2 - diff;

			if (diff < minDiff && diff < Math.PI * 0.2) {
				minDiff = diff;
				closestIdx = i;
			}
		}

		if (closestIdx !== activeIndex) {
			if (closestIdx !== -1 && "vibrate" in navigator) navigator.vibrate(10);
			setActiveIndex(closestIdx);
		}
	};

	const radius = 135;
	const startAngle = Math.PI * 0.95;
	const endAngle = Math.PI * 0.05;
	const angleStep = (startAngle - endAngle) / (radialNodes.length - 1);

	return (
		<div className="md:hidden">
			{/* Dim Lights Overlay for Demo */}
			<AnimatePresence>
				{showDemo && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="fixed inset-0 z-[55] bg-black/60 pointer-events-none backdrop-blur-[2px]"
					/>
				)}
			</AnimatePresence>

			{/* Full Screen Mega Menu Modal using 100dvh */}
			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0, y: "100%" }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: "100%" }}
						transition={{ type: "spring", damping: 25, stiffness: 200 }}
						className="fixed inset-x-0 bottom-0 z-[60] bg-[rgba(13,17,23,0.95)] backdrop-blur-3xl rounded-t-[32px] flex flex-col border-t border-white/[0.08] shadow-[0_-10px_40px_rgba(0,0,0,0.5)]"
						style={{ height: "100dvh" }}
					>
						<div className="flex justify-between items-center px-6 pt-6 pb-4 border-b border-white/[0.08]">
							<div className="flex items-center gap-2">
								<img
									src="/images/logos/normal updated colors.svg"
									alt="Aurorys Labs"
									className="h-6 w-auto"
								/>
								<span className="font-semibold text-white/90">
									Aurorys Labs
								</span>
							</div>
							<button
								onClick={() => setIsOpen(false)}
								className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/80 hover:text-white"
							>
								<X className="w-5 h-5" />
							</button>
						</div>

						{/* Mega Menu Tabs */}
						<div className="flex items-center gap-2 px-6 py-4 overflow-x-auto shrink-0 no-scrollbar border-b border-white/[0.04]">
							{MEGA_MENU_TABS.map((tab) => (
								<button
									key={tab.id}
									onClick={() => setActiveTab(tab.id)}
									className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
										activeTab === tab.id
											? "bg-[rgba(0,232,160,0.15)] text-[var(--aurora-green-solid)] border border-[rgba(0,232,160,0.3)]"
											: "bg-white/5 text-[var(--text-muted)] border border-transparent hover:text-white"
									}`}
								>
									{tab.label}
								</button>
							))}
						</div>

						{/* Mega Menu Content */}
						<div className="flex-1 overflow-y-auto px-6 py-6 pb-32">
							<div className="grid grid-cols-1 gap-3">
								<AnimatePresence mode="wait">
									<motion.div
										key={activeTab}
										initial={{ opacity: 0, x: 20 }}
										animate={{ opacity: 1, x: 0 }}
										exit={{ opacity: 0, x: -20 }}
										transition={{ duration: 0.2 }}
										className="flex flex-col gap-3"
									>
										{MEGA_MENU_CONTENT[activeTab]?.map((item, idx) => (
											<a
												key={item.label}
												href={item.href}
												onClick={() => setIsOpen(false)}
												className={`p-4 rounded-[20px] flex items-center gap-4 transition-colors border ${
													item.highlight
														? "bg-[rgba(0,232,160,0.05)] border-[rgba(0,232,160,0.2)] hover:bg-[rgba(0,232,160,0.1)]"
														: "bg-[rgba(255,255,255,0.03)] border-white/[0.06] hover:bg-[rgba(255,255,255,0.08)]"
												}`}
											>
												<div
													className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
														item.highlight
															? "bg-[rgba(0,232,160,0.15)] text-[var(--aurora-green-solid)]"
															: "bg-white/5 text-[var(--text-muted)]"
													}`}
												>
													<item.icon className="w-5 h-5" />
												</div>
												<div className="flex flex-col">
													<span
														className={`font-semibold text-[15px] leading-tight ${item.highlight ? "text-[var(--text-stellar)]" : "text-white/90"}`}
													>
														{item.label}
													</span>
													{item.description && (
														<span className="text-xs text-[var(--text-muted)] mt-0.5">
															{item.description}
														</span>
													)}
												</div>
											</a>
										))}
									</motion.div>
								</AnimatePresence>
							</div>
						</div>

						{/* Fixed CTA at bottom */}
						<div className="absolute bottom-0 left-0 right-0 p-6 pt-4 pb-[100px] bg-gradient-to-t from-[rgba(13,17,23,1)] via-[rgba(13,17,23,0.95)] to-transparent pointer-events-none z-10">
							<div className="pointer-events-auto">
								<RainbowButton
									className="w-full justify-center py-6 rounded-2xl text-base shadow-lg shadow-black/50"
									asChild
								>
									<a href="/contact" onClick={() => setIsOpen(false)}>
										Start a Conversation
									</a>
								</RainbowButton>
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Thumb Dock */}
			<div className="fixed bottom-6 left-0 right-0 z-[70] flex justify-center pointer-events-none">
				<div className="relative pointer-events-auto">
					{/* Radial Menu */}
					<AnimatePresence>
						{isRadialOpen && (
							<motion.div
								initial={{ opacity: 0, scale: 0.5, y: 50 }}
								animate={{ opacity: 1, scale: 1, y: 0 }}
								exit={{ opacity: 0, scale: 0.5, y: 50 }}
								transition={{ type: "spring", damping: 25, stiffness: 200 }}
								className="absolute bottom-[32px] translate-y-1/2 left-1/2 -translate-x-1/2 w-[340px] h-[340px] rounded-full bg-[rgba(13,17,23,0.65)] backdrop-blur-3xl border border-white/[0.08] shadow-[0_0_40px_rgba(0,0,0,0.7)]"
							/>
						)}
					</AnimatePresence>
					<AnimatePresence>
						{isRadialOpen && (
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								className="absolute bottom-6 left-1/2 -translate-x-1/2 w-0 h-0"
							>
								{radialNodes.map((node, i) => {
									const angle = startAngle - i * angleStep;
									const x = Math.cos(angle) * radius;
									const y = -Math.sin(angle) * radius;
									const isActive = activeIndex === i;

									return (
										<motion.div
											key={node.name}
											initial={{ opacity: 0, x: 0, y: 0, scale: 0.5 }}
											animate={{
												opacity: 1,
												x,
												y,
												scale: isActive ? 1.2 : 1,
											}}
											exit={{ opacity: 0, x: 0, y: 0, scale: 0.5 }}
											transition={{
												type: "spring",
												damping: 20,
												stiffness: 300,
												delay: i * 0.02,
											}}
											className="absolute left-[-28px] top-[-28px]"
										>
											<div
												className={`w-14 h-14 flex flex-col items-center justify-center gap-1 transition-colors duration-200 ${
													isActive
														? "text-[var(--aurora-green-solid)] drop-shadow-[0_0_15px_rgba(0,232,160,0.8)]"
														: "text-white/70"
												}`}
											>
												<node.icon
													className={`w-6 h-6 transition-transform duration-300 ${isActive ? "scale-110" : "scale-100"}`}
													strokeWidth={isActive ? 2.5 : 2}
												/>
											</div>

											<AnimatePresence>
												{isActive && (
													<motion.div
														initial={{ opacity: 0, y: 5 }}
														animate={{ opacity: 1, y: 0 }}
														exit={{ opacity: 0, y: 5 }}
														className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#0d1117]/90 border border-white/10 px-3 py-1 rounded-lg text-xs font-medium text-white/90 backdrop-blur-md shadow-lg"
													>
														{node.name}
													</motion.div>
												)}
											</AnimatePresence>
										</motion.div>
									);
								})}
							</motion.div>
						)}
					</AnimatePresence>

					{/* Trigger Button */}
					<div
						ref={containerRef}
						onPointerDown={handlePointerDown}
						onPointerMove={handlePointerMove}
						onPointerUp={handlePointerUp}
						onPointerCancel={handlePointerUp}
						className="touch-none group"
					>
						<motion.div
							animate={
								showDemo
									? {
											scale: [1, 1.1, 1],
											boxShadow: [
												"0 8px 32px rgba(0,0,0,0.3)",
												"0 0 0 15px rgba(0,232,160,0.2)",
												"0 0 0 30px rgba(0,232,160,0)",
											],
										}
									: { scale: 1, boxShadow: "0 8px 32px rgba(0,0,0,0.3)" }
							}
							transition={{
								duration: 1.5,
								repeat: showDemo ? Number.POSITIVE_INFINITY : 0,
							}}
							className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
								isOpen || isRadialOpen
									? "bg-[rgba(13,17,23,0.9)] backdrop-blur-2xl border border-white/[0.15] scale-95"
									: "bg-[rgba(13,17,23,0.7)] backdrop-blur-2xl border border-white/[0.15] border-t-white/[0.25]"
							}`}
						>
							{isOpen ? (
								<X className="w-7 h-7 text-white" />
							) : (
								<img
									src="/images/logos/normal updated colors.svg"
									alt="Menu"
									className={`w-8 h-8 transition-opacity ${isRadialOpen ? "opacity-30" : "opacity-100"}`}
								/>
							)}
						</motion.div>
					</div>
				</div>
			</div>
		</div>
	);
}
