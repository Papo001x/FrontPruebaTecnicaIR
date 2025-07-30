import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProgramService } from '../programs/services/program.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SubjectsService } from '../subjects/services/subjects.service';
import { SubjectDTO } from '../../../../core/interfaces/subject.interface';

@Component({
  selector: 'app-subject-form',
  standalone: false,
  templateUrl: './subject-form.component.html',
  styleUrl: './subject-form.component.scss',
})
export class SubjectFormComponent implements OnInit {
  subjectForm!: FormGroup;
  isEditMode = false;
  subjectId!: number;
  constructor(
    private readonly fb: FormBuilder,
    private readonly subjectService: SubjectsService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {}
  ngOnInit(): void {
    this.subjectForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(255)]],
      credits: [0, [Validators.required, Validators.min(1), Validators.max(3)]],
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.subjectId = +id;
      this.loadSubject(this.subjectId);
    }
  }

  loadSubject(id: number) {
    this.subjectService.getSubjectById(id).subscribe((subject) => {
      this.subjectForm.patchValue({
        name: subject.name,
        credits: subject.credits,
      });
    });
  }

  cancel() {
    this.router.navigate(['/private/subjects']);
  }

  onSubmit() {
    if (this.subjectForm.invalid) return;
    const rawUser = this.subjectForm.getRawValue();
    const program: SubjectDTO = {
      name: rawUser.name,
      credits: rawUser.credits,
    };

    if (this.isEditMode) {
      this.subjectService
        .updateSubject(this.subjectId, program)
        .subscribe(() => {
          this.router.navigate(['/private/subjects']);
        });
    } else {
      this.subjectService.createSubject(program).subscribe(() => {
        this.router.navigate(['/private/subjects']);
      });
    }
  }
}
