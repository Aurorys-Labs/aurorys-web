import path from "path";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import node from "@astrojs/node";
// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
	site: "https://auroryslabs.com",
	adapter: node({
		mode: "standalone"
	}),
	integrations: [react(), sitemap()],
	vite: {
		plugins: [tailwindcss()],
		resolve: {
			alias: {
				"@": path.resolve("./src"),
			},
		},
	},
});
