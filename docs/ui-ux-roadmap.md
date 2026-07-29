# UI/UX & Routing Overhaul Plan

*This document serves as the master checklist for our immediate frontend execution.*

## 1. Strategy & Next Steps: Solutions vs. Security Paths
**The Core Philosophy**: Bundling reduces overall cost across the board. Whether it's the Full Constellation or a Pulse Sprint (combining assessment, infrastructure, and DevSecOps), buying our bundled services is significantly more cost-effective than buying them a-la-carte from multiple vendors.
**The Roadmap**:
- **Today**: Deploy the immediate UI/UX fixes below to ensure the current site is polished, accessible, and bug-free for launch. Post-deployment, we will tackle the Cloudflare region and domain routing configurations together.
- **Next Iteration (Prototype)**: We will build out a "Hybrid Approach" in dev. We'll streamline the language for non-technical buyers, clearly separate "Who We Help" (Use Cases) from "What We Sell" (Solutions), and heavily emphasize the bundling discount philosophy.

---

## 2. Environment & Routing
- **Middleware Update (`src/middleware.ts`)**: Restrict URL parameter overrides (`?region=` or `?country=`) strictly to development environments (`import.meta.env.DEV` or `localhost`). In production, strictly enforce Cloudflare's `cf-ipcountry` header for geolocation and routing.

---

## 3. Typography, Logos, and Formatting
- **Global Typography Scale**: Increase the base font size to ~18px using `rem` units for better readability across demographics.
- **Strict Font Adherence**: *We will KEEP the exact fonts as they are currently assigned.* We will not blindly override the font-family. If any specific heading or block feels like it needs a different font for hierarchy purposes, I will prompt you first for approval.
- **Logo Sizing**: Enlarge the SVG logos in both the desktop Navbar and the Footer.
- **Founding Clients Tag**: Increase the "Accepting Founding Clients" tag at the top of the home page to `text-base` / `text-medium` for much stronger prominence.
- **Footer Links**: Update "The Aurorys Way" link in the footer to point directly to the correct anchor tag on the homepage (e.g., `/#aurorys-way`) rather than just `/`.

---

## 4. Consistent "Golden Gradient" Typography
We will standardize our emphasis gradient to use the subtle, elegant golden animation from the "How We Work" page ("you own the outcome"), removing any harsh/gaudy gradients.
- **Full Constellation Pitch**: Format "You own it. One..." using the Instrument Serif font. Apply the subtle golden animated gradient (and italics) to the emphasis portion, and standard Instrument Serif to the rest.
- **Surge Page**: Replace the harsh gradient on "We don't touch your code" with the subtle golden animation.
- **Roots Page**: Expand the gradient on "We're here to build capability, not dependency." to cover more of the phrase, and use the subtle golden animation.
- **Full Constellation Quote**: The "We'd rather lose a $120k engagement..." quote text size is currently disjointed. Standardize its size and emphasis to match the other blockquotes on the page.

---

## 5. Interactive Components & Animations
- **Contact Form (`ContactSection.astro`)**:
  - Add auto-resize logic so the `textarea` height dynamically expands as the user types.
  - Keep CSS `resize-y` enabled for manual dragging.
- **Solutions Bento Cards (`SolutionsBento.tsx`)**:
  - Implement a sequenced framer-motion animation on mount: Card 1 closes, Card 2 opens, followed by a cascading "hover glow" effect across the remaining cards to prime interactivity.
- **"Why Us" Cards (`AurorysWay.tsx`)**:
  - Add a sequenced priming animation on scroll into view: Card 1 opens (text visible) for 1-2 seconds, then closes. Then Card 2 does the same, followed by Card 3.

---

## 6. Mobile Navbar Overhaul
We will completely stabilize the mobile navbar across Safari, Firefox, and Chrome/Google App.
- **Mega Menu (Center Logo Click)**:
  - Transform the center toggle menu into a holistic "Mega Menu" with tabs.
  - Ensure it contains all navigation categories (Paths, Solutions, Company, Legal) so users don't have to hunt for links.
  - **Bug Fix**: Fix the "one and done" toggle state bug so the logo button can reliably open AND close the menu continuously.
- **Swipe/Flick Menu**:
  - Fix the gesture recognition so flicking correctly routes on Safari and doesn't get "stuck open" on the Google App.
  - *Expansion*: We will add more destinations to the flick menu (e.g., flicking diagonal-up-left for Contact, diagonal-up-right for Compliance). We will brainstorm the exact layout together.
- **Dynamic Viewport Height**: Update mobile nav wrappers to use `100dvh` instead of `100vh` to prevent iOS Safari's bottom URL bar from hiding menu items or flick targets.

---

## 7. Global Scroll-To-View Behavior
- **Mobile Sidebars (Paths & Solutions)**:
  - Currently, clicking a left-bar navigation item on mobile selects it but doesn't scroll down to the actual content card, leaving users confused.
  - **Fix**: Implement an automatic `scrollIntoView({ behavior: 'smooth' })` globally across all mobile sidebar navigations (Security Paths, Solutions Hub, etc.) so the user is immediately dragged down to the relevant content.
