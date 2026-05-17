import { Injectable } from "@nestjs/common";
import type { Task } from "./entities/task.entity";
import type { CreateTaskDto } from "./dto/create-task.dto";
import type { UpdateTaskDto } from "./dto/update-task.dto";

@Injectable()
export class TasksService {
  private tasks: Task[] = [
    {
      id: "1",
      title: "Розробити макет головної сторінки",
      description: "Wireframe та hi-fi макет у Figma для Landing Page",
      status: "done",
      priority: "high",
      createdAt: "2025-03-12T10:00:00.000Z",
    },
    {
      id: "2",
      title: "Підібрати кольорову палітру бренду",
      description: "Основний, акцентний та нейтральні кольори з урахуванням WCAG AA",
      status: "in-progress",
      priority: "medium",
      createdAt: "2025-03-20T10:00:00.000Z",
    },
    {
      id: "3",
      title: "Спроєктувати мобільну версію",
      description: "Адаптувати всі екрани під breakpoint 375px",
      status: "pending",
      priority: "high",
      createdAt: "2025-04-05T10:00:00.000Z",
    },
    {
      id: "4",
      title: "Налаштувати шрифтову пару",
      description: "Заголовковий та текстовий шрифти, типографічна шкала",
      status: "pending",
      priority: "low",
      createdAt: "2025-04-10T10:00:00.000Z",
    },
  ];

  findAll(): Task[] {
    return this.tasks;
  }

  findByStatus(status?: string): Task[] {
    if (!status) return this.tasks;
    return this.tasks.filter((t) => t.status === status);
  }

  findOne(id: string): Task | null {
    return this.tasks.find((t) => t.id === id) ?? null;
  }

  create(dto: CreateTaskDto): Task {
    const task: Task = {
      id: Date.now().toString(),
      title: dto.title,
      description: dto.description ?? "",
      status: "pending",
      priority: dto.priority,
      createdAt: new Date().toISOString(),
    };
    this.tasks.push(task);
    return task;
  }

  update(id: string, dto: UpdateTaskDto): Task | null {
    const task = this.findOne(id);
    if (!task) return null;
    Object.assign(task, dto);
    return task;
  }

  remove(id: string): boolean {
    const index = this.tasks.findIndex((t) => t.id === id);
    if (index === -1) return false;
    this.tasks.splice(index, 1);
    return true;
  }
}
