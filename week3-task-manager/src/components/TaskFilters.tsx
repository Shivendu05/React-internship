import type { TaskFilter } from '../types/task';

type Props = {
  filter: TaskFilter;
  onFilterChange: (next: TaskFilter) => void;
  query: string;
  onQueryChange: (next: string) => void;
};

export function TaskFilters({ filter, onFilterChange, query, onQueryChange }: Props) {
  return (
    <div className="filters">
      <div className="segmented">
        <button
          type="button"
          className={filter === 'all' ? 'active' : undefined}
          onClick={() => onFilterChange('all')}
        >
          All
        </button>
        <button
          type="button"
          className={filter === 'active' ? 'active' : undefined}
          onClick={() => onFilterChange('active')}
        >
          Active
        </button>
        <button
          type="button"
          className={filter === 'completed' ? 'active' : undefined}
          onClick={() => onFilterChange('completed')}
        >
          Completed
        </button>
      </div>

      <label className="srOnly" htmlFor="search">
        Search tasks
      </label>
      <input
        id="search"
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        placeholder="Search tasks"
      />
    </div>
  );
}
