# 🛠️ TRD (Technical Requirements Document): Palette

## 1. Project Overview
- **Project Name:** Palette (Personal Social Micro-page)
- **Objective:** High-performance micro-page to showcase daily thoughts, photos, and music.

## 2. Tech Stack
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion
- **Deployment:** Vercel

## 3. Core Technical Features
- **Dynamic Theming:** Randomly selects theme color (#97c1a9, #cce2cb, #ffdbbe) on load.
- **Data Source:** Static `data.json` for fast server-side rendering.
- **Layered Reading:** Content expansion with smooth height transitions.
- **Media Player:** Custom UI for background music using HTML5 Audio API.

## 4. Performance
- Image optimization via `next/image`.
- Zero-layout shift fonts using `next/font`.