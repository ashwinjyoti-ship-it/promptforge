'use client';

import { ProductData } from '@/types';
import { DollarSign, Clock, Users } from 'lucide-react';

interface Props {
  productData: ProductData;
}

export default function CostEstimator({ productData }: Props) {
  // Calculate complexity score
  const calculateComplexity = () => {
    let score = 1; // Base

    if (productData.authRequired) score += 1;
    if (productData.paymentsRequired) score += 2;
    if (productData.realtimeFeatures) score += 2;
    if (productData.fileUploads) score += 1;
    if (productData.externalAPIs) score += 1;
    if (productData.entities.length > 3) score += 1;
    if (productData.coreFeatures.length > 5) score += 1;

    return score;
  };

  const complexity = calculateComplexity();

  // Estimate timeline (in weeks)
  const weeks = Math.ceil(complexity * 0.5);

  // Estimate traditional cost (if hiring a team)
  const traditionalCost = {
    min: complexity * 5000,
    max: complexity * 12000
  };

  // Your cost (AI-powered solo)
  const yourCost = {
    min: Math.ceil(complexity * 1500),
    max: Math.ceil(complexity * 3500)
  };

  const savings = traditionalCost.min - yourCost.max;

  return (
    <div className="bg-gradient-to-br from-emerald-50 to-cyan-50 border border-emerald-200 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <DollarSign className="w-5 h-5 text-emerald-600" />
        Cost & Timeline Estimate
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="bg-white rounded-lg p-4">
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
            <Clock className="w-4 h-4" />
            Timeline
          </div>
          <div className="text-2xl font-bold text-gray-900">{weeks} week{weeks > 1 ? 's' : ''}</div>
          <div className="text-xs text-gray-500 mt-1">With AI assistance</div>
        </div>

        <div className="bg-white rounded-lg p-4">
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
            <Users className="w-4 h-4" />
            Traditional Cost
          </div>
          <div className="text-2xl font-bold text-red-600">
            ${traditionalCost.min.toLocaleString()} - ${traditionalCost.max.toLocaleString()}
          </div>
          <div className="text-xs text-gray-500 mt-1">Hiring a full team</div>
        </div>

        <div className="bg-white rounded-lg p-4">
          <div className="flex items-center gap-2 text-sm text-emerald-600 mb-1">
            <DollarSign className="w-4 h-4" />
            Your Quote
          </div>
          <div className="text-2xl font-bold text-emerald-600">
            ${yourCost.min.toLocaleString()} - ${yourCost.max.toLocaleString()}
          </div>
          <div className="text-xs text-gray-500 mt-1">AI-powered delivery</div>
        </div>
      </div>

      <div className="bg-emerald-100 border border-emerald-300 rounded-lg p-4">
        <p className="text-sm text-emerald-900">
          <strong>💰 Client Saves:</strong> ${savings.toLocaleString()}+ by hiring you instead of a traditional team
        </p>
        <p className="text-xs text-emerald-700 mt-2">
          <strong>Tip:</strong> Use this in your proposal to show value. Position yourself as the efficient, modern alternative.
        </p>
      </div>
    </div>
  );
}
