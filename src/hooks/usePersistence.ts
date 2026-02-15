import type { Task } from '@/types';

const STORAGE_KEY = 'meridian-v1-tasks';

/**
 * Reads the persisted task array from localStorage.
 * Returns an empty array on any failure (first run, JSON error, SSR, etc.).
 */
export function loadTasks(): Task[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/**
 * Serialises and writes the task array to localStorage.
 * Fails silently – storage errors should never crash the UI.
 */
export function saveTasks(tasks: Task[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (err) {
    console.warn('[Meridian] Could not persist tasks:', err);
  }
}
