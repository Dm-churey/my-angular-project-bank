import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError, map, takeUntil } from 'rxjs/operators';
import { MessageService } from 'src/app/services/message-service/message.service';
import { CardInfoInterface } from 'src/app/models/operation';
import { OperationsRequestsService } from 'src/app/services/operations-requests-service/operations-requests.service';
import { StartOperationRequestInterface } from 'src/app/models/operation'; 
import { DestroyService } from 'src/app/services/destroy-service/destroy.service';
import { AgeValidationService } from './age-validation-sevice/age-validation.service';

@Component({
  selector: 'app-new-card',
  templateUrl: './new-card.component.html',
  styleUrls: ['./new-card.component.scss'],
  providers: [DestroyService]
})
export class NewCardComponent implements OnInit {

  products$?: Observable<CardInfoInterface[]>;
  requestId?: number;
  codeOperation: StartOperationRequestInterface = {
    operationCode: 'CardOrder'
  };

  constructor(
    private readonly operService: OperationsRequestsService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly ageValidationService: AgeValidationService,
    private destroy$: DestroyService,
    private readonly messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.route.queryParams.pipe(takeUntil(this.destroy$)).subscribe((params: Params) => {
      if (params['orderDenied']) {
        this.messageService.errorMessage('Для начала начните заказ продукта');
      }
    });

    this.getCardInfo();
  }

  getCardInfo() {
    this.products$ = this.operService.getCardsInfo().pipe(
      map(products => products.filter(product => product.id === 3 || product.id === 4)),
      catchError(this.messageService.cardsAndAccountsOrClientErrorResponce.bind(this))
    );
  }

  newOrderClick(typeCard: string) {
    if (typeCard === 'Кредитная карта') {
      this.ageValidationService.validateAge();
      if (!this.ageValidationService.validateAge()) {
        this.messageService.errorMessage('Вы не попадаете по возрасту под программу выпуска кредитной карты');
        return;
      }
    }
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
