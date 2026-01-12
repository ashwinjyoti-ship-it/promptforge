'use client';

import { UseFormRegister, UseFormWatch } from 'react-hook-form';
import { ProductData } from '@/types';

interface Props {
  register: UseFormRegister<ProductData>;
  watch: UseFormWatch<ProductData>;
}

export default function Technical({ register, watch }: Props) {
  const authRequired = watch('authRequired');
  const paymentsRequired = watch('paymentsRequired');
  const realtimeFeatures = watch('realtimeFeatures');
  const fileUploads = watch('fileUploads');

  return (
    <div className="space-y-6">
      {/* Authentication */}
      <div className="p-4 border border-slate-700 rounded-lg">
        <div className="flex items-center gap-3 mb-3">
          <input
            {...register('authRequired')}
            type="checkbox"
            id="authRequired"
            className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-cyan-500"
          />
          <label htmlFor="authRequired" className="text-sm font-medium text-slate-200">
            Authentication Required
          </label>
        </div>
        {authRequired && (
          <select
            {...register('authType')}
            className="w-full px-4 py-3 border border-slate-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
          >
            <option value="">Select authentication method</option>
            <option value="email">Email/Password</option>
            <option value="oauth">OAuth (Google, GitHub, etc.)</option>
            <option value="magic-link">Magic Link</option>
            <option value="saml">SAML/SSO</option>
            <option value="custom">Custom</option>
          </select>
        )}
      </div>

      {/* Payments */}
      <div className="p-4 border border-slate-700 rounded-lg">
        <div className="flex items-center gap-3 mb-3">
          <input
            {...register('paymentsRequired')}
            type="checkbox"
            id="paymentsRequired"
            className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-cyan-500"
          />
          <label htmlFor="paymentsRequired" className="text-sm font-medium text-slate-200">
            Payment Processing
          </label>
        </div>
        {paymentsRequired && (
          <select
            {...register('paymentProvider')}
            className="w-full px-4 py-3 border border-slate-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
          >
            <option value="">Select payment provider</option>
            <option value="stripe">Stripe</option>
            <option value="paypal">PayPal</option>
            <option value="square">Square</option>
            <option value="razorpay">Razorpay</option>
            <option value="custom">Custom</option>
          </select>
        )}
      </div>

      {/* Real-time Features */}
      <div className="p-4 border border-slate-700 rounded-lg">
        <div className="flex items-center gap-3 mb-3">
          <input
            {...register('realtimeFeatures')}
            type="checkbox"
            id="realtimeFeatures"
            className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-cyan-500"
          />
          <label htmlFor="realtimeFeatures" className="text-sm font-medium text-slate-200">
            Real-time Features
          </label>
        </div>
        {realtimeFeatures && (
          <select
            {...register('realtimeType')}
            className="w-full px-4 py-3 border border-slate-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
          >
            <option value="">Select type</option>
            <option value="websockets">WebSockets</option>
            <option value="sse">Server-Sent Events</option>
            <option value="polling">Long Polling</option>
            <option value="firebase">Firebase Realtime</option>
          </select>
        )}
      </div>

      {/* File Uploads */}
      <div className="p-4 border border-slate-700 rounded-lg">
        <div className="flex items-center gap-3 mb-3">
          <input
            {...register('fileUploads')}
            type="checkbox"
            id="fileUploads"
            className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-cyan-500"
          />
          <label htmlFor="fileUploads" className="text-sm font-medium text-slate-200">
            File Uploads
          </label>
        </div>
        {fileUploads && (
          <input
            {...register('fileTypes')}
            type="text"
            className="w-full px-4 py-3 border border-slate-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            placeholder="e.g., Images (PNG, JPG), Documents (PDF), Videos (MP4)"
          />
        )}
      </div>

      {/* External APIs */}
      <div>
        <label htmlFor="externalAPIs" className="block text-sm font-medium text-slate-200 mb-2">
          External APIs / Integrations
        </label>
        <textarea
          {...register('externalAPIs')}
          id="externalAPIs"
          rows={3}
          className="w-full px-4 py-3 border border-slate-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
          placeholder="e.g., SendGrid for emails, Twilio for SMS, Google Maps, OpenAI API..."
        />
      </div>
    </div>
  );
}
