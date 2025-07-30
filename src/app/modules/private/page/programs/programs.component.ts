import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ProgramService } from './services/program.service';
import { AcademicProgramResponseDTO } from '../../../../core/interfaces/program.interface';

@Component({
  selector: 'app-programs',
  standalone: false,
  templateUrl: './programs.component.html',
  styleUrl: './programs.component.scss',
})
export class ProgramsComponent implements OnInit {
  programs: AcademicProgramResponseDTO[] = [];
  columns: string[] = ['id', 'name', 'totalCredits', 'actions'];

  constructor(
    private readonly snackBar: MatSnackBar,
    private readonly router: Router,
    private readonly programService: ProgramService
  ) {}
  ngOnInit(): void {
    this.getAllProgram();
  }

  getAllProgram() {
    this.programService.getAllPrograms().subscribe({
      next: (programs) => {
        this.programs = programs;
      },
      error: (error) => {
        console.error('Error fetching programs:', error);
      },
    });
  }

  createProgram() {
    this.router.navigate(['/private/programs/create']);
  }

  deleteProgram(programId: number) {
    this.programService.deleteProgram(programId).subscribe({
      next: () => {
        this.snackBar.open('Programa eliminado correctamente', 'Cerrar', {
          duration: 3000,
        });
        this.getAllProgram();
      },
      error: (error) => {
        console.error('Error deleting program:', error);
        this.snackBar.open('Error al eliminar el programa', 'Cerrar', {
          duration: 3000,
        });
      },
    });
  }

  edit(programId: number) {
    this.router.navigate(['/private/programs/edit', programId]);
  }

  linkSubjects(programId: number) {
    this.router.navigate(['/private/programs/link', programId]);
  }
}
