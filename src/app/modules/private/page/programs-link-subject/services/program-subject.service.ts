import { Injectable } from '@angular/core';
import { environment } from '../../../../../../enviroments/environment';
import { RequestService } from '../../../../../core/services/request.service';
import { Observable } from 'rxjs';
import {
  ProgramSubjectDTO,
  ProgramSubjectsByProgramResponseDTO,
} from '../../../../../core/interfaces/programSubject.interface';

@Injectable({
  providedIn: 'root',
})
export class ProgramSubjectService {
  private readonly API: string = environment.API;
  constructor(private readonly req: RequestService) {}

  getAllSubjectsByProgramId(
    programId: number
  ): Observable<ProgramSubjectsByProgramResponseDTO> {
    return this.req.get(`${this.API}/ProgramSubject/program/${programId}`);
  }

  createProgramSubject(programSubject: ProgramSubjectDTO): Observable<void> {
    return this.req.post<void>(`${this.API}/ProgramSubject`, programSubject);
  }

  deleteProgramSubject(programSubjectId: number): Observable<void> {
    return this.req.delete<void>(
      `${this.API}/ProgramSubject/${programSubjectId}`
    );
  }

  editProgramSubject(
    programSubjectId: number,
    programSubject: ProgramSubjectDTO
  ) {
    return this.req.put<void>(
      `${this.API}/ProgramSubject/${programSubjectId}`,
      programSubject
    );
  }
}
