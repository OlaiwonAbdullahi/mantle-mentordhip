# The Mantle Mentorship

> Transferring the practical & life-based skill mantle to next future leaders

A modern, multi-language mentorship platform built with Next.js, featuring mentorship program registration, localization support for 4 languages, and enterprise-grade SEO optimization.

![Next.js](https://img.shields.io/badge/Next.js-16.1.1-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19.2.3-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-blue?style=flat-square&logo=tailwindcss)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

---

## 🎯 Features

### Core Features

- 🌍 **Multi-Language Support** - English, Spanish, French, Dutch
- 📝 **Program Registration** - Seamless enrollment with validation
- 💬 **Contact Management** - Integrated contact form with email support
- 📱 **Fully Responsive** - Mobile-first design approach
- 🎨 **Modern UI** - Built with Radix UI components and Tailwind CSS
- 🔔 **Toast Notifications** - User feedback with Sonner

### Mentorship Programs

- Program listing and details
- Location-based scheduling
- Class size and duration information
- Pricing in multiple currencies (NGN, EUR)
- Program benefits showcase
- Flexible enrollment options

### Pages

- **Home** - Hero section with programs and testimonials
- **About Us** - Mission, values, and team information
- **Programs** - Complete program catalog with details
- **Contact Us** - Multi-channel contact options
- **Register** - Comprehensive registration form

---

## 🔍 SEO & Search Console

This project includes **complete SEO implementation** with Google Search Console optimization:

### ✅ SEO Features

- **Dynamic Robots.txt** - Search engine crawling directives
- **XML Sitemaps** - Multi-locale sitemaps with automatic generation
  - Main sitemap: `/sitemap.xml`
  - Language-specific: `/en/sitemap.xml`, `/es/sitemap.xml`, `/fr/sitemap.xml`, `/nl/sitemap.xml`
- **Meta Tags** - Comprehensive title, description, and keyword optimization on all pages
- **Open Graph & Twitter Cards** - Social media sharing optimization
- **Structured Data (JSON-LD)** - Organization schema for rich results
- **Hreflang Tags** - Multi-language support for search engines
- **Security Headers** - HTTPS, X-Frame-Options, X-Content-Type-Options, and more

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- Git

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd mantle-mentorship

# Install dependencies
npm install
# or
yarn install
```

### Environment Setup

```bash
# Copy the environment template
cp .env.local.example .env.local

# Edit .env.local and add your configuration:
NEXT_PUBLIC_BASE_URL=https://mantle-mentorship.com
NEXT_PUBLIC_SITE_NAME=The Mantle Mentorship
NEXT_PUBLIC_GOOGLE_VERIFICATION_CODE=
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_CONTACT_EMAIL=contact@mantle-mentorship.com
```

### Running Locally

```bash
# Development server
npm run dev
# or
yarn dev

# Open http://localhost:3000 in your browser
```

### Building for Production

```bash
# Build the project
npm run build

# Start production server
npm start
```

### Linting

```bash
# Run ESLint
npm run lint
```

---

## 📁 Project Structure

```
mantle-mentorship/
├── app/[locale]/                    # Dynamic locale routing
│   ├── robot.ts                     # Robots.txt generation
│   ├── sitemap.ts                   # XML sitemap generation
│   ├── layout.tsx                   # Root layout with metadata
│   ├── page.tsx                     # Home page
│   ├── globals.css                  # Global styles
│   ├── _components/                 # Shared components
│   │   ├── navbar.tsx
│   │   ├── footer.tsx
│   │   ├── hero.tsx
│   │   ├── programs.tsx
│   │   ├── testimonials.tsx
│   │   └── coming-soon.tsx
│   ├── about-us/                    # About page
│   ├── programs/                    # Programs page
│   ├── contact-us/                  # Contact page
│   ├── register/                    # Registration page
│   ├── payment/                     # Payment callbacks
│   └── i18n/                        # i18n configuration
│
├── components/                      # Reusable UI components
│   └── ui/                          # Radix UI components
│
├── lib/                             # Utilities
│   └── utils.ts
│
├── public/                          # Static assets
│   ├── favicon.ico
│   ├── robots.txt
│   ├── fonts/
│   └── locales/                     # Translation files
│       ├── en/common.json
│       ├── es/common.json
│       ├── fr/common.json
│       └── nl/common.json
│
├── next.config.ts                   # Next.js configuration
├── tsconfig.json                    # TypeScript configuration
├── tailwind.config.ts               # Tailwind CSS configuration
└── package.json
```

---

## 🛠️ Tech Stack

### Framework & Language

- **Next.js 16.1.1** - React framework
- **React 19.2.3** - UI library
- **TypeScript 5** - Type safety
- **Node.js 18+** - Runtime

### Styling

- **Tailwind CSS 4** - Utility-first CSS framework
- **Radix UI** - Headless UI components
- **Framer Motion 12.26** - Animation library

### Internationalization

- **next-i18next 15.4.3** - i18n for Next.js
- **react-i18next 16.5.1** - i18n for React
- **accept-language 3.0.20** - Language detection

### UI & UX

- **Tabler Icons React 3.36** - Icon library
- **Sonner 2.0.7** - Toast notifications
- **Lucide React 0.562** - Additional icons

### Other

- **Axios 1.13.2** - HTTP client
- **next-themes 0.4.6** - Theme management
- **clsx 2.1.1** - Class composition

---

## 📝 Available Scripts

```bash
# Development
npm run dev              # Start development server

# Production
npm run build           # Build for production
npm start              # Start production server

# Code Quality
npm run lint           # Run ESLint
```

---

## 🌍 Internationalization (i18n)

The platform supports 4 languages out of the box:

- 🇬🇧 **English** - `/en`
- 🇪🇸 **Spanish** - `/es`
- 🇫🇷 **French** - `/fr`
- 🇳🇱 **Dutch** - `/nl`

### Adding Translations

1. Edit translation files in `public/locales/[locale]/common.json`
2. Add new keys and values
3. Access via `useTranslation()` hook:

```typescript
const { t } = useTranslation();
const message = t("key_name");
```

---

## 🔐 Environment Variables

### Required

```env
NEXT_PUBLIC_BASE_URL=https://your-domain.com        # Your domain
NEXT_PUBLIC_SITE_NAME=The Mantle Mentorship         # Site name for SEO
```

### Optional

```env
NEXT_PUBLIC_GOOGLE_VERIFICATION_CODE=               # Google Search Console verification
NEXT_PUBLIC_GA_ID=                                   # Google Analytics ID
NEXT_PUBLIC_CONTACT_EMAIL=contact@domain.com        # Contact email
```

---

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Docker

```dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .

RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Other Platforms

- **Netlify** - Deploy from Git
- **AWS Amplify** - AWS-hosted deployment
- **Self-hosted** - Use `npm start` with Node.js 18+

---

## 📊 SEO Setup

### Quick Start (5 minutes)

1. **Set environment variables:**

   ```bash
   cp .env.local.example .env.local
   # Edit .env.local with your domain
   ```

2. **Deploy to production** with HTTPS

3. **Set up Google Search Console:**
   - Visit https://search.google.com/search-console/
   - Add property with your domain
   - Verify ownership
   - Submit sitemaps

### Test SEO Files

```bash
# After deployment, test:
curl https://your-domain.com/robots.txt
curl https://your-domain.com/sitemap.xml
```

### Sitemaps

- Main: `/sitemap.xml` (20 URLs - all locales and pages)
- English: `/en/sitemap.xml` (5 URLs)
- Spanish: `/es/sitemap.xml` (5 URLs)
- French: `/fr/sitemap.xml` (5 URLs)
- Dutch: `/nl/sitemap.xml` (5 URLs)

### Robots.txt

- Path: `/robots.txt` or `/public/robots.txt`
- Allows: All major search engines (Google, Bing, Yandex)
- Blocks: API routes, Next.js internals

### Metadata

- All pages have SEO-optimized meta tags
- Open Graph tags for social sharing
- Twitter card configuration
- Structured data (Organization schema)
- Multi-language hreflang tags

👉 **For detailed SEO setup, see [SEO_SETUP.md](SEO_SETUP.md)**

---

## 🎨 UI Components

Pre-built Radix UI components available in `/components/ui/`:

- Button
- Card
- Dialog
- Dropdown Menu
- Select
- Avatar
- Sonner (Toast notifications)

Example usage:

```typescript
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function MyComponent() {
  return (
    <Card>
      <CardContent>
        <Button>Click me</Button>
      </CardContent>
    </Card>
  );
}
```

---

## 📱 Responsive Design

The site is fully responsive with breakpoints:

- Mobile: 320px+
- Tablet: 768px+
- Desktop: 1024px+
- Large Desktop: 1280px+

---

## 🔧 Configuration Files

### `next.config.ts`

- Image optimization
- Security headers
- Compression
- Production optimizations

### `tsconfig.json`

- TypeScript strict mode
- Path aliases (`@/` prefix)
- Module resolution

### `tailwind.config.ts`

- Custom theme colors
- Typography settings
- Component variations

---

## 📚 Documentation

---

## 🐛 Troubleshooting

### Build Issues

**Port 3000 already in use:**

```bash
# Use different port
npm run dev -- -p 3001
```

**Node modules issues:**

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### SEO Issues

**Robots.txt not found:**

- Ensure `app/[locale]/robot.ts` exists
- Check Next.js build includes it
- Verify deployment includes dynamic routes

**Sitemaps not generating:**

- Check `NEXT_PUBLIC_BASE_URL` in .env.local
- Verify `app/[locale]/sitemap.ts` exists
- Check Next.js version supports dynamic sitemaps (13.3+)

**Pages not indexed:**

- Wait 1-2 weeks after sitemap submission
- Check Search Console Coverage report
- Fix any crawl errors reported
- Ensure HTTPS is enabled

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see LICENSE file for details.

---

## 📞 Support & Resources

### Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Radix UI](https://www.radix-ui.com/docs/primitives/overview/introduction)
- [next-i18next](https://github.com/i18next/next-i18next)

### SEO Resources

- [Google Search Central](https://developers.google.com/search)
- [Google Search Console](https://search.google.com/search-console/)
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [Schema.org](https://schema.org/)

### Tools

- [Google Mobile-Friendly Test](https://search.google.com/test/mobile-friendly)
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)

---

## 🎯 Roadmap

### Completed ✅

- [x] Multi-language support (4 languages)
- [x] Responsive design
- [x] Program registration system
- [x] Contact form
- [x] SEO optimization
- [x] Search Console integration
- [x] Structured data (JSON-LD)
- [x] Security headers

### Planned 🔄

- [ ] Blog/News section
- [ ] User authentication
- [ ] Payment integration
- [ ] Advanced analytics
- [ ] Admin dashboard
- [ ] Testimonials management
- [ ] Email automation

---

## 💡 Best Practices

### Performance

- ✅ Use Next.js Image component for images
- ✅ Lazy load components with `dynamic()`
- ✅ Optimize bundle size
- ✅ Monitor Core Web Vitals

### SEO

- ✅ Keep meta descriptions 150-160 characters
- ✅ Use semantic HTML
- ✅ Add alt text to images
- ✅ Monitor Google Search Console weekly

### Code Quality

- ✅ Use TypeScript for type safety
- ✅ Follow ESLint rules
- ✅ Write semantic HTML
- ✅ Use proper heading hierarchy (H1, H2, H3)

### Security

- ✅ Keep dependencies updated
- ✅ Use environment variables for secrets
- ✅ Validate form inputs
- ✅ Use HTTPS everywhere

---

## 📊 Project Statistics

- **Pages**: 5 main pages × 4 locales = 20 unique pages
- **Languages**: 4 (English, Spanish, French, Dutch)
- **Components**: 20+ reusable components
- **Routes**: 10+ dynamic routes
- **Sitemaps**: 5 (1 main + 4 language-specific)
- **SEO URLs**: 20 indexed URLs with full metadata

---

## ✨ Quick Links

| Link                                                               | Description                       |
| ------------------------------------------------------------------ | --------------------------------- |
| [Getting Started](GETTING_STARTED.md)                              | 5-minute setup guide              |
| [SEO Setup](SEO_SETUP.md)                                          | Complete SEO configuration        |
| [SEO Checklist](SEO_CHECKLIST.md)                                  | 30-point implementation checklist |
| [Project Structure](PROJECT_STRUCTURE.md)                          | File organization guide           |
| [Google Search Console](https://search.google.com/search-console/) | Monitor your SEO                  |

---

## 🎉 Getting Help

1. **Check the documentation** - Most answers are in the included guides
2. **Search GitHub Issues** - See if others faced the same problem
3. **Review the code** - Comments explain key functionality
4. **Check environment setup** - Most issues are related to .env.local

---

## 📌 Version History

### v1.0.0 (January 2026)

- Initial release
- Multi-language support
- Complete SEO implementation
- Responsive design
- Program registration system

---

**Made with ❤️ for mentoring future leaders**

_Last Updated: January 2026_
