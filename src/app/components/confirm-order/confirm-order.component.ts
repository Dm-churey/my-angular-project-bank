import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { MessageService } from 'src/app/services/message-service/message.service';
import { ClientInterface } from 'src/app/models/client';
import { ClientRequestsService } from 'src/app/services/client-requests-service/client-requests.service';
import { DestroyService } from 'src/app/services/destroy-service/destroy.service';
import { OperationsRequestsService } from 'src/app/services/operations-requests-service/operations-requests.service';

@Component({
  selector: 'app-confirm-order',
  templateUrl: './confirm-order.component.html',
  styleUrls: ['./confirm-order.component.scss'],
  providers: [DestroyService]
})
export class ConfirmOrderComponent implements OnInit {

  typeProduct: string = '';
  detailsOrder: string = '';
  titleText: string = '';
  loaderRun: boolean = false;
  clientData: ClientInterface | null = null;
  successSend: boolean = false;

  constructor(
    private readonly operService: OperationsRequestsService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private destroy$: DestroyService,
    private readonly clientService: ClientRequestsService,
    private readonly messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.route.queryParams.pipe(takeUntil(this.destroy$)).subscribe((params: Params) => {
      this.typeProduct = params['type'];
      this.detailsOrder = params['details'];
    });
    if (this.typeProduct === 'Кредитная карта' || this.typeProduct === 'Дебетовая карта') {
      this.titleText = 'Банковские карты';
    } else {
      this.titleText = 'Счета';
    }

    this.clientService.client$.subscribe(client => {
      this.clientData = client;
    });
    
  }

  onConfirm() {
    this.loaderRun = true;
    this.operService.confirmOperaton().pipe(takeUntil(this.destroy$)).subscribe({
      next: () => {
        this.loaderRun = false;
        this.successSend = true;
        localStorage.removeItem('requestId');
        this.router.navigate(['/exit-order'], {
          queryParams: {
              operationConfirmed: true
          },
          queryParamsHandling: 'merge'
        });
      },
      error: () => {
        this.loaderRun = false;
        this.messageService.errorMessage('Ошибка операции');
      }
    });
  }

}
