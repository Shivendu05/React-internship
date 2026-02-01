import { useMemo } from 'react';
import { useTasks } from '../context/useTasks';

export function TaskStats() {
  const { tasks, clearCompleted } = useTasks();

  const { total, completed, remaining } = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.completed).length;
    return { total, completed, remaining: total - completed };
  }, [tasks]);

  return (
    <div className="stats">
      <div className="statsNumbers">
        <span>
          <strong>{remaining}</strong> remaining
        </span>
        <span>
          <strong>{completed}</strong> completed
        </span>
        <span>
          <strong>{total}</strong> total
        </span>
      </div>

      <div className="statsActions">
        <button type="button" onClick={clearCompleted} disabled={completed === 0}>
          Clear completed
        </button>
      </div>
    </div>
  );
}
