import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Query,
} from "@nestjs/common";
import type { Task } from "./entities/task.entity";
import { CreateTaskDto } from "./dto/create-task.dto";

@Controller("tasks")
export class TasksController {
  private tasks: Task[] = [
    {
      id: "1",
      title: "Розробити макет головної сторінки",
      description: "Wireframe та hi-fi макет у Figma",
      status: "done",
      priority: "high",
      createdAt: "2025-03-12T10:00:00.000Z",
    },
    {
      id: "2",
      title: "Підібрати кольорову палітру",
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

  @Get()
  findAll(): Task[] {
    return this.tasks;
  }

  @Get("search")
  findByStatus(@Query("status") status?: string): Task[] {
    if (!status) return this.tasks;
    return this.tasks.filter((t) => t.status === status);
  }

  @Get(":id")
  findOne(@Param("id") id: string): Task | { message: string } {
    const task = this.tasks.find((t) => t.id === id);
    if (!task) return { message: `Task with id ${id} not found` };
    return task;
  }

  @Post()
  create(@Body() dto: CreateTaskDto): Task {
    const newTask: Task = {
      id: Date.now().toString(),
      title: dto.title,
      description: dto.description ?? "",
      status: "pending",
      priority: dto.priority,
      createdAt: new Date().toISOString(),
    };
    this.tasks.push(newTask);
    return newTask;
  }

  @Delete(":id")
  remove(@Param("id") id: string): { message: string } {
    const index = this.tasks.findIndex((t) => t.id === id);
    if (index === -1) return { message: `Task with id ${id} not found` };
    this.tasks.splice(index, 1);
    return { message: `Task ${id} deleted successfully` };
  }
}
