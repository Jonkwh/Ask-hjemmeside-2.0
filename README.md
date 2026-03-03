# Ask — Artist Website

A premium, multi-page gallery website for Ask, a Copenhagen-based painter. Built with React + Vite + Tailwind CSS.

## Pages

- **Home** — Full-screen editorial hero, featured works grid, artist statement band
- **Shop** — Full webshop grid with filter by medium, sort by price, working cart sidebar
- **About** — Artist statement, bio, selected exhibitions, contact strip

## Stack

- [React 18](https://react.dev/) with [Vite 6](https://vite.dev/)
- [React Router v6](https://reactrouter.com/) — hash-based routing (works with Vercel out of the box)
- [Tailwind CSS v3](https://tailwindcss.com/)
- Fonts: Cormorant Garamond (display) + DM Sans (body) via Google Fonts
- Placeholder images via [picsum.photos](https://picsum.photos/)

---

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

To build for production:

```bash
npm run build
npm run preview   # preview the production build locally
```

---

## Deploy to Vercel

1. Push this repository to GitHub (already connected: `git push origin main`)
2. Go to [vercel.com](https://vercel.com) and click **Add New Project**
3. Import your GitHub repository (`Jonkwh/Ask-hjemmeside-2.0`)
4. Vercel auto-detects Vite — **no config needed**. Click **Deploy**

Your site will be live at a `*.vercel.app` URL within ~30 seconds. Every `git push` to `main` triggers an automatic redeploy.

---

## Project structure

```
src/
  context/
    CartContext.jsx     — React Context for cart state (add, remove, total)
  data/
    paintings.js        — All painting data (title, medium, dimensions, price, images)
  components/
    Nav.jsx             — Fixed top navigation with mobile menu
    CartSidebar.jsx     — Slide-in cart drawer
    Footer.jsx          — Site footer
    useReveal.js        — IntersectionObserver scroll-reveal hook
  pages/
    Home.jsx            — Homepage
    Shop.jsx            — Shop with filter + sort
    About.jsx           — About page
  App.jsx               — Router setup, layout wrapper
  main.jsx              — React entry point
  index.css             — Tailwind base + custom utilities + animations
```

---

## Customisation

- **Artist name / bio**: Edit `src/pages/About.jsx` and `src/pages/Home.jsx`
- **Paintings / prices**: Edit `src/data/paintings.js`
- **Colours**: Edit the `colors` block in `tailwind.config.js`
- **Fonts**: Change the Google Fonts link in `index.html` and the `fontFamily` in `tailwind.config.js`
- **Real images**: Replace `picsum.photos` URLs in `src/data/paintings.js` with your own image paths or CDN URLs
