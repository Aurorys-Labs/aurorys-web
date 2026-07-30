import { defineMiddleware } from "astro:middleware";
import { EU_COUNTRIES, type Region } from "./lib/region";

export const onRequest = defineMiddleware(async (context, next) => {
	const host = context.request.headers.get("host") || "";
	const isDev =
		import.meta.env.DEV ||
		host.includes("localhost") ||
		host.includes("127.0.0.1");
	const country = (
		context.request.headers.get("cf-ipcountry") || "US"
	).toUpperCase();

	// Check URL query parameters or cookie for region testing
	let queryRegion = isDev
		? context.url.searchParams.get("region")?.toUpperCase()
		: undefined;
	const queryCountry = isDev
		? context.url.searchParams.get("country")?.toUpperCase()
		: undefined;

	if (queryCountry) {
		queryRegion =
			queryCountry === "IN"
				? "IN"
				: EU_COUNTRIES.has(queryCountry)
					? "EU"
					: "GLOBAL";
	}

	if (queryRegion === "RESET" || queryRegion === "AUTO") {
		context.cookies.delete("region_override", { path: "/" });
		queryRegion = undefined;
	} else if (
		queryRegion === "IN" ||
		queryRegion === "EU" ||
		queryRegion === "GLOBAL"
	) {
		context.cookies.set("region_override", queryRegion, {
			path: "/",
			maxAge: 60 * 60 * 24,
		});
	}

	const savedRegion = isDev
		? context.cookies.get("region_override")?.value?.toUpperCase()
		: undefined;
	const activeTestRegion = queryRegion || savedRegion;

	// 1. Determine Region
	let region: Region = "GLOBAL";
	let currencySymbol = "$";

	if (activeTestRegion === "IN") {
		region = "IN";
		currencySymbol = "";
	} else if (activeTestRegion === "EU") {
		region = "EU";
		currencySymbol = "€";
	} else if (activeTestRegion === "GLOBAL") {
		region = "GLOBAL";
		currencySymbol = "$";
	} else {
		if (host.startsWith("in.") || country === "IN") {
			region = "IN";
			currencySymbol = "";
		} else if (EU_COUNTRIES.has(country)) {
			region = "EU";
			currencySymbol = "€";
		}
	}

	// 2. Redirect India to subdomain if they are on main domain (skip in dev or query testing)
	if (
		country === "IN" &&
		!host.startsWith("in.") &&
		!context.url.pathname.startsWith("/api/") &&
		!isDev
	) {
		return context.redirect(
			`https://in.auroryslabs.com${context.url.pathname}${context.url.search}`,
			307,
		);
	}

	// 3. Inject locals
	context.locals.region = region;
	context.locals.currencySymbol = currencySymbol;

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
