# PromptForge - Setup Guide

## Initial Setup (First Time)

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure API Keys

Copy the example environment file:
```bash
cp .env.local.example .env.local
```

Open `.env.local` and add your keys:

#### Required: Anthropic API Key
1. Visit https://console.anthropic.com/
2. Sign up/login
3. Go to "API Keys"
4. Click "Create Key"
5. Copy and paste into `.env.local`:
```
ANTHROPIC_API_KEY=sk-ant-api03-xxxxxxxxxxxxx
```

#### Optional: GitHub Token (for auto-repo creation)
1. Visit https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Name it "PromptForge"
4. Check the `repo` scope checkbox
5. Click "Generate token"
6. Copy and paste into `.env.local`:
```
GITHUB_TOKEN=ghp_xxxxxxxxxxxxx
```

### 3. Start Development Server
```bash
npm run dev
```

### 4. Open in Browser
Visit http://localhost:3000

## Usage Flow

### Step 1-7: Fill Out Forms
Complete all product specification forms:
- Product Overview
- Audience
- Features & Flows
- Technical Requirements
- Database Schema
- Design Preferences
- Deployment

### Step 8: AI Discussion (Optional but Recommended)
- Click "Start AI Review"
- AI will analyze your specs and ask questions
- Discuss and refine
- Click "Lock & Proceed" when satisfied

### Step 9: Generate & Download
- Review your BUILD_PROMPT.md
- Review your PRODUCT_SPEC.md
- Copy or download files
- Optional: Create GitHub repository

### Step 10: Build with Claude Code
```bash
# In your terminal
claude

# Paste the BUILD_PROMPT.md content
# Let Claude build your entire application!
```

## Tips for Best Results

1. **Be Specific**: The more detail you provide, the better the output
2. **Use Real Data**: Use actual product names, real user personas
3. **Think Through Flows**: Map out complete user journeys
4. **Leverage AI Discussion**: Don't skip it - it catches gaps
5. **Iterate**: Go back and refine steps as needed

## Troubleshooting

### "ANTHROPIC_API_KEY not configured"
- Make sure you created `.env.local`
- Ensure the API key is correct
- Restart the dev server (`npm run dev`)

### "GITHUB_TOKEN not configured"
- GitHub integration is optional
- Either add the token or skip repo creation
- You can manually create repos and add files later

### Form validation errors
- All fields marked with * are required
- Arrays (features, flows, entities) need at least one item
- Go back to previous steps to fix errors

### Port 3000 already in use
```bash
# Kill the process
lsof -ti:3000 | xargs kill -9

# Or use a different port
PORT=3001 npm run dev
```

## Production Deployment

### Deploy to Vercel
1. Push code to GitHub
2. Visit https://vercel.com
3. Import your repository
4. Add environment variables in Vercel dashboard
5. Deploy!

### Environment Variables in Vercel
Add these in your Vercel project settings:
- `ANTHROPIC_API_KEY` (required)
- `GITHUB_TOKEN` (optional)

## Support

If you encounter issues:
1. Check this setup guide
2. Review the main [README.md](./README.md)
3. Check Next.js console for errors
4. Ensure API keys are valid

---

**Happy building! 🚀**
