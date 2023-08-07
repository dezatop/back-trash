import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Company } from '@/entities/company/company.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'firstName', type: 'varchar' })
  firstName: string;

  @Column({ name: 'lastName', type: 'varchar' })
  lastName: string;

  @Column({ name: 'email', type: 'varchar' })
  email: string;

  @Column({ name: 'password', type: 'varchar' })
  password: string;

  @Column({ name: 'photo', type: 'varchar', nullable: true })
  photo: string;

  @OneToMany(() => Company, (company) => company.user, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  company: Company[];
}

// @Column({ name: 'birthDate', type: 'timestamp', nullable: true })
// birthDate: Date;
//
// @Column({ name: 'gender', type: 'enum', enum: E_Gender, nullable: true })
// gender: E_Gender | null;
