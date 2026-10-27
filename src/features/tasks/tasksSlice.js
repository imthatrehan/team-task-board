import { createSelector, createSlice } from '@reduxjs/toolkit'
import loadState from '../../utils/storage'
import generateId from '../../utils/generateId'

const initialState = {
  items: loadState('tasks', []),
}

const slice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: {
      prepare(title) {
        return {
          payload: {
            id: generateId(),
            title,
            createdAt: Date.now(),
            status: 'todo',
          },
        }
      },
      reducer(state, action) {
        state.items.unshift(action.payload)
      },
    },
    deleteTask(state, action) {
      state.items = state.items.filter((f) => f.id !== action.payload)
    },
    toggleComplete(state, action) {
      const match = state.items.find((f) => f.id === action.payload)
      match.status = match.status === 'done' ? 'todo' : 'done'
    },
    updateTask(state, action) {
      const { id, title } = action.payload
      const match = state.items.find((f) => f.id === id)
      if (!match) return
      if (match.title === title) {
        return
      } else match.title = title
    },
    moveTask(state, action) {
      const { id, status } = action.payload
      const match = state.items.find((f) => f.id === id)
      if (!match) return
      if (match) {
        match.status = status
      }
    },
    clearCompleted(state) {
      state.items = state.items.filter((c) => c.status !== 'done')
    },
  },
})

export const selectTasks = (state) => state.tasks.items
export const selectTasksCount = (state) => state.tasks.items.length
export const selectTasksTodo = createSelector([selectTasks], (items) =>
  items.filter((t) => t.status === 'todo'),
)
export const selectTasksInProgress = createSelector([selectTasks], (items) =>
  items.filter((t) => t.status === 'in-progress'),
)
export const selectTasksCompleted = createSelector([selectTasks], (items) =>
  items.filter((t) => t.status === 'done'),
)
export const selectTasksCompletedCount = (state) =>
  state.tasks.items.filter((c) => c.status === 'done').length
export const selectTasksRemainingCount = (state) =>
  state.tasks.items.filter((c) => c.status !== 'done').length

export const {
  addTask,
  deleteTask,
  toggleComplete,
  updateTask,
  moveTask,
  clearCompleted,
} = slice.actions

export default slice.reducer
