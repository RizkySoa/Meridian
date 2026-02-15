'use client';

import { useState, type CSSProperties } from 'react';
import type { QuadrantConfig } from '@/types';
import { useTask } from '@/context/TaskContext';
import TaskList from '@/components/TaskList/TaskList';
import TaskInput from '@/components/TaskInput/TaskInput';
import styles from './Quadrant.module.css';

// ─── Props ────────────────────────────────────────────────────────────────────

interface QuadrantProps {
  config: QuadrantConfig;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function Quadrant({ config }: QuadrantProps) {
  const { tasksFor } = useTask();
  const [inputOpen, setInputOpen] = useState(false);

  const tasks = tasksFor(config.urgent, config.important);

  // Inject quadrant accent tokens as CSS custom properties so child
  // modules (TaskInput focus ring, TaskItem checkbox) can read them.
  const cssVars: CSSProperties & Record<string, string> = {
    '--q-accent':       config.accent,
    '--q-accent-alpha': config.accentAlpha,
    '--q-accent-border': config.accentBorder,
    background:         config.accentAlpha,
  };

  const handleToggleInput = () => setInputOpen((prev) => !prev);
  const handleCloseInput  = () => setInputOpen(false);

  return (
    <article className={styles.card} style={cssVars}>

      {/* Coloured top stripe */}
      <div
        className={styles.stripe}
        style={{ background: config.accent }}
        aria-hidden="true"
      />

      {/* ── Card header ─────────────────────────────────────────────────── */}
      <header className={styles.cardHeader}>
        <div className={styles.meta}>
          <span className={styles.numeral}>{config.numeral}</span>
          <h2 className={styles.name}>{config.name}</h2>
          <p  className={styles.desc}>{config.desc}</p>
        </div>

        <div className={styles.actions}>
          {tasks.length > 0 && (
            <span className={styles.badge} aria-label={`${tasks.length} tasks`}>
              {tasks.length}
            </span>
          )}
          <button
            className={styles.addBtn}
            onClick={handleToggleInput}
            aria-label={inputOpen ? 'Cancel adding task' : `Add task to ${config.name}`}
            aria-expanded={inputOpen}
          >
            {inputOpen ? '×' : '+'}
          </button>
        </div>
      </header>

      {/* ── Task list ───────────────────────────────────────────────────── */}
      <TaskList
        tasks={tasks}
        quadrantName={config.name}
      />

      {/* ── Inline task input (conditionally rendered) ──────────────────── */}
      {inputOpen && (
        <TaskInput
          urgent={config.urgent}
          important={config.important}
          onClose={handleCloseInput}
        />
      )}
    </article>
  );
}
