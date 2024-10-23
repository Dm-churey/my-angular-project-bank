import { HttpClient } from '@angular/common/http';
import { AccountDataInterface } from 'src/app/models/account';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountsRequestsService {

  constructor(private readonly http: HttpClient) { }

  getUserAccounts(): Observable<AccountDataInterface[]> {
    return this.http.get<AccountDataInterface[]>('/api/accounts');
  }

  getUserAccountById(id: number): Observable<AccountDataInterface> {
    return this.http.get<AccountDataInterface>(`/api/accounts/${id}`);
  }

  lockAccountById(id: number): Observable<AccountDataInterface> {
    return this.http.patch<AccountDataInterface>(`/api/accounts/lock/${id}`, {});
  }

  unlockAccountById(id: number): Observable<AccountDataInterface> {
    return this.http.patch<AccountDataInterface>(`/api/accounts/unlock/${id}`, {});
  }
}
