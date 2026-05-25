import type { HTMLAttributes } from "react";

export function Skeleton({
	className,
	...props
}: HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={`animate-pulse rounded-md bg-white/[0.03] border border-white/[0.05] relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/[0.04] before:to-transparent ${className}`}
			{...props}
		/>
	);
}
