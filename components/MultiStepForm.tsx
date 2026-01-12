'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ProductData, StepId } from '@/types';
import { steps } from '@/lib/steps';
import { ChevronLeft, ChevronRight, RotateCcw, Save, FolderOpen } from 'lucide-react';

import ProjectType from './FormSteps/ProjectType';
import ProductOverview from './FormSteps/ProductOverview';
import Audience from './FormSteps/Audience';
import Features from './FormSteps/Features';
import Technical from './FormSteps/Technical';
import Database from './FormSteps/Database';
import Design from './FormSteps/Design';
import Deployment from './FormSteps/Deployment';
import Discussion from './FormSteps/Discussion';
import Output from './FormSteps/Output';

const defaultValues: ProductData = {
  projectType: 'webapp',
  productName: '',
  tagline: '',
  problemStatement: '',
  targetAudience: '',
  userPersonas: '',
  painPoints: '',
  coreFeatures: [],
  userFlows: [],
  authRequired: false,
  paymentsRequired: false,
  realtimeFeatures: false,
  externalAPIs: '',
  fileUploads: false,
  entities: [],
  designStyle: '',
  colorPreferences: '',
  inspirationImages: [],
  inspirationUrls: '',
  deploymentPlatform: '',
  customRequirements: ''
};

export default function MultiStepForm() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [formData, setFormData] = useState<ProductData>(defaultValues);
  const [discussionLocked, setDiscussionLocked] = useState(false);
  const [savedProjects, setSavedProjects] = useState<string[]>([]);

  const { register, control, watch, handleSubmit, reset } = useForm<ProductData>({
    defaultValues: formData,
    mode: 'onChange'
  });

  // Load saved projects list on mount
  useEffect(() => {
    const saved = localStorage.getItem('promptforge_projects');
    if (saved) {
      setSavedProjects(JSON.parse(saved));
    }
  }, []);

  // Auto-save current progress
  useEffect(() => {
    const data = watch();
    if (data.productName) {
      localStorage.setItem('promptforge_autosave', JSON.stringify(data));
    }
  }, [watch()]);

  const currentStep = steps[currentStepIndex];

  const handleReset = () => {
    if (confirm('Are you sure? This will clear all data and start fresh.')) {
      reset(defaultValues);
      setFormData(defaultValues);
      setCurrentStepIndex(0);
      setDiscussionLocked(false);
      localStorage.removeItem('promptforge_autosave');
    }
  };

  const handleSave = () => {
    const data = watch();
    if (!data.productName) {
      alert('Please enter a product name before saving.');
      return;
    }
    const projectId = `${data.productName.replace(/\s+/g, '-').toLowerCase()}_${Date.now()}`;
    localStorage.setItem(`promptforge_${projectId}`, JSON.stringify(data));
    const projects = [...savedProjects, projectId];
    localStorage.setItem('promptforge_projects', JSON.stringify(projects));
    setSavedProjects(projects);
    alert(`Project "${data.productName}" saved successfully!`);
  };

  const handleLoad = () => {
    if (savedProjects.length === 0) {
      alert('No saved projects found.');
      return;
    }
    const projectId = prompt(`Enter project name to load:\n\n${savedProjects.join('\n')}`);
    if (projectId) {
      const loaded = localStorage.getItem(`promptforge_${projectId}`);
      if (loaded) {
        const data = JSON.parse(loaded);
        reset(data);
        setFormData(data);
        alert('Project loaded!');
      } else {
        alert('Project not found.');
      }
    }
  };

  const goToNext = handleSubmit((data) => {
    setFormData(data);
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  });

  const goToPrevious = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const handleDiscussionLock = () => {
    setDiscussionLocked(true);
  };

  const renderStepContent = () => {
    switch (currentStep.id) {
      case 'projecttype':
        return <ProjectType register={register} watch={watch} />;
      case 'product':
        return <ProductOverview register={register} />;
      case 'audience':
        return <Audience register={register} />;
      case 'features':
        return <Features register={register} control={control} />;
      case 'technical':
        return <Technical register={register} watch={watch} />;
      case 'database':
        return <Database register={register} control={control} />;
      case 'design':
        return <Design register={register} />;
      case 'deployment':
        return <Deployment register={register} />;
      case 'discussion':
        return <Discussion productData={formData} onLock={handleDiscussionLock} />;
      case 'output':
        return <Output productData={formData} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="bg-slate-800/50 border-b border-cyan-500/20 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">PromptForge</h1>
              <p className="text-slate-400 mt-1">Transform ideas into build-ready prompts</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-4 py-2 bg-slate-700/50 text-slate-300 rounded-lg hover:bg-slate-700 transition-all"
                title="Save Project"
              >
                <Save className="w-4 h-4" />
                Save
              </button>
              <button
                onClick={handleLoad}
                className="flex items-center gap-2 px-4 py-2 bg-slate-700/50 text-slate-300 rounded-lg hover:bg-slate-700 transition-all"
                title="Load Project"
              >
                <FolderOpen className="w-4 h-4" />
                Load
              </button>
              <button
                onClick={handleReset}
                className="flex items-center gap-2 px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-all"
                title="Reset All Data"
              >
                <RotateCcw className="w-4 h-4" />
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-slate-800/30 border-b border-slate-700/50 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {steps.slice(0, 8).map((step, index) => (
              <div key={step.id} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold transition-all ${
                      index <= currentStepIndex
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/50'
                        : 'bg-slate-700 text-slate-400'
                    }`}
                  >
                    {index + 1}
                  </div>
                  <div className={`text-[10px] mt-1 text-center transition-colors ${
                    index === currentStepIndex ? 'font-semibold text-cyan-400' : 'text-slate-500'
                  }`}>
                    {step.title}
                  </div>
                </div>
                {index < 7 && (
                  <div
                    className={`h-0.5 flex-1 mx-1 rounded transition-all ${
                      index < currentStepIndex ? 'bg-gradient-to-r from-cyan-500 to-blue-500' : 'bg-slate-700'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl shadow-2xl border border-slate-700/50 p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white">{currentStep.title}</h2>
            <p className="text-slate-400 mt-2">{currentStep.description}</p>
          </div>

          <form onSubmit={goToNext}>
            {renderStepContent()}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-700/50">
              <button
                type="button"
                onClick={goToPrevious}
                disabled={currentStepIndex === 0}
                className="flex items-center gap-2 px-6 py-3 text-slate-300 hover:bg-slate-700/50 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
                Previous
              </button>

              <div className="text-sm text-slate-500 font-mono">
                Step {currentStepIndex + 1} of {steps.length}
              </div>

              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:from-cyan-600 hover:to-blue-600 font-medium shadow-lg shadow-cyan-500/30 transition-all"
              >
                {currentStepIndex === steps.length - 1 ? 'Generate' : 'Next'}
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
