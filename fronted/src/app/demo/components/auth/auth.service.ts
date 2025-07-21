import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';


@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = 'http://localhost:3000/auth';

    constructor(private http: HttpClient, private router: Router) { }

    register(payload: { name: string; email: string; password: string }) {
        return this.http.post(`${this.apiUrl}/register`, payload);
    }

    login(credentials: { email: string; password: string }) {
        return this.http.post<{ jwtToken: string; user: any }>(`${this.apiUrl}/login`, credentials)
            .pipe(
                map((res) => {
                    localStorage.setItem('token', res.jwtToken);
                    console.log('Token stored in localStorage:', res);
                    localStorage.setItem('user', JSON.stringify(res.user));
                    return res;
                })
            );
    }


    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.router.navigate(['/auth/login']);
    }


    isAuthenticated(): boolean {
        const token = this.getToken();
        if (!token) return false;

        try {
            const decoded: { exp: number } = jwtDecode(token);
            return Date.now() < decoded.exp * 1000;
        } catch (e) {
            return false;
        }
    }
    isLoggedIn(): boolean {
        const token = localStorage.getItem('token');
        return !!token;
    }

    getToken(): string | null {
        return localStorage.getItem('token');
    }
    getUser(): any | null {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    }
}

