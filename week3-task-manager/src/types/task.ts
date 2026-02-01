export type TaskId = string;

export type Task = {
  id: TaskId;
  title: string;
  completed: boolean;
  createdAt: number;
  updatedAt: number;
};

export type TaskFilter = 'all' | 'active' | 'completed';
