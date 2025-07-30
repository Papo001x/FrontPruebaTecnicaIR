import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { UserResponseDTO } from '../../../../core/interfaces/user.interfaces';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  standalone: false,
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent implements OnInit {
  users: UserResponseDTO[] = [];
  columns: string[] = [
    'id',
    'name',
    'lastName',
    'email',
    'roleName',
    'actions',
  ];
  constructor(
    private readonly userService: UserService,
    private readonly snackBar: MatSnackBar,
    private readonly router: Router
  ) {}
  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe({
      next: (users) => {
        this.users = users;
        console.log('Users fetched successfully:', this.users);
      },
      error: (error) => {
        console.error('Error fetching users:', error);
      },
    });
  }

  deleteUser(userId: number) {
    // Aquí iría la lógica para eliminar un usuario
    this.userService.deleteUser(userId).subscribe({
      next: () => {
        this.snackBar.open(
          'El estudiante ha sido eliminado correctamente',
          'Cerrar',
          {
            duration: 5000,
            verticalPosition: 'top',
            horizontalPosition: 'right',
          }
        );
        this.getAllUsers(); // Refresh the user list after deletion
      },
      error: (error) => {
        this.snackBar.open(
          error.error?.message || 'Error al eliminar el usuario',
          'Cerrar',
          {
            duration: 5000,
            verticalPosition: 'top',
            horizontalPosition: 'right',
          }
        );
        console.error(`Error deleting user with ID ${userId}:`, error);
      },
    });
  }

  createUser() {
    this.router.navigate(['/private/users/create']);
  }
  edit(userId: number) {
    this.router.navigate(['/private/users/edit', userId]);
  }

  dashBoard(userId: number) {
    this.router.navigate(['/private/users/dashboard', userId]);
  }
}
