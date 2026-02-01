import { useEffect, useMemo, useState } from 'react';
import { TaskFilters } from './components/TaskFilters';
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';
import { TaskStats } from './components/TaskStats';
import { useTasks } from './context/useTasks';
import type { Task, TaskFilter } from './types/task';
import './App.css';

function buildSampleTasks(): Task[] {
  const ts = Date.now();

  const make = (title: string, completed = false, offset = 0): Task => ({
    id: crypto.randomUUID(),
    title,
    completed,
    createdAt: ts + offset,
    updatedAt: ts + offset,
  });

  return [
    make('Read about useState vs useReducer'),
    make('Add tasks + toggle completion'),
    make('Persist state to localStorage (useEffect)'),
    make('Create a custom hook for business logic'),
    make('Share state with Context API', true),
  ];
}

export default function App() {
  const { tasks, replaceTasks } = useTasks();

  const [filter, setFilter] = useState<TaskFilter>('all');
  const [query, setQuery] = useState('');

  const filteredTasks = useMemo(() => {
    const q = query.trim().toLowerCase();

    return tasks
      .filter((t) => {
        if (filter === 'active') return !t.completed;
        if (filter === 'completed') return t.completed;
        return true;
      })
      .filter((t) => {
        if (!q) return true;
        return t.title.toLowerCase().includes(q);
      })
      .sort((a, b) => b.createdAt - a.createdAt);
  }, [filter, query, tasks]);

  // Side effect: keep the browser tab title in sync with derived state.
  useEffect(() => {
    const remaining = tasks.filter((t) => !t.completed).length;
    document.title = remaining > 0 ? `Task Manager (${remaining} left)` : 'Task Manager';
  }, [tasks]);

  function loadSample() {
    replaceTasks(buildSampleTasks());
    setFilter('all');
    setQuery('');
  }

  function resetAll() {
    if (tasks.length > 0) {
      const ok = window.confirm('This will remove all tasks. Continue?');
      if (!ok) return;
    }
    replaceTasks([]);
    setFilter('all');
    setQuery('');
  }

  return (
    <div className="app">
      <header className="header">
        <div>
          <h1>Week 3 Task Manager</h1>
          <p className="subtitle">State management + hooks + Context API</p>
        </div>

        <div className="headerActions">
          <button type="button" className="secondary" onClick={loadSample}>
            Load sample
          </button>
          <button type="button" className="danger" onClick={resetAll}>
            Reset
          </button>
        </div>
      </header>

      <div className="panel">
        <TaskForm />
        <TaskFilters
          filter={filter}
          onFilterChange={setFilter}
          query={query}
          onQueryChange={setQuery}
        />
        <TaskStats />

        <TaskList
          tasks={filteredTasks}
          emptyMessage={
            tasks.length === 0
              ? 'No tasks yet — add one above or click “Load sample”.'
              : 'No tasks match your filters.'
          }
        />
      </div>

      <footer className="footer">
        <span>
          Data persists in <code>localStorage</code>.
        </span>
        <span>
          See <code>DOCUMENTATION.md</code> for architecture notes.
        </span>
      </footer>
    </div>
  );
}
