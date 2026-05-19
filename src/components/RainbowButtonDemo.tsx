"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RainbowButton } from "./ui/rainbow-button";

export function RainbowButtonDemo() {
	return (
		<div className="flex flex-wrap gap-4 justify-center">
			<RainbowButton variant="light" size="lg">
				Rainbow Button (Light)
			</RainbowButton>
			<RainbowButton variant="outline" size="default">
				Rainbow Outline
			</RainbowButton>
			<Button>shadcn Default</Button>
			<Button variant="outline">shadcn Outline</Button>
			<Badge>Badge Works</Badge>
		</div>
	);
}
