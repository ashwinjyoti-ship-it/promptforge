'use client';

import { UseFormRegister, UseFormWatch } from 'react-hook-form';
import { ProductData } from '@/types';
import { Globe, Smartphone, Server, Monitor, Code } from 'lucide-react';

interface Props {
  register: UseFormRegister<ProductData>;
  watch: UseFormWatch<ProductData>;
}

export default function ProjectType({ register, watch }: Props) {
  const selectedType = watch('projectType');

  const projectTypes = [
    {
      id: 'webapp' as const,
      icon: Globe,
      title: 'Web Application',
      description: 'Interactive app with features, auth, database',
      examples: 'SaaS, dashboards, marketplaces'
    },
    {
      id: 'website' as const,
      icon: Monitor,
      title: 'Website / Landing Page',
      description: 'Content-focused site, marketing, portfolio',
      examples: 'Company site, blog, landing page'
    },
    {
      id: 'mobileapp' as const,
      icon: Smartphone,
      title: 'Mobile App',
      description: 'iOS/Android native or cross-platform app',
      examples: 'React Native, Flutter, Swift'
    },
    {
      id: 'api' as const,
      icon: Server,
      title: 'API / Backend Service',
      description: 'REST API, GraphQL, microservice',
      examples: 'Node.js, Python, Go backend'
    },
    {
      id: 'desktop' as const,
      icon: Code,
      title: 'Desktop Application',
      description: 'Windows, macOS, or Linux desktop app',
      examples: 'Electron, Tauri, native apps'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-xl font-semibold text-white mb-2">
          What type of project are you building?
        </h3>
        <p className="text-slate-400">
          This helps us tailor the questions to your specific needs
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projectTypes.map((type) => {
          const Icon = type.icon;
          const isSelected = selectedType === type.id;

          return (
            <label
              key={type.id}
              className={`
                relative p-6 rounded-xl border-2 cursor-pointer transition-all
                ${isSelected
                  ? 'border-cyan-500 bg-cyan-500/10 shadow-lg shadow-cyan-500/20'
                  : 'border-slate-600 bg-slate-800/30 hover:border-slate-500'
                }
              `}
            >
              <input
                {...register('projectType', { required: true })}
                type="radio"
                value={type.id}
                className="sr-only"
              />

              <div className="flex items-start gap-4">
                <div className={`
                  p-3 rounded-lg
                  ${isSelected ? 'bg-cyan-500/20 text-cyan-400' : 'bg-slate-700/50 text-slate-400'}
                `}>
                  <Icon className="w-6 h-6" />
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className={`font-semibold ${isSelected ? 'text-cyan-400' : 'text-white'}`}>
                      {type.title}
                    </h4>
                    {isSelected && (
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                    )}
                  </div>
                  <p className="text-sm text-slate-400 mb-2">
                    {type.description}
                  </p>
                  <p className="text-xs text-slate-500">
                    e.g., {type.examples}
                  </p>
                </div>
              </div>

              {isSelected && (
                <div className="absolute top-3 right-3">
                  <svg className="w-6 h-6 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </label>
          );
        })}
      </div>

      {selectedType && (
        <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4">
          <p className="text-sm text-cyan-300">
            ✓ Great! The form will adapt to optimize for {
              projectTypes.find(t => t.id === selectedType)?.title
            }
          </p>
        </div>
      )}
    </div>
  );
}
