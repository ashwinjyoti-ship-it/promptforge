export type ProjectType = 'webapp' | 'website' | 'mobileapp' | 'api' | 'desktop';

export interface ProductData {
  // Project Type
  projectType: ProjectType;

  // Product Overview
  productName: string;
  tagline: string;
  problemStatement: string;

  // Audience
  targetAudience: string;
  userPersonas: string;
  painPoints: string;

  // Features
  coreFeatures: string[];
  userFlows: string[];

  // Technical Requirements
  authRequired: boolean;
  authType?: string;
  paymentsRequired: boolean;
  paymentProvider?: string;
  realtimeFeatures: boolean;
  realtimeType?: string;
  externalAPIs: string;
  fileUploads: boolean;
  fileTypes?: string;

  // Database
  entities: DatabaseEntity[];

  // Design
  designStyle: string;
  colorPreferences: string;
  inspirationImages: File[];
  inspirationUrls: string;

  // Deployment
  deploymentPlatform: string;
  customRequirements: string;
}

export interface DatabaseEntity {
  name: string;
  fields: string;
}

export interface GeneratedOutput {
  buildPrompt: string;
  productSpec: string;
}

export type StepId = 'projecttype' | 'product' | 'audience' | 'features' | 'technical' | 'database' | 'design' | 'deployment' | 'discussion' | 'output';

export interface Step {
  id: StepId;
  title: string;
  description: string;
}
