import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/services/message-service/message.service';
import { DestroyService } from 'src/app/services/destroy-service/destroy.service';
import { OperationsRequestsService } from 'src/app/services/operations-requests-service/operations-requests.service';
import { catchError, map, takeUntil } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CardInfoInterface, StartOperationRequestInterface } from 'src/app/models/operation';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.scss'],
  providers: [DestroyService]
})
export class NewAccountComponent implements OnInit {

  products$?: Observable<CardInfoInterface[]>;
  requestId?: number;
  codeOperation: StartOperationRequestInterface = {
    operationCode: 'AccountOpen'
  };

  constructor(
    private readonly operService: OperationsRequestsService,
    private readonly router: Router,
    private destroy$: DestroyService,
    private readonly messageService: MessageService,
  ) { }
  
  ngOnInit(): void {
    this.getAccountInfo();
  }

  getAccountInfo() {
    this.products$ = this.operService.getCardsInfo().pipe(
      map(products => products.filter(product => product.id === 1 || product.id === 2)),
      catchError(this.messageService.cardsAndAccountsOrClientErrorResponce.bind(this))
    );
  }

  newOrderClick(typeCard: string) {
    this.operService.startOperation(this.codeOperation)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (res) => {
        this.requestId = res.requestId;
        localStorage.setItem('requestId', this.requestId.toString());
        this.router.navigate(['/order'], {
          queryParams: {
              type: typeCard
          },
        });
      },
      error: (error) => {
        this.messageService.errorMessage('Ошибка операции');
      }
    });
  }

}
