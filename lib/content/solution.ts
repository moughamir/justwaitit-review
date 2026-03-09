export const SolutionSectionText = {
  eyebrow: 'The Solution',
  headline: {
    pre: 'Meet the AI-Native',
    gradient: 'Production Layer',
    post: 'for Fashion',
  },
  description:
    'Anaqio transforms simple garment images into photorealistic visuals using a structured AI pipeline built specifically for fashion brands.',
  footer:
    'No photoshoot. No production delays. Just scalable visual generation.',
  pipeline: [
    { stage: 'Input', label: 'Flat Lay', color: 'default' as const },
    { stage: 'Process', label: 'AI Pipeline', color: 'purple' as const },
    { stage: 'Output', label: 'Campaign Visual', color: 'amber' as const },
  ],
} as const;
