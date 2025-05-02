import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, pipe, throwError } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/auth';
  private PreSignedUrl = 'http://localhost:3000/get-presigned-url';

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('token');
    if (token) {
      this.isAuthenticatedSubject.next(true);
    }
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password }).pipe(
      tap((response: any) => {
        if (response.token) {
          localStorage.setItem('token', response.token);
          this.isAuthenticatedSubject.next(true);
        }
      })
    );
  }

  signup(
    name: string,
    email: string,
    password: string,
    fileName: string,
    ext: string,
    file: File
  ): Observable<any> {
    return this.getPreSignUrl(fileName, ext, file).pipe(
      switchMap((fileUrl: string) =>
        this.http.post(`${this.apiUrl}/signup`, {
          name,
          email,
          password,
          fileUrl,
        })
      )
    );
  }

  getPreSignUrl(fileName: string, ext: string, file: File): Observable<any> {
    return this.http
      .get(`${this.PreSignedUrl}`, {
        params: {
          fileName,
          fileExt: ext,
        },
      })
      .pipe(
        switchMap((response: any) => {
          const signedUrl = response.signedUrl;
          const fileUrl = response.fileUrl;

          return this.http
            .put(signedUrl, file, {
              headers: {
                'content-type': `images/${ext}`,
              },
            })
            .pipe(map(() => fileUrl));
        })
      );
  }

  refreshAccessToken(): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/refresh-token`, {}).pipe(
      tap((response: Response) => {
        const token = response.headers.get('Authorization')?.split(' ')[1];
        localStorage.setItem('accessToken', JSON.stringify(token));
      }),
      catchError((error) => throwError(error))
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.isAuthenticatedSubject.next(false);
  }
}
