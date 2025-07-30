import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../users/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  UserDTO,
  UserResponseDTO,
} from '../../../../core/interfaces/user.interfaces';
import { ProgramService } from '../programs/services/program.service';
import { AcademicProgramResponseDTO } from '../../../../core/interfaces/program.interface';

@Component({
  selector: 'app-user-form',
  standalone: false,
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss',
})
export class UserFormComponent implements OnInit {
  userForm!: FormGroup;
  isEditMode = false;
  userId!: number;
  private readonly strongPasswordRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
  hide = signal(true);
  programs: AcademicProgramResponseDTO[] = []; 
  constructor(
    private readonly fb: FormBuilder,
    private readonly userService: UserService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly programService: ProgramService
  ) {}
  ngOnInit(): void {
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      lastName: ['', [Validators.required, Validators.maxLength(100)]],
      email: [
        '',
        [Validators.required, Validators.email, Validators.maxLength(150)],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.maxLength(255),
          Validators.pattern(this.strongPasswordRegex),
        ],
      ],
      roleId: [null, [Validators.required]],
      programId: [null],
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.userForm.get('roleId')?.disable();
      this.userId = +id;
      this.loadUser(this.userId);
    }
    this.getAllPrograms();
  }

  loadUser(id: number) {
    this.userService.getUserById(id).subscribe((user: UserResponseDTO) => {
      this.userForm.patchValue({
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        roleId: user.roleId,
        password: '',
        programId: user.roleId !== 3 ? null : user.programId,
      });
    });
  }

  onSubmit() {
    if (this.userForm.invalid) return;

    const rawUser = this.userForm.getRawValue();

    const user: UserDTO = {
      email: rawUser.email,
      name: rawUser.name,
      lastName: rawUser.lastName,
      password: rawUser.password,
      roleId: rawUser.roleId,
      programId: rawUser.roleId !== 3 ? null : rawUser.programId,
    };

    if (this.isEditMode) {
      this.userService.updateUser(this.userId, user).subscribe(() => {
        this.router.navigate(['/private/users']);
      });
    } else {
      this.userService.createUser(user).subscribe(() => {
        this.router.navigate(['/private/users']);
      });
    }
  }

  cancel() {
    this.router.navigate(['/private/users']);
  }
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  getAllPrograms() {
    this.programService.getAllPrograms().subscribe({
      next: (programs) => {
        this.programs = programs;
      },
      error: (error) => {
        console.error('Error fetching programs:', error);
      },
    });
  }
}
