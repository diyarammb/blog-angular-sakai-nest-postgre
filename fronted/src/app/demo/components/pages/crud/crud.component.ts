import { Component, OnInit } from '@angular/core';
import { MessageService, SharedModule } from 'primeng/api';
import { Table, TableModule } from 'primeng/table';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { ToastModule } from 'primeng/toast';
import { NgIf, NgClass } from '@angular/common';
import { BlogsService } from 'src/app/demo/service/blogs.service';
import { forkJoin } from 'rxjs';
import { BlogPost } from 'src/app/demo/api/blog-post.model';




@Component({
    templateUrl: './crud.component.html',
    providers: [MessageService],
    standalone: true,
    imports: [
        ToastModule,
        ToolbarModule,
        SharedModule,
        ButtonModule,
        TableModule,
        DialogModule,
        InputTextModule,
        InputTextareaModule,
        FormsModule,
        NgIf,
        NgClass
    ]
})
export class CrudComponent implements OnInit {
    postDialog = false;
    deletePostDialog = false;
    deletePostsDialog = false;

    posts: BlogPost[] = [];
    post: BlogPost = {};
    selectedPosts: BlogPost[] = [];
    submitted = false;
    cols: any[] = [];
    rowsPerPageOptions = [5, 10, 20];

    constructor(private blogService: BlogsService, private messageService: MessageService) { }

    ngOnInit() {
        this.loadPosts();
        this.cols = [
            { field: 'id', header: 'ID' },
            { field: 'title', header: 'Title' },
            { field: 'author', header: 'Author' },
            { field: 'createdAt', header: 'Published Date' }
        ];
    }

    loadPosts() {
        this.blogService.getMyPosts().subscribe({
            next: (data) => {
                this.posts = data.map(post => ({
                    ...post,
                    createdAt: post.createdAt
                }));
            },
            error: (err) => {
                console.error('Failed to load posts:', err);
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to load blog posts.' });
            }
        });
    }

    openNew() {
        this.post = {};
        this.submitted = false;
        this.postDialog = true;
    }

    editPost(post: BlogPost) {
        this.post = { ...post };
        console.log('Editing post:', this.post);
        this.postDialog = true;
    }

    deletePost(post: BlogPost) {
        this.post = post;
        this.deletePostDialog = true;
    }

    deleteSelectedPosts() {
        this.deletePostsDialog = true;
    }

    savePost() {
        this.submitted = true;

        if (this.post.title?.trim()) {
            if (this.post.id) {
                this.blogService.updatePost(this.post.id, this.post).subscribe(() => {
                    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Post Updated', life: 3000 });
                    this.loadPosts();
                });
            } else {
                this.blogService.createPost(this.post).subscribe(() => {
                    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Post Created', life: 3000 });
                    this.loadPosts();
                });
            }

            this.postDialog = false;
            this.post = {};
        }
    }

    hideDialog() {
        this.postDialog = false;
        this.submitted = false;
    }

    confirmDelete() {
        if (this.post.id) {
            this.blogService.deletePost(this.post.id).subscribe(() => {
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Post Deleted', life: 3000 });
                this.loadPosts();
            });
        }

        this.deletePostDialog = false;
        this.post = {};
    }

    confirmDeleteSelected() {
        const deleteObservables = this.selectedPosts.map(p => this.blogService.deletePost(p.id!));
        forkJoin(deleteObservables).subscribe(() => {
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Posts Deleted', life: 3000 });
            this.selectedPosts = [];
            this.deletePostsDialog = false;
            this.loadPosts();
        });
    }

    onGlobalFilter(table: Table, event: Event) {
        const input = (event.target as HTMLInputElement).value;
        table.filterGlobal(input, 'contains');
    }
}
