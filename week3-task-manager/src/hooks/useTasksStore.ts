import { useEffect, useMemo, useReducer } from 'react';
import type { Task, TaskId } from '../types/task';

const STORAGE_KEY = 'week3-task-manager:tasks:v1';

type Action =
  | { type: 'ADD'; title: string }
  | { type: 'TOGGLE'; id: TaskId }
  | { type: 'DELETE'; id: TaskId }
  | { type: 'EDIT'; id: TaskId; title: string }
  | { type: 'CLEAR_COMPLETED' }
  | { type: 'SET_ALL'; tasks: Task[] };

function now(): number {
  return Date.now();
}

function createTask(title: string): Task {
  const ts = now();
  return {
    id: crypto.randomUUID(),
    title,
    completed: false,
    createdAt: ts,
    updatedAt: ts,
  };
}

function isTaskLike(value: unknown): value is Partial<Task> {
  return typeof value === 'object' && value !== null;
}

function normalizeLoadedTasks(raw: unknown): Task[] {
  if (!Array.isArray(raw)) return [];

  const ts = now();
  const tasks: Task[] = [];

  for (const item of raw) {
    if (!isTaskLike(item)) continue;

    const id = typeof item.id === 'string' ? item.id : undefined;
    const title = typeof item.title === 'string' ? item.title : undefined;
    const completed = typeof item.completed === 'boolean' ? item.completed : undefined;

    if (!id || !title || completed === undefined) continue;

    tasks.push({
      id,
      title,
      completed,
      createdAt: typeof item.createdAt === 'number' ? item.createdAt : ts,
      updatedAt: typeof item.updatedAt === 'number' ? item.updatedAt : ts,
    });
  }

  return tasks;
}

function loadTasksFromLocalStorage(): Task[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return normalizeLoadedTasks(JSON.parse(raw));
  } catch {
    return [];
  }
}

function taskReducer(state: Task[], action: Action): Task[] {
  switch (action.type) {
    case 'ADD': {
      const title = action.title.trim();
      if (!title) return state;
      return [createTask(title), ...state];
    }

    case 'TOGGLE': {
      return state.map((t) =>
        t.id === action.id ? { ...t, completed: !t.completed, updatedAt: now() } : t,
      );
    }

    case 'DELETE': {
      return state.filter((t) => t.id !== action.id);
    }

    case 'EDIT': {
      const title = action.title.trim();
      if (!title) return state;
      return state.map((t) => (t.id === action.id ? { ...t, title, updatedAt: now() } : t));
    }

    case 'CLEAR_COMPLETED': {
      return state.filter((t) => !t.completed);
    }

    case 'SET_ALL': {
      return action.tasks;
    }

    default: {
      return state;
    }
  }
}

export function useTasksStore() {
  // Lazy initialization reads from localStorage only once.
  const [tasks, dispatch] = useReducer(taskReducer, undefined, loadTasksFromLocalStorage);

  // Side effect: persist tasks after each change.
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch {
      // If storage is full / blocked, we still want the app to keep working.
    }
  }, [tasks]);

  const actions = useMemo(
    () => ({
      addTask: (title: string) => dispatch({ type: 'ADD', title }),
      toggleTask: (id: TaskId) => dispatch({ type: 'TOGGLE', id }),
      deleteTask: (id: TaskId) => dispatch({ type: 'DELETE', id }),
      editTask: (id: TaskId, title: string) => dispatch({ type: 'EDIT', id, title }),
      clearCompleted: () => dispatch({ type: 'CLEAR_COMPLETED' }),
      replaceTasks: (next: Task[]) => dispatch({ type: 'SET_ALL', tasks: next }),
    }),
    [],
  );

  return {
    tasks,
    ...actions,
  };
}
