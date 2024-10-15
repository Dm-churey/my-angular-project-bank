import { HttpClient } from '@angular/common/http';
import { CardDataInterface } from 'src/app/models/card';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardsRequestsService {

  constructor(private readonly http: HttpClient) { }

  getUserCadrs(): Observable<CardDataInterface[]> {
    return this.http.get<CardDataInterface[]>('/api/cards');
  }
}