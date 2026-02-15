'use client';

import type { FilterType } from '@/types';
import { useTask } from '@/context/TaskContext';
import styles from './Header.module.css';

// ─── Filter pill labels ───────────────────────────────────────────────────────

const FILTERS: { value: FilterType; label: string }[] = [
  { value: 'all',    label: 'All'    },
  { value: 'active', label: 'Active' },
  { value: 'done',   label: 'Done'   },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function Header() {
  const { tasks, filter, setFilter } = useTask();

  const totalActive = tasks.filter((t) => !t.done).length;
  const totalDone   = tasks.filter((t) =>  t.done).length;

  return (
    <header className={styles.header}>
      {/* Wordmark */}
      <div className={styles.wordmark} aria-label="Meridian">
        <span className={styles.pip} aria-hidden="true" />
        Meridian
      </div>

      {/* Right: stats + filter tabs */}
      <div className={styles.right}>
        <p className={styles.stats} aria-live="polite">
          <span>{totalActive} active</span>
          <span className={styles.sep} aria-hidden="true">·</span>
          <span>{totalDone} done</span>
        </p>

        <nav className={styles.filters} aria-label="Task filter">
          {FILTERS.map(({ value, label }) => (
            <button
              key={value}
              className={`${styles.filterBtn} ${filter === value ? styles.filterBtnActive : ''}`}
              onClick={() => setFilter(value)}
              aria-pressed={filter === value}
            >
              {label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
