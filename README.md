# CommonJobs - AdSense-Ready No-Login Job Portal

A modern, high-performance off-campus job board inspired by `commonjobs.in`. Built for maximum candidate retention with **zero login / no registration** requirements for visitors, a password-protected **Admin CMS (`/admin`)** for publishing jobs, embedded **Google AdSense** monetization slots, and **Google `JobPosting` JSON-LD schema** for automatic search engine indexing.

---

## 🌟 Key Features

1. **Zero Registration for Candidates**:
   - Visitors can instantly search, filter by batch (2024, 2025, 2026), location, or role domain.
   - One-click direct "Apply" button opening official employer career sites (Oracle Cloud, Workday, Greenhouse, etc.).

2. **Secure Admin Dashboard (`/admin`)**:
   - Protected via a secret PIN (`ADMIN_SECRET_KEY`, default: `admin123`).
   - Create, Edit, and Delete job posts in seconds.
   - Built-in templates for Job Eligibility, Roles, and Selection Process.

3. **Google AdSense Monetization**:
   - Header Leaderboard Banner (`NEXT_PUBLIC_ADSENSE_SLOT_TOP_BANNER`)
   - In-Article Content Banner (`NEXT_PUBLIC_ADSENSE_SLOT_IN_ARTICLE`)
   - Sidebar Rectangle Unit (`NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR`)
   - High-Yield Sticky Bottom Anchor Ad (`NEXT_PUBLIC_ADSENSE_SLOT_STICKY_ANCHOR`)

4. **100% Google AdSense & SEO Compliant**:
   - Pre-built **Privacy Policy**, **Terms of Service**, **Disclaimer**, **About Us**, and **Contact Us** pages.
   - Google `JobPosting` JSON-LD Structured Data Schema.
   - Dynamic `sitemap.xml` & `robots.txt`.

---

## 🚀 100% Free Hosting on Vercel (Step-by-Step)

You can host this entire web application on **Vercel's Free Tier** ($0/month forever) with free SSL (`https://`) and custom domain support:

### Step 1: Push Code to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/your-job-portal.git
git push -u origin main
```

### Step 2: Import into Vercel
1. Go to [https://vercel.com](https://vercel.com) and click **"Add New Project"**.
2. Select your GitHub repository `your-job-portal`.
3. Under **Environment Variables**, add:
   - `ADMIN_SECRET_KEY`: `your_custom_secret_password`
   - `NEXT_PUBLIC_SITE_URL`: `https://yourdomain.com` (or your vercel.app URL)
   - `NEXT_PUBLIC_ADSENSE_CLIENT_ID`: `ca-pub-xxxxxxxxxxxxxxxx` (your Google AdSense Publisher ID)
4. Click **Deploy**! Your site is live in ~60 seconds.

---

## 🛠️ Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the local server:
   ```bash
   npm run dev
   ```

3. Open in your browser:
   - **Job Board**: [http://localhost:3000](http://localhost:3000)
   - **Admin CMS**: [http://localhost:3000/admin](http://localhost:3000/admin) (PIN: `admin123`)

---

## 💰 How to Get Google AdSense Approved

1. Make sure you post at least **15 to 25 authentic, detailed job listings** with clear eligibility, responsibilities, and company overviews.
2. Customize the contact details on the **Contact Us** (`/contact`) and **About Us** (`/about`) pages.
3. Submit your domain to [Google AdSense](https://www.google.com/adsense/).
4. Once approved, place your `ca-pub-xxxxxxxx` ID into `.env.local` and Vercel settings.
