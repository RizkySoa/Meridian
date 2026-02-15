'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  type ReactNode,
} from 'react';

import type { FilterType, Task } from '@/types';
import { loadTasks, saveTasks } from '@/hooks/usePersistence';

// ─── Types ────────────────────────────────────────────────────────────────────

interface TaskState {
  tasks: Task[];
  filter: FilterType;
  /** Prevents writing to localStorage before the initial hydration load */
  hydrated: boolean;
}

type TaskAction =
  | { type: 'HYDRATE'; payload: Task[] }
  | { type: 'ADD'; payload: Task }
  | { type: 'TOGGLE_DONE'; payload: string }
  | { type: 'DELETE'; payload: string }
  | { type: 'SET_FILTER'; payload: FilterType };

interface TaskContextValue {
  tasks: Task[];
  filter: FilterType;
  setFilter: (f: FilterType) => void;
  addTask: (title: string, urgent: boolean, important: boolean) => void;
  toggleDone: (id: string) => void;
  deleteTask: (id: string) => void;
  /** Returns tasks for a quadrant, pre-filtered by the current FilterType. */
  tasksFor: (urgent: boolean, important: boolean) => Task[];
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const uid = (): string => Math.random().toString(36).slice(2, 10);

// ─── Reducer ─────────────────────────────────────────────────────────────────

function taskReducer(state: TaskState, action: TaskAction): TaskState {
  switch (action.type) {
    case 'HYDRATE':
      return { ...state, tasks: action.payload, hydrated: true };

    case 'ADD':
      return { ...state, tasks: [action.payload, ...state.tasks] };

    case 'TOGGLE_DONE':
      return {
        ...state,
        tasks: state.tasks.map((t) =>
          t.id === action.payload ? { ...t, done: !t.done } : t
        ),
      };

    case 'DELETE':
      return {
        ...state,
        tasks: state.tasks.filter((t) => t.id !== action.payload),
      };

    case 'SET_FILTER':
      return { ...state, filter: action.payload };

    default:
      return state;
  }
}

// ─── Context ──────────────────────────────────────────────────────────────────

const TaskContext = createContext<TaskContextValue | undefined>(undefined);

// ─── Provider ─────────────────────────────────────────────────────────────────

export function TaskProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(taskReducer, {
    tasks: [],
    filter: 'all',
    hydrated: false,
  });

  // Hydrate from localStorage on mount
  useEffect(() => {
    dispatch({ type: 'HYDRATE', payload: loadTasks() });
  }, []);

  // Persist every time tasks change (after initial hydration)
  useEffect(() => {
    if (state.hydrated) saveTasks(state.tasks);
  }, [state.tasks, state.hydrated]);

  const addTask = useCallback(
    (title: string, urgent: boolean, important: boolean) => {
      const newTask: Task = {
        id: uid(),
        title: title.trim(),
        urgent,
        important,
        done: false,
        createdAt: Date.now(),
      };
      dispatch({ type: 'ADD', payload: newTask });
    },
    []
  );

  const toggleDone = useCallback((id: string) => {
    dispatch({ type: 'TOGGLE_DONE', payload: id });
  }, []);

  const deleteTask = useCallback((id: string) => {
    dispatch({ type: 'DELETE', payload: id });
  }, []);

  const setFilter = useCallback((f: FilterType) => {
    dispatch({ type: 'SET_FILTER', payload: f });
  }, []);

  const tasksFor = useCallback(
    (urgent: boolean, important: boolean): Task[] =>
      state.tasks
        .filter((t) => t.urgent === urgent && t.important === important)
        .filter((t) => {
          if (state.filter === 'active') return !t.done;
          if (state.filter === 'done') return t.done;
          return true;
        }),
    [state.tasks, state.filter]
  );

  return (
    <TaskContext.Provider
      value={{
        tasks: state.tasks,
        filter: state.filter,
        setFilter,
        addTask,
        toggleDone,
        deleteTask,
        tasksFor,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useTask(): TaskContextValue {
  const context = useContext(TaskContext);
  if (!context) throw new Error('useTask must be used within a <TaskProvider>');
  return context;
}
