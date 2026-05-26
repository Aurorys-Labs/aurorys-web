import { AnimatePresence, motion } from "framer-motion";
import React, { useState, useMemo } from "react";

export interface BlogPost {
	id: string;
	title: string;
	category: string;
	date: string;
	readTime: string;
	summary: string;
	status: string;
	tags: string[];
}

interface BlogHubProps {
	posts: BlogPost[];
}

export function BlogHub({ posts }: BlogHubProps) {
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedCategory, setSelectedCategory] = useState("All");
	const [selectedTag, setSelectedTag] = useState<string | null>(null);
	const [currentPage, setCurrentPage] = useState(1);
	const postsPerPage = 6;

	// Extract unique categories and tags
	const categories = useMemo(() => {
		const cats = new Set(posts.map((p) => p.category));
		return ["All", ...Array.from(cats)];
	}, [posts]);

	const allTags = useMemo(() => {
		const tags = new Set<string>();
		posts.forEach((p) => p.tags.forEach((t) => tags.add(t)));
		return Array.from(tags);
	}, [posts]);

	// Filter logic
	const filteredPosts = useMemo(() => {
		return posts.filter((post) => {
			const matchesSearch =
				post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
				post.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
				post.tags.some((t) =>
					t.toLowerCase().includes(searchQuery.toLowerCase()),
				);

			const matchesCategory =
				selectedCategory === "All" || post.category === selectedCategory;

			const matchesTag = !selectedTag || post.tags.includes(selectedTag);

			return matchesSearch && matchesCategory && matchesTag;
		});
	}, [posts, searchQuery, selectedCategory, selectedTag]);

	// Pagination logic
	const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
	const paginatedPosts = useMemo(() => {
		const startIndex = (currentPage - 1) * postsPerPage;
		return filteredPosts.slice(startIndex, startIndex + postsPerPage);
	}, [filteredPosts, currentPage, postsPerPage]);

	// Reset page when filter changes
	React.useEffect(() => {
		setCurrentPage(1);
	}, [searchQuery, selectedCategory, selectedTag]);

	const handleCategorySelect = (category: string) => {
		setSelectedCategory(category);
		setSelectedTag(null); // Clear tag selection when category changes
	};

	const handleTagSelect = (tag: string) => {
		if (selectedTag === tag) {
			setSelectedTag(null); // Toggle off
		} else {
			setSelectedTag(tag);
		}
	};

	return (
		<div className="space-y-12">
			{/* Controls: Search and Filters */}
			<div className="glass-card p-6 md:p-8 rounded-3xl border border-white/[0.06] bg-[rgba(13,17,23,0.3)] space-y-6">
				{/* Top Controls Row */}
				<div className="flex flex-col md:flex-row gap-4 justify-between items-center">
					{/* Category Tabs */}
					<div className="flex flex-wrap gap-2 w-full md:w-auto">
						{categories.map((cat) => (
							<button
								key={cat}
								onClick={() => handleCategorySelect(cat)}
								className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
									selectedCategory === cat
										? "bg-[var(--aurora-green-solid)] text-black shadow-[0_0_15px_rgba(16,185,129,0.3)]"
										: "bg-white/[0.03] border border-white/10 text-white/70 hover:bg-white/[0.06] hover:text-white"
								}`}
							>
								{cat}
							</button>
						))}
					</div>

					{/* Search input */}
					<div className="relative w-full md:w-80">
						<input
							type="text"
							placeholder="Search insights or tags..."
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							className="w-full h-10 pl-10 pr-4 rounded-xl bg-black/40 border border-white/10 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[var(--aurora-green-solid)] focus:ring-1 focus:ring-[var(--aurora-green-solid)] transition-all"
						/>
						<div className="absolute left-3.5 top-3 text-white/30 pointer-events-none">
							<svg
								className="w-4 h-4"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								strokeWidth="2.5"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
								/>
							</svg>
						</div>
						{searchQuery && (
							<button
								onClick={() => setSearchQuery("")}
								className="absolute right-3 top-3 text-white/40 hover:text-white transition-colors"
							>
								<svg
									className="w-4 h-4"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									strokeWidth="2.5"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M6 18L18 6M6 6l12 12"
									/>
								</svg>
							</button>
						)}
					</div>
				</div>

				{/* Tags Filter Row */}
				<div className="pt-4 border-t border-white/[0.04]">
					<div className="text-[10px] font-mono font-bold tracking-widest text-[var(--text-muted)] uppercase mb-3">
						Filter by Topic Tag
					</div>
					<div className="flex flex-wrap gap-2">
						{allTags.map((tag) => {
							const isSelected = selectedTag === tag;
							return (
								<button
									key={tag}
									onClick={() => handleTagSelect(tag)}
									className={`px-3 py-1 rounded-full text-xs font-mono transition-all duration-300 ${
										isSelected
											? "border-[var(--aurora-green-solid)] bg-[var(--aurora-green-solid)]/10 text-[var(--aurora-green-solid)]"
											: "border-white/10 bg-white/[0.02] text-white/50 hover:border-white/20 hover:text-white"
									} border`}
								>
									#{tag}
								</button>
							);
						})}
					</div>
				</div>
			</div>

			{/* Posts Grid Container */}
			{paginatedPosts.length > 0 ? (
				<motion.div
					layout
					className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-flow-row-dense gap-8"
				>
					<AnimatePresence mode="popLayout">
						{paginatedPosts.map((post, idx) => {
							const gridClasses = [
								"lg:col-span-2 col-span-1",
								"lg:row-span-2 col-span-1",
								"col-span-1",
								"col-span-1",
								"lg:col-span-2 col-span-1",
								"col-span-1",
							];
							const gridClass =
								gridClasses[idx % gridClasses.length] || "col-span-1";
							const isLarge =
								gridClass.includes("col-span-2") ||
								gridClass.includes("row-span-2");

							return (
								<motion.a
									layout
									initial={{ opacity: 0, y: 15 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, scale: 0.95 }}
									transition={{ duration: 0.3, ease: "easeOut" }}
									key={post.id}
									href={`/blog/${post.id}`}
									className={`glass-card p-8 rounded-3xl border border-white/[0.06] bg-[rgba(13,17,23,0.25)] flex flex-col justify-between hover:border-[var(--aurora-green-solid)]/30 hover:bg-[rgba(13,17,23,0.4)] hover:-translate-y-1.5 hover:shadow-[0_0_40px_rgba(16,185,129,0.1)] transition-all duration-500 group relative overflow-hidden ${gridClass}`}
								>
									{/* Subtle top light highlight inside the card */}
									<div className="absolute inset-0 bg-radial-at-t from-white/[0.01] to-transparent pointer-events-none" />

									<div className="space-y-4 relative z-10">
										<div className="flex items-center justify-between text-xs text-[var(--text-muted)] font-mono">
											<span className="text-[var(--aurora-green-solid)] font-semibold uppercase tracking-wider">
												{post.category}
											</span>
											<span>{post.date}</span>
										</div>
										<h3
											className={`font-sans font-bold text-[var(--text-stellar)] group-hover:text-[var(--aurora-green-solid)] transition-colors duration-300 leading-snug ${isLarge ? "text-2xl" : "text-xl"}`}
										>
											{post.title}
										</h3>
										<p className="text-white/70 text-sm leading-relaxed font-sans">
											{post.summary}
										</p>
										{post.tags && post.tags.length > 0 && (
											<div className="flex flex-wrap gap-1.5 pt-2">
												{post.tags.map((tag) => (
													<span
														key={tag}
														className="backdrop-blur-sm text-[10px] px-2.5 py-0.5 rounded-full border border-white/10 bg-white/[0.03] text-white/50 font-mono"
													>
														#{tag}
													</span>
												))}
											</div>
										)}
									</div>

									<div className="pt-6 border-t border-white/[0.04] mt-6 flex items-center justify-between relative z-10">
										<span className="text-xs text-[var(--text-muted)] font-sans">
											{post.readTime}
										</span>
										<span className="inline-flex items-center gap-1 text-xs font-semibold font-sans text-[var(--aurora-green-solid)] group-hover:text-white transition-colors duration-300">
											Read Post &rarr;
										</span>
									</div>
								</motion.a>
							);
						})}
					</AnimatePresence>
				</motion.div>
			) : (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					className="glass-card p-12 text-center rounded-3xl border border-white/[0.06] bg-[rgba(13,17,23,0.3)] max-w-xl mx-auto space-y-4"
				>
					<div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center mx-auto text-white/30">
						<svg
							className="w-6 h-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							strokeWidth="2"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
					</div>
					<h3 className="font-sans font-bold text-lg text-white">
						No insights found
					</h3>
					<p className="text-sm text-white/50">
						We couldn't find any articles matching "{searchQuery}"{" "}
						{selectedTag ? `with tag #${selectedTag}` : ""}. Try adjusting your
						search query or reset the filters.
					</p>
					<button
						onClick={() => {
							setSearchQuery("");
							setSelectedCategory("All");
							setSelectedTag(null);
						}}
						className="px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider bg-white/[0.05] border border-white/10 text-white hover:bg-white/[0.1] transition-all"
					>
						Reset All Filters
					</button>
				</motion.div>
			)}

			{/* Pagination Controls */}
			{totalPages > 1 && (
				<div className="flex justify-center items-center gap-2 pt-4">
					<button
						onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
						disabled={currentPage === 1}
						className="p-2 rounded-xl bg-white/[0.03] border border-white/10 text-white/70 hover:bg-white/[0.06] hover:text-white disabled:pointer-events-none disabled:opacity-30 transition-all duration-300"
					>
						<svg
							className="w-4 h-4"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							strokeWidth="2.5"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M15 19l-7-7 7-7"
							/>
						</svg>
					</button>

					{Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
						<button
							key={page}
							onClick={() => setCurrentPage(page)}
							className={`w-10 h-10 rounded-xl text-xs font-semibold transition-all duration-300 ${
								currentPage === page
									? "bg-[var(--aurora-green-solid)] text-black shadow-[0_0_12px_rgba(16,185,129,0.2)]"
									: "bg-white/[0.03] border border-white/10 text-white/70 hover:bg-white/[0.06] hover:text-white"
							}`}
						>
							{page}
						</button>
					))}

					<button
						onClick={() =>
							setCurrentPage((prev) => Math.min(prev + 1, totalPages))
						}
						disabled={currentPage === totalPages}
						className="p-2 rounded-xl bg-white/[0.03] border border-white/10 text-white/70 hover:bg-white/[0.06] hover:text-white disabled:pointer-events-none disabled:opacity-30 transition-all duration-300"
					>
						<svg
							className="w-4 h-4"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							strokeWidth="2.5"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M9 5l7 7-7 7"
							/>
						</svg>
					</button>
				</div>
			)}
		</div>
	);
}
