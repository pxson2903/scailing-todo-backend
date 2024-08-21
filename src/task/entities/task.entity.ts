import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { UserEntity } from 'src/auth/entities/auth.entity';

@Entity('tasks')
export class TaskEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  createdBy: number;

  @Column({ default: false })
  completed: boolean;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'createdBy' })
  user: UserEntity;
}
