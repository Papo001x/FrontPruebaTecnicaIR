import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-private',
  standalone: false,
  templateUrl: './private.component.html',
  styleUrl: './private.component.scss',
})
export class PrivateComponent {
  rolId = Number(localStorage.getItem('rolId'));
  constructor(
    private readonly router: Router,
    private readonly authService: AuthService
  ) {
    
  }
  logout(): void {
    this.authService.logout(); 
    this.router.navigate(['/public/login']);
  }
}
