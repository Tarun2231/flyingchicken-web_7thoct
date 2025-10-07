# 🚀 Deployment Guide - Flying Chicken

## Quick Start (Local Development)

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Production Build

```bash
# Build for production
npm run build

# Start production server
npm start
```

---

## ☁️ Deploy to Vercel (Recommended)

### Option 1: One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone)

### Option 2: Via Vercel Dashboard

1. **Push to Git Repository**

   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub/GitLab/Bitbucket
   - Click "New Project"
   - Import your repository
   - Vercel auto-detects Next.js settings
   - Click "Deploy"

3. **Your site is live!** 🎉
   - Vercel provides a production URL
   - Automatic deployments on every push
   - Preview deployments for pull requests

### Option 3: Via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

---

## 🌐 Deploy to Netlify

1. **Build Settings**
   - Build command: `npm run build`
   - Publish directory: `.next`

2. **Environment Variables** (if needed)

   ```
   NEXT_PUBLIC_API_URL=your_api_url
   ```

3. **Deploy**

   ```bash
   # Install Netlify CLI
   npm install -g netlify-cli

   # Login
   netlify login

   # Deploy
   netlify deploy --prod
   ```

---

## 🐳 Docker Deployment

Create `Dockerfile`:

```dockerfile
FROM node:18-alpine AS base

# Install dependencies
FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Build the app
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]
```

Build and run:

```bash
docker build -t flying-chicken .
docker run -p 3000:3000 flying-chicken
```

---

## 🔧 Environment Variables

Create `.env.local` for local development:

```env
# API Configuration (if needed)
NEXT_PUBLIC_API_URL=https://api.flyingchicken.com

# Analytics (optional)
NEXT_PUBLIC_GA_ID=your_google_analytics_id

# Other services (optional)
NEXT_PUBLIC_MAPS_API_KEY=your_maps_api_key
```

**Important:** Never commit `.env.local` to version control!

---

## 📊 Performance Optimization Checklist

- ✅ **Images**: Using Next/Image with optimization
- ✅ **Fonts**: Using next/font with display swap
- ✅ **Code Splitting**: Automatic with Next.js
- ✅ **SSR**: Enabled for SEO and performance
- ✅ **Minification**: Enabled in production build
- ✅ **Compression**: Enabled by default on Vercel

### Additional Optimizations

1. **Enable Caching**

   ```javascript
   // In next.config.js
   const nextConfig = {
     headers: async () => [
       {
         source: '/:all*(svg|jpg|png)',
         headers: [
           {
             key: 'Cache-Control',
             value: 'public, max-age=31536000, immutable',
           },
         ],
       },
     ],
   }
   ```

2. **Add Analytics**
   - Google Analytics
   - Vercel Analytics
   - Plausible Analytics

3. **Monitor Performance**
   - Use Lighthouse in Chrome DevTools
   - Check Core Web Vitals
   - Monitor with Vercel Analytics

---

## 🔒 Security Best Practices

1. **API Routes** (if added later)
   - Use authentication
   - Validate all inputs
   - Rate limiting

2. **Environment Variables**
   - Never expose sensitive keys in client-side code
   - Use `NEXT_PUBLIC_` prefix only for public values

3. **Headers**
   - Add security headers in `next.config.js`

---

## 📱 PWA Support (Optional)

Install next-pwa:

```bash
npm install next-pwa
```

Configure in `next.config.js`:

```javascript
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
})

module.exports = withPWA({
  // your config
})
```

---

## 🐛 Troubleshooting

### Build Fails

```bash
# Clear cache and rebuild
rm -rf .next
npm run build
```

### Module Not Found

```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Port Already in Use

```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

---

## 📞 Support

For deployment issues:

- Check [Next.js Deployment Docs](https://nextjs.org/docs/deployment)
- Visit [Vercel Documentation](https://vercel.com/docs)
- Contact: info@flyingchicken.com

---

## ✅ Pre-Deployment Checklist

- [ ] All dependencies installed
- [ ] Build runs without errors
- [ ] No ESLint errors
- [ ] Images optimized
- [ ] Meta tags configured
- [ ] Favicon added
- [ ] Environment variables set
- [ ] Analytics configured (optional)
- [ ] Error tracking setup (optional)
- [ ] Domain configured (if custom domain)

---

**Ready to deploy!** 🚀

Your Flying Chicken platform is production-ready and optimized for deployment on Vercel, Netlify, or any Node.js hosting platform.


