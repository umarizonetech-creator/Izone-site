# 📋 Izone Technologies — Project Plan & Documentation

> **Project**: iZone Technologies Business Website  
> **Stack**: React 18 + Vite 5 + Tailwind CSS 3 + Framer Motion + Three.js  
> **Status**: ✅ Live & Functional  
> **Last Updated**: March 2026

---

## 🏗️ Project Overview

Izone Technologies is a full-service IT company based in Tiruchirappalli, Tamil Nadu, established in 2016. This website serves as their digital storefront, showcasing development services, marketing solutions, career opportunities, and client portfolio.

---

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/                    # Reusable UI components (shadcn/ui + custom)
│   │   ├── FlipCard.jsx       # 3D flip card with Three.js shapes
│   │   ├── ScrollWorksSection.jsx  # Scroll-animated portfolio section
│   │   ├── CEOCard.jsx        # Interactive CEO highlight card
│   │   ├── ExpertCard.jsx     # Team member card with hover effects
│   │   ├── Rings.jsx          # Custom cursor rings effect
│   │   └── [shadcn components]  # accordion, button, card, dialog, etc.
│   ├── Navbar.jsx             # Main navigation with dropdowns
│   ├── Footer.jsx             # Site footer with links & contact
│   ├── Layout.jsx             # Page wrapper (Navbar + Footer + ScrollToTop)
│   ├── ThemeToggle.jsx        # Light/Dark mode toggle
│   ├── ScrollToTopButton.jsx  # Floating scroll-to-top button
│   ├── HeroAnimatedBackground.jsx  # GSAP-animated hero SVG background
│   ├── AnimatedHeading.jsx    # Text animation component
│   └── NavLink.jsx            # Navigation link component
├── pages/
│   ├── Index.jsx              # Homepage — hero, services, stats, testimonials, portfolio
│   ├── About.jsx              # About — mission, vision, values, team, timeline, tech stack
│   ├── Development.jsx        # Development services overview with FlipCards
│   ├── Career.jsx             # Careers — culture, benefits, openings, gallery
│   ├── Clients.jsx            # Clients — partner grid, testimonials, stats
│   ├── Contact.jsx            # Contact — form, info, map, social links
│   ├── Portfolio.jsx          # Portfolio — project showcase grid
│   ├── GetStarted.jsx         # Multi-step project inquiry wizard
│   ├── NotFound.jsx           # 404 page
│   ├── development/
│   │   ├── WebDevelopment.jsx
│   │   ├── SoftwareDevelopment.jsx
│   │   ├── AppDevelopment.jsx
│   │   ├── SocialMediaMarketing.jsx
│   │   ├── ContentWriting.jsx
│   │   └── GraphicsDesigner.tsx
│   └── services/
│       ├── BulkSms.jsx
│       ├── VoiceSms.jsx
│       ├── WhatsappPanel.jsx
│       ├── WhatsappMarketing.jsx
│       └── DigitalElectionCampaign.jsx
├── hooks/
│   ├── useTheme.jsx           # Theme context provider (light/dark)
│   ├── use-toast.jsx          # Toast notification hook
│   └── use-mobile.jsx         # Mobile detection hook
├── lib/
│   └── utils.js               # cn() utility for class merging
├── index.css                  # Global styles, CSS variables, design tokens
├── App.jsx                    # Root — routes, providers, theme
└── main.jsx                   # Entry point
```

---

## 🗺️ Site Map & Routes

| Route | Page | Description |
|-------|------|-------------|
| `/` | Index | Homepage with hero, services, stats, testimonials, portfolio |
| `/about` | About | Company info, mission, vision, values, team, timeline |
| `/development` | Development | Development services overview |
| `/development/web-development` | WebDevelopment | Web dev services detail |
| `/development/software-development` | SoftwareDevelopment | Software dev services |
| `/development/app-development` | AppDevelopment | Mobile app dev services |
| `/development/social-media-marketing` | SocialMediaMarketing | Social media services |
| `/development/content-writing` | ContentWriting | Content writing services |
| `/development/graphics-designer` | GraphicsDesigner | Graphics design services |
| `/services/bulk-sms` | BulkSms | Bulk SMS service |
| `/services/voice-sms` | VoiceSms | Voice SMS service |
| `/services/whatsapp-panel` | WhatsappPanel | WhatsApp panel service |
| `/services/whatsapp-marketing` | WhatsappMarketing | WhatsApp marketing service |
| `/services/digital-election-campaign` | DigitalElectionCampaign | Election campaign services |
| `/clients` | Clients | Client showcase & testimonials |
| `/career` | Career | Job openings & company culture |
| `/contact` | Contact | Contact form, map & info |
| `/portfolio` | Portfolio | Project portfolio showcase |
| `/get-started` | GetStarted | Multi-step project inquiry form |
| `*` | NotFound | 404 error page |

**Total Pages: 20**

---

## 🎨 Design System

### Theme Colors (HSL via CSS Variables)
- **Primary**: `89 60% 41%` — Green (#72a62a)
- **Background (Light)**: `210 11% 87%` — Light gray (#D9DDDF)
- **Background (Dark)**: `0 0% 9%` — Near black
- **Accent**: Same as primary
- **Destructive**: `0 72% 50%` — Red

### Typography
- **Display/Headings**: Orbitron, Space Grotesk
- **Body**: Work Sans, Inter
- **Monospace**: Inconsolata, Space Mono
- **Serif (quotes)**: Lora

### Key CSS Classes
- `.glass-card` — Glassmorphism card with blur & border
- `.glow-border` — Primary-colored glowing border
- `.gradient-text` — Green gradient text effect
- `.hover-glow` — Glow effect on hover
- `.section-padding` — Responsive section padding
- `.container-custom` — Max-width 1120px centered

---

## 🔧 Technology Stack

| Category | Technology |
|----------|-----------|
| **Framework** | React 18.2 |
| **Build Tool** | Vite 5.4 |
| **Styling** | Tailwind CSS 3.4 + tailwindcss-animate |
| **Animations** | Framer Motion 10 + GSAP 3.12 |
| **3D Graphics** | Three.js + React Three Fiber + Drei |
| **Routing** | React Router DOM 7 |
| **State/Data** | TanStack React Query 5 |
| **UI Components** | shadcn/ui (Radix primitives) |
| **Icons** | Lucide React |
| **Notifications** | Sonner + Radix Toast |
| **Text Splitting** | SplitType |
| **Deployment** | Vercel (with SPA rewrites) |

---

## ✅ Current Status & Health

### Working Features
- ✅ All 20 routes render correctly
- ✅ Navigation with dropdown menus (desktop & mobile)
- ✅ Light/Dark theme toggle with persistence
- ✅ Responsive design (mobile-first)
- ✅ Animated hero section with GSAP
- ✅ 3D FlipCards with Three.js on service pages
- ✅ Scroll-animated portfolio section
- ✅ Contact form with toast notifications
- ✅ Multi-step Get Started wizard
- ✅ Custom cursor rings effect
- ✅ Scroll-to-top button
- ✅ Google Maps embed on Contact page
- ✅ SEO-friendly semantic HTML

### Known Minor Issues
- ⚠️ ForwardRef warnings in console (non-breaking, cosmetic)
- ⚠️ Contact form uses simulated submission (no backend)
- ⚠️ Social media links point to `#` (placeholder)
- ⚠️ Footer "Blog", "FAQ", "Documentation" links are placeholders
- ⚠️ No `/services` landing page (only sub-routes exist)

---

## 📈 Scaling & Performance Strategy

### Current Optimizations
- **Vite build**: `esnext` target, CSS code splitting, source maps disabled
- **Production cleanup**: Console/debugger statements dropped via esbuild
- **Lazy loading**: Google Maps iframe uses `loading="lazy"`
- **Image optimization**: Unsplash images use `w=` and `fit=crop` params
- **Animation performance**: `will-change: transform`, `translate3d` for GPU acceleration
- **Glass effects**: `backdrop-filter: blur()` with hardware acceleration

### Recommended Scaling Improvements
1. **Code Splitting** — Add `React.lazy()` + `Suspense` for route-level splitting
2. **Image CDN** — Move to optimized image hosting (Cloudinary/imgix) with WebP/AVIF
3. **SEO Enhancement** — Add `<title>`, meta descriptions, Open Graph tags per page
4. **Form Backend** — Connect contact/get-started forms to backend (Lovable Cloud or email API)
5. **Analytics** — Add Google Analytics or Plum Analytics for visitor tracking
6. **Performance Monitoring** — Add Core Web Vitals tracking
7. **Accessibility** — Add ARIA labels, keyboard navigation, skip-to-content link
8. **Internationalization** — Support Tamil/Hindi for local audience
9. **Blog/CMS** — Add blog functionality for content marketing
10. **Testing** — Add Vitest unit tests for critical components

---

## 🗓️ Development Roadmap

### Phase 1: Foundation (✅ Complete)
- [x] Project setup with React + Vite + Tailwind
- [x] Design system with light/dark themes
- [x] All core pages built and routed
- [x] Responsive navigation with dropdowns
- [x] Animated hero and interactive components
- [x] 3D elements with Three.js

### Phase 2: Polish & SEO (🔄 Next)
- [ ] Add per-page SEO meta tags & Open Graph
- [ ] Create `/services` landing page
- [ ] Replace placeholder social media links
- [ ] Add real company images (team photos, office)
- [ ] Fix forwardRef console warnings
- [ ] Add loading states/skeletons

### Phase 3: Backend Integration
- [ ] Connect contact form to email service
- [ ] Connect Get Started form to CRM/database
- [ ] Add blog/news section with CMS
- [ ] Add client testimonials management
- [ ] Career page with job application system

### Phase 4: Growth & Scale
- [ ] Add analytics and conversion tracking
- [ ] Implement A/B testing for CTAs
- [ ] Progressive Web App (PWA) support
- [ ] Multi-language support (English/Tamil)
- [ ] Performance budgets and monitoring
- [ ] Automated testing pipeline

---

## 📞 Company Information

- **Company**: Izone Technologies
- **Founded**: 2016
- **Location**: 3rd Floor, Aruvi Arcade Complex, 5th Cross Thillainagar, Tiruchirappalli, Tamil Nadu-620018
- **Email**: innovativezone.tech@gmail.com
- **Phone**: +91-9943077284
- **CEO**: Mr. B. Kesavan M.E
- **Business Hours**: Mon-Sat: 10:00 AM - 6:30 PM

---

## 📦 Key Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| react | 18.2.0 | UI framework |
| vite | 5.4.8 | Build tool |
| tailwindcss | ^3.4.4 | Utility-first CSS |
| framer-motion | ^10.16.5 | Animations |
| gsap | ^3.12.5 | Advanced animations |
| three | ^0.137.5 | 3D graphics |
| @react-three/fiber | ^8.15.11 | React Three.js renderer |
| react-router-dom | ^7.11.0 | Client-side routing |
| @tanstack/react-query | ^5.90.12 | Data fetching |
| lucide-react | ^0.562.0 | Icon library |
| sonner | ^2.0.7 | Toast notifications |

---

*This document is the single source of truth for the iZone Technologies website project.*
