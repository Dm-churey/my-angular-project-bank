import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError, filter, map, takeUntil } from 'rxjs/operators';
import { MessageService } from 'src/app/services/message-service/message.service';
import { ClientInterface } from 'src/app/models/client';
import { AuthorizationService } from 'src/app/services/authorization-service/authorization.service';
import { ClientRequestsService } from 'src/app/services/client-requests-service/client-requests.service';
import { DestroyService } from 'src/app/services/destroy-service/destroy.service';

@Component({
  selector: 'app-personal-profile',
  templateUrl: './personal-profile.component.html',
  styleUrls: ['./personal-profile.component.scss'],
  providers: [DestroyService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonalProfileComponent implements OnInit {

  @Input() imageUrl: string = 'assets/images/bank-logo.svg';
  client$?: Observable<ClientInterface>;

  constructor(
    private readonly authService: AuthorizationService,
    private readonly clientService: ClientRequestsService,
    private readonly router: Router,
    private destroy$: DestroyService,
    private readonly messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.client$ = this.clientService.client$.pipe(
      filter(client => !!client),
      map(client => client!),
      catchError(this.messageService.cardsAndAccountsOrClientErrorResponce.bind(this))
    );
  }

  onLogout() {
    this.authService.logoutUser()
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (error) => {
        this.messageService.loginOrRegisterOrLogoutErrorResponce(error);
      }
    });
  }

}