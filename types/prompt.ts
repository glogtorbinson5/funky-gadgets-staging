export type PromptSection = 
  | 'subject'
  | 'details'
  | 'style'
  | 'lighting'
  | 'composition'
  | 'background'
  | 'quality';

export interface PromptData {
  sections: PromptSection[];
  selectedTags: Record<PromptSection, string[]>;
}

export interface Preset {
  id: string;
  name: string;
  data: PromptData;
}
