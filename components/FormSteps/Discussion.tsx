'use client';

import { useState, useRef } from 'react';
import { ProductData } from '@/types';
import { Send, Loader2, Lock, Download, Paperclip, X } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string | Array<{type: 'text', text: string} | {type: 'image', source: {type: 'base64', media_type: string, data: string}}>;
}

interface Props {
  productData: ProductData;
  onLock: () => void;
}

export default function Discussion({ productData, onLock }: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [locked, setLocked] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState<Array<{name: string, type: string, data: string}>>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const startDiscussion = async () => {
    setLoading(true);
    setInitialized(true);

    const initialMessage: Message = {
      role: 'user',
      content: 'Please review my product specification and provide your insights, questions, and suggestions.'
    };

    try {
      const response = await fetch('/api/discuss', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [initialMessage],
          productData
        })
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      setMessages([
        initialMessage,
        { role: 'assistant', content: data.message }
      ]);
    } catch (error: any) {
      setMessages([
        initialMessage,
        { role: 'assistant', content: `Error: ${error.message}. Please check your ANTHROPIC_API_KEY environment variable.` }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    for (const file of files) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert(`File ${file.name} is too large. Max size is 5MB.`);
        continue;
      }

      // Convert to base64
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64Data = (event.target?.result as string).split(',')[1];
        setAttachedFiles(prev => [...prev, {
          name: file.name,
          type: file.type,
          data: base64Data
        }]);
      };
      reader.readAsDataURL(file);
    }

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeFile = (index: number) => {
    setAttachedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const sendMessage = async () => {
    if ((!input.trim() && attachedFiles.length === 0) || loading) return;

    // Build message content with text and files
    let messageContent: any;

    if (attachedFiles.length > 0) {
      messageContent = [];

      if (input.trim()) {
        messageContent.push({ type: 'text', text: input });
      }

      for (const file of attachedFiles) {
        if (file.type.startsWith('image/')) {
          messageContent.push({
            type: 'image',
            source: {
              type: 'base64',
              media_type: file.type,
              data: file.data
            }
          });
        } else {
          // For non-images, add as text description
          messageContent.push({
            type: 'text',
            text: `[Attached file: ${file.name}]`
          });
        }
      }
    } else {
      messageContent = input;
    }

    const userMessage: Message = { role: 'user', content: messageContent };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setAttachedFiles([]);
    setLoading(true);

    try {
      const response = await fetch('/api/discuss', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedMessages,
          productData
        })
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      setMessages([
        ...updatedMessages,
        { role: 'assistant', content: data.message }
      ]);
    } catch (error: any) {
      setMessages([
        ...updatedMessages,
        { role: 'assistant', content: `Error: ${error.message}` }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleLock = () => {
    setLocked(true);
    onLock();
  };

  const exportDiscussion = () => {
    const content = messages.map(m => `**${m.role.toUpperCase()}:**\n${m.content}\n`).join('\n---\n\n');
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `discussion_${productData.productName || 'export'}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!initialized) {
    return (
      <div className="text-center py-12">
        <div className="mb-6">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Ready to Refine Your Spec?
          </h3>
          <p className="text-gray-600 mb-6">
            I'll review your product specification, ask clarifying questions, and suggest improvements.
          </p>
        </div>
        <button
          onClick={startDiscussion}
          disabled={loading}
          className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium disabled:opacity-50 inline-flex items-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Starting Discussion...
            </>
          ) : (
            'Start AI Review'
          )}
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Messages */}
      <div className="bg-gray-50 rounded-lg p-4 h-96 overflow-y-auto space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg px-4 py-3 ${
                message.role === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-900 border border-gray-200'
              }`}
            >
              {typeof message.content === 'string' ? (
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              ) : (
                <div className="space-y-2">
                  {message.content.map((item, idx) => (
                    <div key={idx}>
                      {item.type === 'text' ? (
                        <p className="text-sm whitespace-pre-wrap">{item.text}</p>
                      ) : item.type === 'image' ? (
                        <img
                          src={`data:${item.source.media_type};base64,${item.source.data}`}
                          alt="Uploaded"
                          className="max-w-full rounded"
                        />
                      ) : null}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-200 rounded-lg px-4 py-3">
              <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      {!locked ? (
        <div className="space-y-3">
          {/* Attached Files Preview */}
          {attachedFiles.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {attachedFiles.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-lg px-3 py-2 text-sm"
                >
                  <span className="text-blue-900 truncate max-w-[200px]">{file.name}</span>
                  <button
                    onClick={() => removeFile(index)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
          <div className="flex gap-2">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.csv,.txt"
              multiple
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={loading}
              className="px-4 py-3 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 disabled:opacity-50"
              title="Attach files (images, Excel, PDF, etc.)"
            >
              <Paperclip className="w-5 h-5" />
            </button>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
              placeholder="Type your message or attach files..."
              disabled={loading}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
            />
            <button
              onClick={sendMessage}
              disabled={loading || (!input.trim() && attachedFiles.length === 0)}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <div className="flex gap-2">
            <button
              onClick={exportDiscussion}
              disabled={messages.length === 0}
              className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 disabled:opacity-50 flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Export Discussion
            </button>
            <button
              onClick={handleLock}
              disabled={loading}
              className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <Lock className="w-5 h-5" />
              Lock & Proceed to Generation
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
          <p className="text-green-800 font-medium">
            ✓ Specification locked! Click Next to generate your build prompt.
          </p>
        </div>
      )}
    </div>
  );
}
