import { Injectable } from '@angular/core';
import { environment } from '../../../../../../enviroments/environment';
import { RequestService } from '../../../../../core/services/request.service';
import {
  AcademicProgramDTO,
  AcademicProgramResponseDTO,
} from '../../../../../core/interfaces/program.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProgramService {
  private readonly API: string = environment.API;
  constructor(private readonly req: RequestService) {}

  getAllPrograms(): Observable<AcademicProgramResponseDTO[]> {
    return this.req.get<AcademicProgramResponseDTO[]>(
      `${this.API}/AcademicProgram/all`
    );
  }

  deleteProgram(programId: number): Observable<void> {
    return this.req.delete<void>(`${this.API}/AcademicProgram/${programId}`);
  }

  getProgramById(programId: number): Observable<AcademicProgramResponseDTO> {
    return this.req.get<AcademicProgramResponseDTO>(
      `${this.API}/AcademicProgram/${programId}`
    );
  }

  updateProgram(
    id: number,
    program: AcademicProgramDTO
  ): Observable<AcademicProgramResponseDTO> {
    return this.req.put<AcademicProgramResponseDTO>(
      `${this.API}/AcademicProgram/${id}`,
      program
    );
  }

  createProgram(
    program: AcademicProgramDTO
  ): Observable<AcademicProgramResponseDTO> {
    return this.req.post<AcademicProgramResponseDTO>(
      `${this.API}/AcademicProgram`,
      program
    );
  }
}
