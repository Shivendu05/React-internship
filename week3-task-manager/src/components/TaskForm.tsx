import { useEffect, useRef, useState } from 'react';
import { useTasks } from '../context/useTasks';

export function TaskForm() {
  const { addTask } = useTasks();
  const [title, setTitle] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const trimmed = title.trim();
    if (!trimmed) return;

    addTask(trimmed);
    setTitle('');
    inputRef.current?.focus();
  }

  const canSubmit = title.trim().length > 0;

  return (
    <form className="taskForm" onSubmit={onSubmit}>
      <label className="srOnly" htmlFor="new-task">
        New task
      </label>
      <input
        id="new-task"
        ref={inputRef}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a task (e.g. Learn useEffect)"
        maxLength={120}
      />
      <button type="submit" disabled={!canSubmit}>
        Add
      </button>
    </form>
  );
}
