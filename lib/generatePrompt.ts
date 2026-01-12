import { ProductData } from '@/types';

export function generateBuildPrompt(data: ProductData): string {
  return `# Product Build Specification

## Product Overview
**Name:** ${data.productName}
**Tagline:** ${data.tagline}

**Problem Statement:**
${data.problemStatement}

## Target Audience
**Primary Users:** ${data.targetAudience}

**User Personas:**
${data.userPersonas}

**Pain Points:**
${data.painPoints}

## Core Features
${data.coreFeatures.map((feature, i) => `${i + 1}. ${feature}`).join('\n')}

## User Flows
${data.userFlows.map((flow, i) => `${i + 1}. ${flow}`).join('\n')}

## Technical Requirements

### Authentication
${data.authRequired ? `- **Required**: Yes\n- **Method**: ${data.authType || 'Not specified'}` : '- **Required**: No'}

### Payments
${data.paymentsRequired ? `- **Required**: Yes\n- **Provider**: ${data.paymentProvider || 'Not specified'}` : '- **Required**: No'}

### Real-time Features
${data.realtimeFeatures ? `- **Required**: Yes\n- **Technology**: ${data.realtimeType || 'Not specified'}` : '- **Required**: No'}

### File Uploads
${data.fileUploads ? `- **Required**: Yes\n- **Supported Types**: ${data.fileTypes || 'Not specified'}` : '- **Required**: No'}

### External APIs & Integrations
${data.externalAPIs || 'None specified'}

## Database Schema

${data.entities.length > 0 ? data.entities.map(entity => `
### ${entity.name}
**Fields:** ${entity.fields}
`).join('\n') : 'No entities specified'}

## Design Requirements

**Style:** ${data.designStyle}

**Color Preferences:**
${data.colorPreferences || 'None specified'}

**Inspiration:**
${data.inspirationUrls || 'None provided'}

## Deployment

**Platform:** ${data.deploymentPlatform}

**Custom Requirements:**
${data.customRequirements || 'None specified'}

---

## Build Instructions for Claude Code

You are building: **${data.productName}** - ${data.tagline}

### Recommended Tech Stack

**Frontend:**
- Next.js 15 with App Router
- TypeScript for type safety
- Tailwind CSS for styling
- React Hook Form for form handling
- Lucide React for icons

**Backend:**
${data.authRequired || data.paymentsRequired || data.realtimeFeatures ? `- Next.js API Routes
- Prisma ORM for database
- PostgreSQL database` : '- Next.js API Routes (as needed)'}

${data.authRequired ? `**Authentication:**
- NextAuth.js v5 or Clerk
- ${data.authType || 'Email/password'} strategy` : ''}

${data.paymentsRequired ? `**Payments:**
- ${data.paymentProvider || 'Stripe'} integration
- Webhook handling for payment events` : ''}

${data.realtimeFeatures ? `**Real-time:**
- ${data.realtimeType || 'WebSockets'} implementation
- Consider Pusher or Ably for managed solution` : ''}

### Implementation Steps

1. **Project Setup**
   - Initialize Next.js project with TypeScript and Tailwind CSS
   - Set up ESLint and Prettier
   - Configure environment variables

2. **Database Setup**
   ${data.entities.length > 0 ? `- Create Prisma schema with the following models: ${data.entities.map(e => e.name).join(', ')}
   - Set up database migrations
   - Create seed data for development` : '- Set up database if needed for future scalability'}

3. **Authentication** ${data.authRequired ? `
   - Implement ${data.authType || 'email/password'} authentication
   - Create login, signup, and password reset flows
   - Protect routes with middleware
   - Set up session management` : '(Not required)'}

4. **Core Features**
   ${data.coreFeatures.map((feature, i) => `- Implement: ${feature}`).join('\n   ')}

5. **User Flows**
   ${data.userFlows.map((flow, i) => `- Build flow: ${flow}`).join('\n   ')}

6. **API Integration** ${data.externalAPIs ? `
   - Integrate: ${data.externalAPIs}
   - Handle API keys securely via environment variables
   - Implement error handling and rate limiting` : '(Not required)'}

7. **Payments** ${data.paymentsRequired ? `
   - Set up ${data.paymentProvider || 'Stripe'} account and API keys
   - Create checkout flow
   - Implement webhook handlers
   - Add billing dashboard` : '(Not required)'}

8. **UI/UX**
   - Follow ${data.designStyle} design principles
   - Use color palette: ${data.colorPreferences || 'Modern and clean'}
   - Reference inspiration: ${data.inspirationUrls || 'Best practices'}
   - Ensure responsive design (mobile-first)
   - Add loading states and error boundaries

9. **Testing**
   - Write unit tests for critical business logic
   - Add integration tests for API endpoints
   - Test all user flows end-to-end

10. **Deployment**
    - Deploy to ${data.deploymentPlatform}
    - Set up CI/CD pipeline
    - Configure environment variables
    - Set up monitoring and error tracking

### Key Considerations

- **Scalability:** ${data.customRequirements || 'Build with MVP scalability in mind'}
- **Security:** Implement proper input validation, CSRF protection, rate limiting
- **Performance:** Optimize images, lazy load components, implement caching
- **Accessibility:** Follow WCAG guidelines, ensure keyboard navigation
- **SEO:** Implement proper meta tags, Open Graph, sitemap

### File Structure

\`\`\`
/app
  /api
    ${data.authRequired ? '/auth' : ''}
    ${data.paymentsRequired ? '/payments' : ''}
    /[feature-routes]
  /(auth)
    ${data.authRequired ? '/login\n    /signup' : ''}
  /dashboard
  /layout.tsx
  /page.tsx
/components
  /ui
  /forms
  /layouts
/lib
  /db (Prisma client)
  /utils
/types
/public
\`\`\`

### Success Criteria

✓ All core features implemented and functional
✓ User flows work seamlessly end-to-end
✓ Responsive design works on mobile and desktop
✓ Authentication and authorization working (if required)
✓ Payment processing functional (if required)
✓ Database schema matches requirements
✓ Error handling implemented throughout
✓ Loading states for async operations
✓ Deployed and accessible

---

**Build this application following best practices for Next.js, TypeScript, and modern web development. Prioritize code quality, user experience, and maintainability.**`;
}

export function generateProductSpec(data: ProductData): string {
  const date = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return `# ${data.productName}
## Product Specification Document

**Generated:** ${date}
**Prepared by:** PromptForge

---

## Executive Summary

**Product Name:** ${data.productName}

**Tagline:** ${data.tagline}

**Overview:**
${data.problemStatement}

---

## Target Market

### Audience
${data.targetAudience}

### User Personas
${data.userPersonas}

### Pain Points Addressed
${data.painPoints}

---

## Product Features

### Core Capabilities
${data.coreFeatures.map((feature, i) => `${i + 1}. ${feature}`).join('\n')}

### Key User Journeys
${data.userFlows.map((flow, i) => `${i + 1}. ${flow}`).join('\n')}

---

## Technical Architecture

### Technology Stack

**Frontend Framework:** Next.js 15 with TypeScript
**Styling:** Tailwind CSS
**Deployment:** ${data.deploymentPlatform}

### Features & Integrations

${data.authRequired ? `**Authentication:** ${data.authType || 'Secure user authentication'}` : ''}
${data.paymentsRequired ? `**Payments:** ${data.paymentProvider || 'Payment processing'} integration` : ''}
${data.realtimeFeatures ? `**Real-time:** ${data.realtimeType || 'Real-time updates'}` : ''}
${data.fileUploads ? `**File Uploads:** Support for ${data.fileTypes || 'various file types'}` : ''}

${data.externalAPIs ? `**External APIs:**
${data.externalAPIs}` : ''}

### Database Design

${data.entities.length > 0 ? data.entities.map(entity => `
**${entity.name}**
- Fields: ${entity.fields}
`).join('\n') : 'Database schema to be defined during development'}

---

## Design Guidelines

**Style:** ${data.designStyle}

**Color Scheme:** ${data.colorPreferences || 'To be determined'}

**Design References:**
${data.inspirationUrls || 'Modern web application best practices'}

---

## Deployment & Infrastructure

**Platform:** ${data.deploymentPlatform}

**Special Requirements:**
${data.customRequirements || 'Standard web application deployment'}

---

## Project Timeline & Milestones

### Phase 1: Foundation
- Project setup and configuration
- Database schema implementation
- Authentication system (if required)

### Phase 2: Core Features
- Implement primary user flows
- Build core functionality
- API integrations

### Phase 3: Polish & Launch
- UI/UX refinement
- Testing and bug fixes
- Deployment and monitoring

---

## Success Metrics

- User adoption and engagement
- Feature completion rate
- Performance benchmarks
- User satisfaction scores

---

## Appendix

### Technical Requirements Summary
- Authentication: ${data.authRequired ? 'Yes' : 'No'}
- Payments: ${data.paymentsRequired ? 'Yes' : 'No'}
- Real-time: ${data.realtimeFeatures ? 'Yes' : 'No'}
- File Uploads: ${data.fileUploads ? 'Yes' : 'No'}

---

*This document was generated by PromptForge - Your AI-powered product specification tool*`;
}
