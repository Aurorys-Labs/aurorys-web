import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blogCollection = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
	schema: z.object({
		title: z.string(),
		category: z.string(),
		date: z.string(),
		readTime: z.string(),
		summary: z.string(),
		status: z.string().optional(),
		tags: z.array(z.string()).default([]),
		prestigeQuote: z.string().optional(),
		prestigeCite: z.string().optional(),
		graphicTitle: z.string().optional(),
		graphicColors: z.string().optional(),
		headerImage: z.string().optional(),
		ctaSubject: z.string().optional(),
		ctaLabel: z.string().optional(),
	}),
});

export const collections = {
	blog: blogCollection,
};
