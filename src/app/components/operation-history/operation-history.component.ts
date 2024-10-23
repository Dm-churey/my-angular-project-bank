import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { OperationResponceInterface } from 'src/app/models/operation';
import { MessageService } from 'src/app/services/message-service/message.service';
import { OperationsRequestsService } from 'src/app/services/operations-requests-service/operations-requests.service';

@Component({
  selector: 'app-operation-history',
  templateUrl: './operation-history.component.html',
  styleUrls: ['./operation-history.component.scss']
})
export class OperationHistoryComponent implements OnInit {

  operations$?: Observable<OperationResponceInterface[]>;

  constructor(
    private readonly operService: OperationsRequestsService,
    private readonly messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.operations$ = this.operService.getOperationHistory().pipe(
      catchError(this.messageService.cardsAndAccountsOrClientErrorResponce.bind(this))
    )
  }

}
