import { getCollection } from "astro:content";
import type { APIRoute } from "astro";
import complianceData from "../../lib/data/compliance-hub.json";
import pricingData from "../../lib/data/pricing.json";
import solutionsData from "../../lib/data/solutions.json";

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

export const GET: APIRoute = async () => {
	const index: SearchDoc[] = [];

	solutionsData.cards.forEach((card: any) => {
		index.push({
			id: `solution-${card.id}`,
			title: card.title,
			category: "Solutions",
			description: card.description,
			snippet: card.detail || card.bullets?.join(", ") || "",
			href: card.cta?.href || `/solutions?view=${card.id}`,
			tags: [...(card.domains || []), card.price || ""].filter(Boolean),
			icon: card.icon || "Zap",
		});
	});

	pricingData.packages.forEach((pkg: any) => {
		index.push({
			id: `pricing-${pkg.name.toLowerCase().replace(/\s+/g, "-")}`,
			title: `${pkg.name} Package`,
			category: "Pricing & Packages",
			description: pkg.subtitle,
			snippet: `${pkg.body} ${pkg.price ? `Price: ${pkg.price}.` : ""} ${pkg.timeline ? `Timeline: ${pkg.timeline}.` : ""}`,
			href: pkg.href || "/contact",
			tags: [
				...(pkg.domains || []),
				pkg.price || "",
				"cost",
				"price",
				"pricing",
			].filter(Boolean),
			icon: pkg.icon || "Tag",
		});
	});

	complianceData.offerings?.forEach((offering: any) => {
		index.push({
			id: `compliance-${offering.id}`,
			title: offering.title,
			category: "Compliance",
			description: offering.subtitle,
			snippet: offering.body || offering.whenYouNeedThis || "",
			href: offering.cta?.href || `/compliance`,
			tags: [
				...(offering.pills || []),
				offering.price || "",
				"compliance",
				"audit",
			].filter(Boolean),
			icon: "ShieldCheck",
		});
	});

	const compliancePillar = complianceData.grcExplained?.pillars?.find(
		(p: any) => p.id === "compliance",
	);
	compliancePillar?.frameworks?.forEach((fw: any) => {
		index.push({
			id: `framework-${fw.name.toLowerCase().replace(/\s+/g, "-")}`,
			title: fw.name,
			category: "Frameworks",
			description: fw.description,
			snippet: fw.description,
			href: "/compliance",
			tags: ["compliance", "framework", fw.name],
			icon: "BadgeCheck",
		});
	});

	const blogPosts = await getCollection("blog");
	blogPosts.forEach((post) => {
		index.push({
			id: `blog-${post.id}`,
			title: post.data.title,
			category: post.data.category,
			description: post.data.summary || "",
			snippet: (post.body || "").substring(0, 150).replace(/\n/g, " ") + "...",
			href: `/blog/${post.id}`,
			tags: post.data.tags || [],
			icon: "BookOpen",
		});
	});

	return new Response(JSON.stringify(index), {
		status: 200,
		headers: {
			"Content-Type": "application/json",
		},
	});
};
