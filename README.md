# PromptForge

**Transform product ideas into build-ready prompts for Claude Code**

PromptForge is your secret weapon as a product designer. Instead of clients hiring entire IT teams, project managers, and developers, they hire YOU - powered by this AI-enhanced application that helps you:

- Gather comprehensive product requirements through intelligent forms
- Define technical architecture and database schemas
- Design UI/UX specifications
- Discuss and refine ideas with AI
- Generate perfect build prompts for Claude Code
- Create professional product spec documents for clients
- Auto-create GitHub repositories ready for development

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- Anthropic API key ([get one here](https://console.anthropic.com/))
- GitHub Personal Access Token (optional, for repo creation)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.local.example .env.local
```

3. Edit `.env.local` and add your API keys:
   - **ANTHROPIC_API_KEY** (required): Get from https://console.anthropic.com/
   - **GITHUB_TOKEN** (optional): Create at https://github.com/settings/tokens with `repo` scope

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📋 How It Works

### 1. Product Discovery (Multi-Step Form)
Fill out comprehensive forms covering:
- Product overview and problem statement
- Target audience and user personas
- Core features and user flows
- Technical requirements (auth, payments, real-time, APIs)
- Database entities and relationships
- Design preferences and inspiration

### 2. AI Discussion & Refinement
- AI reviews your specifications
- Asks clarifying questions
- Suggests improvements and best practices
- Challenges assumptions
- Ensures technical feasibility

### 3. Output Generation
- **BUILD_PROMPT.md**: Comprehensive prompt optimized for Claude Code
- **PRODUCT_SPEC.md**: Professional client-facing documentation
- Download or copy files
- Optional: Auto-create GitHub repository

### 4. Build with Claude Code
- Copy the generated prompt
- Paste into Claude Code
- Let AI build your entire application

## 🎯 Features

- ✅ Multi-step guided form for product specification
- ✅ AI-powered discussion and refinement
- ✅ Intelligent prompt generation for Claude Code
- ✅ Professional product spec documents
- ✅ GitHub repository integration
- ✅ Responsive, modern UI
- ✅ Built with Next.js 15, TypeScript, and Tailwind CSS

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Forms**: React Hook Form
- **AI**: Anthropic Claude API
- **Icons**: Lucide React
- **GitHub**: Octokit

## 📁 Project Structure

```
/app
  /api
    /discuss       # Claude AI discussion endpoint
    /github        # GitHub repository creation
  /page.tsx        # Main application page
/components
  /FormSteps       # Individual form step components
  /MultiStepForm.tsx # Main form orchestration
/lib
  /steps.ts        # Step definitions
  /generatePrompt.ts # Prompt generation logic
/types
  /index.ts        # TypeScript type definitions
```

## 🔑 API Keys Setup

### Anthropic API Key (Required)
1. Visit https://console.anthropic.com/
2. Sign up or log in
3. Go to API Keys section
4. Create a new key
5. Add to `.env.local` as `ANTHROPIC_API_KEY`

### GitHub Token (Optional)
1. Visit https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Give it a name like "PromptForge"
4. Select the `repo` scope
5. Generate and copy the token
6. Add to `.env.local` as `GITHUB_TOKEN`

## 💡 Usage Tips

1. **Be Detailed**: The more specific your requirements, the better the generated prompt
2. **Use AI Discussion**: Don't skip the AI review step - it catches gaps and suggests improvements
3. **Iterate**: You can always go back and refine earlier steps
4. **Save Prompts**: Download your prompts for future reference or modifications
5. **Client Docs**: The Product Spec is perfect for client presentations and approval

## 🚀 Deployment

Deploy to Vercel with one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

Or deploy manually:
```bash
npm run build
npm start
```

Don't forget to set environment variables in your deployment platform!

## 🤝 Contributing

This is a personal tool, but feel free to fork and customize for your needs!

## 📄 License

MIT

## 🎉 Credits

Built with [Claude Code](https://claude.com/claude-code) - making one-person product teams possible.

---

**Made for product designers who are ahead of the AI coding curve** 🚀
