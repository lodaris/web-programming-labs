import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { Tag } from '../tags/entities/tag.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly tasksRepository: Repository<Task>,
    @InjectRepository(Tag)
    private readonly tagsRepository: Repository<Tag>,
  ) {}

  findAll(): Promise<Task[]> {
    return this.tasksRepository.find({ relations: { tags: true } });
  }

  findByStatus(status?: string): Promise<Task[]> {
    if (!status) return this.findAll();
    return this.tasksRepository.find({ where: { status: status as any }, relations: { tags: true } });
  }

  findOne(id: number): Promise<Task | null> {
    return this.tasksRepository.findOne({ where: { id }, relations: { tags: true } });
  }

  async create(dto: CreateTaskDto): Promise<Task> {
    const task = this.tasksRepository.create({
      title: dto.title,
      description: dto.description ?? null,
      priority: dto.priority,
    });
    if (dto.tagIds && dto.tagIds.length > 0) {
      task.tags = await this.tagsRepository.findByIds(dto.tagIds);
    } else {
      task.tags = [];
    }
    return this.tasksRepository.save(task);
  }

  async update(id: number, dto: UpdateTaskDto): Promise<Task | null> {
    const task = await this.findOne(id);
    if (!task) return null;
    Object.assign(task, dto);
    return this.tasksRepository.save(task);
  }

  async remove(id: number): Promise<boolean> {
    const task = await this.findOne(id);
    if (!task) return false;
    await this.tasksRepository.remove(task);
    return true;
  }
}
