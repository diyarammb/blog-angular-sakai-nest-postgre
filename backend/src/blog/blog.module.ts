import { Module } from '@nestjs/common';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Blog } from 'src/model/blog.entity';
import { User } from 'src/model/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Blog,User])],
  controllers: [BlogController],
  providers: [BlogService],
  exports: [BlogService],

})
export class BlogModule { }
