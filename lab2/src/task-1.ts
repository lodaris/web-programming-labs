export {};
 
// Допустимі статуси задачі (union type)
type Status = "todo" | "in_progress" | "done" | "cancelled";
 
// Рівень пріоритету
type Priority = "low" | "medium" | "high" | "critical";
 
// Інтерфейс задачі
interface Task {
  id: number;
  title: string;
  description: string;
  status: Status;
  priority: Priority;
  assignee: string | null;
  createdAt: Date;
  dueDate: Date | null;
}
 
interface HasId { id: number; }
 
interface Project extends HasId {
  name: string;
  description: string;
  tasks: Task[];
  ownerId: number;
}
 
// 1.5. Рахуємо загалом, по статусах і прострочені
function getTaskStats(tasks: Task[]) {
  const now = new Date();
  const byStatus: Record<Status, number> = {
    todo: 0, in_progress: 0, done: 0, cancelled: 0
  };
  let overdue = 0;
  for (const t of tasks) {
    byStatus[t.status]++;
    if (t.dueDate && t.dueDate < now &&
        t.status !== "done" && t.status !== "cancelled") {
      overdue++;
    }
  }
  return { total: tasks.length, byStatus, overdue };
}
 
// 1.6. Форматуємо задачу в зручний рядок
function formatTask(task: Task): string {
  return `[#${task.id}] ${task.title} (${task.priority}, ${task.status})`;
}
 
const tasks: Task[] = [
  { id: 1, title: "Налаштувати CI/CD", description: "",
    status: "in_progress", priority: "high", assignee: "Іван",
    createdAt: new Date("2025-01-01"), dueDate: new Date("2025-01-10") },
  { id: 2, title: "Написати тести", description: "",
    status: "todo", priority: "medium", assignee: null,
    createdAt: new Date("2025-01-05"), dueDate: new Date("2025-03-01") },
  { id: 3, title: "Деплой", description: "",
    status: "done", priority: "critical", assignee: "Олена",
    createdAt: new Date("2025-01-08"), dueDate: new Date("2025-01-20") },
  { id: 4, title: "Документація", description: "",
    status: "cancelled", priority: "low", assignee: null,
    createdAt: new Date("2025-01-10"), dueDate: null },
  { id: 5, title: "Code review", description: "",
    status: "todo", priority: "high", assignee: "Андрій",
    createdAt: new Date("2025-01-12"), dueDate: new Date("2025-01-15") },
];
 
console.log("=== Завдання 1: Базові типи, інтерфейси та type aliases ===");
tasks.forEach(t => console.log(formatTask(t)));
console.log("Статистика:", getTaskStats(tasks));
