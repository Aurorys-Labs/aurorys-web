/// <reference path="../.astro/types.d.ts" />

declare namespace App {
	interface Locals {
		region: import("./lib/region").Region;
		currencySymbol: string;
	}
}
