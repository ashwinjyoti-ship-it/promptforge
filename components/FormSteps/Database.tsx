'use client';

import { UseFormRegister, useFieldArray, Control } from 'react-hook-form';
import { ProductData } from '@/types';
import { Plus, X } from 'lucide-react';

interface Props {
  register: UseFormRegister<ProductData>;
  control: Control<ProductData>;
}

export default function Database({ register, control }: Props) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'entities'
  });

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between mb-3">
          <div>
            <label className="block text-sm font-medium text-slate-200">
              Database Entities *
            </label>
            <p className="text-sm text-slate-400 mt-1">
              Define the main data models/tables you'll need
            </p>
          </div>
          <button
            type="button"
            onClick={() => append({ name: '', fields: '' })}
            className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
          >
            <Plus className="w-4 h-4" />
            Add Entity
          </button>
        </div>

        <div className="space-y-4">
          {fields.map((field, index) => (
            <div key={field.id} className="p-4 border border-slate-700 rounded-lg">
              <div className="flex items-start gap-3">
                <div className="flex-1 space-y-3">
                  <input
                    {...register(`entities.${index}.name` as const, { required: true })}
                    type="text"
                    className="w-full px-4 py-3 border border-slate-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    placeholder="Entity name (e.g., User, Product, Order)"
                  />
                  <textarea
                    {...register(`entities.${index}.fields` as const, { required: true })}
                    rows={3}
                    className="w-full px-4 py-3 border border-slate-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    placeholder="Fields: e.g., email, name, password, createdAt, role"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}

          {fields.length === 0 && (
            <button
              type="button"
              onClick={() => append({ name: '', fields: '' })}
              className="w-full px-4 py-8 border-2 border-dashed border-slate-600 rounded-lg text-slate-400 hover:border-blue-500 hover:text-blue-600"
            >
              + Add your first entity
            </button>
          )}
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          <strong>Tip:</strong> Think about relationships too. E.g., "User has many Projects, Project belongs to User"
        </p>
      </div>
    </div>
  );
}
