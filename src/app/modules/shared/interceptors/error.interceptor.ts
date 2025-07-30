import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private snackBar: MatSnackBar) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let message = 'Ocurrió un error inesperado';

        if (error.error?.message) {
          message = error.error.message;
        } else if (error.status === 0) {
          message = 'No hay conexión con el servidor';
        } else if (error.status === 401) {
          message = 'No autorizado. Vuelve a iniciar sesión.';
        }

        this.snackBar.open(message, 'Cerrar', {
          duration: 5000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
          panelClass: ['error-snackbar'], // Opcional para estilos
        });

        return throwError(() => error);
      })
    );
  }
}
