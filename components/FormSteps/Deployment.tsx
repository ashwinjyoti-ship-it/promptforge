'use client';

import { UseFormRegister } from 'react-hook-form';
import { ProductData } from '@/types';

interface Props {
  register: UseFormRegister<ProductData>;
}

export default function Deployment({ register }: Props) {
  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="deploymentPlatform" className="block text-sm font-medium text-slate-200 mb-2">
          Deployment Platform *
        </label>
        <select
          {...register('deploymentPlatform', { required: true })}
          id="deploymentPlatform"
          className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 placeholder-slate-500"
        >
          <option value="">Select platform</option>
          <option value="vercel">Vercel</option>
          <option value="netlify">Netlify</option>
          <option value="aws">AWS</option>
          <option value="gcp">Google Cloud Platform</option>
          <option value="azure">Microsoft Azure</option>
          <option value="railway">Railway</option>
          <option value="render">Render</option>
          <option value="fly">Fly.io</option>
          <option value="digitalocean">DigitalOcean</option>
          <option value="heroku">Heroku</option>
          <option value="cloudflare">Cloudflare Pages/Workers</option>
          <option value="custom">Custom/On-Premise</option>
        </select>
      </div>

      <div>
        <label htmlFor="customRequirements" className="block text-sm font-medium text-slate-200 mb-2">
          Custom Requirements & Notes
        </label>
        <textarea
          {...register('customRequirements')}
          id="customRequirements"
          rows={5}
          className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 placeholder-slate-500"
          placeholder="Any special requirements, constraints, or notes the AI should know about...&#10;&#10;Examples:&#10;- Must be GDPR compliant&#10;- Need to support 10,000+ concurrent users&#10;- Mobile-first design required&#10;- Offline functionality needed&#10;- Must integrate with existing legacy system"
        />
      </div>

      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <p className="text-sm text-green-800">
          <strong>Almost there!</strong> After this step, you'll discuss your requirements with AI to refine and perfect your build plan.
        </p>
      </div>
    </div>
  );
}
