import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { RegisterInterface } from 'src/app/models/register';
import { LoginIntreface } from 'src/app/models/login';
import { BASE_API_URL } from 'src/app/models/api';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  private accessToken = '';
  private refreshToken = '';

  constructor(private readonly http: HttpClient) {}

  registerUser(userData: RegisterInterface): Observable<any> {
    return this.http.put('/api/clients', userData);
  };

  loginUser(loginData: LoginIntreface): Observable<{accessToken: string, refreshToken: string}> {
    return this.http.post<{accessToken: string, refreshToken: string}>('/api/authorization/token', loginData).pipe(
      tap(
        ({accessToken}) => {
          localStorage.setItem('auth-accessToken', accessToken);
          this.setAccessToken(accessToken);
        }
      ),
      tap(
        ({refreshToken}) => {
          localStorage.setItem('auth-refreshToken', refreshToken);
          this.setRefreshToken(refreshToken);
        }
      )
    )
  };

  logoutUser() {
    this.setAccessToken('');
    this.setRefreshToken('');
    localStorage.clear();
  };

  setAccessToken(accessToken: string) {
    this.accessToken = accessToken;
  };

  getAccessToken(): string {
    return this.accessToken;
  };

  setRefreshToken(refreshToken: string) {
    this.refreshToken = refreshToken;
  };

  getRefreshToken(): string {
    return this.refreshToken;
  };

  isAuthenticated(): boolean {
    return !!this.accessToken;
  };
  
}
