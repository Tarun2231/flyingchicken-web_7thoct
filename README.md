# 🍗 Flying Chicken - Premium Meat Delivery Platform

A production-ready, fully responsive, and visually stunning web application for a premium meat delivery platform connecting trusted chicken and meat vendors directly to customers.

![Flying Chicken](https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=1200&h=400&fit=crop)

## 🚀 Tech Stack

- **Next.js 14** - React framework with SSR, SEO optimization, and performance
- **TypeScript** - Type safety and reliability
- **Tailwind CSS** - Modern responsive styling with custom color palette
- **Framer Motion** - Smooth animations and transitions
- **Lucide Icons** - Consistent iconography
- **React Hook Form + Zod** - Advanced form validation
- **ESLint + Prettier** - Clean and maintainable code

## ✨ Features

### 🏠 Home Page

- Hero section with parallax scroll effects
- Why Choose Us section with benefit cards
- Featured Vendors carousel
- Customer testimonials slider
- Call-to-action sections

### 📖 About Page

- Mission and Vision statements
- Company values showcase
- Interactive timeline
- Statistics counter

### 🧑‍🍳 Vendors Page

- Search and filter vendors by city
- Vendor cards with ratings and badges
- Dynamic filtering system
- Premium/Mid/Free tier display

### 💳 Plans Page

- Three subscription tiers (Free, Mid, Premium)
- Detailed feature comparison table
- Interactive pricing cards
- Benefits showcase

### 📞 Contact Page

- Contact form with validation
- Contact information cards
- Success notifications
- Map integration placeholder

### 📝 Vendor Registration

- Multi-step form with progress bar
- Form validation with Zod
- File upload for FSSAI license
- Success screen with confetti animation

### 🧭 Navigation & Layout

- Sticky navbar with glass effect
- Mobile-responsive hamburger menu
- Smooth scroll animations
- Professional footer with social links

## 🎨 Design System

### Color Palette

- **Primary:** `#7A1E74` (Royal Purple)
- **Secondary:** `#DAA520` (Goldenrod)
- **Background:** `#FFFFFF` (Pure White)
- **Text:** `#2E2E2E` (Dark Gray)
- **Accent:** `#F3E5F5` (Light Purple)

### Typography

- Font Family: Inter (from Google Fonts)
- Modern, clean, and highly readable

### Animations

- Fade-in effects on scroll
- Hover micro-interactions
- Page transitions
- Loading states

## 📦 Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd "new website plan"
```

2. **Install dependencies**

```bash
npm install
```

3. **Run development server**

```bash
npm run dev
```

4. **Open in browser**

```
http://localhost:3000
```

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 📁 Project Structure

```
├── app/
│   ├── page.tsx              # Home page
│   ├── about/page.tsx        # About page
│   ├── vendors/page.tsx      # Vendors directory
│   ├── plans/page.tsx        # Subscription plans
│   ├── contact/page.tsx      # Contact form
│   ├── register-vendor/page.tsx # Vendor registration
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles
├── components/
│   ├── Navbar.tsx            # Navigation component
│   └── Footer.tsx            # Footer component
├── public/                   # Static assets
├── tailwind.config.ts        # Tailwind configuration
├── tsconfig.json             # TypeScript configuration
└── next.config.js            # Next.js configuration
```

## 🚀 Deployment on Vercel

### Method 1: Deploy with Vercel CLI

1. **Install Vercel CLI**

```bash
npm install -g vercel
```

2. **Deploy**

```bash
vercel
```

3. **Follow prompts and your site will be live!**

### Method 2: Deploy via Vercel Dashboard

1. Push your code to GitHub/GitLab/Bitbucket
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your repository
5. Vercel will automatically detect Next.js and configure settings
6. Click "Deploy"

### Environment Variables (if needed)

Create a `.env.local` file for local development:

```env
NEXT_PUBLIC_API_URL=your_api_url
```

## ⚡ Performance Optimizations

- ✅ Server-Side Rendering (SSR)
- ✅ Image optimization with Next/Image
- ✅ Dynamic imports for code splitting
- ✅ Lazy loading for images
- ✅ Optimized for Core Web Vitals
- ✅ Lighthouse Performance > 90

## ♿ Accessibility

- WCAG 2.1 AA compliant
- Semantic HTML
- Keyboard navigation support
- Screen reader friendly
- ARIA labels where needed

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Tested on various devices and browsers

## 🎯 SEO Optimization

- Meta tags configured
- Open Graph tags for social sharing
- Semantic HTML structure
- Fast loading times
- Mobile-friendly

## 🔧 Customization

### Changing Colors

Edit `tailwind.config.ts`:

```typescript
colors: {
  primary: '#F7941D',
  secondary: '#7A1E74',
  // ... customize as needed
}
```

### Changing Fonts

Edit `app/layout.tsx`:

```typescript
import { YourFont } from 'next/font/google'
```

### Adding New Pages

Create new files in the `app/` directory following Next.js 14 App Router conventions.

## 📄 License

This project is proprietary software. All rights reserved.

## 🤝 Support

For support, email info@flyingchicken.com or contact us through the website.

## 🎉 Credits

- Images: Unsplash
- Icons: Lucide React
- Fonts: Google Fonts (Inter)

---

**Built with ❤️ for Flying Chicken**

🚀 Ready for production deployment!
