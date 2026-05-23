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
  | "Clear Roadmap";

interface DomainStyle {
  bg: string;
  border: string;
  text: string;
}

const domainMap: Record<string, DomainStyle> = {
  // === Copy-v5 Spec Colors ===
  "architecture":      { bg: "bg-gradient-to-r from-violet-500/25 to-violet-500/10",  border: "border-violet-500/40",  text: "text-violet-300 font-semibold" },
  "devsecops":         { bg: "bg-gradient-to-r from-emerald-500/25 to-emerald-500/10", border: "border-emerald-500/40", text: "text-emerald-300 font-semibold" },
  "compliance":        { bg: "bg-gradient-to-r from-amber-500/25 to-amber-500/10",      border: "border-amber-500/40",   text: "text-amber-300 font-semibold" },
  "infrastructure":    { bg: "bg-gradient-to-r from-rose-500/25 to-rose-500/10",        border: "border-rose-500/40",    text: "text-rose-300 font-semibold" },
  "advisory":          { bg: "bg-gradient-to-r from-violet-500/25 to-violet-500/10",    border: "border-violet-500/40",  text: "text-violet-300 font-semibold" },
  "assessment":        { bg: "bg-gradient-to-r from-white/15 to-white/5",                 border: "border-white/20",       text: "text-white/80 font-semibold" },
  "supply chain":      { bg: "bg-gradient-to-r from-emerald-500/25 to-emerald-500/10",  border: "border-emerald-500/40", text: "text-emerald-300 font-semibold" },
  "cost optimization": { bg: "bg-gradient-to-r from-rose-500/25 to-rose-500/10",        border: "border-rose-500/40",    text: "text-rose-300 font-semibold" },
  "risk":              { bg: "bg-gradient-to-r from-white/15 to-white/5",                 border: "border-white/20",       text: "text-white/80 font-semibold" },
  "governance":        { bg: "bg-gradient-to-r from-amber-500/25 to-amber-500/10",      border: "border-amber-500/40",   text: "text-amber-300 font-semibold" },
  "migration":         { bg: "bg-gradient-to-r from-rose-500/25 to-rose-500/10",         border: "border-rose-500/40",    text: "text-rose-300 font-semibold" },
  "training":          { bg: "bg-gradient-to-r from-violet-500/25 to-violet-500/10",     border: "border-violet-500/40",  text: "text-violet-300 font-semibold" },
  "secrets":           { bg: "bg-gradient-to-r from-emerald-500/25 to-emerald-500/10",  border: "border-emerald-500/40", text: "text-emerald-300 font-semibold" },
  "containers":        { bg: "bg-gradient-to-r from-emerald-500/25 to-emerald-500/10",  border: "border-emerald-500/40", text: "text-emerald-300 font-semibold" },
  "audit":             { bg: "bg-gradient-to-r from-amber-500/25 to-amber-500/10",      border: "border-amber-500/40",   text: "text-amber-300 font-semibold" },
  "hardening":         { bg: "bg-gradient-to-r from-violet-500/25 to-violet-500/10",    border: "border-violet-500/40",  text: "text-violet-300 font-semibold" },

  // === Extended Domain Colors (for hero slides, pricing, etc.) ===
  "security":          { bg: "bg-gradient-to-r from-emerald-500/25 to-emerald-500/10",  border: "border-emerald-500/40", text: "text-emerald-300 font-semibold" },
  "engineering":      { bg: "bg-gradient-to-r from-emerald-500/25 to-emerald-500/10",  border: "border-emerald-500/40", text: "text-emerald-300 font-semibold" },
  "automation":       { bg: "bg-gradient-to-r from-emerald-500/25 to-emerald-500/10",  border: "border-emerald-500/40", text: "text-emerald-300 font-semibold" },
  "strategy":         { bg: "bg-gradient-to-r from-violet-500/25 to-violet-500/10",   border: "border-violet-500/40",  text: "text-violet-300 font-semibold" },
  "sovereignty":      { bg: "bg-gradient-to-r from-rose-500/25 to-rose-500/10",        border: "border-rose-500/40",    text: "text-rose-300 font-semibold" },
  "self-hosted":      { bg: "bg-gradient-to-r from-rose-500/25 to-rose-500/10",        border: "border-rose-500/40",    text: "text-rose-300 font-semibold" },
  "independence":     { bg: "bg-gradient-to-r from-rose-500/25 to-rose-500/10",        border: "border-rose-500/40",    text: "text-rose-300 font-semibold" },
  "vciso":            { bg: "bg-gradient-to-r from-violet-500/20 to-violet-500/10",    border: "border-violet-500/30",  text: "text-violet-300/90 font-semibold" },
  "strategic":        { bg: "bg-gradient-to-r from-violet-500/25 to-violet-500/10",    border: "border-violet-500/40",  text: "text-violet-300 font-semibold" },
  "soc 2":            { bg: "bg-gradient-to-r from-amber-500/25 to-amber-500/10",      border: "border-amber-500/40",   text: "text-amber-300 font-semibold" },
  "gdpr ready":       { bg: "bg-gradient-to-r from-amber-500/25 to-amber-500/10",     border: "border-amber-500/40",   text: "text-amber-300 font-semibold" },
  "blueprints":       { bg: "bg-gradient-to-r from-violet-500/25 to-violet-500/10",   border: "border-violet-500/40",  text: "text-violet-300 font-semibold" },
  "ship secure":      { bg: "bg-gradient-to-r from-emerald-500/25 to-emerald-500/10", border: "border-emerald-500/40", text: "text-emerald-300 font-semibold" },
  "risk priority":    { bg: "bg-gradient-to-r from-white/15 to-white/5",                border: "border-white/20",       text: "text-white/80 font-semibold" },
  "clear roadmap":    { bg: "bg-gradient-to-r from-white/15 to-white/5",                border: "border-white/20",       text: "text-white/80 font-semibold" },
  "policy":           { bg: "bg-gradient-to-r from-amber-500/25 to-amber-500/10",       border: "border-amber-500/40",  text: "text-amber-300 font-semibold" },
  "core":             { bg: "bg-gradient-to-r from-emerald-500/25 to-emerald-500/10",  border: "border-emerald-500/40", text: "text-emerald-300 font-semibold" },
};

/**
 * Get the domain pill style for a given domain name.
 * Falls back to a neutral style for unknown domains.
 */
export function getDomainStyle(domain: string): DomainStyle {
  return domainMap[domain.toLowerCase()] ?? { bg: "bg-gradient-to-r from-white/8 to-white/3", border: "border-white/20", text: "text-white/60 font-semibold" };
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