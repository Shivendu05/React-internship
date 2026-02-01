import type { ReactNode } from 'react';
import { useTasksStore } from '../hooks/useTasksStore';
import { TasksContext } from './tasksStoreContext';

export function TasksProvider({ children }: { children: ReactNode }) {
  const store = useTasksStore();
  return <TasksContext.Provider value={store}>{children}</TasksContext.Provider>;
}
