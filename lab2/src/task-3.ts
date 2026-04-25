export {};
 
type Status = "todo" | "in_progress" | "done" | "cancelled";
type Priority = "low" | "medium" | "high" | "critical";
interface Task {
  id: number; title: string; description: string;
  status: Status; priority: Priority;
  assignee: string | null; createdAt: Date; dueDate: Date | null;
}
 
class TaskManager {
  // # - захищає поля на рівні JS runtime, не тільки TS
  #tasks: Task[];
  #nextId: number = 1;
 
  constructor(initialTasks: Task[] = []) {
    this.#tasks = [...initialTasks];
    if (initialTasks.length)
      this.#nextId = Math.max(...initialTasks.map(t => t.id)) + 1;
  }
 
  // Генеруємо id та createdAt автоматично
  addTask(dto: Omit<Task, "id" | "createdAt">): Task {
    const task: Task = { ...dto, id: this.#nextId++, createdAt: new Date() };
    this.#tasks.push(task);
    return task;
  }
 
  updateTask(id: number, updates: Partial<Omit<Task, "id" | "createdAt">>): Task | null {
    const idx = this.#tasks.findIndex(t => t.id === id);
    if (idx === -1) return null;
    this.#tasks[idx] = { ...this.#tasks[idx], ...updates };
    return this.#tasks[idx];
  }
 
  deleteTask(id: number): boolean {
    const before = this.#tasks.length;
    this.#tasks = this.#tasks.filter(t => t.id !== id);
    return this.#tasks.length < before;
  }
 
  // Getter повертає копію щоб уникнути прямої мутації масиву ззовні
  get tasks(): Task[] { return [...this.#tasks]; }
  get count(): number { return this.#tasks.length; }
  getById(id: number): Task | undefined { return this.#tasks.find(t => t.id === id); }
}
 
// Розширений менеджер - наслідує TaskManager і додає фільтри
class FilteredTaskManager extends TaskManager {
  getByStatus(status: Status): Task[] {
    return this.tasks.filter(t => t.status === status);
  }
  getByPriority(priority: Priority): Task[] {
    return this.tasks.filter(t => t.priority === priority);
  }
  getByAssignee(assignee: string): Task[] {
    return this.tasks.filter(t => t.assignee === assignee);
  }
  getOverdue(): Task[] {
    const now = new Date();
    return this.tasks.filter(t =>
      t.dueDate && t.dueDate < now &&
      t.status !== "done" && t.status !== "cancelled"
    );
  }
}
 
console.log("=== Завдання 3: Класи та модифікатори доступу ===");
const manager = new FilteredTaskManager();
const t1 = manager.addTask({ title: "Розробити API", description: "REST API",
  status: "in_progress", priority: "high", assignee: "Іван",
  dueDate: new Date("2025-02-01") });
manager.addTask({ title: "Написати тести", description: "Unit",
  status: "todo", priority: "medium", assignee: null, dueDate: null });
manager.addTask({ title: "Деплой", description: "Prod",
  status: "done", priority: "critical", assignee: "Іван",
  dueDate: new Date("2025-01-20") });
manager.addTask({ title: "Прострочена задача", description: "",
  status: "in_progress", priority: "low", assignee: null,
  dueDate: new Date("2024-12-01") });
console.log("Додано:", t1);
console.log("Кількість:", manager.count);
console.log("In progress:", manager.getByStatus("in_progress"));
console.log("High priority:", manager.getByPriority("high"));
console.log("Прострочені:", manager.getOverdue());
