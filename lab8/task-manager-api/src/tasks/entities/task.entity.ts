import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToMany, JoinTable,
} from 'typeorm';
import { Tag } from '../../tags/entities/tag.entity';

export type TaskStatus = 'pending' | 'in-progress' | 'done';
export type TaskPriority = 'low' | 'medium' | 'high';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ default: 'pending' })
  status: TaskStatus;

  @Column({ default: 'medium' })
  priority: TaskPriority;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToMany(() => Tag, { onDelete: 'CASCADE' })
  @JoinTable()
  tags: Tag[];
}
