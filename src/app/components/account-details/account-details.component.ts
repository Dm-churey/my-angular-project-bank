import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { of } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { AccountDataInterface } from 'src/app/models/account';
import { AccountsRequestsService } from 'src/app/services/accounts-requests-service/accounts-requests.service';
import { DestroyService } from 'src/app/services/destroy-service/destroy.service';
import { MessageService } from 'src/app/services/message-service/message.service';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss'],
  providers: [DestroyService],
})
export class AccountDetailsComponent implements OnInit {

  account?: AccountDataInterface;
  buttonText: string = '';
  loading: boolean = false;

  constructor(
    private readonly accountsService: AccountsRequestsService,
    private readonly route: ActivatedRoute,
    private readonly destroy$: DestroyService,
    private readonly messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.route.params.pipe(
      takeUntil(this.destroy$),
      switchMap(
        (params: Params) => {
          if (params['id']) {
            return this.accountsService.getUserAccountById(params['id'])
          }
          return of(null)
        }
      )
    ).subscribe(
      account => {
        if (account) {
          this.account = account;
        }
      },
      error => {
        this.messageService.errorMessage('Ошибка загрузки данных счёта');
      }
    )
  }

  onLockAccount(message: string, id: number): void {
    this.loading = true;
    if (message === 'Заблокировать') {
      this.accountsService.lockAccountById(id).pipe(takeUntil(this.destroy$)).subscribe(
        lockAccount => {
          this.loading = false;
          this.account = lockAccount;
          this.messageService.successResponce('Счёт заблокирован успешно');
        },
        error => {
          this.loading = false
          this.messageService.errorMessage('Ошибка обновления данных');
        }
      )
    } else if (message === 'Разблокировать') {
      this.accountsService.unlockAccountById(id).pipe(takeUntil(this.destroy$)).subscribe(
        unlockAccount => {
          this.loading = false;
          this.account = unlockAccount;
          this.messageService.successResponce('Счёт разблокирован успешно');
        },
        error => {
          this.loading = false;
          this.messageService.errorMessage('Ошибка обновления данных');
        }
      )
    }
  }


}
