import { Component, OnInit } from '@angular/core';
import { ProgramSubjectService } from './services/program-subject.service';
import { UserService } from '../users/services/user.service';
import { UserResponseDTO } from '../../../../core/interfaces/user.interfaces';
import { ActivatedRoute } from '@angular/router';
import {
  ProgramSubjectDetailDTO,
  ProgramSubjectDTO,
  ProgramSubjectsByProgramResponseDTO,
} from '../../../../core/interfaces/programSubject.interface';
import { SubjectsService } from '../subjects/services/subjects.service';
import { SubjectResponseDTO } from '../../../../core/interfaces/subject.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-programs-link-subject',
  standalone: false,
  templateUrl: './programs-link-subject.component.html',
  styleUrl: './programs-link-subject.component.scss',
})
export class ProgramsLinkSubjectComponent implements OnInit {
  programSubjectId!: number;
  form!: FormGroup;
  teachers: UserResponseDTO[] = [];
  subjects: SubjectResponseDTO[] = [];
  programSubjects!: ProgramSubjectsByProgramResponseDTO;
  isEditMode = false;
  columns: string[] = [
    'programSubjectId',
    'subjectName',
    'teacherName',
    'actions',
  ];
  constructor(
    private readonly programSubjectService: ProgramSubjectService,
    private readonly subjectService: SubjectsService,
    private readonly userService: UserService,
    private readonly route: ActivatedRoute,
    private readonly fb: FormBuilder
  ) {}
  ngOnInit(): void {
    this.form = this.fb.group({
      teacherId: [null, [Validators.required]],
      subjectId: [null, [Validators.required]],
      programSubjectId: [null],
    });
    this.getAllTeachers();
    this.getAllSubjects();
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.programSubjectId = +id;
      this.getAllSubjectsByProgramId(this.programSubjectId);
    }
  }

  getAllTeachers() {
    this.userService.getAllTeachers().subscribe({
      next: (teachers) => {
        this.teachers = teachers;
      },
      error: (error) => {
        console.error('Error fetching teachers:', error);
      },
    });
  }

  getAllSubjectsByProgramId(id: number) {
    this.programSubjectService
      .getAllSubjectsByProgramId(this.programSubjectId)
      .subscribe({
        next: (subjects) => {
          this.programSubjects = subjects;
        },
        error: (error) => {
          console.error('Error fetching subjects by program ID:', error);
        },
      });
  }

  getAllSubjects() {
    this.subjectService.getAllSubjects().subscribe({
      next: (subjects) => {
        this.subjects = subjects;
      },
      error: (error) => {
        console.error('Error fetching subjects:', error);
      },
    });
  }

  createProgramSubject() {
    if (this.form.invalid) return;
    const rawForm = this.form.getRawValue();
    const programSubject: ProgramSubjectDTO = {
      teacherId: rawForm.teacherId,
      subjectId: rawForm.subjectId,
      programId: this.programSubjectId,
    };

    this.programSubjectService.createProgramSubject(programSubject).subscribe({
      next: () => {
        this.getAllSubjectsByProgramId(this.programSubjectId);
        this.form.reset();
        this.form.markAsPristine();
        this.form.markAsUntouched();
        this.form.updateValueAndValidity();
      },
      error: (error) => {
        console.error('Error creating program subject:', error);
      },
    });
  }

  editProgramSubject(ps: ProgramSubjectDetailDTO) {
    this.isEditMode = true;
    this.form.patchValue({
      teacherId: ps.teacherId,
      subjectId: ps.subjectId,
      programSubjectId: ps.programSubjectId,
    });
  }

  deleteProgramSubject(programSubjectId: number) {
    this.programSubjectService
      .deleteProgramSubject(programSubjectId)
      .subscribe({
        next: () => {
          this.getAllSubjectsByProgramId(this.programSubjectId);
        },
        error: (error) => {
          console.error('Error deleting program subject:', error);
        },
      });
  }

  cleanForm() {
    this.isEditMode = false;
    this.form.reset();
    this.form.markAsPristine();
    this.form.markAsUntouched();
    this.form.updateValueAndValidity();
  }
}
