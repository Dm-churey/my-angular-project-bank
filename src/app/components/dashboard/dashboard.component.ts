import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { takeUntil } from 'rxjs/operators';
import { MessageClass } from 'src/app/classes/message-class';
import { AccountDataInterface } from 'src/app/models/account';
import { CardDataInterface } from 'src/app/models/card';
import { AccountsRequestsService } from 'src/app/services/accounts-requests-service/accounts-requests.service';
import { CardsRequestsService } from 'src/app/services/cadrs-requests-service/cards-requests.service';
import { DestroyService } from 'src/app/services/destroy-service/destroy.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [DestroyService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent extends MessageClass implements OnInit {

  cards: CardDataInterface[] = [];
  accounts: AccountDataInterface[] = [];
  loadingCard: boolean = false;
  loadingAccount: boolean = false;

  constructor(
    private readonly cardsReqService: CardsRequestsService,
    private readonly accountsReqService: AccountsRequestsService,
    snackBar: MatSnackBar,
    private destroy$: DestroyService
  ) { super(snackBar) }

  ngOnInit(): void {
    this.loadingCard = true;
    this.loadingAccount = true;
    this.loadCards();
    this.loadAccounts();
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
        this.cardsAndAccountsErrorResponce(error);
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
        this.cardsAndAccountsErrorResponce(error);
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
      case 'MasterCard':
        return 'assets/images/master-card.svg';
      case 'Maestro':
        return 'assets/images/maestro.svg';
      default:
        return '';
    }
  }
}