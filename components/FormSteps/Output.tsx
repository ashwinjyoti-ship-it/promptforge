'use client';

import { useState, useEffect } from 'react';
import { ProductData } from '@/types';
import { generateBuildPrompt, generateProductSpec } from '@/lib/generatePrompt';
import { Download, Copy, Check, Github } from 'lucide-react';
import CostEstimator from '../CostEstimator';

interface Props {
  productData: ProductData;
}

export default function Output({ productData }: Props) {
  const [buildPrompt, setBuildPrompt] = useState('');
  const [productSpec, setProductSpec] = useState('');
  const [copiedBuild, setCopiedBuild] = useState(false);
  const [copiedSpec, setCopiedSpec] = useState(false);
  const [activeTab, setActiveTab] = useState<'prompt' | 'spec'>('prompt');
  const [creatingRepo, setCreatingRepo] = useState(false);
  const [repoUrl, setRepoUrl] = useState<string | null>(null);

  useEffect(() => {
    setBuildPrompt(generateBuildPrompt(productData));
    setProductSpec(generateProductSpec(productData));
  }, [productData]);

  const copyToClipboard = async (text: string, type: 'build' | 'spec') => {
    await navigator.clipboard.writeText(text);
    if (type === 'build') {
      setCopiedBuild(true);
      setTimeout(() => setCopiedBuild(false), 2000);
    } else {
      setCopiedSpec(true);
      setTimeout(() => setCopiedSpec(false), 2000);
    }
  };

  const downloadFile = (content: string, filename: string) => {
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const createGitHubRepo = async () => {
    setCreatingRepo(true);
    try {
      const response = await fetch('/api/github', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productName: productData.productName,
          buildPrompt,
          productSpec
        })
      });

      const data = await response.json();

      if (data.error) {
        alert(`GitHub Error: ${data.error}\n\nPlease:\n1. Create a GitHub Personal Access Token with 'repo' scope\n2. Add it to your .env.local as GITHUB_TOKEN=your_token_here\n3. Restart the dev server`);
      } else {
        setRepoUrl(data.repoUrl);
        alert(`Success! Repository created: ${data.repoName}\n\nOpening in browser...`);
        window.open(data.repoUrl, '_blank');
      }
    } catch (error: any) {
      alert(`Error: ${error.message}`);
    } finally {
      setCreatingRepo(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Success Message */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-xl font-semibold text-green-900 mb-2">
          Your Build Prompt is Ready!
        </h3>
        <p className="text-green-700">
          Copy the prompt below and paste it into Claude Code to start building.
        </p>
      </div>

      {/* Cost Estimator */}
      <CostEstimator productData={productData} />

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex gap-4">
          <button
            onClick={() => setActiveTab('prompt')}
            className={`px-4 py-3 font-medium border-b-2 transition-colors ${
              activeTab === 'prompt'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Build Prompt
          </button>
          <button
            onClick={() => setActiveTab('spec')}
            className={`px-4 py-3 font-medium border-b-2 transition-colors ${
              activeTab === 'spec'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Product Spec (Client Doc)
          </button>
        </div>
      </div>

      {/* Build Prompt */}
      {activeTab === 'prompt' && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold text-gray-900">BUILD_PROMPT.md</h4>
            <div className="flex gap-2">
              <button
                onClick={() => copyToClipboard(buildPrompt, 'build')}
                className="flex items-center gap-2 px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg"
              >
                {copiedBuild ? (
                  <>
                    <Check className="w-4 h-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy
                  </>
                )}
              </button>
              <button
                onClick={() => downloadFile(buildPrompt, 'BUILD_PROMPT.md')}
                className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 text-white hover:bg-blue-700 rounded-lg"
              >
                <Download className="w-4 h-4" />
                Download
              </button>
            </div>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 h-96 overflow-y-auto">
            <pre className="text-sm text-gray-800 whitespace-pre-wrap font-mono">
              {buildPrompt}
            </pre>
          </div>
        </div>
      )}

      {/* Product Spec */}
      {activeTab === 'spec' && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold text-gray-900">PRODUCT_SPEC.md</h4>
            <div className="flex gap-2">
              <button
                onClick={() => copyToClipboard(productSpec, 'spec')}
                className="flex items-center gap-2 px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg"
              >
                {copiedSpec ? (
                  <>
                    <Check className="w-4 h-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy
                  </>
                )}
              </button>
              <button
                onClick={() => downloadFile(productSpec, 'PRODUCT_SPEC.md')}
                className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 text-white hover:bg-blue-700 rounded-lg"
              >
                <Download className="w-4 h-4" />
                Download
              </button>
            </div>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 h-96 overflow-y-auto">
            <pre className="text-sm text-gray-800 whitespace-pre-wrap font-mono">
              {productSpec}
            </pre>
          </div>
        </div>
      )}

      {/* Next Steps */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h4 className="font-semibold text-blue-900 mb-3">Next Steps:</h4>
        <ol className="space-y-2 text-sm text-blue-800">
          <li className="flex gap-2">
            <span className="font-semibold">1.</span>
            <span>Copy or download the BUILD_PROMPT.md</span>
          </li>
          <li className="flex gap-2">
            <span className="font-semibold">2.</span>
            <span>Open Claude Code in your terminal or IDE</span>
          </li>
          <li className="flex gap-2">
            <span className="font-semibold">3.</span>
            <span>Paste the prompt and let Claude build your product</span>
          </li>
          <li className="flex gap-2">
            <span className="font-semibold">4.</span>
            <span>Share the Product Spec with your client for approval</span>
          </li>
        </ol>
      </div>

      {/* GitHub Integration */}
      <div className="border-t border-gray-200 pt-6">
        {repoUrl ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
            <p className="text-green-800 mb-2">✓ Repository created successfully!</p>
            <a
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline font-medium"
            >
              View on GitHub →
            </a>
          </div>
        ) : (
          <button
            onClick={createGitHubRepo}
            disabled={creatingRepo}
            className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Github className="w-5 h-5" />
            {creatingRepo ? 'Creating Repository...' : 'Create GitHub Repository'}
          </button>
        )}
      </div>
    </div>
  );
}
