// ─── Core domain types ───────────────────────────────────────────────────────

export interface Task {
  id: string;
  title: string;
  /** X-axis of the Eisenhower matrix */
  urgent: boolean;
  /** Y-axis of the Eisenhower matrix */
  important: boolean;
  done: boolean;
  createdAt: number;
}

export interface QuadrantConfig {
  id: string;
  urgent: boolean;
  important: boolean;
  /** Roman numeral label */
  numeral: string;
  /** Short action verb (Do First, Schedule, Delegate, Eliminate) */
  name: string;
  /** Human-readable axis description */
  desc: string;
  /** Primary accent color (hex) */
  accent: string;
  /** Translucent background tint for the quadrant card */
  accentAlpha: string;
  /** Translucent border color for the quadrant card */
  accentBorder: string;
}

export type FilterType = 'all' | 'active' | 'done';
