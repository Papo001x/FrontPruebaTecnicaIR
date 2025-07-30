import { Injectable } from '@angular/core';
import { environment } from '../../../../../../enviroments/environment';
import { RequestService } from '../../../../../core/services/request.service';
import { Observable } from 'rxjs';
import {
  ProgramSubjectByUserResponseDTO,
  UserProgramSubjectDTO,
  UsersByProgramSubjectIdResponseDTO,
} from '../../../../../core/interfaces/userProgramSubject';

@Injectable({
  providedIn: 'root',
})
export class UserProgramsSubjectsService {
  private readonly API: string = environment.API;
  constructor(private readonly req: RequestService) {}

  getUserByProgramsSubjects(
    userId: number
  ): Observable<ProgramSubjectByUserResponseDTO> {
    return this.req.get(`${this.API}/UsersProgramsSubjects/by-user/${userId}`);
  }

  getProgramsSubjectsByUser(
    programSubjectId: number
  ): Observable<UsersByProgramSubjectIdResponseDTO> {
    return this.req.get(
      `${this.API}/UsersProgramsSubjects/by-program-subject/${programSubjectId}`
    );
  }

  deleteUserProgramSubject(userId: number) {
    return this.req.delete<void>(`${this.API}/UsersProgramsSubjects/${userId}`);
  }

  createUserProgramSubject(
    userProgramSubjectDTO: UserProgramSubjectDTO
  ): Observable<void> {
    return this.req.post<void>(
      `${this.API}/UsersProgramsSubjects`,
      userProgramSubjectDTO
    );
  }
}
