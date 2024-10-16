import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClientInterface } from 'src/app/models/client';

@Injectable({
  providedIn: 'root'
})
export class ClientRequestsService {

  constructor(private readonly http: HttpClient) {}

  getClient(): Observable<ClientInterface> {
    return this.http.get<ClientInterface>('/api/clients');
  }
}
