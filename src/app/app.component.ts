import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from './services/authorization-service/authorization.service';
import { ClientRequestsService } from './services/client-requests-service/client-requests.service';
import { DestroyService } from './services/destroy-service/destroy.service';
import { takeUntil } from 'rxjs/operators';
import { ClientInterface } from './models/client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [DestroyService]
})
export class AppComponent implements OnInit {
  title = 'internet-bank';

  constructor(
    private readonly authService: AuthorizationService,
    private readonly clientService: ClientRequestsService,
    private destroy$: DestroyService,
  ) {}

  ngOnInit(): void {
      const mayBeToken = localStorage.getItem('auth-accessToken')

      if (mayBeToken !== null) {
        this.authService.setAccessToken(mayBeToken);
        this.getUserData();
      }
  }

  getUserData(): void {
    this.clientService.getClient().pipe(takeUntil(this.destroy$)).subscribe(
      client => {
        this.clientService.setClientData(client);
      },
      error => {
        console.error('Ошибка при загрузке клиентских данных:', error);
      }
    );
  }
}
