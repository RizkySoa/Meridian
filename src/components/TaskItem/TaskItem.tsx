'use client';

import type { Task } from '@/types';
import { useTask } from '@/context/TaskContext';
import styles from './TaskItem.module.css';

// ─── Props ────────────────────────────────────────────────────────────────────

interface TaskItemProps {
  task: Task;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function TaskItem({ task }: TaskItemProps) {
  const { toggleDone, deleteTask } = useTask();

  return (
    <li className={styles.item}>
      {/* Custom-styled native checkbox — inherits --q-accent from parent */}
      <input
        id={`task-${task.id}`}
        type="checkbox"
        className={styles.checkbox}
        checked={task.done}
        onChange={() => toggleDone(task.id)}
        aria-label={task.done ? `Mark "${task.title}" as active` : `Mark "${task.title}" as done`}
      />

      <label
        htmlFor={`task-${task.id}`}
        className={`${styles.title} ${task.done ? styles.titleDone : ''}`}
      >
        {task.title}
      </label>

      <button
        className={styles.deleteBtn}
        onClick={() => deleteTask(task.id)}
        aria-label={`Delete "${task.title}"`}
        title="Delete task"
      >
        ×
      </button>
    </li>
  );
}
