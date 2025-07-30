import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProgramService } from '../programs/services/program.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AcademicProgramDTO } from '../../../../core/interfaces/program.interface';

@Component({
  selector: 'app-programs-form',
  standalone: false,
  templateUrl: './programs-form.component.html',
  styleUrl: './programs-form.component.scss',
})
export class ProgramsFormComponent implements OnInit {
  programForm!: FormGroup;
  isEditMode = false;
  userId!: number;
  constructor(
    private readonly fb: FormBuilder,
    private readonly programService: ProgramService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {}
  ngOnInit(): void {
    this.programForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(255)]],
      totalCredits: [
        0,
        [Validators.required, Validators.min(1), Validators.max(200)],
      ],
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.userId = +id;
      this.loadProgram(this.userId);
    }
  }

  loadProgram(id: number) {
    this.programService.getProgramById(id).subscribe((program) => {
      this.programForm.patchValue({
        name: program.name,
        totalCredits: program.totalCredits,
      });
    });
  }

  cancel() {
    this.router.navigate(['/private/programs']);
  }

  onSubmit() {
    if (this.programForm.invalid) return;
    const rawUser = this.programForm.getRawValue();
    const program: AcademicProgramDTO = {
      name: rawUser.name,
      totalCredits: rawUser.totalCredits,
    };

    if (this.isEditMode) {
      this.programService.updateProgram(this.userId, program).subscribe(() => {
        this.router.navigate(['/private/programs']);
      });
    } else {
      this.programService.createProgram(program).subscribe(() => {
        this.router.navigate(['/private/programs']);
      });
    }
  }
}
