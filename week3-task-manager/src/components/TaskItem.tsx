import { useEffect, useRef, useState } from 'react';
import { useTasks } from '../context/useTasks';
import type { Task } from '../types/task';

type Props = {
  task: Task;
};

export function TaskItem({ task }: Props) {
  const { toggleTask, deleteTask, editTask } = useTasks();
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(task.title);
  const editInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) editInputRef.current?.focus();
  }, [isEditing]);

  function startEdit() {
    setDraft(task.title);
    setIsEditing(true);
  }

  function cancelEdit() {
    setDraft(task.title);
    setIsEditing(false);
  }

  function saveEdit() {
    const trimmed = draft.trim();
    if (!trimmed) return;
    editTask(task.id, trimmed);
    setIsEditing(false);
  }

  return (
    <li className={task.completed ? 'taskItem done' : 'taskItem'}>
      <label className="check">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleTask(task.id)}
        />
        <span className="srOnly">Mark complete</span>
      </label>

      {!isEditing ? (
        <div className="title" title={task.title}>
          {task.title}
        </div>
      ) : (
        <input
          ref={editInputRef}
          className="editInput"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') saveEdit();
            if (e.key === 'Escape') cancelEdit();
          }}
        />
      )}

      <div className="actions">
        {!isEditing ? (
          <button type="button" onClick={startEdit}>
            Edit
          </button>
        ) : (
          <>
            <button type="button" onClick={saveEdit}>
              Save
            </button>
            <button type="button" className="secondary" onClick={cancelEdit}>
              Cancel
            </button>
          </>
        )}
        <button type="button" className="danger" onClick={() => deleteTask(task.id)}>
          Delete
        </button>
      </div>
    </li>
  );
}
