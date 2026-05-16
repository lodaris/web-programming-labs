import { useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { todosApi } from "./api/todos"

export default function App() {
  const queryClient = useQueryClient()
  const [title, setTitle] = useState("")

  const { data: todos, isLoading, isError, error } = useQuery({
    queryKey: ["todos"],
    queryFn: todosApi.getAll,
  })

  const addMutation = useMutation({
    mutationFn: (newTitle: string) =>
      todosApi.create({ title: newTitle, completed: false }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] })
      setTitle("")
    },
  })

  const toggleMutation = useMutation({
    mutationFn: ({ id, completed }: { id: number; completed: boolean }) =>
      todosApi.update(id, { completed }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  })

  const deleteMutation = useMutation({
    mutationFn: (id: number) => todosApi.remove(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  })

  if (isLoading) return <p>Завантаження...</p>
  if (isError) return <p>Помилка: {(error as Error).message}</p>

  return (
    <div style={{ maxWidth: 600, margin: "2rem auto", fontFamily: "sans-serif" }}>
      <h1>Todo List</h1>

      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem" }}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Нове завдання..."
          style={{ flex: 1, padding: "0.4rem 0.75rem", fontSize: "1rem" }}
        />
        <button
          onClick={() => title.trim() && addMutation.mutate(title.trim())}
          disabled={addMutation.isPending}
        >
          {addMutation.isPending ? "Додавання..." : "Додати"}
        </button>
      </div>

      <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        {todos?.map((todo) => (
          <li key={todo.id} style={{ display: "flex", alignItems: "center", gap: "0.75rem",
            padding: "0.5rem 0.75rem", border: "1px solid #e2e8f0", borderRadius: 6 }}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() =>
                toggleMutation.mutate({ id: todo.id, completed: !todo.completed })
              }
            />
            <span style={{ flex: 1,
              textDecoration: todo.completed ? "line-through" : "none",
              color: todo.completed ? "#94a3b8" : "#1e293b" }}>
              {todo.title}
            </span>
            <button
              onClick={() => deleteMutation.mutate(todo.id)}
              style={{ background: "#fee2e2", color: "#dc2626", border: "none",
                borderRadius: 4, padding: "0.25rem 0.6rem", cursor: "pointer" }}
            >
              Видалити
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
