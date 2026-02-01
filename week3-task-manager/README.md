# Week 3 Task Manager (State Management + Hooks)
Mini React app for the Week 3 internship task: demonstrates state management, side effects, Context API, and custom hooks.

## Features
- Add / edit / delete tasks
- Toggle completed
- Filter (all / active / completed) + search
- Derived stats (remaining / completed / total)
- Persist tasks to `localStorage`

## State management overview
- Global task state: Context API (`src/context/TasksContext.tsx`) backed by a custom hook + reducer (`src/hooks/useTasksStore.ts`)
- Local UI state: filter + search in `src/App.tsx`

See `DOCUMENTATION.md` for the full architecture + hook explanation.

## Run locally
```bash
cd week3-task-manager
npm install
npm run dev
```

## Build + preview
```bash
npm run build
npm run preview
```
