'use client';

import { useState, useEffect } from 'react';
import { PromptData, Preset } from '@/types/prompt';
import { shareToDiscord } from '@/lib/discord';

interface Props {
  prompt: string;
  promptData: PromptData;
  onLoadPreset: (data: PromptData) => void;
}

export default function Controls({ prompt, promptData, onLoadPreset }: Props) {
  const [presetName, setPresetName] = useState('');
  const [showSave, setShowSave] = useState(false);
  const [presets, setPresets] = useState<Preset[]>([]);
  const [showLoad, setShowLoad] = useState(false);
  const [sharing, setSharing] = useState(false);

  useEffect(() => {
    // Load presets from localStorage
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sd-presets');
      if (saved) {
        try {
          setPresets(JSON.parse(saved));
        } catch (e) {
          console.error('Failed to load presets:', e);
        }
      }
    }
  }, []);

  const handleShare = async () => {
    const webhookUrl = process.env.NEXT_PUBLIC_DISCORD_WEBHOOK_URL;
    setSharing(true);
    
    try {
      if (webhookUrl) {
        await shareToDiscord(webhookUrl, prompt);
        alert('Prompt shared to Discord!');
      } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(prompt);
        alert('Discord webhook not configured. Prompt copied to clipboard instead. Add NEXT_PUBLIC_DISCORD_WEBHOOK_URL to your .env.local file.');
      }
    } catch (error) {
      console.error('Share failed:', error);
      navigator.clipboard.writeText(prompt);
      alert('Failed to share to Discord. Prompt copied to clipboard instead.');
    } finally {
      setSharing(false);
    }
  };

  const handleSave = () => {
    if (presetName.trim()) {
      const newPreset: Preset = {
        id: Date.now().toString(),
        name: presetName,
        data: promptData,
      };
      const updated = [...presets, newPreset];
      setPresets(updated);
      if (typeof window !== 'undefined') {
        localStorage.setItem('sd-presets', JSON.stringify(updated));
      }
      setPresetName('');
      setShowSave(false);
      alert('Preset saved!');
    }
  };

  const handleLoad = (preset: Preset) => {
    onLoadPreset(preset.data);
    setShowLoad(false);
  };

  const handleDelete = (id: string) => {
    const updated = presets.filter(p => p.id !== id);
    setPresets(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem('sd-presets', JSON.stringify(updated));
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 space-y-3">
      <button
        onClick={handleShare}
        disabled={sharing}
        className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {sharing ? 'Sharing...' : 'Share to Discord'}
      </button>
      
      {!showSave ? (
        <div className="space-y-2">
          <button
            onClick={() => setShowSave(true)}
            className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors font-medium"
          >
            Save Preset
          </button>
          
          {presets.length > 0 && (
            <div>
              <button
                onClick={() => setShowLoad(!showLoad)}
                className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors font-medium"
              >
                {showLoad ? 'Hide' : 'Load'} Presets ({presets.length})
              </button>
              
              {showLoad && (
                <div className="mt-2 space-y-2 max-h-48 overflow-y-auto">
                  {presets.map((preset) => (
                    <div key={preset.id} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                      <button
                        onClick={() => handleLoad(preset)}
                        className="flex-1 text-left text-sm text-gray-700 hover:text-gray-900"
                      >
                        {preset.name}
                      </button>
                      <button
                        onClick={() => handleDelete(preset.id)}
                        className="text-red-600 hover:text-red-800 text-sm"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-2">
          <input
            type="text"
            value={presetName}
            onChange={(e) => setPresetName(e.target.value)}
            placeholder="Preset name..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSave();
              if (e.key === 'Escape') {
                setShowSave(false);
                setPresetName('');
              }
            }}
            autoFocus
          />
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 font-medium"
            >
              Save
            </button>
            <button
              onClick={() => {
                setShowSave(false);
                setPresetName('');
              }}
              className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
