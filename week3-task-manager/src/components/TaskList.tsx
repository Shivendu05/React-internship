import type { Task } from '../types/task';
import { TaskItem } from './TaskItem';

type Props = {
  tasks: Task[];
  emptyMessage?: string;
};

export function TaskList({ tasks, emptyMessage = 'No tasks match your filters.' }: Props) {
  if (tasks.length === 0) {
    return <div className="empty">{emptyMessage}</div>;
  }

  return (
    <ul className="taskList">
      {tasks.map((t) => (
        <TaskItem key={t.id} task={t} />
      ))}
    </ul>
  );
}
