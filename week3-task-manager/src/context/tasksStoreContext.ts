import { createContext } from 'react';
import type { Task, TaskId } from '../types/task';

export type TasksStore = {
  tasks: Task[];
  addTask: (title: string) => void;
  toggleTask: (id: TaskId) => void;
  deleteTask: (id: TaskId) => void;
  editTask: (id: TaskId, title: string) => void;
  clearCompleted: () => void;
  replaceTasks: (next: Task[]) => void;
};

export const TasksContext = createContext<TasksStore | null>(null);
