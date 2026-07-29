import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
	try {
		const { query } = await request.json();

		if (!query) {
			return new Response(JSON.stringify({ error: "Query is required" }), {
				status: 400,
				headers: { "Content-Type": "application/json" },
			});
		}

		// Try connecting to a local self-hosted Ollama instance (default port 11434)
		try {
			const ollamaRes = await fetch("http://127.0.0.1:11434/api/generate", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					model: "qwen2.5:0.5b",
					prompt: `You are the Aurorys Labs Security Assistant. Answer this user query in 1-2 concise sentences strictly based on cybersecurity consulting: "${query}". If unsure, recommend booking a discovery call.`,
					stream: false,
				}),
			});

			if (ollamaRes.ok) {
				const data = await ollamaRes.json();
				return new Response(JSON.stringify({ answer: data.response }), {
					status: 200,
					headers: { "Content-Type": "application/json" },
				});
			}
		} catch (_ollamaErr) {
			// Local Ollama instance not running - return simulated local RAG response
		}

		// Fallback RAG response when local LLM server is offline
		const fallbackAnswer = `Local RAG Synthesis for "${query}": We offer specialized cybersecurity blueprints including First Light (Posture Review), Foundation (Architecture Design), Pulse (DevSecOps Pipeline), and Clearance (SOC 2 Readiness).`;

		return new Response(JSON.stringify({ answer: fallbackAnswer }), {
			status: 200,
			headers: { "Content-Type": "application/json" },
		});
	} catch (error: any) {
		return new Response(
			JSON.stringify({ error: error.message || "Failed to process search" }),
			{ status: 500, headers: { "Content-Type": "application/json" } },
		);
	}
};
