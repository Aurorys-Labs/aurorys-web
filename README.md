# Aurorys Labs Website

> Public marketing website for Aurorys Labs — premium boutique cybersecurity consulting.
> Built with Astro 5.x, React 19, Tailwind CSS 4, and shadcn/ui.

---

## 🚀 Tech Stack

- **Framework**: Astro 5.x (static-first, content & SEO optimized)
- **Interactivity**: React 19 Islands (glass cards, canvas effects, forms)
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion (pointer tracking, scroll reveals, SVG paths)
- **Package Manager**: Bun
- **Design System**: shadcn/ui + custom liquid glass primitives

## 📁 Project Structure

```
.
├── public/              # Static assets (images, videos, fonts)
├── src/
│   ├── components/      # React/Astro UI components
│   ├── layouts/         # BaseLayout, page shells
│   ├── pages/           # Astro file-based routing
│   ├── styles/          # Global CSS, Tailwind tokens
│   └── content/         # Astro Content Collections (blog, etc.)
├── .github/             # GitHub Actions CI/CD
├── docker/              # Docker configuration
└── README.md
```

## 🔒 Security First

This repository follows a DevSecOps pipeline:
- Pre-commit hooks (gitleaks, detect-private-key, biome-check)
- GitHub Actions: lint → type-check → build → Semgrep → Trivy → audit
- Self-hosted runner on Coolify VPS for sovereign CI/CD

## 🏗️ Development

```bash
# Install dependencies
bun install

# Start dev server
bun run dev

# Build for production
bun run build

# Preview production build
bun run preview
```

## 📄 License

© 2026 Aurorys Labs. All rights reserved.

---

Built with precision. Secured by design.
