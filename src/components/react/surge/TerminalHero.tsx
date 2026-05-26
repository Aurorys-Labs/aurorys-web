import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

interface TerminalHeroProps {
	sequence: string[];
}

export function TerminalHero({ sequence }: TerminalHeroProps) {
	const [visibleLines, setVisibleLines] = useState<string[]>([]);
	const [currentLineIndex, setCurrentLineIndex] = useState(0);
	const [typedText, setTypedText] = useState("");
	const [isComplete, setIsComplete] = useState(false);

	useEffect(() => {
		if (currentLineIndex >= sequence.length) {
			setIsComplete(true);
			return;
		}

		const fullText = sequence[currentLineIndex];
		let charIndex = 0;
		setTypedText("");

		const interval = setInterval(() => {
			if (charIndex < fullText.length) {
				setTypedText((prev) => prev + fullText[charIndex]);
				charIndex++;
			} else {
				clearInterval(interval);
				// Add completed line to visible lines and move to next
				setVisibleLines((prev) => [...prev, fullText]);
				setTypedText("");
				setCurrentLineIndex((prev) => prev + 1);
			}
		}, 35); // speed of typing

		return () => clearInterval(interval);
	}, [currentLineIndex, sequence]);

	// Restart terminal sequence loop after a delay
	useEffect(() => {
		if (isComplete) {
			const timer = setTimeout(() => {
				setVisibleLines([]);
				setCurrentLineIndex(0);
				setIsComplete(false);
			}, 6000); // Wait 6 seconds before looping
			return () => clearTimeout(timer);
		}
	}, [isComplete]);

	return (
		<div className="w-full max-w-2xl mx-auto rounded-xl border border-white/[0.08] bg-zinc-950/85 backdrop-blur-xl shadow-2xl overflow-hidden text-left font-mono text-xs md:text-sm select-none">
			{/* Terminal window header */}
			<div className="flex items-center justify-between px-4 py-3 bg-white/[0.03] border-b border-white/[0.08]">
				<div className="flex gap-1.5">
					<span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
					<span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
					<span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
				</div>
				<span className="text-[10px] text-white/40 tracking-wider uppercase font-semibold">
					aurorys_core_deploy.log
				</span>
				<div className="w-12" /> {/* spacer */}
			</div>

			{/* Terminal body */}
			<div className="p-6 space-y-2.5 h-[240px] text-emerald-400/90 leading-relaxed overflow-y-auto">
				{visibleLines.map((line, i) => (
					<div
						key={i}
						className={
							line.startsWith("> [SUCCESS]")
								? "text-[var(--aurora-green-solid)] font-semibold"
								: "text-white/80"
						}
					>
						{line}
					</div>
				))}

				{!isComplete && currentLineIndex < sequence.length && (
					<div className="text-white/80">
						{typedText}
						<span className="inline-block w-1.5 h-4 bg-emerald-400 animate-pulse ml-0.5" />
					</div>
				)}

				{isComplete && (
					<div className="flex items-center gap-1.5 text-[var(--aurora-green-solid)]/80 font-medium">
						<span>&gt; Deployment active. System secure.</span>
						<span className="inline-block w-1.5 h-4 bg-[var(--aurora-green-solid)] animate-pulse" />
					</div>
				)}
			</div>
		</div>
	);
}
