import path from "path";
import node from "@astrojs/node";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
// @ts-check
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
	site: "https://auroryslabs.com",
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
