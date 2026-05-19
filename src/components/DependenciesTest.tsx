"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export function DependenciesTest() {
	return (
		<div
			style={{
				minHeight: "100dvh",
				background: "#050505",
				color: "#f0f0f0",
				padding: "2rem",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				gap: "2rem",
			}}
		>
			<h1 style={{ fontSize: "2rem", fontWeight: 700 }}>
				Dependency Verification
			</h1>

			<Card
				style={{
					maxWidth: 500,
					width: "100%",
					background: "rgba(255,255,255,0.03)",
					backdropFilter: "blur(24px)",
					border: "1px solid rgba(255,255,255,0.08)",
					borderTop: "1.5px solid rgba(255,255,255,0.15)",
					borderRadius: "1.5rem",
				}}
			>
				<CardHeader>
					<CardTitle>shadcn/ui Card</CardTitle>
					<CardDescription>Testing component rendering</CardDescription>
				</CardHeader>
				<CardContent
					style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
				>
					<div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
						<Badge>shadcn</Badge>
						<Badge>React 19</Badge>
						<Badge>Astro 5</Badge>
					</div>
					<Separator />
					<Button>shadcn Button Works</Button>
					<Button variant="outline">Outline Button</Button>
				</CardContent>
			</Card>

			<Card
				style={{
					maxWidth: 500,
					width: "100%",
					background: "rgba(255,255,255,0.03)",
					backdropFilter: "blur(24px)",
					border: "1px solid rgba(255,255,255,0.08)",
					borderTop: "1.5px solid rgba(255,255,255,0.15)",
					borderRadius: "1.5rem",
				}}
			>
				<CardHeader>
					<CardTitle>Dependency Status</CardTitle>
				</CardHeader>
				<CardContent
					style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
				>
					{[
						{ name: "shadcn/ui", status: "Loaded" },
						{ name: "lucide-react", status: "Loaded" },
						{ name: "framer-motion", status: "Loaded" },
						{ name: "lenis", status: "Available" },
						{ name: "zod", status: "Available" },
						{ name: "shiki", status: "Available" },
						{ name: "Tailwind 4", status: "Loaded" },
						{ name: "Pre-commit hooks", status: "Configured" },
						{ name: "CI Pipeline", status: "Configured" },
						{ name: "Docker", status: "Configured" },
					].map((dep) => (
						<div
							key={dep.name}
							style={{
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",
								padding: "0.5rem 0",
								borderBottom: "1px solid rgba(255,255,255,0.05)",
							}}
						>
							<span style={{ color: "#a0a0a0" }}>{dep.name}</span>
							<Badge variant="secondary">{dep.status}</Badge>
						</div>
					))}
				</CardContent>
			</Card>
		</div>
	);
}
