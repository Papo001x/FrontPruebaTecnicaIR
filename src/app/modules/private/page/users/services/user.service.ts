import { Injectable } from '@angular/core';
import { environment } from '../../../../../../enviroments/environment';
import { RequestService } from '../../../../../core/services/request.service';
import {
  UserDTO,
  UserResponseDTO,
} from '../../../../../core/interfaces/user.interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly API: string = environment.API;
  constructor(private readonly req: RequestService) {}

  getAllUsers(): Observable<UserResponseDTO[]> {
    return this.req.get<UserResponseDTO[]>(`${this.API}/User/all`);
  }

  deleteUser(userId: number): Observable<void> {
    return this.req.delete<void>(`${this.API}/User/${userId}`);
  }

  getUserById(userId: number): Observable<UserResponseDTO> {
    return this.req.get<UserResponseDTO>(`${this.API}/User/${userId}`);
  }

  updateUser(id: number, user: UserDTO): Observable<UserResponseDTO> {
    return this.req.put<UserResponseDTO>(`${this.API}/User/${id}`, user);
  }

  createUser(user: UserDTO): Observable<UserResponseDTO> {
    return this.req.post<UserResponseDTO>(`${this.API}/User`, user);
  }

  getAllTeachers(): Observable<UserResponseDTO[]> {
    return this.req.get<UserResponseDTO[]>(`${this.API}/User/teachers`);
  }
}
