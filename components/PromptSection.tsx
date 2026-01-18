'use client';

import { PromptSection as SectionType } from '@/types/prompt';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

interface Props {
  section: SectionType;
  tags: string[];
  selectedTags: string[];
  isCollapsed: boolean;
  onToggleTag: (tag: string) => void;
  onToggleSection: () => void;
}

const SECTION_LABELS: Record<SectionType, string> = {
  subject: 'Subject',
  details: 'Details',
  style: 'Style',
  lighting: 'Lighting',
  composition: 'Composition',
  background: 'Background',
  quality: 'Quality',
};

export default function PromptSection({
  section,
  tags,
  selectedTags,
  isCollapsed,
  onToggleTag,
  onToggleSection,
}: Props) {
  // Show first 8 tags, rest in dropdown
  const visibleTags = tags.slice(0, 8);
  const hiddenTags = tags.slice(8);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <button
        onClick={onToggleSection}
        className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-2">
          <span className="font-semibold text-gray-700">
            #{section}
          </span>
          <span className="text-sm text-gray-500">
            ({selectedTags.length} selected)
          </span>
        </div>
        {isCollapsed ? (
          <ChevronDownIcon className="w-5 h-5 text-gray-400" />
        ) : (
          <ChevronUpIcon className="w-5 h-5 text-gray-400" />
        )}
      </button>

      {!isCollapsed && (
        <div className="p-4 space-y-3">
          {/* Visible checkboxes */}
          <div className="flex flex-wrap gap-2">
            {visibleTags.map((tag) => (
              <label
                key={tag}
                className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-md hover:bg-gray-100 cursor-pointer text-sm"
              >
                <input
                  type="checkbox"
                  checked={selectedTags.includes(tag)}
                  onChange={() => onToggleTag(tag)}
                  className="rounded border-gray-300"
                />
                <span className="text-gray-700">{tag}</span>
              </label>
            ))}
          </div>

          {/* Dropdown for more */}
          {hiddenTags.length > 0 && (
            <details className="group">
              <summary className="cursor-pointer text-sm text-gray-600 hover:text-gray-800 font-medium">
                + {hiddenTags.length} more options
              </summary>
              <div className="mt-2 flex flex-wrap gap-2">
                {hiddenTags.map((tag) => (
                  <label
                    key={tag}
                    className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-md hover:bg-gray-100 cursor-pointer text-sm"
                  >
                    <input
                      type="checkbox"
                      checked={selectedTags.includes(tag)}
                      onChange={() => onToggleTag(tag)}
                      className="rounded border-gray-300"
                    />
                    <span className="text-gray-700">{tag}</span>
                  </label>
                ))}
              </div>
            </details>
          )}
        </div>
      )}
    </div>
  );
}
