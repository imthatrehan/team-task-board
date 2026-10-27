# 🗂️ Team Task Board — Kanban with Drag & Drop

A Jira/Trello-style task board built with **React (Vite)**, **Redux Toolkit**, **Tailwind CSS**, and **HTML5 Drag & Drop API** (no external DnD library). Features feature-based architecture, custom hooks, error boundaries, and derived state selectors.

![Status](https://img.shields.io/badge/Status-Completed-success)
![Day](https://img.shields.io/badge/12--Week--Roadmap-Day%209-blue)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![Redux](https://img.shields.io/badge/Redux_Toolkit-2-764ABC?logo=redux)
![Tailwind](https://img.shields.io/badge/Tailwind-v4-38B2AC?logo=tailwind-css)

---

## 🌟 Features

### Kanban Board
- **3 Columns** — To Do, In Progress, Done
- **Drag & Drop** — HTML5 native API, no library
- **Visual Feedback** — Dragging card fades, column highlights on hover
- **Mobile Fallback** — `<select>` dropdown for status change (mobile drag nahi hota)
- **Search** — Live filter across all columns
- **Add Task** — Input + Enter key support
- **Edit Task** — Double-click on todo tasks, Enter to save, Escape to cancel
- **Toggle Complete** — Checkbox in each card
- **Delete Task** — Trash icon with hover reveal
- **Clear Completed** — Footer button, disabled when none
- **Task Counts** — Per column + footer remaining count
- **Empty State** — Drop hint when column is empty

### Architecture
- **Feature-based folders** — `features/tasks/` contains slice + components
- **Dumb UI components** — `components/ui/` has no Redux logic
- **Custom Hooks** — `useLocalStorage` for search persistence
- **Utility functions** — `formatDate`, `generateId`
- **Error Boundary** — Catches crashes, fallback UI with retry
- **Memoized Selectors** — `createSelector` for filtered tasks
- **Custom ID Generator** — `tsk_abc123` format (not `Date.now()`)

---

## 🧠 Concepts Practiced

| Concept | Where Used |
|---------|------------|
| **Feature-based structure** | `features/tasks/` — slice + components together |
| **Dumb components** | `Button`, `Input`, `EmptyState` — pure UI |
| **Custom Hooks** | `useLocalStorage` — search input persistence |
| **Redux `prepare` callback** | `addTask` — ID generation in slice |
| **`createSelector`** | `selectTasksTodo`, `selectTasksInProgress`, `selectTasksCompleted` |
| **HTML5 Drag & Drop** | `draggable`, `onDragStart`, `onDragOver`, `onDragLeave`, `onDrop`, `onDragEnd` |
| **Error Boundary** | Class component with `getDerivedStateFromError` |
| **Derived State** | Filtering in `Board`, not in `useState` |
| **Store Subscribe** | Manual Redux → localStorage persistence |
| **`Date.now()` vs UUID** | Custom `generateId()` with `tsk_` prefix |

---

## 🐛 Debugging Drills — Solutions

### Bug 1: Infinite Loop
```jsx
// ❌ Bug
useEffect(() => {
  setCount(tasks.length);
}, [tasks, count]); // count dependency creates loop

// ✅ Fix
useEffect(() => {
  setCount(tasks.length);
}, [tasks]); // only tasks
Root cause: setCount changes count → effect fires again → infinite loop.

Bug 2: dispatch().then() Error
jsx
// ❌ Bug
const result = dispatch(addTask(newTask));
result.then(() => setTitle("")); // dispatch doesn't return a Promise

// ✅ Fix
dispatch(addTask(newTask));
setTitle(""); // synchronous — just clear directly
Root cause: dispatch returns the action (synchronous), not a Promise. Only createAsyncThunk returns a Promise.

Bug 3: Stale State in Filter
jsx
// ❌ Bug — filteredTasks state becomes stale
const [filteredTasks, setFilteredTasks] = useState([]);
const handleFilter = (status) => {
  setFilteredTasks(tasks.filter(t => t.status === status));
};

// ✅ Fix — derived state via selector
const filteredTasks = useSelector((state) =>
  state.tasks.items.filter((t) => t.status === activeFilter)
);
Root cause: Copying Redux state into useState breaks reactivity — new tasks don't trigger re-filter. Derived state (compute during render) is the fix.

🛠️ Tech Stack
Framework: React 19 (Vite)

State: Redux Toolkit + React Redux

Styling: Tailwind CSS v4

Icons: Lucide React

Fonts: Libre Caslon Condensed + Quicksand (Google Fonts)

DnD: HTML5 native API (no library)

Persistence: localStorage (manual store subscribe + custom hook)

📂 Project Structure
text
team-task-board/
├── src/
│   ├── App.jsx
│   ├── App.css                          # Fonts + keyframes
│   ├── index.css                        # Tailwind imports
│   ├── main.jsx                         # Provider setup
│   ├── MainPage.jsx                     # Root page
│   ├── ErrorBoundary.jsx                # Class error boundary
│   ├── app/
│   │   └── store.js                     # configureStore + subscribe
│   ├── components/
│   │   ├── Header.jsx                   # Title + search
│   │   ├── Footer.jsx                   # Counts + clear completed
│   │   └── ui/
│   │       ├── AddTask.jsx              # Add input + button
│   │       ├── EmptyState.jsx           # Drop hint
│   │       └── Input.jsx                # Reusable input
│   ├── features/
│   │   └── tasks/
│   │       ├── tasksSlice.js            # Slice + selectors
│   │       └── components/
│   │           ├── Board.jsx            # 3-column layout
│   │           └── Column.jsx           # Single column + cards
│   ├── hooks/
│   │   └── useLocalStorage.js           # Search persistence
│   └── utils/
│       ├── formatDate.js                # "27 Oct"
│       ├── generateId.js                # "tsk_abc123"
│       └── storage.js                   # loadState helper
├── index.html
├── package.json
└── vite.config.js
🎨 Design Highlights
Brand: Team Task Board — clean Kanban layout

Color Palette: Sage green (#9DB89A) + off-white (#FEFDFB) + soft gray (#F1F1EF)

Typography: Libre Caslon Condensed (headings) + Quicksand (body)

Animations:

popIn — task add

fadeOut — task delete

Drag visual — scale-95 opacity-40

Drag Feedback:

Dragging card fades

Target column shows dashed border

Placeholder li at drop position

Responsive:

3 columns desktop

Stacked mobile + <select> for status

Touch-friendly tap targets

🚀 How to Run
bash
# Clone
git clone https://github.com/imthatrehan/team-task-board
cd team-task-board

# Install
npm install

# Dev server
npm run dev

# Build
npm run build
Open http://localhost:5173
# team-task-board
