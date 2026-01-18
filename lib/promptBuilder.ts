import { PromptSection, PromptData } from '@/types/prompt';

export function buildPrompt(data: PromptData): string {
  const sections: string[] = [];
  const promptParts: string[] = [];
  const seenInFinalPrompt = new Set<string>();
  
  data.sections.forEach((section) => {
    const tags = data.selectedTags[section] || [];
    const sectionName = `#${section}`;
    
    // Always add section header on new line
    sections.push(sectionName);
    
    // Add tags on next line if they exist (show all tags in sections, even if duplicate)
    if (tags.length > 0) {
      sections.push(tags.join(', '));
    }
    
    // Add unique tags to prompt (without hashtags) for the final comma-separated line
    // Only add each tag once to the final prompt, even if it appears in multiple sections
    tags.forEach(tag => {
      if (!seenInFinalPrompt.has(tag)) {
        promptParts.push(tag);
        seenInFinalPrompt.add(tag);
      }
    });
  });
  
  // Combine: section headers (each on new line) + blank line + actual prompt
  return [
    ...sections,
    '',
    promptParts.join(', ')
  ].join('\n');
}

export function getPromptCount(data: PromptData): number {
  return Object.values(data.selectedTags)
    .flat()
    .length;
}
