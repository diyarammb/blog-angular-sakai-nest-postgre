import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';


@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    standalone: true,
    imports: [ButtonModule, RouterLink,
        FormsModule,
        InputTextModule,
        PasswordModule,
        ButtonModule,],
})
export class RegisterComponent {
    name: string = '';
    email: string = '';
    password: string = '';

    constructor(private authService: AuthService, private router: Router) { }

    onRegister() {
        if (this.name && this.email && this.password) {
            this.authService.register({
                name: this.name,
                email: this.email,
                password: this.password
            }).subscribe({
                next: (res) => {
                    console.log('Registration successful:', res);
                    alert('Registration successful!');
                    this.router.navigate(['/auth/login']);
                },
                error: (err) => {
                    console.error(' Registration failed:', err);
                    alert(err?.error?.message || 'Registration failed. Try again.');
                }
            });
        } else {
            alert('Please fill in all fields');
        }
    }

}
