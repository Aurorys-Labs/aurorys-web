"use client";

import data from "@/lib/data/roots.json";

export function Roots() {
  const { sectionTitle, sectionSubtitle, body } = data;

  return (
    <section className="section-padding border-t border-[var(--border-default)]">
      <div className="content-width">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-sans font-bold text-4xl md:text-5xl mb-4 tracking-tight">
              <span className="text-gradient-gold">{sectionTitle}</span>
            </h2>
            <p className="text-white/60">{sectionSubtitle}</p>
          </div>

          <div className="glass-card glass-card-tinted-gold p-10 space-y-6">
            <div>
              <p className="text-sm text-[var(--text-muted)] leading-relaxed">{body[0]}</p>
              <p className="text-sm text-[var(--text-muted)] leading-relaxed mt-3">{body[1]}</p>
            </div>
            <div className="border-t border-[var(--border-default)]" />
            <div>
              <p className="text-sm text-[var(--text-muted)] leading-relaxed">{body[2]}</p>
              <p className="text-sm text-[var(--text-muted)] leading-relaxed mt-3">{body[3]}</p>
            </div>
            <div className="pt-2">
              <a href="/roots" className="text-sm font-medium text-[var(--aurora-green-solid)] hover:underline">Read more about our roots</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
