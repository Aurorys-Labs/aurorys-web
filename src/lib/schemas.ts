import { z } from "zod";

// ==========================================
// Compliance Hub Schema
// ==========================================
export const complianceHubSchema = z.object({
	hero: z.object({
		title: z.string(),
		subtitle: z.string(),
	}),
	fastTrackOptions: z.array(
		z.object({
			label: z.string(),
			anchorId: z.string(),
			icon: z.string(),
		}),
	),
	grcExplained: z.object({
		title: z.string(),
		subtitle: z.string(),
		pillars: z.array(
			z.object({
				id: z.string(),
				title: z.string(),
				body: z.string(),
				visualType: z.enum(["pyramid", "radar", "timeline"]),
				items: z.array(z.string()).optional(),
				frameworks: z
					.array(
						z.object({
							name: z.string(),
							description: z.string(),
						}),
					)
					.optional(),
				closingNote: z.string(),
			}),
		),
		systemNote: z.string(),
	}),
	roiSection: z.object({
		title: z.string(),
		items: z.array(
			z.object({
				title: z.string(),
				description: z.string(),
			}),
		),
	}),
	offerings: z.array(
		z.object({
			id: z.string(),
			title: z.string(),
			subtitle: z.string(),
			pills: z.array(z.string()),
			price: z.string(),
			whenYouNeedThis: z.string(),
			body: z.string(),
			deliverables: z.array(z.string()),
			whatThisIsNot: z.string().optional(),
			ifSourcedSeparately: z.string().optional(),
			oftenDiscoveredDuringAssessment: z.boolean().optional(),
			valueContext: z.string().optional(),
			cta: z.object({
				label: z.string(),
				href: z.string(),
			}),
		}),
	),
	timeline: z.object({
		title: z.string(),
		subtitle: z.string(),
		steps: z.array(
			z.object({
				step: z.number(),
				title: z.string(),
				timeline: z.string(),
				description: z.string(),
			}),
		),
		closingNote: z.string(),
	}),
	crossLinks: z.object({
		title: z.string(),
		links: z.array(
			z.object({
				label: z.string(),
				href: z.string(),
			}),
		),
	}),
});

// ==========================================
// Sprints Page Schema
// ==========================================
export const sprintsPageSchema = z.object({
	hero: z.object({
		title: z.string(),
		subtitle: z.string(),
	}),
	intro: z.object({
		body: z.string(),
	}),
	sprintFormats: z.array(
		z.object({
			id: z.string(),
			title: z.string(),
			price: z.string(),
			duration: z.string(),
			focus: z.string(),
			deliverables: z.array(z.string()),
			whatThisIsNot: z.string().optional(),
			whenToChoose: z.string().optional(),
			cta: z.object({
				label: z.string(),
				href: z.string(),
			}),
		}),
	),
	rulesOfEngagement: z.array(
		z.object({
			id: z.string(),
			title: z.string(),
			icon: z.string(),
			body: z.string(),
			requirements: z.array(z.string()).optional(),
			checkins: z
				.array(
					z.object({
						day: z.number(),
						title: z.string(),
						description: z.string(),
					}),
				)
				.optional(),
			closingNote: z.string().optional(),
		}),
	),
	sprintDomains: z.object({
		title: z.string(),
		subtitle: z.string(),
		domains: z.array(
			z.object({
				name: z.string(),
				assessment: z.boolean(),
				buildPartnership: z.boolean(),
			}),
		),
		closingNote: z.string(),
	}),
	sprintVsFull: z.object({
		title: z.string(),
		rows: z.array(
			z.object({
				label: z.string(),
				sprint: z.string(),
				full: z.string(),
			}),
		),
		closingNote: z.string(),
	}),
	crossLinks: z.object({
		title: z.string(),
		links: z.array(
			z.object({
				label: z.string(),
				href: z.string(),
			}),
		),
	}),
});

// ==========================================
// Surge Page Schema
// ==========================================
export const surgePageSchema = z.object({
	hero: z.object({
		title: z.string(),
		subtitle: z.string(),
		terminalSequence: z.array(z.string()),
	}),
	problem: z.object({
		title: z.string(),
		body: z.string(),
		corePrinciple: z.string(),
	}),
	stacks: z.array(
		z.object({
			id: z.string(),
			title: z.string(),
			subtitle: z.string(),
			pills: z.array(z.string()),
			price: z.string(),
			body: z.string(),
			deliverables: z.array(z.string()).optional(),
			status: z.enum(["active", "coming-soon"]),
			cta: z.object({
				label: z.string(),
				href: z.string(),
			}),
		}),
	),
	deliveryProcess: z.object({
		title: z.string(),
		subtitle: z.string(),
		steps: z.array(
			z.object({
				step: z.number(),
				title: z.string(),
				body: z.string(),
				trainingItems: z.array(z.string()).optional(),
				closingNote: z.string().optional(),
			}),
		),
	}),
	liabilityBoundary: z.object({
		title: z.string(),
		body: z.string(),
		opinionatedNote: z.string(),
	}),
	surgeVsFull: z.object({
		title: z.string(),
		rows: z.array(
			z.object({
				label: z.string(),
				surge: z.string(),
				full: z.string(),
			}),
		),
		closingNote: z.string(),
	}),
	complianceCrossLink: z.object({
		title: z.string(),
		body: z.string(),
		cta: z.object({
			label: z.string(),
			href: z.string(),
		}),
	}),
	crossLinks: z.object({
		title: z.string(),
		links: z.array(
			z.object({
				label: z.string(),
				href: z.string(),
			}),
		),
	}),
});

// ==========================================
// Security Paths Schema
// ==========================================
export const securityPathsSchema = z.object({
	hero: z.object({
		title: z.string(),
		subtitle: z.string(),
	}),
	pathCards: z.array(
		z.object({
			startingPoint: z.string(),
			path: z.string(),
			pathId: z.string(),
		}),
	),
	paths: z.array(
		z.object({
			id: z.string(),
			title: z.string(),
			pills: z.array(z.string()),
			price: z.string(),
			whenYouNeedThis: z.string(),
			body: z.string(),
			deliverables: z.array(z.string()).optional(),
			ifSourcedSeparately: z
				.union([
					z.string(),
					z.object({
						items: z.array(z.string()),
						totalSeparate: z.string(),
						constellationPrice: z.string(),
					}),
				])
				.optional(),
			valueContext: z.string().optional(),
			multiplePaths: z.boolean().optional(),
			pathsLink: z.string().optional(),
			formatsLink: z.string().optional(),
			stacksLink: z.string().optional(),
			detailPageLink: z.string().optional(),
			cta: z.object({
				label: z.string(),
				href: z.string(),
			}),
		}),
	),
	roadLessTraveled: z.object({
		title: z.string(),
		body: z.string(),
		body2: z.string(),
		body3: z.string(),
		routes: z.array(
			z.object({
				title: z.string(),
				description: z.string(),
				link: z.string(),
				cta: z.string(),
			}),
		),
		quote: z.string(),
		quoteAttribution: z.string(),
		closingNote: z.string(),
	}),
	bundleAdvantage: z.object({
		title: z.string(),
		body: z.string(),
		body2: z.string(),
		advantages: z.array(z.string()),
	}),
	notSure: z.object({
		title: z.string(),
		body: z.string(),
		cta: z.object({
			label: z.string(),
			href: z.string(),
		}),
		secondaryCta: z.object({
			label: z.string(),
			href: z.string(),
		}),
	}),
	crossLinks: z.object({
		title: z.string(),
		links: z.array(
			z.object({
				label: z.string(),
				href: z.string(),
			}),
		),
	}),
});

// TypeScript inference helpers
export type ComplianceHubData = z.infer<typeof complianceHubSchema>;
export type SprintsPageData = z.infer<typeof sprintsPageSchema>;
export type SurgePageData = z.infer<typeof surgePageSchema>;
export type SecurityPathsData = z.infer<typeof securityPathsSchema>;
