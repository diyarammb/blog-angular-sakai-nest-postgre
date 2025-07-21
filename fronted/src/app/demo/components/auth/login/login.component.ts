import { Component } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `],
    standalone: true,
    imports: [InputTextModule, PasswordModule, FormsModule, CheckboxModule, ButtonModule, RouterLink]
})
// export class LoginComponent {

//     valCheck: string[] = ['remember'];

//     password!: string;

//     constructor(public layoutService: LayoutService) {
//     }
// }

export class LoginComponent {
    email: string = '';
    password: string = '';
    rememberMe: boolean = false;

    constructor(private authService: AuthService, private router: Router) { }
    //login function
    onLogin() {
        if (this.email && this.password) {
            this.authService.login({ email: this.email, password: this.password }).subscribe({
                next: (res) => {
                    this.router.navigate(['/dashboard']);
                },
                error: (err) => {
                    console.error('Login failed:', err);
                    alert('Invalid email or password!');
                },
            });
        } else {
            alert('Please enter email and password');
        }
    }
    onLogout() {
        this.authService.logout();
    }
}
