import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-post-details',
    templateUrl: './post-details.component.html',
    standalone: true,
    imports: [RouterLink],
})
export class PostDetailsComponent implements OnInit {
    post: any = null;

    constructor(private route: ActivatedRoute) { }

    ngOnInit(): void {
        // Simulating fetching post data (replace with actual service call)
        const dummyPost = {
            id: 1,
            title: 'How to Build a Blog with Angular',
            author: 'Daya Developer',
            createdAt: new Date(),
            image: 'https://via.placeholder.com/800x400.png?text=Post+Image',
            content: `Welcome to the blog post!

This is a sample blog post content that you can replace with actual dynamic data fetched by ID from your backend API.`
        };

        // Example: In real app, use route.params to get ID and fetch post
        this.post = dummyPost;
    }
}
