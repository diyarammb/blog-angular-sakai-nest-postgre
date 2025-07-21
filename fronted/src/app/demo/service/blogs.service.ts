import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BlogPost } from '../api/blog-post.model';

@Injectable({ providedIn: 'root' })
export class BlogsService {
    private apiUrl = 'http://localhost:3000/posts';

    constructor(private http: HttpClient) { }

    getPosts(page: number = 1): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/user/post?page=${page}`);
    }


    getMyPosts(): Observable<BlogPost[]> {
        return this.http.get<BlogPost[]>(`${this.apiUrl}/user/post`);
    }


    getPostById(id: string): Observable<BlogPost> {
        return this.http.get<BlogPost>(`${this.apiUrl}/${id}`);
    }

    createPost(post: BlogPost): Observable<BlogPost> {
        return this.http.post<BlogPost>(this.apiUrl, post);
    }

    updatePost(id: string, post: BlogPost): Observable<BlogPost> {
        return this.http.put<BlogPost>(`${this.apiUrl}/${id}`, post);
    }

    deletePost(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
