# 🚀 Deployment Guide — Pixel Art Software Engineer Portfolio

This guide details how to deploy your portfolio website to production for free using **GitHub Pages**, **Vercel**, **Netlify**, or **Cloudflare Pages**.

---

## 📋 Pre-Deployment Checklist
- [x] Semantic HTML5 structure with SEO meta tags & favicon/social metadata.
- [x] Responsive layout tested across desktop, tablet, and mobile breakpoints.
- [x] Dark/Light/Auto theme switcher with `@media (prefers-color-scheme)` fallback.
- [x] Interactive AI chat assistant, modal inspector, and validated contact form.
- [x] Asset paths configured as relative links (`./index.html`, `./style.css`, `./script.js`).

---

## Method 1: Deploy to GitHub Pages (Recommended)

### Option A: Standard GitHub Pages (1-Minute Setup)
1. Initialize a Git repository and commit your files:
   ```bash
   git init
   git add .
   git commit -m "feat: initial pixel art portfolio release"
   ```
2. Create a new public or private repository on [GitHub](https://github.com/new) named `my-portfolio` (or `<your-username>.github.io`).
3. Push your code to GitHub:
   ```bash
   git remote add origin https://github.com/<your-username>/my-portfolio.git
   git branch -M main
   git push -u origin main
   ```
4. Navigate to your GitHub repository:
   - Click **Settings** > **Pages** (in the left sidebar).
   - Under **Build and deployment** > **Source**, choose **Deploy from a branch**.
   - Select Branch: `main` and Folder: `/(root)`.
   - Click **Save**.
5. Your live portfolio will be published at: `https://<your-username>.github.io/my-portfolio/`

---

## Method 2: Deploy to Vercel (Instant Zero-Config)

1. Sign in to [Vercel](https://vercel.com) using your GitHub account.
2. Click **Add New...** > **Project**.
3. Import your `my-portfolio` repository.
4. Leave all build settings at their defaults (Static Site).
5. Click **Deploy**.
6. Vercel provides a custom URL like `https://my-portfolio-abhay.vercel.app` with automatic SSL and global CDN distribution.

---

## Method 3: Deploy to Netlify

1. Sign in to [Netlify](https://www.netlify.com).
2. Click **Add new site** > **Import an existing project**.
3. Authorize GitHub and choose your repository.
4. Leave Build command empty and Publish directory as `.` (root).
5. Click **Deploy site**.
6. (Optional) Drag and drop the workspace folder directly into the Netlify Drop dashboard for instantaneous hosting without Git.

---

## 🌐 Custom Domain Setup

To link your own domain (e.g. `abhay.dev`):
1. In your registrar (Namecheap, GoDaddy, Cloudflare, Google Domains), create the following DNS records:
   - **Apex domain (`@`)**:
     - `A` Record -> `185.199.108.153`
     - `A` Record -> `185.199.109.153`
     - `A` Record -> `185.199.110.153`
     - `A` Record -> `185.199.111.153`
   - **Subdomain (`www`)**:
     - `CNAME` Record -> `<your-username>.github.io`
2. In GitHub Pages settings (or Vercel domain settings), enter `abhay.dev` in the **Custom domain** field and check **Enforce HTTPS**.

---

## 🔌 API Integrations Reference

### 1. Connecting OpenAI or Gemini to the AI Chat:
Open [`script.js`](./script.js) and locate `handleChatSubmit()` at line ~268:
```javascript
// Replace the simulated response with an API call:
const response = await fetch('https://api.openai.com/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${YOUR_API_KEY}`
  },
  body: JSON.stringify({
    model: 'gpt-4o-mini',
    messages: [{ role: 'user', content: userText }]
  })
});
```

### 2. Connecting Resend / Formspree to the Contact Form:
Open [`script.js`](./script.js) and locate `handleContactSubmit()` at line ~350:
```javascript
// Example Formspree endpoint integration:
const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
  method: 'POST',
  headers: { 'Accept': 'application/json' },
  body: new FormData(document.getElementById('contactForm'))
});
```
