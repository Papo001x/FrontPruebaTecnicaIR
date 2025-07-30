import { Injectable } from '@angular/core';
import { environment } from '../../../../../../enviroments/environment';
import { RequestService } from '../../../../../core/services/request.service';
import {
  SubjectDTO,
  SubjectResponseDTO,
} from '../../../../../core/interfaces/subject.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SubjectsService {
  private readonly API: string = environment.API;

  constructor(private readonly req: RequestService) {}

  getAllSubjects(): Observable<SubjectResponseDTO[]> {
    return this.req.get<SubjectResponseDTO[]>(`${this.API}/Subject/all`);
  }

  deleteSubject(subjectId: number): Observable<void> {
    return this.req.delete<void>(`${this.API}/Subject/${subjectId}`);
  }

  getSubjectById(subjectId: number): Observable<SubjectResponseDTO> {
    return this.req.get<SubjectResponseDTO>(`${this.API}/Subject/${subjectId}`);
  }

  updateSubject(
    id: number,
    subject: SubjectDTO
  ): Observable<SubjectResponseDTO> {
    return this.req.put<SubjectResponseDTO>(
      `${this.API}/Subject/${id}`,
      subject
    );
  }

  createSubject(subject: SubjectDTO): Observable<SubjectResponseDTO> {
    return this.req.post<SubjectResponseDTO>(`${this.API}/Subject`, subject);
  }
}
