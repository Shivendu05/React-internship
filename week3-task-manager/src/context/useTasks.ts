import { useContext } from 'react';
import { TasksContext } from './tasksStoreContext';

export function useTasks() {
  const ctx = useContext(TasksContext);
  if (!ctx) {
    throw new Error('useTasks must be used within <TasksProvider>.');
  }
  return ctx;
}
