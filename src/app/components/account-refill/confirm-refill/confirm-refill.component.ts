import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError, filter, map, takeUntil } from 'rxjs/operators';
import { ClientInterface } from 'src/app/models/client';
import { OperationStepDetails } from 'src/app/models/operation';
import { ClientRequestsService } from 'src/app/services/client-requests-service/client-requests.service';
import { DestroyService } from 'src/app/services/destroy-service/destroy.service';
import { MessageService } from 'src/app/services/message-service/message.service';
import { OperationsRequestsService } from 'src/app/services/operations-requests-service/operations-requests.service';

@Component({
  selector: 'app-confirm-refill',
  templateUrl: './confirm-refill.component.html',
  styleUrls: ['./confirm-refill.component.scss']
})
export class ConfirmRefillComponent implements OnInit {

  client$?: Observable<ClientInterface>;
  operation$?: Observable<OperationStepDetails>;
  loaderRun: boolean = false;
  successSend: boolean = false;
  
  constructor(
    private readonly clientService: ClientRequestsService,
    private readonly messageService: MessageService,
    private readonly operService: OperationsRequestsService,
    private readonly destroy$: DestroyService,
    private readonly router: Router,
  ) { }

  ngOnInit(): void {
    //this.loaderRun = true;
    this.getClientData();
    this.getRefillData();
  }

  getClientData(): void {
    this.client$ = this.clientService.client$.pipe(
      filter(client => !!client),
      map(client => client!),
      catchError(this.messageService.cardsAndAccountsOrClientErrorResponce.bind(this))
    );
  }

  getRefillData(): void {
    this.operation$ = this.operService.operationStep$.pipe(
      filter(operation => !!operation),
      map(operation => operation!),
      catchError(this.messageService.cardsAndAccountsOrClientErrorResponce.bind(this))
    )
  }

  onConfirm(): void {
    this.loaderRun = true;
    this.operService.confirmOperaton().pipe(takeUntil(this.destroy$)).subscribe({
      next: () => {
        this.loaderRun = false;
        this.successSend = true;
        localStorage.removeItem('requestId');
        this.router.navigate(['refill-account/exit-order'], {
          queryParams: {
              operationConfirmed: true
          }
        });
      },
      error: () => {
        this.loaderRun = false;
        this.messageService.errorMessage('Ошибка операции');
      }
    });
  }

}
