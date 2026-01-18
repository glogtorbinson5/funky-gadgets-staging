import { PromptSection } from '@/types/prompt';

export const DEFAULT_SECTION_ORDER: PromptSection[] = [
  'subject',
  'details',
  'style',
  'lighting',
  'composition',
  'background',
  'quality',
];

export const PROMPT_KEYWORDS: Record<PromptSection, string[]> = {
  subject: [
    '1girl', '1boy', 'solo', 'multiple girls', 'multiple boys', 
    'couple', 'group', 'duo', '1girl 1boy', '2girls', '2boys',
    'anthropomorphic', 'mecha', 'humanoid', 'fairy', 'demon', 
    'elf', 'angel', 'vampire', 'witch', 'knight', 'princess',
    'animal companion', 'dragon', 'robot', 'cyborg', 'android'
  ],
  
  details: [
    // Hair
    'long hair', 'short hair', 'medium hair', 'blue hair', 'blonde hair', 
    'black hair', 'brown hair', 'red hair', 'pink hair', 'purple hair',
    'green hair', 'silver hair', 'white hair', 'gradient hair', 'multicolored hair',
    'bangs', 'twin tails', 'ponytail', 'bun', 'braid', 'curly hair', 
    'straight hair', 'wavy hair', 'messy hair', 'neat hair',
    
    // Eyes & Face
    'big eyes', 'small eyes', 'pretty eyes', 'sparkling eyes', 'glowing eyes',
    'blue eyes', 'green eyes', 'brown eyes', 'red eyes', 'heterochromia',
    'with freckles', 'blush', 'smiling', 'serious expression', 'happy',
    'sad', 'angry', 'surprised', 'winking', 'closed eyes',
    
    // Body & Pose
    'standing', 'sitting', 'lying', 'kneeling', 'running', 'jumping',
    'looking back', 'looking at viewer', 'looking away', 'action pose',
    'dynamic pose', 'relaxed pose', 'cute pose', 'elegant pose',
    
    // Clothing
    'school uniform', 'armor', 'kimono', 'dress', 'casual wear', 
    'swimsuit', 'maid outfit', 'nurse outfit', 'sailor uniform',
    'cyberpunk outfit', 'fantasy clothes', 'medieval clothes', 'modern clothes',
    'jacket', 'hoodie', 'skirt', 'shorts', 'pants', 'shirt',
    
    // Accessories
    'holding sword', 'holding book', 'holding flower', 'holding phone',
    'wings', 'tail', 'cat ears', 'dog ears', 'horns', 'halo',
    'goggles', 'hat', 'cap', 'glasses', 'sunglasses', 'mask',
    'jewelry', 'necklace', 'earrings', 'bracelet', 'ring',
    'bag', 'backpack', 'weapon', 'magic staff', 'bow', 'gun'
  ],
  
  style: [
    'anime style', 'manga', 'cel-shaded', 'watercolor', 'oil painting',
    'digital painting', 'illustration', 'concept art', '3D render',
    'studio ghibli style', 'makoto shinkai inspired', 'gothic style',
    'cyberpunk', 'steampunk', 'retro anime', 'vintage anime',
    'line art', 'minimalist', 'pastel-colored', 'vibrant colors',
    'monochrome', 'grayscale', 'colorful', 'muted colors',
    'artstation style', 'pixiv style', 'deviantart style',
    'by makoto shinkai', 'by studio ghibli', 'by katsuhiro otomo'
  ],
  
  lighting: [
    'soft lighting', 'dramatic lighting', 'rim light', 'backlight',
    'golden hour', 'sunset', 'sunrise', 'neon lights', 'moody',
    'cinematic lighting', 'ambient light', 'spotlight', 'silhouette',
    'lens flare', 'god rays', 'volumetric lighting', 'warm lighting',
    'cool lighting', 'natural lighting', 'studio lighting', 'firelight',
    'candlelight', 'moonlight', 'starlight', 'aurora', 'glow',
    'ethereal glow', 'magical glow', 'holographic', 'reflective'
  ],
  
  composition: [
    'close-up', 'bust shot', 'full body', 'half body', 'portrait',
    'wide shot', 'ultra wide angle', 'from above', 'from below',
    'side view', 'front view', 'back view', 'three-quarter view',
    'low angle', 'high angle', 'bird\'s eye view', 'worm\'s-eye view',
    'eye-level view', 'top-down', 'bottom-up', 'aerial view',
    '85mm lens', '50mm lens', '35mm lens', 'wide angle lens',
    'telephoto', 'macro', 'depth of field', 'shallow DoF', 'bokeh',
    'blurred background', 'sharp focus', 'motion blur', 'tilt shift'
  ],
  
  background: [
    'school classroom', 'school hallway', 'school rooftop', 'school festival',
    'cityscape', 'urban', 'city street', 'alleyway', 'neon city',
    'futuristic city', 'cyberpunk city', 'forest', 'woods', 'jungle',
    'temple', 'shrine', 'castle', 'palace', 'medieval town',
    'sky', 'night sky', 'starry sky', 'cloudy sky', 'sunset sky',
    'inside room', 'bedroom', 'living room', 'kitchen', 'bathroom',
    'studio', 'white background', 'gradient background', 'abstract background',
    'cherry blossoms', 'sakura', 'mountains', 'lake', 'ocean', 'beach',
    'battlefield', 'ruins', 'cave', 'underground', 'space', 'planet',
    'indoors', 'outdoors', 'daytime', 'nighttime', 'sunset', 'dawn',
    'rainy', 'snowy', 'foggy', 'windy', 'stormy', 'clear weather'
  ],
  
  quality: [
    'masterpiece', 'best quality', 'ultra high resolution', 'absurdres',
    'highly detailed', 'ultra detailed', 'hyper detailed', 'extremely detailed',
    'realistic details', 'professional artwork', 'sharp focus', 'crisp detail',
    'clean line art', 'official art', 'high quality', 'perfect quality',
    '8k', '4k', 'UHD', 'HD', 'high res', 'ultra high res',
    'RAW photo', 'photorealistic', 'detailed face', 'detailed eyes',
    'detailed hands', 'detailed skin', 'smooth', 'polished', 'refined'
  ],
};
