import { Step } from '@/types';

export const steps: Step[] = [
  {
    id: 'projecttype',
    title: 'Project Type',
    description: 'What are you building?'
  },
  {
    id: 'product',
    title: 'Overview',
    description: 'Define your vision and core problem'
  },
  {
    id: 'audience',
    title: 'Audience',
    description: 'Identify who will use your product'
  },
  {
    id: 'features',
    title: 'Features & Flows',
    description: 'List core capabilities and user journeys'
  },
  {
    id: 'technical',
    title: 'Technical Needs',
    description: 'Authentication, payments, APIs, and more'
  },
  {
    id: 'database',
    title: 'Database',
    description: 'Define your data models and entities'
  },
  {
    id: 'design',
    title: 'Design Brief',
    description: 'Visual style, colors, and inspiration'
  },
  {
    id: 'deployment',
    title: 'Deployment',
    description: 'Hosting platform and special requirements'
  },
  {
    id: 'discussion',
    title: 'AI Review',
    description: 'Refine with AI-powered suggestions'
  },
  {
    id: 'output',
    title: 'Generate',
    description: 'Create your build prompt and docs'
  }
];
