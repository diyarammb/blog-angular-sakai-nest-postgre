// guards/no-auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service'; // update path as needed

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/dashboard']); // redirect to dashboard if logged in
      return false;
    }
    return true; // allow to go to login if not logged in
  }
}
