import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { MessageService } from 'src/app/services/message-service/message.service';
import { DestroyService } from 'src/app/services/destroy-service/destroy.service';
import { OperationsRequestsService } from 'src/app/services/operations-requests-service/operations-requests.service';

@Component({
  selector: 'app-new-card-order',
  templateUrl: './new-card-order.component.html',
  styleUrls: ['./new-card-order.component.scss'],
  providers: [DestroyService]
})
export class NewCardOrderComponent implements OnInit {

  typeProduct: string = '';
  titleText: string = '';
  actionText: string = '';
  buttonText: string = '';
  loaderRun: boolean = false;
  successSend: boolean = false;
  selectedRadioButton: string | null = null;

  constructor(
    private readonly operService: OperationsRequestsService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly messageService: MessageService,
    private destroy$: DestroyService,
  ) { }

  ngOnInit(): void {
    this.route.queryParams.pipe(takeUntil(this.destroy$)).subscribe((params: Params) => {
      this.typeProduct = params['type']
    });
    if (this.typeProduct === 'Кредитная карта' || this.typeProduct === 'Дебетовая карта') {
      this.titleText = 'Банковские карты';
      this.actionText = 'Выберете платёжную систему';
      this.buttonText = 'Заказать карту'
    } else {
      this.titleText = 'Счета'
      this.actionText = 'Выберете валюту';
      this.buttonText = 'Открыть счёт';
    }
  }

  orderCardClick() {
    this.loaderRun = true;
    if (this.selectedRadioButton !== null && this.typeProduct !== '') {
      this.operService.secondStepOperation(this.selectedRadioButton, this.typeProduct)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.loaderRun = false;
          this.successSend = true;
          this.router.navigate(['/confirm-order'], {
            queryParams: {
                details: this.selectedRadioButton
            },
            queryParamsHandling: 'merge'
          });
        },
        error: (error) => {
          this.loaderRun = false;
          this.messageService.errorMessage('Ошибка операции');
        }
      })
    } else if (this.selectedRadioButton === null) {
      this.loaderRun = false;
      alert('Ошибка выбора платежной системы');
    } else if (this.typeProduct === '') {
      this.loaderRun = false;
      alert('Ошибка выбора типа карты');
    }
  }
}