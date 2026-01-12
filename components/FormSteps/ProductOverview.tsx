'use client';

import { UseFormRegister } from 'react-hook-form';
import { ProductData } from '@/types';

interface Props {
  register: UseFormRegister<ProductData>;
}

export default function ProductOverview({ register }: Props) {
  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="productName" className="block text-sm font-medium text-slate-200 mb-2">
          Product Name *
        </label>
        <input
          {...register('productName', { required: true })}
          type="text"
          id="productName"
          className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 placeholder-slate-500"
          placeholder="e.g., TaskFlow Pro"
        />
      </div>

      <div>
        <label htmlFor="tagline" className="block text-sm font-medium text-slate-200 mb-2">
          Tagline *
        </label>
        <input
          {...register('tagline', { required: true })}
          type="text"
          id="tagline"
          className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 placeholder-slate-500"
          placeholder="e.g., Project management for modern teams"
        />
      </div>

      <div>
        <label htmlFor="problemStatement" className="block text-sm font-medium text-slate-200 mb-2">
          What problem does this solve? *
        </label>
        <textarea
          {...register('problemStatement', { required: true })}
          id="problemStatement"
          rows={5}
          className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 placeholder-slate-500"
          placeholder="Describe the core problem your product addresses and why existing solutions fall short..."
        />
      </div>
    </div>
  );
}
