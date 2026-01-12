'use client';

import { UseFormRegister } from 'react-hook-form';
import { ProductData } from '@/types';

interface Props {
  register: UseFormRegister<ProductData>;
}

export default function Audience({ register }: Props) {
  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="targetAudience" className="block text-sm font-medium text-slate-200 mb-2">
          Target Audience *
        </label>
        <input
          {...register('targetAudience', { required: true })}
          type="text"
          id="targetAudience"
          className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 placeholder-slate-500"
          placeholder="e.g., Small business owners, freelancers, remote teams"
        />
      </div>

      <div>
        <label htmlFor="userPersonas" className="block text-sm font-medium text-slate-200 mb-2">
          User Personas *
        </label>
        <textarea
          {...register('userPersonas', { required: true })}
          id="userPersonas"
          rows={4}
          className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 placeholder-slate-500"
          placeholder="Describe 2-3 key user types. E.g., 'Project Manager Sarah: 35, manages 3-5 projects, needs quick status updates...'"
        />
      </div>

      <div>
        <label htmlFor="painPoints" className="block text-sm font-medium text-slate-200 mb-2">
          User Pain Points *
        </label>
        <textarea
          {...register('painPoints', { required: true })}
          id="painPoints"
          rows={4}
          className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 placeholder-slate-500"
          placeholder="What frustrates your users about current solutions? What keeps them up at night?"
        />
      </div>
    </div>
  );
}
