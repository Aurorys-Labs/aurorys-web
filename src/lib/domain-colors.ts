/**
 * Domain Pill Color System
 *
 * Single source of truth for domain-to-color mapping across the entire site.
 * Based on copy-v5 Section 5 "Domain Pill Colors" spec.
 *
 * Usage: import { getDomainStyle } from "@/lib/domain-colors";
 *        Then: <span className={getDomainStyle("Architecture")}>Architecture</span>
 */

export type DomainName =
	| "Architecture"
	| "DevSecOps"
	| "Compliance"
	| "Infrastructure"
	| "Advisory"
	| "Assessment"
	| "Supply Chain"
	| "Cost Optimization"
	| "Risk"
	| "Governance"
	| "Migration"
	| "Training"
	| "Secrets"
	| "Containers"
	| "Audit"
	| "Hardening"
	| "Security"
	| "Engineering"
	| "Automation"
	| "Strategy"
	| "Sovereignty"
	| "Self-Hosted"
	| "Independence"
	| "vCISO"
	| "Strategic"
	| "SOC 2"
	| "GDPR Ready"
	| "Blueprints"
	| "Ship Secure"
	| "Risk Priority"
	| "Clear Roadmap"
	| "Policy"
	| "Core"
	| "Monitoring"
	| "Alerting"
	| "Metrics"
	| "Identity"
	| "Network"
	| "VPN"
	| "Observability"
	| "Identity Stack"
	| "Compliance Bastion"
	| "Business Tools"
	| "SSO"
	| "MFA"
	| "ISO 27001"
	| "HIPAA"
	| "GDPR"
	| "NIST CSF"
	| "Incident Response"
	| "Risk Management"
	| "Security Awareness"
	| "Asset Management"
	| "Vulnerability Management"
	| "Access Control"
	| "Security Metrics"
	| "Threat Modeling"
	| "Container Security"
	| "Kubernetes"
	| "Secrets Management"
	| "Day-0 Snapshot"
	| "Self-Hosted Infra"
	| "Cost Savings";

interface DomainStyle {
	bg: string;
	border: string;
	text: string;
}

const domainMap: Record<string, DomainStyle> = {
	// === Copy-v5 Spec Colors ===
	architecture: {
		bg: "bg-gradient-to-r from-violet-500/25 to-violet-500/10",
		border: "border-violet-500/40",
		text: "text-violet-300 font-semibold",
	},
	devsecops: {
		bg: "bg-gradient-to-r from-emerald-500/25 to-emerald-500/10",
		border: "border-emerald-500/40",
		text: "text-emerald-300 font-semibold",
	},
	compliance: {
		bg: "bg-gradient-to-r from-amber-500/25 to-amber-500/10",
		border: "border-amber-500/40",
		text: "text-amber-300 font-semibold",
	},
	infrastructure: {
		bg: "bg-gradient-to-r from-rose-500/25 to-rose-500/10",
		border: "border-rose-500/40",
		text: "text-rose-300 font-semibold",
	},
	advisory: {
		bg: "bg-gradient-to-r from-violet-500/25 to-violet-500/10",
		border: "border-violet-500/40",
		text: "text-violet-300 font-semibold",
	},
	assessment: {
		bg: "bg-gradient-to-r from-white/15 to-white/5",
		border: "border-white/20",
		text: "text-white/80 font-semibold",
	},
	"supply chain": {
		bg: "bg-gradient-to-r from-emerald-500/25 to-emerald-500/10",
		border: "border-emerald-500/40",
		text: "text-emerald-300 font-semibold",
	},
	"cost optimization": {
		bg: "bg-gradient-to-r from-rose-500/25 to-rose-500/10",
		border: "border-rose-500/40",
		text: "text-rose-300 font-semibold",
	},
	risk: {
		bg: "bg-gradient-to-r from-white/15 to-white/5",
		border: "border-white/20",
		text: "text-white/80 font-semibold",
	},
	governance: {
		bg: "bg-gradient-to-r from-amber-500/25 to-amber-500/10",
		border: "border-amber-500/40",
		text: "text-amber-300 font-semibold",
	},
	migration: {
		bg: "bg-gradient-to-r from-rose-500/25 to-rose-500/10",
		border: "border-rose-500/40",
		text: "text-rose-300 font-semibold",
	},
	training: {
		bg: "bg-gradient-to-r from-violet-500/25 to-violet-500/10",
		border: "border-violet-500/40",
		text: "text-violet-300 font-semibold",
	},
	secrets: {
		bg: "bg-gradient-to-r from-emerald-500/25 to-emerald-500/10",
		border: "border-emerald-500/40",
		text: "text-emerald-300 font-semibold",
	},
	containers: {
		bg: "bg-gradient-to-r from-emerald-500/25 to-emerald-500/10",
		border: "border-emerald-500/40",
		text: "text-emerald-300 font-semibold",
	},
	audit: {
		bg: "bg-gradient-to-r from-amber-500/25 to-amber-500/10",
		border: "border-amber-500/40",
		text: "text-amber-300 font-semibold",
	},
	hardening: {
		bg: "bg-gradient-to-r from-violet-500/25 to-violet-500/10",
		border: "border-violet-500/40",
		text: "text-violet-300 font-semibold",
	},

	// === Extended Domain Colors (for hero slides, pricing, etc.) ===
	security: {
		bg: "bg-gradient-to-r from-emerald-500/25 to-emerald-500/10",
		border: "border-emerald-500/40",
		text: "text-emerald-300 font-semibold",
	},
	engineering: {
		bg: "bg-gradient-to-r from-emerald-500/25 to-emerald-500/10",
		border: "border-emerald-500/40",
		text: "text-emerald-300 font-semibold",
	},
	automation: {
		bg: "bg-gradient-to-r from-emerald-500/25 to-emerald-500/10",
		border: "border-emerald-500/40",
		text: "text-emerald-300 font-semibold",
	},
	strategy: {
		bg: "bg-gradient-to-r from-violet-500/25 to-violet-500/10",
		border: "border-violet-500/40",
		text: "text-violet-300 font-semibold",
	},
	sovereignty: {
		bg: "bg-gradient-to-r from-rose-500/25 to-rose-500/10",
		border: "border-rose-500/40",
		text: "text-rose-300 font-semibold",
	},
	"self-hosted": {
		bg: "bg-gradient-to-r from-rose-500/25 to-rose-500/10",
		border: "border-rose-500/40",
		text: "text-rose-300 font-semibold",
	},
	independence: {
		bg: "bg-gradient-to-r from-rose-500/25 to-rose-500/10",
		border: "border-rose-500/40",
		text: "text-rose-300 font-semibold",
	},
	vciso: {
		bg: "bg-gradient-to-r from-violet-500/20 to-violet-500/10",
		border: "border-violet-500/30",
		text: "text-violet-300/90 font-semibold",
	},
	strategic: {
		bg: "bg-gradient-to-r from-violet-500/25 to-violet-500/10",
		border: "border-violet-500/40",
		text: "text-violet-300 font-semibold",
	},
	"soc 2": {
		bg: "bg-gradient-to-r from-amber-500/25 to-amber-500/10",
		border: "border-amber-500/40",
		text: "text-amber-300 font-semibold",
	},
	"gdpr ready": {
		bg: "bg-gradient-to-r from-amber-500/25 to-amber-500/10",
		border: "border-amber-500/40",
		text: "text-amber-300 font-semibold",
	},
	blueprints: {
		bg: "bg-gradient-to-r from-violet-500/25 to-violet-500/10",
		border: "border-violet-500/40",
		text: "text-violet-300 font-semibold",
	},
	"ship secure": {
		bg: "bg-gradient-to-r from-emerald-500/25 to-emerald-500/10",
		border: "border-emerald-500/40",
		text: "text-emerald-300 font-semibold",
	},
	"risk priority": {
		bg: "bg-gradient-to-r from-white/15 to-white/5",
		border: "border-white/20",
		text: "text-white/80 font-semibold",
	},
	"clear roadmap": {
		bg: "bg-gradient-to-r from-white/15 to-white/5",
		border: "border-white/20",
		text: "text-white/80 font-semibold",
	},
	policy: {
		bg: "bg-gradient-to-r from-amber-500/25 to-amber-500/10",
		border: "border-amber-500/40",
		text: "text-amber-300 font-semibold",
	},
	core: {
		bg: "bg-gradient-to-r from-emerald-500/25 to-emerald-500/10",
		border: "border-emerald-500/40",
		text: "text-emerald-300 font-semibold",
	},

	// === Direct Colors for Glass Tints and Badges ===
	teal: {
		bg: "bg-gradient-to-r from-teal-500/25 to-teal-500/10",
		border: "border-teal-500/40",
		text: "text-teal-300 font-semibold",
	},
	fuchsia: {
		bg: "bg-gradient-to-r from-fuchsia-500/25 to-fuchsia-500/10",
		border: "border-fuchsia-500/40",
		text: "text-fuchsia-300 font-semibold",
	},
	purple: {
		bg: "bg-gradient-to-r from-purple-500/25 to-purple-500/10",
		border: "border-purple-500/40",
		text: "text-purple-300 font-semibold",
	},
	violet: {
		bg: "bg-gradient-to-r from-violet-500/25 to-violet-500/10",
		border: "border-violet-500/40",
		text: "text-violet-300 font-semibold",
	},
	sky: {
		bg: "bg-gradient-to-r from-sky-500/25 to-sky-500/10",
		border: "border-sky-500/40",
		text: "text-sky-300 font-semibold",
	},

	// === New Page Domains (Compliance Hub, Sprints, Surge, Security Paths) ===
	monitoring: {
		bg: "bg-gradient-to-r from-emerald-500/25 to-emerald-500/10",
		border: "border-emerald-500/40",
		text: "text-emerald-300 font-semibold",
	},
	alerting: {
		bg: "bg-gradient-to-r from-emerald-500/25 to-emerald-500/10",
		border: "border-emerald-500/40",
		text: "text-emerald-300 font-semibold",
	},
	metrics: {
		bg: "bg-gradient-to-r from-emerald-500/25 to-emerald-500/10",
		border: "border-emerald-500/40",
		text: "text-emerald-300 font-semibold",
	},
	identity: {
		bg: "bg-gradient-to-r from-violet-500/25 to-violet-500/10",
		border: "border-violet-500/40",
		text: "text-violet-300 font-semibold",
	},
	network: {
		bg: "bg-gradient-to-r from-rose-500/25 to-rose-500/10",
		border: "border-rose-500/40",
		text: "text-rose-300 font-semibold",
	},
	vpn: {
		bg: "bg-gradient-to-r from-rose-500/25 to-rose-500/10",
		border: "border-rose-500/40",
		text: "text-rose-300 font-semibold",
	},
	observability: {
		bg: "bg-gradient-to-r from-emerald-500/25 to-emerald-500/10",
		border: "border-emerald-500/40",
		text: "text-emerald-300 font-semibold",
	},
	"identity stack": {
		bg: "bg-gradient-to-r from-violet-500/25 to-violet-500/10",
		border: "border-violet-500/40",
		text: "text-violet-300 font-semibold",
	},
	"compliance bastion": {
		bg: "bg-gradient-to-r from-amber-500/25 to-amber-500/10",
		border: "border-amber-500/40",
		text: "text-amber-300 font-semibold",
	},
	"business tools": {
		bg: "bg-gradient-to-r from-violet-500/25 to-violet-500/10",
		border: "border-violet-500/40",
		text: "text-violet-300 font-semibold",
	},
	sso: {
		bg: "bg-gradient-to-r from-violet-500/25 to-violet-500/10",
		border: "border-violet-500/40",
		text: "text-violet-300 font-semibold",
	},
	mfa: {
		bg: "bg-gradient-to-r from-violet-500/25 to-violet-500/10",
		border: "border-violet-500/40",
		text: "text-violet-300 font-semibold",
	},
	"iso 27001": {
		bg: "bg-gradient-to-r from-amber-500/25 to-amber-500/10",
		border: "border-amber-500/40",
		text: "text-amber-300 font-semibold",
	},
	hipaa: {
		bg: "bg-gradient-to-r from-amber-500/25 to-amber-500/10",
		border: "border-amber-500/40",
		text: "text-amber-300 font-semibold",
	},
	gdpr: {
		bg: "bg-gradient-to-r from-amber-500/25 to-amber-500/10",
		border: "border-amber-500/40",
		text: "text-amber-300 font-semibold",
	},
	"nist csf": {
		bg: "bg-gradient-to-r from-sky-500/25 to-sky-500/10",
		border: "border-sky-500/40",
		text: "text-sky-300 font-semibold",
	},
	"incident response": {
		bg: "bg-gradient-to-r from-rose-500/25 to-rose-500/10",
		border: "border-rose-500/40",
		text: "text-rose-300 font-semibold",
	},
	"risk management": {
		bg: "bg-gradient-to-r from-white/15 to-white/5",
		border: "border-white/20",
		text: "text-white/80 font-semibold",
	},
	"security awareness": {
		bg: "bg-gradient-to-r from-violet-500/25 to-violet-500/10",
		border: "border-violet-500/40",
		text: "text-violet-300 font-semibold",
	},
	"asset management": {
		bg: "bg-gradient-to-r from-white/15 to-white/5",
		border: "border-white/20",
		text: "text-white/80 font-semibold",
	},
	"vulnerability management": {
		bg: "bg-gradient-to-r from-white/15 to-white/5",
		border: "border-white/20",
		text: "text-white/80 font-semibold",
	},
	"access control": {
		bg: "bg-gradient-to-r from-violet-500/25 to-violet-500/10",
		border: "border-violet-500/40",
		text: "text-violet-300 font-semibold",
	},
	"security metrics": {
		bg: "bg-gradient-to-r from-emerald-500/25 to-emerald-500/10",
		border: "border-emerald-500/40",
		text: "text-emerald-300 font-semibold",
	},
	"threat modeling": {
		bg: "bg-gradient-to-r from-white/15 to-white/5",
		border: "border-white/20",
		text: "text-white/80 font-semibold",
	},
	"container security": {
		bg: "bg-gradient-to-r from-emerald-500/25 to-emerald-500/10",
		border: "border-emerald-500/40",
		text: "text-emerald-300 font-semibold",
	},
	kubernetes: {
		bg: "bg-gradient-to-r from-emerald-500/25 to-emerald-500/10",
		border: "border-emerald-500/40",
		text: "text-emerald-300 font-semibold",
	},
	"secrets management": {
		bg: "bg-gradient-to-r from-emerald-500/25 to-emerald-500/10",
		border: "border-emerald-500/40",
		text: "text-emerald-300 font-semibold",
	},
	"day-0 snapshot": {
		bg: "bg-gradient-to-r from-sky-500/25 to-sky-500/10",
		border: "border-sky-500/40",
		text: "text-sky-300 font-semibold",
	},
	"self-hosted infra": {
		bg: "bg-gradient-to-r from-rose-500/25 to-rose-500/10",
		border: "border-rose-500/40",
		text: "text-rose-300 font-semibold",
	},
	"cost savings": {
		bg: "bg-gradient-to-r from-emerald-500/25 to-emerald-500/10",
		border: "border-emerald-500/40",
		text: "text-emerald-300 font-semibold",
	},
};

/**
 * Get the domain pill style for a given domain name.
 * Falls back to a neutral style for unknown domains.
 */
export function getDomainStyle(domain: string): DomainStyle {
	return (
		domainMap[domain.toLowerCase()] ?? {
			bg: "bg-gradient-to-r from-white/8 to-white/3",
			border: "border-white/20",
			text: "text-white/60 font-semibold",
		}
	);
}

/**
 * Render a domain pill tag.
 * Usage: <span className={`tag-pill ${getDomainStyle("Architecture").bg} ${getDomainStyle("Architecture").border} ${getDomainStyle("Architecture").text}`}>Architecture</span>
 */
export function domainPill(domain: string): string {
	const style = getDomainStyle(domain);
	return `backdrop-blur-sm text-xs px-2.5 py-0.5 rounded-full border shadow-sm ${style.bg} ${style.border} ${style.text}`;
}

/**
 * Render a small domain pill (for compact contexts like skinny cards).
 */
export function domainPillSmall(domain: string): string {
	const style = getDomainStyle(domain);
	return `backdrop-blur-sm text-[9px] px-2 py-0.5 rounded-full border shadow-sm ${style.bg} ${style.border} ${style.text}`;
}
