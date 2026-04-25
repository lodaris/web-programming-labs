import { VARIANT } from "./config";
 
type Status = "todo" | "in_progress" | "done" | "cancelled";
type Priority = "low" | "medium" | "high" | "critical";
 
interface Task {
  id: number; title: string; description: string;
  status: Status; priority: Priority;
  assignee: string | null; createdAt: Date; dueDate: Date | null;
}
 
// 2.1. Generic-інтерфейс: T - тип даних, що повертаються у відповіді
interface ApiResponse<T> {
  data: T; status: number; message: string; timestamp: Date;
}
 
function createSuccessResponse<T>(data: T): ApiResponse<T> {
  return { data, status: 200, message: "OK", timestamp: new Date() };
}
 
function createErrorResponse<T>(message: string): ApiResponse<T | null> {
  return { data: null, status: 500, message, timestamp: new Date() };
}
 
// 2.2. Omit прибирає поля що генеруються автоматично,
// Partial робить решту необов'язковими для оновлення
type CreateTaskDto = Omit<Task, "id" | "createdAt">;
type UpdateTaskDto = Partial<Omit<Task, "id" | "createdAt">>;
 
// 2.3. K extends keyof Task гарантує, що key існує в Task
function filterTasks<K extends keyof Task>(
  tasks: Task[], key: K, value: Task[K]
): Task[] {
  return tasks.filter(t => t[key] === value);
}
 
const tasks: Task[] = [
  { id: 1 + VARIANT, title: "Розробити API", description: "REST API",
    status: "in_progress", priority: "high", assignee: "Іван Петренко",
    createdAt: new Date("2025-01-10"), dueDate: new Date("2025-02-01") },
  { id: 2 + VARIANT, title: "Написати тести", description: "Unit-тести",
    status: "todo", priority: "medium", assignee: null,
    createdAt: new Date("2025-01-12"), dueDate: new Date("2025-02-15") },
  { id: 3 + VARIANT, title: "Налаштувати БД", description: "PostgreSQL",
    status: "done", priority: "critical", assignee: "Олена Коваль",
    createdAt: new Date("2025-01-05"), dueDate: new Date("2025-01-20") },
  { id: 4 + VARIANT, title: "Оновити документацію", description: "Swagger",
    status: "todo", priority: "low", assignee: null,
    createdAt: new Date("2025-01-15"), dueDate: null },
  { id: 5 + VARIANT, title: "Code review", description: "PR від команди",
    status: "cancelled", priority: "medium", assignee: "Андрій Лисенко",
    createdAt: new Date("2025-01-18"), dueDate: new Date("2025-01-25") },
];
 
console.log("=== Завдання 2: Generics та Utility Types ===");
console.log("Варіант:", VARIANT);
console.log("Success:", createSuccessResponse(tasks[0]));
console.log("Error:", createErrorResponse("Not found"));
console.log("Фільтр high:", filterTasks(tasks, "priority", "high"));
