# Week 3 — State Management and Hooks Mini-App
This folder contains a mini task manager application built with React + TypeScript + Vite.

## Goals (What this app demonstrates)
- Dynamic UI updates with React state.
- Side effects (persistence + document title) using `useEffect`.
- Global state sharing via the Context API.
- A custom hook that encapsulates business logic (task CRUD + persistence).

## Architecture Overview
High-level component tree:
- `main.tsx`
  - `<TasksProvider>` (Context)
    - `<App>`
      - `<TaskForm>` (create task)
      - `<TaskFilters>` (filter + search)
      - `<TaskStats>` (derived state + clear completed)
      - `<TaskList>`
        - `<TaskItem>` (toggle / edit / delete)

### Where state lives
- Global task state is shared via the Context API:
  - Provider: `src/context/TasksContext.tsx`
  - Context object/type: `src/context/tasksStoreContext.ts`
  - Consumer hook: `src/context/useTasks.ts`
- The actual state *implementation* (reducer + persistence) is encapsulated in the custom hook `src/hooks/useTasksStore.ts`.
- UI-only state (filter and search query) lives locally inside `src/App.tsx` via `useState`.

This separation keeps the "business state" (tasks + actions) stable and reusable, while letting UI screens choose how to filter/search/sort.

## State Management Details
### Task store
File: `src/hooks/useTasksStore.ts`
- Uses `useReducer` to manage a list of tasks (`Task[]`).
- Exposes business actions:
  - `addTask(title)`
  - `toggleTask(id)`
  - `editTask(id, title)`
  - `deleteTask(id)`
  - `clearCompleted()`
  - `replaceTasks(nextTasks)`

Why `useReducer`?
- Task updates are naturally modeled as discrete events (ADD/EDIT/TOGGLE/DELETE).
- Reducers make state transitions explicit and easier to test/extend.

### Persistence side effect
File: `src/hooks/useTasksStore.ts`
- `useEffect` persists the task list to `localStorage` whenever `tasks` changes.
- The reducer is lazily initialized from localStorage (read once on first render).

This demonstrates a real-world side effect pattern: keep UI responsive even if storage fails (try/catch).

## Context API Usage
Files:
- Provider: `src/context/TasksContext.tsx`
- Context: `src/context/tasksStoreContext.ts`
- Hook: `src/context/useTasks.ts`

`<TasksProvider>` creates the store by calling `useTasksStore()` and exposes it to the component tree.

Why Context?
- Multiple components (form, list items, stats) need access to the same state and actions.
- Context avoids prop drilling and keeps component APIs small.

## Hooks Used
### Built-in hooks
- `useState`: local UI state (e.g., input text, filters, edit mode).
- `useEffect`: persistence, focusing inputs, and setting document title.
- `useReducer`: centralized task state transitions.
- `useMemo`: inexpensive derived state (counts + filtered tasks).

### Custom hooks
- `useTasksStore()` (business logic + state)
  - Encapsulates reducer + persistence side effects.
- `useTasks()` (ergonomic context consumer)
  - Ensures consistent access to the task store.

## Usage Example (How to consume the task store)
Example component snippet:

```tsx
import { useTasks } from './context/useTasks';

export function MyComponent() {
  const { tasks, addTask } = useTasks();

  return (
    <div>
      <button onClick={() => addTask('Hello')}>Add</button>
      <div>Total tasks: {tasks.length}</div>
    </div>
  );
}
```

## Notes
- Task data is persisted under a versioned localStorage key: `week3-task-manager:tasks:v1`.
- The app is intentionally small but structured like a real project.
