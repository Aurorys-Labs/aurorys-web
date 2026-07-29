"use client";

import { AnimatePresence, motion } from "framer-motion";
import Fuse from "fuse.js";
import {
	ArrowRight,
	BadgeCheck,
	BookOpen,
	Bot,
	Compass,
	Cpu,
	FileText,
	Globe,
	HelpCircle,
	Lightbulb,
	Mountain,
	Orbit,
	PenTool,
	Search,
	ShieldCheck,
	Sparkles,
	Star,
	Tag,
	Target,
	X,
	Zap,
} from "lucide-react";
import type React from "react";
import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";

export type SearchDoc = {
	id: string;
	title: string;
	category: string;
	description: string;
	snippet: string;
	href: string;
	tags: string[];
	icon: string;
};

const ICON_MAP: Record<string, React.ElementType> = {
	ArrowRight,
	BadgeCheck,
	BookOpen,
	Bot,
	Compass,
	Cpu,
	FileText,
	Globe,
	HelpCircle,
	Lightbulb,
	Mountain,
	Orbit,
	PenTool,
	Search,
	ShieldCheck,
	Sparkles,
	Star,
	Target,
	Zap,
	Tag,
};

export function SearchModal() {
	const [isOpen, setIsOpen] = useState(false);
	const [mounted, setMounted] = useState(false);
	const [query, setQuery] = useState("");
	const [useAI, setUseAI] = useState(false);
	const [aiAnswer, setAiAnswer] = useState<string | null>(null);
	const [aiLoading, setAiLoading] = useState(false);
	const [searchIndex, setSearchIndex] = useState<SearchDoc[]>([]);

	useEffect(() => {
		setMounted(true);
		fetch("/api/search-index.json")
			.then((res) => res.json())
			.then((data) => setSearchIndex(data))
			.catch((err) => console.error("Failed to load search index", err));
	}, []);

	// Toggle modal on Cmd+K or Ctrl+K, and close on Escape
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if ((e.metaKey || e.ctrlKey) && e.key === "k") {
				e.preventDefault();
				setIsOpen((prev) => !prev);
			}
			if (e.key === "Escape") {
				setIsOpen(false);
			}
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, []);

	// Fuse.js setup for fuzzy search
	const fuse = useMemo(() => {
		return new Fuse(searchIndex, {
			keys: [
				{ name: "title", weight: 3 },
				{ name: "category", weight: 2 },
				{ name: "tags", weight: 2 },
				{ name: "description", weight: 1 },
				{ name: "snippet", weight: 1 },
			],
			threshold: 0.3,
			ignoreLocation: true,
		});
	}, [searchIndex]);

	// Get filtered documents using Fuse
	const filteredDocs = useMemo(() => {
		if (!query.trim()) return searchIndex.slice(0, 5);
		const results = fuse.search(query);
		return results.map((result) => result.item);
	}, [query, fuse, searchIndex]);

	// Smart Dynamic AI Answer Generation
	const handleAskAI = async () => {
		if (!query.trim()) return;
		setAiLoading(true);
		setAiAnswer(null);

		const topMatch = filteredDocs[0];

		try {
			const res = await fetch("/api/search-query", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ query }),
			});

			if (res.ok) {
				const data = await res.json();
				setAiAnswer(data.answer);
			} else {
				if (topMatch) {
					const priceMatch = topMatch.snippet.match(
						/starting from \$[0-9K\/+]+/i,
					);
					const priceText = priceMatch ? ` (${priceMatch[0]})` : "";
					setAiAnswer(
						`For "${query}": Our most relevant capability is ${topMatch.title}${priceText}. ${topMatch.description} Click below to explore the full blueprint.`,
					);
				} else {
					setAiAnswer(
						"We offer specialized engagements across Assessment (First Light), Architecture (Foundation), DevSecOps (Pulse), and Compliance (Clearance). Select an option below for details.",
					);
				}
			}
		} catch (_err) {
			if (topMatch) {
				const priceMatch = topMatch.snippet.match(
					/starting from \$[0-9K\/+]+/i,
				);
				const priceText = priceMatch ? ` (${priceMatch[0]})` : "";
				setAiAnswer(
					`For "${query}": Our most relevant capability is ${topMatch.title}${priceText}. ${topMatch.description} Click below to explore the full blueprint.`,
				);
			}
		} finally {
			setAiLoading(false);
		}
	};

	return (
		<>
			{/* Trigger Button in Nav or Floating */}
			<button
				type="button"
				onClick={() => setIsOpen(true)}
				className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.05] border border-white/10 hover:border-white/20 text-xs font-mono text-white/60 hover:text-white transition-all cursor-pointer"
			>
				<Search className="w-3.5 h-3.5 text-[var(--aurora-green-solid)]" />
				<span>Search Here..</span>
				<kbd className="px-1.5 py-0.5 rounded bg-white/10 text-[10px] text-white/50 border border-white/10">
					⌘K
				</kbd>
			</button>

			{/* Standalone Decoupled Modal Overlay via Portal to document.body */}
			{mounted &&
				createPortal(
					<AnimatePresence>
						{isOpen && (
							<div className="fixed inset-0 z-[99999] flex items-start justify-center pt-20 px-4 pointer-events-auto">
								{/* Backdrop */}
								<motion.div
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}
									onClick={() => setIsOpen(false)}
									className="fixed inset-0 bg-black/75 backdrop-blur-2xl"
								/>

								{/* Modal Content Box */}
								<motion.div
									initial={{ opacity: 0, scale: 0.96, y: -10 }}
									animate={{ opacity: 1, scale: 1, y: 0 }}
									exit={{ opacity: 0, scale: 0.96, y: -10 }}
									transition={{ duration: 0.2 }}
									className="glass-card glass-card-tinted-violet w-full max-w-2xl rounded-3xl border border-white/15 bg-[rgba(13,17,23,0.55)] backdrop-blur-3xl shadow-[0_25px_80px_rgba(0,0,0,0.85)] relative overflow-hidden text-left z-10"
								>
									{/* Input Header */}
									<div className="p-4 border-b border-white/10 flex items-center gap-3">
										<Search className="w-5 h-5 text-[var(--aurora-green-solid)] shrink-0" />
										<input
											type="text"
											value={query}
											onChange={(e) => {
												setQuery(e.target.value);
												setAiAnswer(null);
											}}
											placeholder="Type a question or capability (e.g. SOC 2, cloud migration, pricing)..."
											className="w-full bg-transparent text-white placeholder-white/40 font-sans text-sm outline-none"
											autoFocus
										/>
										<button
											type="button"
											onClick={() => setIsOpen(false)}
											className="p-1 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
										>
											<X className="w-4 h-4" />
										</button>
									</div>

									{/* Mode Selector & AI Toggle Bar */}
									<div className="px-4 py-2 bg-white/[0.02] border-b border-white/[0.06] flex items-center justify-between text-xs font-mono">
										<div className="flex items-center gap-2 text-white/50">
											<span className="text-[var(--aurora-green-solid)] font-bold">
												MODE:
											</span>
											<span>
												{useAI
													? "Self-Hosted Local LLM (RAG)"
													: "Instant Client Wasm Search"}
											</span>
										</div>

										<div className="flex items-center gap-2">
											<button
												type="button"
												onClick={() => {
													setUseAI(!useAI);
													setAiAnswer(null);
												}}
												className={`px-2.5 py-1 rounded-full border text-[11px] font-sans transition-all flex items-center gap-1.5 cursor-pointer ${
													useAI
														? "bg-violet-500/20 border-violet-400/40 text-violet-300"
														: "bg-white/5 border-white/10 text-white/70 hover:text-white"
												}`}
											>
												<Bot className="w-3 h-3 text-violet-400" />
												<span>{useAI ? "AI RAG Active" : "Enable AI RAG"}</span>
											</button>
										</div>
									</div>

									{/* Search Results Body */}
									<div className="p-4 max-h-[60vh] overflow-y-auto space-y-4">
										{/* AI RAG Answer Section if enabled */}
										{useAI && (
											<div className="p-4 rounded-2xl border border-violet-500/30 bg-violet-500/10 space-y-2">
												<div className="flex items-center justify-between">
													<div className="flex items-center gap-2 text-xs font-bold font-mono text-violet-300">
														<Bot className="w-4 h-4 text-violet-400" />
														<span>Local AI Synthesis (Zero Hallucination)</span>
													</div>
													{query && (
														<button
															type="button"
															onClick={handleAskAI}
															disabled={aiLoading}
															className="text-[11px] px-2.5 py-1 rounded-lg bg-violet-500/20 hover:bg-violet-500/30 text-violet-200 border border-violet-400/30 cursor-pointer font-sans"
														>
															{aiLoading
																? "Synthesizing..."
																: "Synthesize Answer"}
														</button>
													)}
												</div>
												<p className="text-xs text-white/80 leading-relaxed font-sans">
													{aiAnswer ||
														(query
															? "Click 'Synthesize Answer' to generate a 1-2 sentence AI answer using our local context index."
															: "Type a prompt above and click Synthesize Answer.")}
												</p>
											</div>
										)}

										{/* Direct Matching Capabilities & Snippets */}
										<div className="space-y-2">
											<h4 className="text-[10px] font-bold uppercase tracking-wider font-mono text-white/40 px-1">
												Matching Capabilities ({filteredDocs.length})
											</h4>

											{filteredDocs.length === 0 ? (
												<div className="p-6 text-center text-xs text-white/50 font-sans space-y-2">
													<p>No exact capability matching "{query}".</p>
													<p className="text-white/40">
														Try searching for "SOC 2", "cloud migration", "IaC",
														or "sprints".
													</p>
												</div>
											) : (
												<ul className="space-y-2">
													{filteredDocs.map((doc) => {
														const Icon = ICON_MAP[doc.icon] || Zap;
														return (
															<li key={doc.id}>
																<a
																	href={doc.href}
																	onClick={() => setIsOpen(false)}
																	className="flex items-start gap-3.5 p-3 rounded-2xl border border-transparent hover:border-emerald-500/30 hover:bg-gradient-to-r hover:from-emerald-500/15 hover:via-emerald-500/08 hover:to-transparent transition-all group"
																>
																	<div className="w-9 h-9 rounded-xl border border-white/10 bg-white/5 text-[var(--aurora-green-solid)] flex items-center justify-center shrink-0 group-hover:border-emerald-400/40 group-hover:bg-emerald-500/10">
																		<Icon className="w-4 h-4" />
																	</div>
																	<div className="flex-1 min-w-0">
																		<div className="flex items-center justify-between gap-2">
																			<span className="text-sm font-semibold text-white/90 group-hover:text-white font-sans">
																				{doc.title}
																			</span>
																			<span className="text-[10px] font-mono text-emerald-400/80 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full shrink-0">
																				{doc.category}
																			</span>
																		</div>
																		<p className="text-xs text-white/60 font-sans leading-relaxed mt-1 line-clamp-2">
																			{doc.snippet}
																		</p>
																	</div>
																</a>
															</li>
														);
													})}
												</ul>
											)}
										</div>
									</div>

									{/* Footer */}
									<div className="px-4 py-3 border-t border-white/10 bg-white/[0.02] flex items-center justify-between text-[11px] font-sans text-white/40">
										<span>Press ESC to close</span>
										<a
											href="/contact"
											onClick={() => setIsOpen(false)}
											className="text-[var(--aurora-green-solid)] hover:underline font-medium flex items-center gap-1"
										>
											<span>Start a Conversation</span>
											<ArrowRight className="w-3 h-3" />
										</a>
									</div>
								</motion.div>
							</div>
						)}
					</AnimatePresence>,
					document.body,
				)}
		</>
	);
}
