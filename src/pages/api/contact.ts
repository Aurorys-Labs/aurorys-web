import type { APIRoute } from "astro";
export const prerender = false;
import { render } from "@react-email/render";
import { Resend } from "resend";
import { z } from "zod";
import ContactTemplate from "../../emails/ContactTemplate";

// Initialize Resend
const resend = new Resend(
	import.meta.env.RESEND_API_KEY ||
		process.env.RESEND_API_KEY ||
		"re_123456789",
);

const RATE_LIMIT_DURATION = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 10; // 10 requests

// In-memory store for rate limiting
const rateLimitMap = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
	const now = Date.now();
	const windowStart = now - RATE_LIMIT_DURATION;

	const timestamps = rateLimitMap.get(ip) || [];
	const validTimestamps = timestamps.filter((t) => t > windowStart);

	if (validTimestamps.length >= RATE_LIMIT_MAX) {
		return true;
	}

	validTimestamps.push(now);
	rateLimitMap.set(ip, validTimestamps);
	return false;
}

const contactSchema = z.object({
	name: z
		.string()
		.min(2, { message: "Identity name must be at least 2 characters." }),
	email: z
		.string()
		.email({ message: "Coordinates must represent a valid email format." }),
	subject: z.string().optional(),
	message: z.string().min(10, {
		message: "Payload description must contain at least 10 characters.",
	}),
});

export const POST: APIRoute = async ({ request, clientAddress }) => {
	try {
		const origin = request.headers.get("origin");
		const isDevelopment =
			import.meta.env.DEV || process.env.NODE_ENV === "development";
		const allowedOrigins = [
			"https://auroryslabs.com",
			"https://www.auroryslabs.com",
			"https://astro.auroryslabs.com",
			"http://localhost:3000",
			"http://localhost:4321", // Astro dev server
			"http://localhost:3078",
		];

		if (!isDevelopment && origin && !allowedOrigins.includes(origin)) {
			console.warn(`[SECURITY] Blocked Cross-Origin request from: ${origin}`);
			return new Response(JSON.stringify({ error: "Unauthorized Origin." }), {
				status: 403,
			});
		}

		const ip =
			request.headers.get("cf-connecting-ip") ||
			request.headers.get("x-forwarded-for") ||
			clientAddress ||
			"127.0.0.1";

		if (isRateLimited(ip)) {
			return new Response(
				JSON.stringify({ error: "Too many requests. Please try again later." }),
				{ status: 429 },
			);
		}

		const body = await request.json();

		const turnstileToken = body.turnstileToken || body["cf-turnstile-response"];
		if (!turnstileToken) {
			return new Response(
				JSON.stringify({ error: "Security verification token missing." }),
				{ status: 400 },
			);
		}

		const verifyEndpoint =
			"https://challenges.cloudflare.com/turnstile/v0/siteverify";
		const formData = new URLSearchParams();
		formData.append(
			"secret",
			import.meta.env.TURNSTILE_SECRET_KEY ||
				process.env.TURNSTILE_SECRET_KEY ||
				"1x0000000000000000000000000000000AA",
		);
		formData.append("response", turnstileToken);
		if (ip) formData.append("remoteip", ip);

		const verifyResponse = await fetch(verifyEndpoint, {
			method: "POST",
			body: formData,
		});

		const verifyData = await verifyResponse.json();

		if (!verifyData.success) {
			return new Response(
				JSON.stringify({
					error: "Security verification failed.",
					cf_codes: verifyData["error-codes"],
				}),
				{ status: 400 },
			);
		}

		const result = contactSchema.safeParse(body);
		if (!result.success) {
			return new Response(
				JSON.stringify({
					error: "Validation failed",
					details: result.error.flatten(),
				}),
				{ status: 400 },
			);
		}

		const { name, email, subject, message } = result.data;

		// Compile React Email to HTML string explicitly
		const htmlContent = await render(
			ContactTemplate({
				name,
				email,
				subject: subject || "Transmission",
				message,
			}),
			{ pretty: false },
		);

		// Send React Email using Resend
		const data = await resend.emails.send({
			from: "Aurorys Labs <requests@notifications.auroryslabs.com>",
			to: ["hi@auroryslabs.com"],
			cc: [email],
			replyTo: email,
			subject: `Secure Protocol Initiated: ${subject || "Transmission"}`,
			html: htmlContent,
		});

		if (data.error) {
			console.error("Resend API Error:", data.error);
			return new Response(JSON.stringify({ error: data.error.message }), {
				status: 500,
			});
		}

		return new Response(JSON.stringify({ success: true, data }), {
			status: 200,
		});
	} catch (error: any) {
		console.error("Internal API Send Error:", error);
		return new Response(
			JSON.stringify({ error: error?.message || "Internal Server Error" }),
			{ status: 500 },
		);
	}
};
