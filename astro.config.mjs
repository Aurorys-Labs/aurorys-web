import path from "path";
import node from "@astrojs/node";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
// @ts-check
import { defineConfig } from "astro/config";

// https://astro.build/config
const aurorysTheme = {
	name: "aurorys-theme",
	type: "dark",
	colors: {
		"editor.background": "#00000000",
		"editor.foreground": "#f8fafc",
	},
	tokenColors: [
		{
			scope: ["keyword", "storage", "storage.type", "keyword.control"],
			settings: { color: "#00e8a0" }, // aurorys green
		},
		{
			scope: ["string", "string.quoted"],
			settings: { color: "#fbbf24" }, // gold
		},
		{
			scope: ["constant.numeric", "constant.language", "constant.character"],
			settings: { color: "#c084fc" }, // purple
		},
		{
			scope: [
				"variable",
				"support.variable",
				"meta.object-literal.key",
				"variable.other.property",
			],
			settings: { color: "#22d3ee" }, // cyan
		},
		{
			scope: ["entity.name.function", "support.function"],
			settings: { color: "#60a5fa" }, // blue
		},
		{
			scope: [
				"entity.name.type",
				"entity.other.inherited-class",
				"entity.name.tag",
				"support.type",
			],
			settings: { color: "#fb7185" }, // rose
		},
		{
			scope: ["comment", "punctuation.definition.comment"],
			settings: { color: "#64748b", fontStyle: "italic" }, // slate muted
		},
		{
			scope: ["punctuation", "meta.brace"],
			settings: { color: "#94a3b8" }, // slate light
		},
	],
};

export default defineConfig({
	markdown: {
		shikiConfig: {
			theme: aurorysTheme,
		},
	},
	site: "https://auroryslabs.com",
	output: "server",
	adapter: node({
		mode: "standalone",
	}),
	integrations: [
		react(),
		sitemap({
			changefreq: "weekly",
			priority: 0.7,
			filter: (page) => !page.includes("/api/"),
			i18n: {
				defaultLocale: "en",
				locales: { en: "en-US" },
			},
		}),
	],
	vite: {
		plugins: [tailwindcss()],
		resolve: {
			alias: {
				"@": path.resolve("./src"),
			},
		},
	},
});
