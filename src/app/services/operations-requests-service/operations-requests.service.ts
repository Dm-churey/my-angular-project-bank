import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CardInfoInterface, StartOperationRequestInterface, OperationResponceInterface } from 'src/app/models/operation';

type order = {
  "identifier": string,
  "value": string
}

@Injectable({
  providedIn: 'root'
})
export class OperationsRequestsService {

  private dataOrder: order[] = [];
  private requestId: string | null = null;

  constructor(private readonly http: HttpClient) { }

  getCardsInfo(): Observable<CardInfoInterface[]> {
    return this.http.get<CardInfoInterface[]>('/api/showcase/products');
  }

  startOperation(codeOperation: StartOperationRequestInterface): Observable<OperationResponceInterface> {
    return this.http.put<OperationResponceInterface>('/api/operations', codeOperation)
  }

  secondStepOperation(selectedRadioButton: string, typeProduct: string): Observable<OperationResponceInterface> {
    this.requestId = localStorage.getItem('requestId');

    if (typeProduct === 'Кредитная карта' || typeProduct === 'Дебетовая карта') {
      this.dataOrder = [
        { "identifier" : 'Product', "value": typeProduct },
        { "identifier" : 'ProgramType', "value": selectedRadioButton }
      ];
    } else if (typeProduct === 'Текущий счёт' || typeProduct === 'Накопительный счёт') {
      this.dataOrder = [
        { "identifier" : 'AccountType', "value": typeProduct },
        { "identifier" : 'Currency', "value": selectedRadioButton }
      ];
    }

    return this.http.patch<OperationResponceInterface>(`/api/operations?requestId=${this.requestId}`, this.dataOrder);
  }

  confirmOperaton(): Observable<OperationResponceInterface> {
    this.requestId = localStorage.getItem('requestId');

    return this.http.post<OperationResponceInterface>(`/api/operations?requestId=${this.requestId}`, {});
  }

  deleteOperation() {
    this.requestId = localStorage.getItem('requestId');

    return this.http.delete(`/api/operations?requestId=${this.requestId}`)
  }

}