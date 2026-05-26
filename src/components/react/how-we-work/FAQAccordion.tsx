import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";

interface FAQ {
	q: string;
	a: string;
}

interface FAQAccordionProps {
	faqs: FAQ[];
}

export function FAQAccordion({ faqs }: FAQAccordionProps) {
	const [activeIndex, setActiveIndex] = useState<number | null>(0);

	const toggleIndex = (index: number) => {
		setActiveIndex(activeIndex === index ? null : index);
	};

	return (
		<div className="space-y-4 max-w-3xl mx-auto text-left">
			<h2 className="font-sans font-bold text-3xl md:text-4xl tracking-tight text-[var(--text-stellar)] text-center mb-12">
				Frequently Asked Questions
			</h2>

			{faqs.map((faq, idx) => {
				const isOpen = activeIndex === idx;

				return (
					<div
						key={idx}
						className="glass-card rounded-xl border border-white/[0.06] backdrop-blur-md bg-[rgba(13,17,23,0.25)] overflow-hidden transition-colors duration-200"
					>
						<button
							onClick={() => toggleIndex(idx)}
							className="w-full py-5 px-6 flex items-center justify-between gap-4 font-sans font-semibold text-base text-[var(--text-stellar)] text-left"
						>
							<span>{faq.q}</span>
							<span className="shrink-0 p-1 rounded-md bg-white/[0.03] border border-white/[0.08] text-white/60">
								<svg
									className={`w-4 h-4 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									strokeWidth="2.5"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M19 9l-7 7-7-7"
									/>
								</svg>
							</span>
						</button>

						<AnimatePresence initial={false}>
							{isOpen && (
								<motion.div
									initial={{ height: 0, opacity: 0 }}
									animate={{ height: "auto", opacity: 1 }}
									exit={{ height: 0, opacity: 0 }}
									transition={{ duration: 0.25, ease: "easeInOut" }}
								>
									<div className="px-6 pb-6 pt-1 text-sm text-white/70 leading-relaxed font-sans border-t border-white/[0.04] bg-white/[0.01]">
										{faq.a}
									</div>
								</motion.div>
							)}
						</AnimatePresence>
					</div>
				);
			})}
		</div>
	);
}
