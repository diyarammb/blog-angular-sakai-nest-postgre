import {
    Controller, Get, Post, Body, Param,
    Delete, Put, UseGuards, Req
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { Blog } from 'src/model/blog.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request } from 'express';

@UseGuards(JwtAuthGuard)
@Controller('posts')
export class BlogController {
    constructor(private readonly blogService: BlogService) { }

    @Post()
    create(@Body() data: Partial<Blog>, @Req() req: Request & { user: any }) {
        const userId = req.user.userId;
        console.log('Logged-in user ID:', userId);
        return this.blogService.create(data, userId);
    }

    @Get()
    findAll() {
        return this.blogService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.blogService.findOne(+id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() data: Partial<Blog>) {
        return this.blogService.update(+id, data);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.blogService.remove(+id);
    }

    @Get('user/post')
    findAllByUser(@Req() req) {
        const userId = req.user.userId;
        return this.blogService.findByUser(userId);
    }

}
