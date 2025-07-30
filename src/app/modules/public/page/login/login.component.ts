import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm: FormGroup;
  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  private readonly strongPasswordRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

  constructor(
    private readonly fb: FormBuilder,
    private readonly loginService: LoginService,
    private readonly router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [Validators.required, Validators.pattern(this.strongPasswordRegex)],
      ],
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit() {
    console.log('Form submitted:', this.loginForm.value);
    if (this.loginForm.valid) {
      this.login();
      // aquí iría la lógica de login
    }
  }

  login() {
    this.loginService.login(this.loginForm.value).subscribe({
      next: (response) => {
        localStorage.setItem('userId', response.userResponseDTO.id.toString());
        localStorage.setItem('rolId', response.userResponseDTO.roleId.toString());
        
        this.router.navigate(['/private/students']);
      },
      error: (error) => {
        console.error('Login failed', error);
        // Aquí puedes manejar el error, como mostrar un mensaje al usuario
      },
    });
  }
}
