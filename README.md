# Apagan Investments Ug - Corporate Website

This is a complete, production-ready corporate website built for **Apagan Investments Ug**, a General Merchandise Supplier in Uganda. 

It was built strictly adhering to the requirements of using pure HTML5, CSS3, ES6 JavaScript, and PHP, with no external CSS/JS frameworks (no Bootstrap, Tailwind, React, etc.).

## 📁 Directory Structure

```text
apagan-investments/
│
├── assets/
│   ├── css/
│   │   ├── variables.css     # Design tokens (colors, fonts, spacing)
│   │   ├── style.css         # Core layout and component styles
│   │   ├── animations.css    # Keyframes and scroll-reveal utility classes
│   │   └── responsive.css    # Mobile-first media queries
│   │
│   ├── js/
│   │   ├── main.js           # Header scroll, mobile menu, loader, scroll progress
│   │   ├── slider.js         # Testimonial slider logic
│   │   ├── counter.js        # IntersectionObserver number counting logic
│   │   ├── gallery.js        # Masonry layout filtering and Lightbox logic
│   │   ├── contact.js        # Form validation and AJAX submission
│   │   └── animations.js     # Accordions, parallax, and scroll reveal triggers
│   │
│   ├── images/               # (Empty dir for client assets)
│   ├── videos/               # (Empty dir for client assets)
│   ├── icons/                # (Empty dir for client assets)
│   └── fonts/                # (Empty dir for local fonts if needed)
│
├── php/
│   └── contact.php           # Secure backend form handler (mail function)
│
├── index.html                # Home page
├── about.html                # About Us page
├── services.html             # Services page
├── products.html             # Products catalogue
├── industries.html           # Industries served
├── gallery.html              # Media gallery with filters/lightbox
├── news.html                 # News and Insights
├── faq.html                  # Frequently Asked Questions
├── contact.html              # Contact page with form and map
├── privacy.html              # Privacy Policy
├── terms.html                # Terms of Service
├── 404.html                  # Custom error page
│
├── robots.txt                # SEO crawler rules
├── sitemap.xml               # XML sitemap for Google Search Console
├── .htaccess                 # Apache config (compression, caching, clean URLs)
└── README.md                 # Project documentation (this file)
```

## 🎨 Design System

The design is built around the brand guidelines:
- **Primary Color:** Royal Blue (`#0056D2`)
- **Secondary Color:** Orange (`#F97316`)
- **Background:** White (`#FFFFFF`)
- **Accent:** Light Gray (`#F5F7FA`)
- **Text:** Dark Gray (`#1F2937`)

Typography utilizes Google Fonts: **Inter** (body) and **Poppins** (headings).
The site features modern corporate aesthetics including glassmorphism (in headers/menus), scroll-triggered reveal animations, and subtle hover micro-interactions.

## 🚀 Key Features

- **No Frameworks:** 100% bespoke Vanilla CSS and JS. Highly performant.
- **Component-Based CSS:** CSS is split logically avoiding monolithic files. Heavy use of CSS Variables (Custom Properties) for easy theming.
- **Modular JS:** Scripts are split by feature. `defer` attribute used for optimal loading.
- **Intersection Observer API:** Used for performant scroll animations (fading elements in) and triggering number counters without scroll jank.
- **Responsive:** Mobile-first design approach. Fully functional on devices from 320px to 4K displays.
- **AJAX Form:** The contact form submits asynchronously via Fetch API to `php/contact.php` with inline validation.
- **SEO Optimized:** Semantic HTML5 tags (`<header>`, `<main>`, `<article>`, `<nav>`), meta descriptions, OpenGraph tags, canonical links, `robots.txt`, and `sitemap.xml`.
- **Accessibility (a11y):** ARIA attributes, semantic markup, and keyboard navigable menus. respects `prefers-reduced-motion` CSS query.

## ⚙️ Setup & Deployment

1. **Hosting:** Upload the entire `apagan-investments` directory to any standard LAMP (Linux, Apache, MySQL, PHP) stack web host. Apache is recommended to take advantage of the `.htaccess` rules.
2. **PHP Email Config:** Open `php/contact.php` and verify the `$recipient` variable is set to the correct email address (`apagan.invest@gmail.com`). Ensure the server is configured to send PHP mail.
3. **Assets:** Replace Unsplash placeholder image URLs in the HTML files with local images in `assets/images/` prior to final production launch if desired.

---
*Designed & Developed for Apagan Investments Ug - 2026*
