import { configureStore } from '@reduxjs/toolkit'
import tasks from "../features/tasks/tasksSlice";

export const store = configureStore({ reducer: { tasks } })
store.subscribe(() => {
  const state = store.getState()
  localStorage.setItem('tasks', JSON.stringify(state.tasks.items))
})
