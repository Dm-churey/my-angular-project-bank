import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { RegisterInterface } from 'src/app/models/register';
import { LoginIntreface } from 'src/app/models/login';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  private accessToken = '';

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
      )
    )
  };

  logoutUser() {
    return this.http.delete('/api/authorization/logout')
    .pipe(
      tap(() => {
        this.setAccessToken('');
        localStorage.clear();
      })
    );
  };

  setAccessToken(accessToken: string) {
    this.accessToken = accessToken;
  };

  getAccessToken(): string {
    return this.accessToken;
  };

  isAuthenticated(): boolean {
    return !!this.accessToken;
  };
  
}
