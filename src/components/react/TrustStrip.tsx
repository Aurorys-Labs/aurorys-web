"use client";

import data from "@/lib/data/trust-strip.json";
import {
	Activity,
	BookOpen,
	Box,
	Cloud,
	Code,
	Container,
	Database,
	FileCheck,
	Lock,
	Scale,
	Search,
	Server,
	Shield,
	ShieldCheck,
	Target,
	Terminal,
	Wrench,
} from "lucide-react";

interface EntityMeta {
	icon?: React.ElementType;
	image?: string;
	slug?: string;
	url: string;
}

const frameworkMeta: Record<string, EntityMeta> = {
	SOC2: { icon: ShieldCheck, url: "https://www.aicpa.org/soc4so" },
	OWASP: { icon: Shield, slug: "owasp", url: "https://owasp.org" },
	"NIST CSF": {
		image: "/images/logos_external/nist-csf-hero.svg",
		url: "https://www.nist.gov/cyberframework",
	},
	"MITRE ATT&CK": {
		image: "/images/logos_external/mitre-new.svg",
		url: "https://attack.mitre.org/",
	},
	"CIS Benchmarks": {
		image: "/images/logos_external/cis-new.svg",
		url: "https://www.cisecurity.org/cis-benchmarks",
	},
	GDPR: {
		image: "/images/logos_external/gdpr-new.svg",
		url: "https://gdpr.eu/",
	},
	DPDP: {
		icon: Scale,
		url: "https://www.meity.gov.in/data-protection-framework",
	},
	HIPAA: {
		image: "/images/logos_external/hipaa-logo.png",
		url: "https://www.hhs.gov/hipaa/index.html",
	},
	"ISO 27001": {
		icon: BookOpen,
		url: "https://www.iso.org/isoiec-27001-information-security.html",
	},
	"LLM OWASP Top 10": {
		icon: Shield,
		slug: "owasp",
		url: "https://genai.owasp.org/",
	},
	"PCI-DSS": {
		image: "/images/logos_external/PCI-Logo.webp",
		url: "https://www.pcisecuritystandards.org/",
	},
};

const toolMeta: Record<string, EntityMeta> = {
	Docker: { icon: Container, slug: "docker", url: "https://www.docker.com/" },
	Terraform: {
		icon: Cloud,
		slug: "terraform",
		url: "https://www.terraform.io/",
	},
	Ansible: { icon: Terminal, slug: "ansible", url: "https://www.ansible.com/" },
	Trivy: {
		image: "/images/logos_external/trivy-logo.png",
		url: "https://aquasecurity.github.io/trivy/",
	},
	Grafana: { icon: Activity, slug: "grafana", url: "https://grafana.com/" },
	OpenTelemetry: {
		icon: Activity,
		slug: "opentelemetry",
		url: "https://opentelemetry.io/",
	},
	Prometheus: {
		icon: Activity,
		slug: "prometheus",
		url: "https://prometheus.io/",
	},
	Cloudflare: {
		icon: Cloud,
		slug: "cloudflare",
		url: "https://www.cloudflare.com/",
	},
	Tailscale: { icon: Lock, slug: "tailscale", url: "https://tailscale.com/" },
	Authentik: { icon: Lock, slug: "authentik", url: "https://goauthentik.io/" },
	Jenkins: { icon: Wrench, slug: "jenkins", url: "https://www.jenkins.io/" },
	Woodpecker: {
		image: "/images/logos_external/woodpecker-ci.webp",
		url: "https://woodpecker-ci.org/",
	},
	Snyk: { icon: Shield, slug: "snyk", url: "https://snyk.io/" },
	Gitleaks: { icon: Search, url: "https://gitleaks.io/" },
	Wazuh: {
		image: "/images/logos_external/wazuh-logo.svg",
		url: "https://wazuh.com/",
	},
};

function FrameworkCard({ name, meta }: { name: string; meta?: EntityMeta }) {
	const IconComp = meta?.icon || Box;
	const href = meta?.url || "#";

	return (
		<a
			href={href}
			target="_blank"
			rel="noopener noreferrer"
			className="flex flex-col items-center justify-center p-4 hover:scale-105 transition-all duration-300 gap-3 group min-w-[100px] w-full"
		>
			<div className="w-10 h-10 flex items-center justify-center opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300">
				{meta?.image ? (
					<img
						src={meta.image}
						alt={name}
						className="w-full h-full object-contain drop-shadow-md brightness-[5] contrast-200 group-hover:brightness-100 group-hover:contrast-100"
					/>
				) : meta?.slug ? (
					<img
						src={`https://cdn.simpleicons.org/${meta.slug}/white`}
						alt={name}
						className="w-full h-full object-contain drop-shadow-md"
					/>
				) : (
					<IconComp
						className="w-full h-full text-white/80 drop-shadow-md"
						strokeWidth={1.5}
					/>
				)}
			</div>
			<span className="text-xs font-semibold text-[var(--text-stellar)] group-hover:text-white transition-colors duration-300 text-center">
				{name}
			</span>
		</a>
	);
}

function ToolItem({ name, meta }: { name: string; meta?: EntityMeta }) {
	const IconComp = meta?.icon || Box;
	const href = meta?.url || "#";

	return (
		<a
			href={href}
			target="_blank"
			rel="noopener noreferrer"
			className="flex flex-col items-center justify-center gap-2 mx-6 group transition-all duration-300"
		>
			<div className="w-8 h-8 flex items-center justify-center opacity-50 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300">
				{meta?.image ? (
					<img
						src={meta.image}
						alt={name}
						className="w-full h-full object-contain brightness-[5] contrast-200 group-hover:brightness-100 group-hover:contrast-100"
					/>
				) : meta?.slug ? (
					<img
						src={`https://cdn.simpleicons.org/${meta.slug}/white`}
						alt={name}
						className="w-full h-full object-contain"
					/>
				) : (
					<IconComp className="w-full h-full text-white/80" strokeWidth={1.5} />
				)}
			</div>
			<span className="text-[10px] font-medium text-[var(--text-faint)] group-hover:text-white/80 transition-colors duration-300 whitespace-nowrap">
				{name}
			</span>
		</a>
	);
}

export function TrustStrip() {
	const { frameworks, tools, frameworksLabel, toolsLabel, methodologyText } =
		data;

	return (
		<section className="relative overflow-hidden border-b border-white/[0.04] bg-gradient-to-b from-[var(--aurora-blue-solid)]/5 to-[rgba(13,17,23,0.6)] backdrop-blur-md mt-12 pt-16 pb-12">
			{/* Subtle background glow */}
			<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-48 bg-emerald-500/5 blur-[120px] pointer-events-none rounded-full" />

			<div className="content-width relative z-10">
				<div className="text-center mb-10">
					<h2 className="font-sans font-bold text-3xl md:text-5xl tracking-tight">
						Built on Industry{" "}
						<span className="text-gradient-aurora">Standards</span>
					</h2>
				</div>

				{/* Frameworks */}
				<div className="mb-10">
					<p className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-[0.15em] mb-6 text-center">
						{frameworksLabel}
					</p>

					{/* 6 top, 5 bottom layout */}
					<div className="flex flex-col gap-4 md:gap-6 max-w-5xl mx-auto md:items-center">
						<div className="flex md:flex-wrap md:justify-center w-full max-w-4xl mx-auto gap-3 md:gap-4 md:grid md:grid-cols-6 overflow-x-auto md:overflow-visible hide-scrollbar snap-x px-6 md:px-0 scroll-pl-6">
							{frameworks.slice(0, 6).map((fw: string) => (
								<div
									key={fw}
									className="snap-start shrink-0 min-w-[110px] md:min-w-0"
								>
									<FrameworkCard name={fw} meta={frameworkMeta[fw]} />
								</div>
							))}
						</div>
						<div className="flex md:flex-wrap md:justify-center w-full max-w-3xl mx-auto gap-3 md:gap-4 md:grid md:grid-cols-5 overflow-x-auto md:overflow-visible hide-scrollbar snap-x px-6 md:px-0 scroll-pl-6">
							{frameworks.slice(6).map((fw: string) => (
								<div
									key={fw}
									className="snap-start shrink-0 min-w-[110px] md:min-w-0"
								>
									<FrameworkCard name={fw} meta={frameworkMeta[fw]} />
								</div>
							))}
						</div>
					</div>
				</div>

				{/* Tools — marquee */}
				<div className="pt-8 border-t border-white/[0.04]">
					<p className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-[0.15em] mb-6 text-center">
						{toolsLabel}
					</p>
					<div className="relative overflow-hidden mask-edges pb-2 group">
						<div
							className="flex animate-marquee group-hover:[animation-play-state:paused]"
							style={{ width: "max-content" }}
						>
							{[...tools, ...tools].map((tool: string, i: number) => (
								<ToolItem
									key={`${tool}-${i}`}
									name={tool}
									meta={toolMeta[tool]}
								/>
							))}
						</div>
					</div>
				</div>

				<p className="text-sm text-center text-[var(--text-stellar)] max-w-lg mx-auto leading-relaxed mt-10">
					We don't reinvent the wheel. We leverage a{" "}
					<span className="font-bold text-white">
						19k+ documented security playbook
					</span>{" "}
					to secure your infrastructure according to proven global standards.
				</p>
			</div>
		</section>
	);
}
