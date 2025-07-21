import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { StyleClassModule } from 'primeng/styleclass';
import { BlogPost } from '../../api/blog-post.model';
import { BlogsService } from '../../service/blogs.service';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html',
    standalone: true,
    providers: [MessageService],
    imports: [StyleClassModule, ButtonModule, DividerModule, CommonModule]
})
export class LandingComponent {
    isLoggedIn = false;
    user: any = null;
    posts: BlogPost[] = [];
    pagedPosts: BlogPost[] = [];
    currentPage = 1;
    pageSize = 5;
    totalPages = 0;

    constructor(public layoutService: LayoutService, public router: Router, private blogService: BlogsService, private messageService: MessageService) {
    }

    ngOnInit(): void {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                this.user = JSON.parse(storedUser);
                this.isLoggedIn = !!this.user;
                console.log('User data loaded from localStorage:', this.user);
            } catch (e) {
                console.error('Invalid user data in localStorage');
            }
        }
        this.loadPosts();

    }
    loadPosts() {
        this.blogService.getMyPosts().subscribe({
            next: (data) => {
                this.posts = data.map(post => ({
                    ...post,
                    createdAt: post.createdAt
                }));
                this.totalPages = Math.ceil(this.posts.length / this.pageSize);
                this.updatePagedPosts();
            },
            error: (err) => {
                console.error('Failed to load posts:', err);
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to load blog posts.' });
            }
        });
    }

    updatePagedPosts() {
        const startIndex = (this.currentPage - 1) * this.pageSize;
        const endIndex = startIndex + this.pageSize;
        this.pagedPosts = this.posts.slice(startIndex, endIndex);
    }

    changePage(page: number) {
        if (page >= 1 && page <= this.totalPages) {
            this.currentPage = page;
            this.updatePagedPosts();
        }
    }

    logout(): void {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.isLoggedIn = false;
        this.user = null;
        this.router.navigate(['/auth/login']);
    }




}
