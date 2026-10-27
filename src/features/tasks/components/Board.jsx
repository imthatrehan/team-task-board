import Column from './Column'
import { useSelector } from 'react-redux'
import {
  selectTasksCompleted,
  selectTasksInProgress,
  selectTasksTodo,
} from '../tasksSlice'

function Board({ searchInput }) {
  const todoTasks = useSelector(selectTasksTodo)
  const inProgressTasks = useSelector(selectTasksInProgress)
  const completedTasks = useSelector(selectTasksCompleted)

  const filterTasks = (tasks) =>
    tasks.filter((t) =>
      t.title.toLowerCase().includes(searchInput.toLowerCase().trim()),
    )

  const columns = [
    {
      key: 'todo',
      title: 'To Do',
      dot: 'bg-stone-400',
      cards: filterTasks(todoTasks),
    },
    {
      key: 'in-progress',
      title: 'In Progress',
      dot: 'bg-amber-400',
      cards: filterTasks(inProgressTasks),
    },
    {
      key: 'done',
      title: 'Done',
      dot: 'bg-[#8AA787]',
      cards: filterTasks(completedTasks),
    },
  ]

  return (
    <div className="grid gap-4 border-t border-gray-200 bg-[#F7F6F2] p-4 sm:p-6 md:grid-cols-3">
      <Column columns={columns} />
    </div>
  )
}

export default Board