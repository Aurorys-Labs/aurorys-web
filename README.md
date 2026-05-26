# Astro Starter Kit: Minimal

```sh
bun create astro@latest -- --template minimal
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
# Aurorys Labs Web Platform

> Premium Boutique Cybersecurity Consulting Firm Website.

Built for high-performance, security, and exceptional aesthetics. This platform utilizes a hybrid architecture to deliver near-instant load times via static prerendering, while retaining robust server-side API routes for secure communications.

## 🚀 Tech Stack

- **Framework**: [Astro](https://astro.build) (Hybrid SSR Mode)
- **UI & Components**: React, Tailwind CSS v4, Framer Motion
- **Runtime & Package Manager**: [Bun](https://bun.sh)
- **Email Infrastructure**: Resend + React Email
- **Security**: Cloudflare Turnstile, Strict CSP/HSTS Middleware
- **Deployment**: Docker, Coolify, GitHub Actions

## 💻 Local Development

1. **Install Dependencies**
   ```bash
   bun install
   ```

2. **Environment Variables**
   Copy `.env.example` to `.env` and fill in your keys:
   ```bash
   cp .env.example .env
   ```

3. **Start Development Server**
   ```bash
   bun run dev
   ```
   *The site will be available at `http://localhost:4321`*

## 🐳 Docker Deployment

The project is fully containerized with separate stages for development and production.

- **Development Container**: 
  ```bash
  docker-compose -f docker-compose.dev.yml up
  ```
- **Production Container**: 
  ```bash
  docker-compose -f docker-compose.prod.yml up --build
  ```

## 🚢 CI/CD Pipeline

Deployments are entirely automated using GitHub Actions. Pushing to the `deploy/production` branch triggers the build and deploy process:

1. Code is built using `bun` inside a Docker container.
2. The image is pushed to `ghcr.io`.
3. A webhook triggers Coolify to pull the latest image and restart the VPS container.
4. Cloudflare edge cache is automatically purged.

**For full deployment instructions, see `DEPLOYMENT_GUIDE.md`.**

## 🔒 Security

This platform implements baseline security measures out of the box:
- Pre-commit secret scanning via `gitleaks`.
- Edge caching and DDoS protection via Cloudflare.
- Server-side Turnstile validation for bot protection.
- Astro Middleware enforcing strict **CSP**, **HSTS**, **X-Frame-Options**, and **Referrer-Policy** headers.
