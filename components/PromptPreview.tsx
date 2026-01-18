'use client';

import { useState } from 'react';

interface Props {
  prompt: string;
  count: number;
}

export default function PromptPreview({ prompt, count }: Props) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-semibold text-gray-700">Generated Prompt</h2>
        <div className="text-sm text-gray-500">
          {count} keywords
        </div>
      </div>
      
      <textarea
        readOnly
        value={prompt}
        className="w-full h-96 p-3 bg-white border border-gray-300 rounded-md font-mono text-sm text-gray-900 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 whitespace-pre-wrap"
      />
      
      <button
        onClick={copyToClipboard}
        className="mt-3 w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
      >
        {copied ? 'Copied!' : 'Copy to Clipboard'}
      </button>
    </div>
  );
}
