export {};
 
type Status = "todo" | "in_progress" | "done" | "cancelled";
type Priority = "low" | "medium" | "high" | "critical";
interface Task {
  id: number; title: string; description: string;
  status: Status; priority: Priority;
  assignee: string | null; createdAt: Date; dueDate: Date | null;
}
 
// 5.1. Discriminated union - status є ключем розрізнення типів
type LoadingState = { status: "loading" };
type SuccessState<T> = { status: "success"; data: T; loadedAt: Date };
type ErrorState = { status: "error"; message: string; code: number };
type FetchState<T> = LoadingState | SuccessState<T> | ErrorState;
 
// 5.2. Type guards: value is Type - TypeScript звужує тип у відповідній гілці
function isLoadingState(s: FetchState<unknown>): s is LoadingState {
  return s.status === "loading";
}
function isSuccessState<T>(s: FetchState<T>): s is SuccessState<T> {
  return s.status === "success";
}
function isErrorState(s: FetchState<unknown>): s is ErrorState {
  return s.status === "error";
}
 
// 5.3. renderState: різний вивід залежно від стану
function renderState<T>(
  state: FetchState<T>, renderData: (data: T) => string
): string {
  if (isLoadingState(state)) return "Завантаження...";
  if (isSuccessState(state))
    return `Завантажено о ${state.loadedAt.toLocaleTimeString()}: ${renderData(state.data)}`;
  if (isErrorState(state))
    return `Помилка ${state.code}: ${state.message}`;
  return "";
}
 
// 5.4. processValue: typeof звужує тип примітива в кожній гілці
function processValue(value: string | number | boolean | null | undefined): string {
  if (value === null || value === undefined) return "(порожнє значення)";
  if (typeof value === "string") return `Рядок: '${value}' (${value.length} символів)`;
  if (typeof value === "number") return `Число: ${value} (${value % 2 === 0 ? 'парне' : 'непарне'})`;
  if (typeof value === "boolean") return `Булеве: ${value ? 'так' : 'ні'}`;
  return "";
}
 
// 5.5. Exhaustive check - якщо додати новий Status і не обробити,
// TypeScript підкаже помилку в default-гілці через never
function getStatusLabel(status: Status): string {
  switch (status) {
    case "todo":        return "Не розпочато";
    case "in_progress": return "У роботі";
    case "done":        return "Виконано";
    case "cancelled":   return "Скасовано";
    default: const _exhaustive: never = status; return _exhaustive;
  }
}
 
console.log("=== Завдання 5: Type Guards та звуження типів ===");
const states: FetchState<Task[]>[] = [
  { status: "loading" },
  { status: "success", data: [], loadedAt: new Date() },
  { status: "error", message: "Not found", code: 404 },
];
states.forEach(s => console.log(renderState(s, tasks => `${tasks.length} задач`)));
 
const values = ["TypeScript", 42, true, null, undefined, 0, ""];
values.forEach(v => console.log(processValue(v as any)));
 
const statuses: Status[] = ["todo", "in_progress", "done", "cancelled"];
console.log("Мітки статусів:", statuses.map(getStatusLabel));
