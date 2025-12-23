# Braving Grief Website - Project Structure & Documentation

## 📁 Folder Architecture

```
Braving Grief/
├── code.html                      # Main HTML file (Homepage)
├── robots.txt                     # SEO - Robot crawler directives
├── package-lock.json              # NPM dependency lock file
│
├── configuration/
│   └── package.json              # Project metadata & NPM scripts
│
├── css/
│   ├── input.css                 # Tailwind CSS source file
│   └── output.css                # Generated compiled CSS (create with npm run build)
│
├── js/
│   ├── main.js                   # Main JavaScript (event handlers, interactivity)
│   ├── schema-book.json          # Schema.org Book structured data
│   ├── schema-website.json       # Schema.org Website structured data
│   └── schema-breadcrumb.json    # Schema.org BreadcrumbList structured data
│
├── data/
│   └── images/
│       ├── logo.png              # Site logo (used as favicon & author photo)
│       └── Book.jpg              # Book cover image
│
└── crawler rules/                # SEO crawler configurations (future expansion)
```

---

## 🔗 File Connections & Dependencies

### HTML (`code.html`)
**Imports:**
- ✅ `./css/output.css` - Compiled Tailwind CSS stylesheet
- ✅ `./data/images/logo.png` - Favicon (2 references)
- ✅ `./data/images/Book.jpg` - Book cover image
- ✅ `./js/main.js` - JavaScript functionality
- ✅ Inline Schema.org JSON-LD structured data (Book, Website, BreadcrumbList)

**External Resources:**
- Google Fonts (Plus Jakarta Sans, Noto Sans, Material Symbols)
- Tailwind CSS CDN (for development/preview)

---

## 🎯 SEO Best Practices Implemented

### 1. **Meta Tags & Semantic HTML**
- ✅ Primary title with keywords
- ✅ Comprehensive meta description
- ✅ SEO-optimized keywords
- ✅ Author & robot directives
- ✅ Canonical URL
- ✅ Semantic HTML5 tags (`<article>`, `<section>`, `<nav>`, `<main>`, `<header>`, `<footer>`)

### 2. **Open Graph & Social Sharing**
- ✅ OG protocol tags (Facebook, LinkedIn)
- ✅ Twitter Card meta tags
- ✅ Image optimization tags with alt text

### 3. **Structured Data (Schema.org)**
- ✅ **Book Schema** - ISBN, author, publisher, offers, ratings
- ✅ **WebSite Schema** - Site-level metadata & search integration
- ✅ **BreadcrumbList Schema** - Navigation structure for SEO

### 4. **Performance & Accessibility**
- ✅ Font preconnect directives
- ✅ Image lazy loading attributes
- ✅ Proper `width` & `height` attributes on images
- ✅ ARIA labels & semantic roles
- ✅ Alt text for all images
- ✅ Proper heading hierarchy
- ✅ Form accessibility with labels

### 5. **Robot & Crawler Configuration**
- ✅ `robots.txt` - Instructs crawlers on indexing rules
- ✅ Sitemap location specified
- ✅ Allow directives for assets

---

## 📦 NPM Scripts & Build Process

**Located in:** `configuration/package.json`

### Available Commands:
```bash
npm run dev      # Watch mode - auto-compile Tailwind CSS
npm run build    # Production build - minified Tailwind CSS
npm run serve    # Local server (requires npx serve)
npm run deploy   # Build + deployment preparation
```

### Dependencies:
- **Tailwind CSS 3.4.0** - Utility-first CSS framework
- **@tailwindcss/forms** - Form styling plugin
- **@tailwindcss/container-queries** - Container query support
- **PostCSS & Autoprefixer** - CSS processing

---

## 🚀 Setup & Deployment Instructions

### First-Time Setup:
```bash
# Navigate to project root
cd "d:\Aawaz ai\Aawaz\Braving Grief"

# Install dependencies
npm install

# Generate CSS from Tailwind
npm run build

# Serve locally for testing
npm run serve
```

### File Connections Verified:
- ✅ Image paths corrected: `./images/` → `./data/images/`
- ✅ Book cover filename: `Book.jpg` (not book-cover.jpg)
- ✅ CSS output location: `./css/output.css`
- ✅ JavaScript loaded: `./js/main.js`
- ✅ Schema JSON inlined in HTML (SEO best practice)

---

## 🎨 Design & Styling

- **Color Scheme:**
  - Primary: `#af8b41` (Gold/Brown)
  - Secondary: `#daccb8` (Tan/Beige)
  - Background: White & Black contrast
  
- **Typography:**
  - Display: Plus Jakarta Sans (headings)
  - Body: Noto Sans (content)
  - Icons: Material Symbols (interactive elements)

- **Framework:** Tailwind CSS with container queries

---

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints:
  - `sm:` 640px and up
  - `md:` 768px and up
  - `@[864px]:` Container queries for flexible layouts

---

## 🔐 Security & Best Practices

- ✅ `target="_blank"` + `rel="noopener noreferrer"` on external links
- ✅ Semantic HTML roles and ARIA labels
- ✅ Form validation attributes
- ✅ Proper content security headers ready

---

## 📊 Key Sections & Content

1. **Header** - Navigation & Buy CTA
2. **Hero** - Book cover & main value proposition
3. **Author** - Tasneem Rahman bio section
4. **About** - "Why this book matters" with 3 key benefits
5. **Guides** - Downloadable resources
6. **Newsletter** - Email subscription form
7. **Buy** - Primary call-to-action
8. **Footer** - Social links, legal links, branding

---

## ✨ Features

- Smooth scrolling anchor links
- Newsletter form submission
- Mobile menu toggle
- Sample chapter reader (ready for implementation)
- Bookstore finder integration (IndieBooks)
- Social media links (LinkedIn, Instagram, Facebook)

---

## 🔄 Next Steps (Optional Enhancements)

1. Create `css/output.css` by running `npm run build`
2. Add actual Tasneem Rahman photo (replace logo.png reference in author section)
3. Create `/downloads/` folder for PDF & MP3 resources
4. Implement email newsletter backend
5. Set up analytics (Google Analytics, Search Console)
6. Deploy to hosting (Netlify, Vercel, or traditional hosting)
7. Configure SSL certificate for HTTPS
8. Test with Google Rich Results testing tool

---

## ✅ All File Connections Verified & Corrected

- Image paths: ✅ Fixed to `./data/images/`
- CSS import: ✅ Linked correctly
- JavaScript: ✅ Loaded at end of body
- Schema.org data: ✅ Inline in HTML (best practice for SEO)
- Favicon: ✅ Correctly referenced
- External links: ✅ All verified (Barnes & Noble, LinkedIn, Instagram, Facebook)

**Status:** Ready for development! ✅
