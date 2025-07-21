// blog.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Blog } from 'src/model/blog.entity';
import { Repository } from 'typeorm';
import { User } from 'src/model/user.entity';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Blog)
    private blogRepo: Repository<Blog>,

    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) { }

  async create(data: Partial<Blog>, userId: number) {
    const user = await this.userRepo.findOneBy({ id: userId });
    if (!user) throw new NotFoundException('User not found');

    const blog = this.blogRepo.create({
      ...data,
      user: user,
    });

    return this.blogRepo.save(blog);
  }

  findAll() {
    return this.blogRepo.find({ relations: ['user'] });
  }

  async findOne(id: number) {
    const blog = await this.blogRepo.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!blog) throw new NotFoundException('Blog not found');
    return blog;
  }

  async update(id: number, data: Partial<Blog>) {
    await this.findOne(id);
    await this.blogRepo.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.blogRepo.delete(id);
  }

  findByUser(userId: number): Promise<Blog[]> {
    return this.blogRepo.find({
      where: { user: { id: userId } },
      relations: ['user'],
    });
  }

}
