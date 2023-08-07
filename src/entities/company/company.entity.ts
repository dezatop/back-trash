import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { User } from '@/entities/users/users.entity';
import { PostDraft } from '@/entities/draft-post/draft-post.entity';
import { Post } from '@/entities/post/post.entity';

@Entity('company')
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'companyName', type: 'varchar' })
  companyName: string;

  @Column({ name: 'companyAddress', type: 'varchar' })
  companyAddress: string;

  @Column({
    name: 'companyLogo',
    type: 'varchar',
    default: 'not-img.png',
    nullable: true,
  })
  companyLogo: string;

  @Column({ name: 'companyContacts', type: 'varchar' })
  companyContacts: string;

  @Column({
    name: 'rating',
    type: 'int',
    nullable: true,
    default: 0,
  })
  rating: string;

  @Column({ name: 'isActive', type: 'boolean', nullable: true, default: false })
  isActive: boolean;

  @ManyToOne(() => User, (user) => user.company, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => PostDraft, (postDraft) => postDraft.company, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  @JoinColumn({ name: 'postDraft_id' })
  postDraft: PostDraft;

  @OneToMany(() => Post, (post) => post.company, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  post: Post;
}

// @Column({ name: 'birthDate', type: 'timestamp', nullable: true })
// birthDate: Date;
//
// @Column({ name: 'gender', type: 'enum', enum: E_Gender, nullable: true })
// gender: E_Gender | null;
