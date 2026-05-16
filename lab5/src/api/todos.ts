import type { Todo, CreateTodoDto, UpdateTodoDto } from "../types/todo";

const BASE = "http://localhost:3001";

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(BASE + url, options);
  if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
  return res.json();
}

export const todosApi = {
  getAll: () => request<Todo[]>("/todos"),

  create: (dto: CreateTodoDto) =>
    request<Todo>("/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dto),
    }),

  update: (id: number, dto: UpdateTodoDto) =>
    request<Todo>(`/todos/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dto),
    }),

  remove: (id: number) =>
    request<void>(`/todos/${id}`, { method: "DELETE" }),
};
