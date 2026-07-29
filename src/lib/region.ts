export type Region = "IN" | "EU" | "GLOBAL";

export const EU_COUNTRIES = new Set([
	"AT",
	"BE",
	"BG",
	"HR",
	"CY",
	"CZ",
	"DK",
	"EE",
	"FI",
	"FR",
	"DE",
	"GR",
	"HU",
	"IE",
	"IT",
	"LV",
	"LT",
	"LU",
	"MT",
	"NL",
	"PL",
	"PT",
	"RO",
	"SK",
	"SI",
	"ES",
	"SE",
]);

/**
 * Formats a price string based on the region.
 * The user requested no value conversion, just symbol swapping for EU ($ to €).
 */
export function formatPrice(
	priceStr: string | undefined,
	region: Region,
): string {
	if (!priceStr) return "";

	if (region === "EU") {
		// Replace the first $ with €
		return priceStr.replace(/\$/g, "€");
	}

	// Return as-is for GLOBAL and IN (though IN might hide the component entirely in the UI)
	return priceStr;
}
