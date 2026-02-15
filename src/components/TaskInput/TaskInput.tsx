'use client';

import { useEffect, useRef, useState } from 'react';
import { useTask } from '@/context/TaskContext';
import styles from './TaskInput.module.css';

// ─── Props ────────────────────────────────────────────────────────────────────

interface TaskInputProps {
  urgent: boolean;
  important: boolean;
  onClose: () => void;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function TaskInput({ urgent, important, onClose }: TaskInputProps) {
  const { addTask } = useTask();
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus when the input mounts
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = () => {
    const trimmed = value.trim();
    if (trimmed) {
      addTask(trimmed, urgent, important);
    }
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter')  handleSubmit();
    if (e.key === 'Escape') onClose();
  };

  return (
    <div className={styles.row} role="group" aria-label="New task">
      <input
        ref={inputRef}
        type="text"
        className={styles.input}
        value={value}
        maxLength={140}
        placeholder="Task name…"
        aria-label="New task title"
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button
        className={styles.confirmBtn}
        onClick={handleSubmit}
        aria-label="Add task"
      >
        Add ↵
      </button>
    </div>
  );
}
