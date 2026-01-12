'use client';

import { UseFormRegister, useFieldArray, Control } from 'react-hook-form';
import { ProductData } from '@/types';
import { Plus, X } from 'lucide-react';

interface Props {
  register: UseFormRegister<ProductData>;
  control: Control<ProductData>;
}

export default function Features({ register, control }: Props) {
  const { fields: featureFields, append: appendFeature, remove: removeFeature } = useFieldArray({
    control,
    name: 'coreFeatures'
  });

  const { fields: flowFields, append: appendFlow, remove: removeFlow } = useFieldArray({
    control,
    name: 'userFlows'
  });

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="block text-sm font-medium text-slate-200">
            Core Features *
          </label>
          <button
            type="button"
            onClick={() => appendFeature('')}
            className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
          >
            <Plus className="w-4 h-4" />
            Add Feature
          </button>
        </div>
        <div className="space-y-3">
          {featureFields.map((field, index) => (
            <div key={field.id} className="flex gap-2">
              <input
                {...register(`coreFeatures.${index}` as const, { required: true })}
                type="text"
                className="flex-1 px-4 py-3 border border-slate-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                placeholder="e.g., Real-time collaboration, Task assignment, File sharing"
              />
              <button
                type="button"
                onClick={() => removeFeature(index)}
                className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          ))}
          {featureFields.length === 0 && (
            <button
              type="button"
              onClick={() => appendFeature('')}
              className="w-full px-4 py-3 border-2 border-dashed border-slate-600 rounded-lg text-slate-400 hover:border-blue-500 hover:text-blue-600"
            >
              + Add your first feature
            </button>
          )}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="block text-sm font-medium text-slate-200">
            User Flows *
          </label>
          <button
            type="button"
            onClick={() => appendFlow('')}
            className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
          >
            <Plus className="w-4 h-4" />
            Add Flow
          </button>
        </div>
        <div className="space-y-3">
          {flowFields.map((field, index) => (
            <div key={field.id} className="flex gap-2">
              <input
                {...register(`userFlows.${index}` as const, { required: true })}
                type="text"
                className="flex-1 px-4 py-3 border border-slate-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                placeholder="e.g., User signs up → Creates project → Invites team → Assigns tasks"
              />
              <button
                type="button"
                onClick={() => removeFlow(index)}
                className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          ))}
          {flowFields.length === 0 && (
            <button
              type="button"
              onClick={() => appendFlow('')}
              className="w-full px-4 py-3 border-2 border-dashed border-slate-600 rounded-lg text-slate-400 hover:border-blue-500 hover:text-blue-600"
            >
              + Add your first user flow
            </button>
          )}
        </div>
        <p className="text-sm text-slate-400 mt-2">
          Describe key journeys users take through your app
        </p>
      </div>
    </div>
  );
}
