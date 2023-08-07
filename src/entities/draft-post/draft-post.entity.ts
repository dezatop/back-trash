import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

import { Company } from '@/entities/company/company.entity';

@Entity('draft-post')
export class PostDraft {
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

// @Column({ name: 'birthDate', type: 'timestamp', nullable: true })
// birthDate: Date;
//
// @Column({ name: 'gender', type: 'enum', enum: E_Gender, nullable: true })
// gender: E_Gender | null;
