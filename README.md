# L’Atelier Architectural Living — Next.js Customer Web Storefront

Luxury interior architecture, custom bespoke CAD visualizer, and ready-made furniture storefront built with Next.js 16, Turbopack, Tailwind CSS, and Redux Toolkit (RTK Query).

---

## 🚀 Deploying to Render (render.com)

Render can run this Next.js application as a **Node Web Service**.

### Step-by-Step Instructions:
1. Log in to [dashboard.render.com](https://dashboard.render.com).
2. Click **New +** > **Web Service**.
3. Connect your repository: `https://github.com/mahadihasandev/interior-webapp-Next-frontend.git`.
4. Configure settings:
   - **Name**: `interior-shop-frontend`
   - **Region**: Same region as your backend (e.g. Oregon or Frankfurt)
   - **Branch**: `main`
   - **Runtime**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Instance Type**: `Free`
5. In **Environment Variables**, add:
   | Key | Value / Example | Notes |
   |---|---|---|
   | `NODE_ENV` | `production` | Production mode |
   | `NEXT_PUBLIC_API_URL` | `https://<your-backend-slug>.onrender.com/api` | Point to your deployed Laravel backend API URL |
6. Click **Create Web Service**.

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

# 2. Configure environment
cp .env.example .env.local
# Set NEXT_PUBLIC_API_URL=http://127.0.0.1:8000/api

# 3. Start local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.
