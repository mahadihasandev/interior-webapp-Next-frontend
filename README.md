# L’Atelier Architectural Living — Next.js Customer Web Storefront

Luxury interior architecture, custom bespoke CAD visualizer, and ready-made furniture storefront built with Next.js 16, Turbopack, Tailwind CSS, and Redux Toolkit (RTK Query).

---

## 🚀 Deploying to Vercel (Recommended)

Vercel provides native 100% performance for Next.js with global Edge caching, zero cold starts, and automatic HTTPS.

### 1-Click Deployment Steps:
1. Log in to [vercel.com](https://vercel.com) (with your GitHub account).
2. Click **Add New...** > **Project**.
3. Import the repository: `mahadihasandev/interior-webapp-Next-frontend`.
4. In **Environment Variables**, set:
   | Key | Value |
   |---|---|
   | `NEXT_PUBLIC_API_URL` | `https://interior-webapp-php-backend.onrender.com/api` |
5. Click **Deploy**.

Your storefront will be live across worldwide CDN edges in ~40 seconds!

---

## 🚀 Alternative: Deploying to Render (render.com)

If you prefer deploying the frontend to Render as well:
1. In [Render Dashboard](https://dashboard.render.com), click **New +** > **Web Service**.
2. Connect `https://github.com/mahadihasandev/interior-webapp-Next-frontend.git`.
3. Set **Runtime**: `Node`, **Build Command**: `npm install && npm run build`, **Start Command**: `npm start`.
4. Add environment variable:
   - `NEXT_PUBLIC_API_URL`: `https://interior-webapp-php-backend.onrender.com/api`
5. Click **Create Web Service**.

---

## 📱 Three-Tier Responsive Architecture
The storefront is fully responsive across all device classes:
- **Large (Desktop: >= 1024px / 1280px)**: Multi-column curated grid, side-by-side CAD visualizer elevations, sticky photo showcases, horizontal navigation with interactive category dropdowns.
- **Medium (Tablet: 768px - 1023px)**: 2-column balanced layouts, smooth touch-scrollable category tabs, adaptive visualizers, compact header with quick actions.
- **Small (Mobile Phones: 320px - 767px)**: Single-column stacked cards, full-width touch-friendly CTA buttons, off-canvas navigation drawer, bottom sheet cart drawer with zero horizontal clipping.

---

## 💻 Local Development Setup

```bash
# 1. Install dependencies
npm install

# 2. Start local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.
