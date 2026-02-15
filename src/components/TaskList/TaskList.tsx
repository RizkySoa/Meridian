'use client';

import type { Task } from '@/types';
import TaskItem from '@/components/TaskItem/TaskItem';
import styles from './TaskList.module.css';

// ─── Props ────────────────────────────────────────────────────────────────────

interface TaskListProps {
  tasks: Task[];
  quadrantName: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function TaskList({ tasks, quadrantName }: TaskListProps) {
  return (
    <ol
      className={styles.list}
      role="list"
      aria-label={`Tasks in ${quadrantName}`}
    >
      {tasks.length === 0 ? (
        <li className={styles.empty} role="status">
          Empty
        </li>
      ) : (
        tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))
      )}
    </ol>
  );
}
