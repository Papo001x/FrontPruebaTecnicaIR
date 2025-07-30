import { Component, OnInit } from '@angular/core';
import { SubjectResponseDTO } from '../../../../core/interfaces/subject.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SubjectsService } from './services/subjects.service';

@Component({
  selector: 'app-subject',
  standalone: false,
  templateUrl: './subject.component.html',
  styleUrl: './subject.component.scss',
})
export class SubjectComponent implements OnInit {
  subjects: SubjectResponseDTO[] = [];
  columns: string[] = ['id', 'name', 'credits', 'actions'];
  constructor(
    private readonly snackBar: MatSnackBar,
    private readonly router: Router,
    private readonly subjectService: SubjectsService
  ) {}
  ngOnInit(): void {
    this.getAllSubjects();
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

  createSubject() {
    this.router.navigate(['/private/subjects/create']);
  }

  deleteSubject(subjectId: number) {
    this.subjectService.deleteSubject(subjectId).subscribe({
      next: () => {
        this.snackBar.open('Materia eliminada correctamente', 'Cerrar', {
          duration: 3000,
        });
        this.getAllSubjects();
      },
      error: (error) => {
        console.error('Error deleting subject:', error);
        this.snackBar.open('Error al eliminar la materia', 'Cerrar', {
          duration: 3000,
        });
      },
    });
  }

  edit(subjectsId: number) {
    this.router.navigate(['/private/subjects/edit', subjectsId]);
  }
}
