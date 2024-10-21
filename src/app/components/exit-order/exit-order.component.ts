import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { MessageService } from 'src/app/services/message-service/message.service';
import { DestroyService } from 'src/app/services/destroy-service/destroy.service';

@Component({
  selector: 'app-exit-order',
  templateUrl: './exit-order.component.html',
  styleUrls: ['./exit-order.component.scss'],
  providers: [DestroyService]
})
export class ExitOrderComponent implements OnInit {

  typeProduct: string = '';
  titleText: string = '';

  constructor(
    private readonly route: ActivatedRoute,
    private destroy$: DestroyService,
    private readonly messageService: MessageService,
  ) {}

  ngOnInit(): void {
    this.route.queryParams.pipe(takeUntil(this.destroy$)).subscribe((params: Params) => {
      this.typeProduct = params['type'];
      if (params['operationConfirmed']) {
        this.messageService.successResponce('Операция выполнена успешно');
      }
    });
    if (this.typeProduct === 'Кредитная карта' || this.typeProduct === 'Дебетовая карта') {
      this.titleText = 'Банковские карты';
    } else {
      this.titleText = 'Счета';
    }
  }

}
