import { createContext, useContext, useReducer, type ReactNode } from "react";
import type { Task } from "../types/task";
import { INITIAL_TASKS } from "../data/initialTasks";

type Action =
  | { type: "ADD"; payload: Task }
  | { type: "DELETE"; payload: string }
  | { type: "UPDATE"; payload: Task };

function tasksReducer(state: Task[], action: Action): Task[] {
  switch (action.type) {
    case "ADD":
      return [...state, action.payload];
    case "DELETE":
      return state.filter((t) => t.id !== action.payload);
    case "UPDATE":
      return state.map((t) => (t.id === action.payload.id ? action.payload : t));
    default:
      return state;
  }
}

interface TasksContextValue {
  tasks: Task[];
  dispatch: React.Dispatch<Action>;
}

const TasksContext = createContext<TasksContextValue | null>(null);

export function TasksProvider({ children }: { children: ReactNode }) {
  const [tasks, dispatch] = useReducer(tasksReducer, INITIAL_TASKS);
  return (
    <TasksContext.Provider value={{ tasks, dispatch }}>
      {children}
    </TasksContext.Provider>
  );
}

export function useTasks() {
  const ctx = useContext(TasksContext);
  if (!ctx) throw new Error("useTasks must be used within TasksProvider");
  return ctx;
}
