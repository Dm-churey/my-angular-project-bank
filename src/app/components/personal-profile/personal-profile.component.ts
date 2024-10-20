import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';
import { MessageClass } from 'src/app/classes/message-class';
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
export class PersonalProfileComponent extends MessageClass implements OnInit {

  @Input() imageUrl: string = 'assets/images/bank-logo.svg';
  client$?: Observable<ClientInterface>;

  constructor(
    private readonly authService: AuthorizationService,
    private readonly clientService: ClientRequestsService,
    private readonly router: Router,
    private destroy$: DestroyService,
    snackBar: MatSnackBar,
  ) { super(snackBar) }

  ngOnInit(): void {
    this.getClientData();
  }

  getClientData() {
    this.client$ = this.clientService.getClient().pipe(
      catchError(this.getClientErrorResponce.bind(this))
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
        this.logoutErrorResponce(error);
      }
    });
  }

}