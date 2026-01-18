'use client';

import { useState, useEffect } from 'react';
import { PromptData, PromptSection } from '@/types/prompt';
import { DEFAULT_SECTION_ORDER, PROMPT_KEYWORDS } from '@/lib/promptData';
import { buildPrompt, getPromptCount } from '@/lib/promptBuilder';
import PromptSectionComponent from './PromptSection';
import PromptPreview from './PromptPreview';
import Controls from './Controls';
import OrderControl from './OrderControl';

export default function PromptGenerator() {
  const [sectionOrder, setSectionOrder] = useState<PromptSection[]>(DEFAULT_SECTION_ORDER);
  const [selectedTags, setSelectedTags] = useState<Record<PromptSection, string[]>>({
    subject: [],
    details: [],
    style: [],
    lighting: [],
    composition: [],
    background: [],
    quality: [],
  });
  const [collapsedSections, setCollapsedSections] = useState<Set<PromptSection>>(
    new Set(DEFAULT_SECTION_ORDER)
  );

  // Load saved section order from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sd-section-order');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length === DEFAULT_SECTION_ORDER.length) {
            setSectionOrder(parsed);
          }
        } catch (e) {
          console.error('Failed to load section order:', e);
        }
      }
    }
  }, []);

  // Save section order to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('sd-section-order', JSON.stringify(sectionOrder));
    }
  }, [sectionOrder]);

  const promptData: PromptData = {
    sections: sectionOrder,
    selectedTags,
  };

  const finalPrompt = buildPrompt(promptData);
  const promptCount = getPromptCount(promptData);

  const toggleTag = (section: PromptSection, tag: string) => {
    setSelectedTags(prev => {
      const current = prev[section] || [];
      const updated = current.includes(tag)
        ? current.filter(t => t !== tag)
        : [...current, tag];
      return { ...prev, [section]: updated };
    });
  };

  const toggleSection = (section: PromptSection) => {
    setCollapsedSections(prev => {
      const next = new Set(prev);
      if (next.has(section)) {
        next.delete(section);
      } else {
        next.add(section);
      }
      return next;
    });
  };

  const handleReorder = (newOrder: PromptSection[]) => {
    setSectionOrder(newOrder);
  };

  const handleLoadPreset = (data: PromptData) => {
    setSectionOrder(data.sections);
    setSelectedTags(data.selectedTags);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 text-center text-gray-800">
          Modular Prompt Builder
        </h1>
        <p className="text-center text-gray-600 mb-6 text-sm">
          Select prompt pieces below. Reorder sections in the bar above.
        </p>
        
        <OrderControl sections={sectionOrder} onReorder={handleReorder} />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Sections - FIXED ORDER */}
          <div className="space-y-4">
            {DEFAULT_SECTION_ORDER.map((section) => (
              <PromptSectionComponent
                key={section}
                section={section}
                tags={PROMPT_KEYWORDS[section]}
                selectedTags={selectedTags[section] || []}
                isCollapsed={collapsedSections.has(section)}
                onToggleTag={(tag) => toggleTag(section, tag)}
                onToggleSection={() => toggleSection(section)}
              />
            ))}
          </div>

          {/* Right: Preview & Controls */}
          <div className="space-y-4">
            <PromptPreview 
              prompt={finalPrompt} 
              count={promptCount} 
            />
            <Controls 
              prompt={finalPrompt}
              promptData={promptData}
              onLoadPreset={handleLoadPreset}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
