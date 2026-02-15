import type { QuadrantConfig } from '@/types';

/**
 * The four quadrants of the Eisenhower Matrix, ordered top-left → bottom-right
 * (urgent/important → not-urgent/important → urgent/not-important → not-urgent/not-important).
 * Each quadrant gets its own warm, muted accent drawn from a parchment palette.
 */
export const QUADRANTS: QuadrantConfig[] = [
  {
    id: 'q1',
    urgent: true,
    important: true,
    numeral: 'I',
    name: 'Do First',
    desc: 'Urgent & Important',
    accent: '#B87333',                        // copper
    accentAlpha: 'rgba(184,115,51,0.06)',
    accentBorder: 'rgba(184,115,51,0.18)',
  },
  {
    id: 'q2',
    urgent: false,
    important: true,
    numeral: 'II',
    name: 'Schedule',
    desc: 'Important, Not Urgent',
    accent: '#4A7C6F',                        // sage
    accentAlpha: 'rgba(74,124,111,0.06)',
    accentBorder: 'rgba(74,124,111,0.18)',
  },
  {
    id: 'q3',
    urgent: true,
    important: false,
    numeral: 'III',
    name: 'Delegate',
    desc: 'Urgent, Not Important',
    accent: '#9B7E6B',                        // dusty mauve
    accentAlpha: 'rgba(155,126,107,0.06)',
    accentBorder: 'rgba(155,126,107,0.18)',
  },
  {
    id: 'q4',
    urgent: false,
    important: false,
    numeral: 'IV',
    name: 'Eliminate',
    desc: 'Neither',
    accent: '#888880',                        // warm stone
    accentAlpha: 'rgba(136,136,128,0.05)',
    accentBorder: 'rgba(136,136,128,0.15)',
  },
];
