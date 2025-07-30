import { Component, OnInit } from '@angular/core';
import { UserService } from '../users/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserResponseDTO } from '../../../../core/interfaces/user.interfaces';
import { UserProgramsSubjectsService } from './services/user-programs-subjects.service';
import {
  ProgramSubjectByUserResponseDTO,
  UserProgramSubjectDTO,
} from '../../../../core/interfaces/userProgramSubject';
import { ProgramSubjectService } from '../programs-link-subject/services/program-subject.service';
import { ProgramSubjectDetailDTO } from '../../../../core/interfaces/programSubject.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-dashboard',
  standalone: false,
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.scss',
})
export class UserDashboardComponent implements OnInit {
  userId!: number;
  userInfo!: UserResponseDTO; // Adjust type as needed
  subjectList!: ProgramSubjectByUserResponseDTO;
  hideInformation = false;
  colums: string[] = [
    'programSubjectId',
    'subjectName',
    'teacherName',
    'credits',
    'actions',
  ];
  programsSubjects: ProgramSubjectDetailDTO[] = [];
  form!: FormGroup;
  constructor(
    private readonly userService: UserService,
    private readonly userProgramsSubjectsService: UserProgramsSubjectsService,
    private readonly route: ActivatedRoute,
    private readonly programSubjectService: ProgramSubjectService,
    private readonly fb: FormBuilder,
    private readonly router: Router
  ) {}
  ngOnInit(): void {
    this.form = this.fb.group({
      programSubjectId: [null, [Validators.required]],
    });
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.userId = +id;
      this.getUserInfo();
      this.getUserByProgramsSubjects();
      let principalId = Number(localStorage.getItem('userId'));
      let rolId = Number(localStorage.getItem('rolId'));
      if (principalId === this.userId || rolId === 1) {
        this.hideInformation = true;
      } else {
        this.hideInformation = false;
      }
    }
  }

  getUserInfo() {
    this.userService.getUserById(this.userId).subscribe({
      next: (user) => {
        this.userInfo = user;
        if (user.programId) {
          this.getAllSProgramsubjectsByPrograms(user.programId);
        }
      },
      error: (error) => {
        console.error('Error fetching user info:', error);
      },
    });
  }

  getUserByProgramsSubjects() {
    this.userProgramsSubjectsService
      .getUserByProgramsSubjects(this.userId)
      .subscribe({
        next: (data) => {
          this.subjectList = data;
        },
        error: (error) => {
          console.error('Error fetching user programs and subjects:', error);
        },
      });
  }

  getAllSProgramsubjectsByPrograms(programSubjectId: number) {
    this.programSubjectService
      .getAllSubjectsByProgramId(programSubjectId)
      .subscribe({
        next: (data) => {
          this.programsSubjects = data.subjects;
        },
        error: (error) => {
          console.error('Error fetching subjects by program:', error);
        },
      });
  }

  createUserProgramSubject() {
    if (this.form.invalid) return;
    const userProgramSubjectDTO: UserProgramSubjectDTO = {
      studentId: this.userId,
      programSubjectId: this.form.get('programSubjectId')?.value,
    };

    this.userProgramsSubjectsService
      .createUserProgramSubject(userProgramSubjectDTO)
      .subscribe({
        next: () => {
          this.getUserByProgramsSubjects();
          this.form.reset();
        },
        error: (error) => {
          console.error('Error creating user program subject:', error);
        },
      });
  }

  deleteUserProgramSubject(programSubjectId: number) {
    this.userProgramsSubjectsService
      .deleteUserProgramSubject(programSubjectId)
      .subscribe({
        next: () => {
          this.getUserByProgramsSubjects();
        },
        error: (error) => {
          console.error('Error deleting user program subject:', error);
        },
      });
  }
  viewClassList(id: number) {
    this.router.navigate(['/private/class', id]);
  }

  returnToDashboard() {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([
        '/private/users/dashboard',
        Number(localStorage.getItem('userId')),
      ]);
    });

    console.log('Returning to dashboard', localStorage.getItem('userId'));
  }
}
