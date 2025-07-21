import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Blog } from './blog.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Blog, (blog) => blog.user)
  blogs: Blog[];
}
