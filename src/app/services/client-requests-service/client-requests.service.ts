import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { shareReplay, tap } from 'rxjs/operators';
import { ClientInterface } from 'src/app/models/client';

@Injectable({
  providedIn: 'root'
})
export class ClientRequestsService {

  private clientSubject = new BehaviorSubject<ClientInterface | null>(null);
  public client$ = this.clientSubject.asObservable().pipe(shareReplay(1));

  constructor(private readonly http: HttpClient) {}

  getClient(): Observable<ClientInterface> {
    return this.http.get<ClientInterface>('/api/clients').pipe(
      tap((data) => {
        this.setClientData(data)
      })
    );
  }

  setClientData(data: ClientInterface): void {
    this.clientSubject.next(data);
  }

  getClientData(): ClientInterface | null {
    return this.clientSubject.getValue();
  }
}
