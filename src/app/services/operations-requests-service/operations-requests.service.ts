import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { CardInfoInterface, StartOperationRequestInterface, OperationResponceInterface, OperationStepDetails } from 'src/app/models/operation';
import { shareReplay, tap } from 'rxjs/operators';

type order = {
  "identifier": string,
  "value": string
}

@Injectable({
  providedIn: 'root'
})
export class OperationsRequestsService {

  private operationStepDetails = new BehaviorSubject<OperationStepDetails | null>(null);
  public operationStep$ = this.operationStepDetails.asObservable().pipe(shareReplay(1));

  private operationSubject = new BehaviorSubject<OperationResponceInterface | null>(null);
  private dataOrder: order[] = [];
  private requestId: string | null = null;

  constructor(private readonly http: HttpClient) { }

  getCardsInfo(): Observable<CardInfoInterface[]> {
    return this.http.get<CardInfoInterface[]>('/api/showcase/products');
  }

  startOperation(codeOperation: StartOperationRequestInterface): Observable<OperationResponceInterface> {
    return this.http.put<OperationResponceInterface>('/api/operations', codeOperation).pipe(
      tap(response => this.operationSubject.next(response))
    )
  }

  secondStepOperation(selectedRadioButton: string, typeProduct: string, nameOperation?: string): Observable<OperationResponceInterface> {
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
    } else if (nameOperation === 'Пополнение счёта') {
      this.dataOrder = [
        { "identifier" : 'Account', "value": typeProduct },
        { "identifier" : 'Amount', "value": selectedRadioButton }
      ]
    }

    return this.http.patch<OperationResponceInterface>(`/api/operations?requestId=${this.requestId}`, this.dataOrder)
    // .pipe(
    //   tap(response => this.operationSubject.next(response)) ////dwdwdwe
    // );
  }

  confirmOperaton(): Observable<OperationResponceInterface> {
    this.requestId = localStorage.getItem('requestId');

    return this.http.post<OperationResponceInterface>(`/api/operations?requestId=${this.requestId}`, {});
  }

  deleteOperation() {
    this.requestId = localStorage.getItem('requestId');

    return this.http.delete(`/api/operations?requestId=${this.requestId}`)
  }

  getOperationHistory(): Observable<OperationResponceInterface[]> {
    return this.http.get<OperationResponceInterface[]>('/api/operations')
  }

  setOperationStepDetails(data: OperationStepDetails): void {
    this.operationStepDetails.next(data);
  }

  getOperationResponse(): Observable<OperationResponceInterface | null> {
    return this.operationSubject.asObservable();
  }

}