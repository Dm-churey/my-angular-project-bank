import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from './services/authorization-service/authorization.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'internet-bank';

  constructor(private readonly authService: AuthorizationService) {}

  ngOnInit(): void {
      const mayBeToken = localStorage.getItem('auth-accessToken')

      if (mayBeToken !== null) {
        this.authService.setAccessToken(mayBeToken);
      }
  }
}
