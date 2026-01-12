# Deployment Guide - Cloudflare Pages

## Quick Deploy to Cloudflare Pages

### Prerequisites
1. Cloudflare account (free tier works)
2. GitHub account
3. Anthropic API key

### Steps

#### 1. Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit: PromptForge"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/promptforge.git
git push -u origin main
```

#### 2. Deploy to Cloudflare Pages

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Click **Pages** → **Create a project**
3. Connect your GitHub repository
4. Select **promptforge** repository

**Build Settings:**
- **Framework preset**: Next.js
- **Build command**: `npm run build`
- **Build output directory**: `.next`
- **Root directory**: `/`
- **Node version**: `18` or higher

#### 3. Add Environment Variables

In Cloudflare Pages settings → **Environment variables**:

```
ANTHROPIC_API_KEY=your_anthropic_api_key_here
GITHUB_TOKEN=your_github_token_here (optional)
```

#### 4. Deploy!

Click **Save and Deploy**. Your app will be live at:
```
https://promptforge.pages.dev
```

## Custom Domain (Optional)

1. Go to Pages → Your Project → **Custom domains**
2. Click **Set up a custom domain**
3. Follow the DNS instructions
4. SSL certificate is automatic!

## Features Added

✅ **Reset/Clear Data** - Red button in header
✅ **Save Project** - Save button stores to localStorage
✅ **Load Project** - Load previously saved projects
✅ **Auto-save** - Automatically saves progress
✅ **Export Discussion** - Download AI conversation as .md file
✅ **Cost Estimator** - Shows traditional vs. AI-powered costs

## Local Testing

```bash
# Install Wrangler CLI (Cloudflare)
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Test locally with Cloudflare env
npm run dev

# Deploy from CLI
wrangler pages deploy
```

## Troubleshooting

### API Routes Not Working
- Ensure Next.js API routes are in `/app/api/`
- Check environment variables are set in Cloudflare dashboard

### Build Fails
- Verify Node version is 18+
- Check build logs in Cloudflare dashboard
- Ensure all dependencies are in `package.json`

### Large Builds
- Next.js on Cloudflare Pages works best with static export
- API routes run as Cloudflare Workers
- 25MB limit per Worker

## Alternative: Vercel (Easier for Next.js)

If Cloudflare gives issues, deploy to Vercel instead:

```bash
npm install -g vercel
vercel login
vercel
```

Then add environment variables in Vercel dashboard.

---

**Your app is ready to make you a one-person product delivery superhero!** 🚀
