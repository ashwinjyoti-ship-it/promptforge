'use client';

import { UseFormRegister } from 'react-hook-form';
import { ProductData } from '@/types';

interface Props {
  register: UseFormRegister<ProductData>;
}

export default function Design({ register }: Props) {
  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="designStyle" className="block text-sm font-medium text-slate-200 mb-2">
          Design Style *
        </label>
        <select
          {...register('designStyle', { required: true })}
          id="designStyle"
          className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 placeholder-slate-500"
        >
          <option value="">Select a style</option>
          <option value="minimal">Minimal & Clean</option>
          <option value="bold">Bold & Colorful</option>
          <option value="playful">Playful & Fun</option>
          <option value="professional">Professional & Corporate</option>
          <option value="modern">Modern & Sleek</option>
          <option value="brutalist">Brutalist</option>
          <option value="glassmorphism">Glassmorphism</option>
          <option value="neumorphism">Neumorphism</option>
        </select>
      </div>

      <div>
        <label htmlFor="colorPreferences" className="block text-sm font-medium text-slate-200 mb-2">
          Color Preferences
        </label>
        <textarea
          {...register('colorPreferences')}
          id="colorPreferences"
          rows={3}
          className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 placeholder-slate-500"
          placeholder="e.g., Blue primary, warm accents, dark mode support, earth tones..."
        />
      </div>

      <div>
        <label htmlFor="inspirationUrls" className="block text-sm font-medium text-slate-200 mb-2">
          Inspiration URLs
        </label>
        <textarea
          {...register('inspirationUrls')}
          id="inspirationUrls"
          rows={4}
          className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 placeholder-slate-500"
          placeholder="Paste URLs of websites/apps you like (one per line)&#10;e.g., https://linear.app&#10;https://stripe.com&#10;https://vercel.com"
        />
        <p className="text-sm text-gray-500 mt-2">
          Share examples of designs you admire or want to emulate
        </p>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <p className="text-sm text-amber-800">
          <strong>Note:</strong> For MVP, provide URLs or descriptions. Image upload capability can be added in future iterations.
        </p>
      </div>
    </div>
  );
}
