import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  @Input() welcomeTextHeader: string = '';
  @Input() welcomeTextBody: string = '';

  constructor(private readonly router: Router) {}

  ngOnInit(): void {
    this.welcomeTextHeader = 'Добро пожаловать в лучший интернет-банк "Best Bank"';
    this.welcomeTextBody = 'Чтобы начать пользоваться нашими предложениями прямо сейчас, выполните вход в личный кабинет или пройдите регистрацию';
  }

  clickToLogin(): void {
    this.router.navigate(['/login']);
  }

  clickToRegister(): void {
    this.router.navigate(['/registration'])
  }

}
