import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { MessageService } from 'src/app/services/message-service/message.service';
import { AccountDataInterface } from 'src/app/models/account';
import { CardDataInterface } from 'src/app/models/card';
import { AccountsRequestsService } from 'src/app/services/accounts-requests-service/accounts-requests.service';
import { CardsRequestsService } from 'src/app/services/cadrs-requests-service/cards-requests.service';
import { ClientRequestsService } from 'src/app/services/client-requests-service/client-requests.service';
import { DestroyService } from 'src/app/services/destroy-service/destroy.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [DestroyService],
})
export class DashboardComponent implements OnInit {

  cards: CardDataInterface[] = [];
  accounts: AccountDataInterface[] = [];
  loadingCard: boolean = false;
  loadingAccount: boolean = false;

  constructor(
    private readonly cardsReqService: CardsRequestsService,
    private readonly accountsReqService: AccountsRequestsService,
    private readonly clientService: ClientRequestsService,
    private readonly messageService: MessageService,
    private readonly route: ActivatedRoute,
    private destroy$: DestroyService
  ) { }

  ngOnInit(): void {
    this.loadingCard = true;
    this.loadingAccount = true;
    this.loadCards();
    this.loadAccounts();
    this.getClient();

    this.route.queryParams.pipe(takeUntil(this.destroy$)).subscribe((params: Params) => {
      if (params['operationError']) {
        this.messageService.errorMessage('Ошибка операции');
      } else if (params['operationDenied']) {
        this.messageService.errorMessage('Для начала выберите операцию');
      }
    });
  }

  getClient(): void {
    const token = localStorage.getItem('auth-accessToken');
    if (token && token !== null) {
      this.clientService.getClient().pipe(takeUntil(this.destroy$)).subscribe(
        client => {
          this.clientService.setClientData(client);
        },
        error => {
          this.messageService.cardsAndAccountsOrClientErrorResponce(error);
        }
      );
    }
  }

  loadCards(): void {
    this.cardsReqService.getUserCadrs()
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (cards) => {
        this.loadingCard = false;
        this.cards = cards;
      },
      error: (error) => {
        this.messageService.cardsAndAccountsOrClientErrorResponce(error);
      }
    });
  }

  loadAccounts(): void {
    this.accountsReqService.getUserAccounts()
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (accounts) => {
        this.loadingAccount = false;
        this.accounts = accounts;
      },
      error: (error) => {
        this.messageService.cardsAndAccountsOrClientErrorResponce(error);
      }
    });
  }

  formatCardNumber(number: string): string {
    return `${number.slice(0, 4)}-${number.slice(4, 8)}-${number.slice(8, 12)}-${number.slice(12, 16)}`;
  }

  trackCard(index: number, card: CardDataInterface): number {
    return card.id;
  }
  
  trackAccount(index: number, account: AccountDataInterface): number {
    return account.id;
  }

  getCardImageUrl(cardProgram: string): string {
    switch (cardProgram) {
      case 'МИР':
        return 'assets/images/mir_white.svg';
      case 'Visa':
        return 'assets/images/visa.svg';
      case 'Mastercard':
        return 'assets/images/master-card.svg';
      case 'Maestro':
        return 'assets/images/maestro.svg';
      default:
        return '';
    }
  }
}