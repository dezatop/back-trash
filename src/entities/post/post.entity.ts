import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

import { Company } from '@/entities/company/company.entity';

@Entity('post')
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'title', type: 'varchar' })
  title: string;

  @Column({ name: 'description', type: 'varchar' })
  description: string;

  @ManyToOne(() => Company, (company) => company.postDraft, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  @JoinColumn({ name: 'company_id' })
  company: Company;
}
