import { Injectable } from '@angular/core';
import { RequestService } from '../../../../../core/services/request.service';
import { environment } from '../../../../../../enviroments/environment';
import { LoginDTO, LoginResponseDTO } from '../Interfaces/login.interfaces';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../../../../../core/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private readonly API: string = environment.API;
  constructor(
    private readonly req: RequestService,
    private readonly authService: AuthService
  ) {}

  login(data: LoginDTO): Observable<LoginResponseDTO> {
    return this.req.post<LoginResponseDTO>(`${this.API}/Auth/login`, data).pipe(
      tap((response) => {
        this.authService.setToken(response.token); 
      })
    );
  }
}
