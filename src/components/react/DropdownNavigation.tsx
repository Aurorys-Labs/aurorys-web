import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import React from "react";

export type NavItem = {
	id: number;
	label: string;
	subMenus?: {
		title: string;
		items: {
			label: string;
			description: string;
			icon: React.ElementType;
			href?: string;
		}[];
	}[];
	href?: string;
};

type Props = {
	navItems: NavItem[];
};

export function DropdownNavigation({ navItems }: Props) {
	const [openMenu, setOpenMenu] = React.useState<string | null>(null);

	const handleHover = (menuLabel: string | null) => {
		setOpenMenu(menuLabel);
	};

	const [isHover, setIsHover] = useState<number | null>(null);

	return (
		<div className="flex items-center justify-center">
			<ul className="flex items-center space-x-2 ">
				{navItems.map((navItem) => (
					<li
						key={navItem.label}
						onMouseEnter={() => handleHover(navItem.label)}
						onMouseLeave={() => handleHover(null)}
					>
						{navItem.href ? (
							<a
								href={navItem.href}
								className="text-sm py-2 px-4 flex cursor-pointer group transition-colors duration-300 items-center justify-center gap-1 text-white/70 hover:text-white relative font-medium rounded-full"
								onMouseEnter={() => setIsHover(navItem.id)}
								onMouseLeave={() => setIsHover(null)}
							>
								<span>{navItem.label}</span>
								{navItem.subMenus && (
									<ChevronDown
										className={`h-4 w-4 group-hover:rotate-180 duration-300 transition-transform
                      ${openMenu === navItem.label ? "rotate-180" : ""}`}
									/>
								)}
								{(isHover === navItem.id || openMenu === navItem.label) && (
									<motion.div
										layoutId="hover-bg"
										className="absolute inset-0 size-full bg-white/10"
										style={{ borderRadius: 99 }}
									/>
								)}
							</a>
						) : (
							<button
								className="text-sm py-2 px-4 flex cursor-pointer group transition-colors duration-300 items-center justify-center gap-1 text-white/70 hover:text-white relative font-medium rounded-full"
								onMouseEnter={() => setIsHover(navItem.id)}
								onMouseLeave={() => setIsHover(null)}
							>
								<span>{navItem.label}</span>
								{navItem.subMenus && (
									<ChevronDown
										className={`h-4 w-4 group-hover:rotate-180 duration-300 transition-transform
                      ${openMenu === navItem.label ? "rotate-180" : ""}`}
									/>
								)}
								{(isHover === navItem.id || openMenu === navItem.label) && (
									<motion.div
										layoutId="hover-bg"
										className="absolute inset-0 size-full bg-white/10"
										style={{ borderRadius: 99 }}
									/>
								)}
							</button>
						)}

						<AnimatePresence>
							{openMenu === navItem.label && navItem.subMenus && (
								<div className="absolute left-1/2 -translate-x-1/2 top-[calc(100%+16px)] z-50 w-[90vw] max-w-3xl pointer-events-auto">
									<motion.div
										className="glass-card border border-white/10 p-8 shadow-2xl rounded-2xl w-full"
										style={{
											backdropFilter: "blur(24px)",
											backgroundColor: "rgba(2, 3, 4, 0.77)",
										}}
										layoutId="menu"
										initial={{ opacity: 0, y: 10 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, y: 10, transition: { duration: 0.2 } }}
									>
										<div className="flex gap-12 backdrop-blur-2xl bg-[#02020288]overflow-hidden">
											{navItem.subMenus.map((sub) => (
												<motion.div
													layout
													className="flex-1 backdrop-blur-2xl"
													key={sub.title}
												>
													<h3 className="mb-5 text-xs font-semibold uppercase tracking-wider text-[var(--text-stellar)]">
														{sub.title}
													</h3>
													<ul className="grid grid-cols-1 gap-6">
														{sub.items.map((item) => {
															const Icon = item.icon;
															return (
																<li key={item.label}>
																	<a
																		href={item.href || "#"}
																		className="flex items-start gap-4 group hover:bg-white/[0.03] p-2 -m-2 rounded-xl transition-colors duration-200"
																	>
																		<div className="border border-white/10 bg-white/5 text-[var(--aurora-green-solid)] rounded-lg flex items-center justify-center size-10 shrink-0 group-hover:bg-white/10 group-hover:border-white/20 transition-all duration-300 shadow-inner">
																			<Icon
																				className="h-5 w-5 flex-none"
																				strokeWidth={1.5}
																			/>
																		</div>
																		<div className="leading-5 w-max">
																			<p className="text-sm font-semibold text-white/90 shrink-0 group-hover:text-white transition-colors">
																				{item.label}
																			</p>
																			<p className="text-[13px] text-white/50 shrink-0 group-hover:text-white/70 transition-colors duration-300 mt-1">
																				{item.description}
																			</p>
																		</div>
																	</a>
																</li>
															);
														})}
													</ul>
												</motion.div>
											))}
										</div>
									</motion.div>
								</div>
							)}
						</AnimatePresence>
					</li>
				))}
			</ul>
		</div>
	);
}
