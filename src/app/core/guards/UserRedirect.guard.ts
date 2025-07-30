// user-redirect.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service'; // Ajusta según tu estructura

@Injectable({
  providedIn: 'root',
})
export class UserRedirectGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const rol = Number(localStorage.getItem('rolId'));

    if (rol === 1) {
      // Rol administrador, permitir continuar en /private/users
      return true;
    } else {
      // Redireccionar al dashboard del estudiante
      const userId = Number(localStorage.getItem('userId'));
      this.router.navigate([`/private/users/dashboard/${userId}`]);
      return false;
    }
  }
}
