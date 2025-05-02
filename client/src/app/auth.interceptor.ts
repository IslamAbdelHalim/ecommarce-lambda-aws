import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AuthService } from './auth/services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const accessTOken = localStorage.getItem('accessTOken');

  const authService = inject(AuthService);

  if (accessTOken) {
    req.clone({
      headers: req.headers.append('Authorization', `Bearer ${accessTOken}`),
    });
  }
  return next(req).pipe(
    catchError((error) => {
      if (error.status === 401 && accessTOken) {
        return authService.refreshAccessToken();
      }

      return throwError(error);
    })
  );
};
