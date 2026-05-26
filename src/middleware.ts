import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async (context, next) => {
	const response = await next();

	// Clone the response to ensure we can append headers (some adapters return immutable responses)
	const secureResponse = new Response(response.body, response);

	// HSTS: Enforce HTTPS for 1 year, including subdomains
	secureResponse.headers.set(
		"Strict-Transport-Security",
		"max-age=31536000; includeSubDomains; preload",
	);

	// CSP: Content Security Policy
	// Designed for Aurorys Labs: Allows Turnstile, local assets, and standard external fonts.
	const csp = `
        default-src 'self';
        script-src 'self' 'unsafe-inline' 'unsafe-eval' https://challenges.cloudflare.com;
        style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
        font-src 'self' https://fonts.gstatic.com https://fonts.googleapis.com;
        img-src 'self' data: https: blob:;
        frame-src 'self' https://challenges.cloudflare.com;
        connect-src 'self' https://api.cloudflare.com https://challenges.cloudflare.com ws: wss:;
        object-src 'none';
        base-uri 'self';
        form-action 'self';
        frame-ancestors 'none';
        upgrade-insecure-requests;
    `
		.replace(/\s+/g, " ")
		.trim();

	secureResponse.headers.set("Content-Security-Policy", csp);

	// Anti-Clickjacking and MIME sniffing protections
	secureResponse.headers.set("X-Content-Type-Options", "nosniff");
	secureResponse.headers.set("X-Frame-Options", "DENY");
	secureResponse.headers.set("X-XSS-Protection", "1; mode=block");
	secureResponse.headers.set(
		"Referrer-Policy",
		"strict-origin-when-cross-origin",
	);

	return secureResponse;
});
