import type { Task } from "../types/task";

export const INITIAL_TASKS: Task[] = [
  {
    id: "task-11-1",
    title: "Розробити макет головної сторінки",
    description: "Створити wireframe та hi-fi макет у Figma для Landing Page",
    status: "done",
    priority: "high",
    createdAt: new Date("2025-03-12"),
  },
  {
    id: "task-11-2",
    title: "Підібрати кольорову палітру бренду",
    description: "Обрати основний, акцентний та нейтральні кольори з урахуванням WCAG AA",
    status: "in-progress",
    priority: "medium",
    createdAt: new Date("2025-03-20"),
  },
  {
    id: "task-11-3",
    title: "Налаштувати шрифтову пару",
    description: "Вибрати заголовковий та текстовий шрифти, налаштувати типографічну шкалу",
    status: "todo",
    priority: "low",
    createdAt: new Date("2025-04-01"),
  },
  {
    id: "task-11-4",
    title: "Спроєктувати мобільну версію інтерфейсу",
    description: "Адаптувати всі екрани під breakpoint 375px, перевірити touch-зони",
    status: "in-progress",
    priority: "high",
    createdAt: new Date("2025-04-05"),
  },
  {
    id: "task-11-5",
    title: "Провести UX-аудит конкурентів",
    description: "Проаналізувати 3 сайти конкурентів за критеріями навігації та читабельності",
    status: "todo",
    priority: "medium",
    createdAt: new Date("2025-04-10"),
  },
];
