import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorsClass } from 'src/app/classes/errors-class';
import { DestroyService } from 'src/app/services/destroy-service/destroy.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  providers: [DestroyService],
})
export class MainPageComponent extends ErrorsClass implements OnInit {

  @Input() welcomeTextHeader: string = '';
  @Input() welcomeTextBody: string = '';

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private destroy$: DestroyService,
    snackBar: MatSnackBar
  ) {super(snackBar)}

  ngOnInit(): void {
    this.welcomeTextHeader = 'Добро пожаловать в лучший интернет-банк "Best Банк"';
    this.welcomeTextBody = 'Чтобы начать пользоваться нашими предложениями прямо сейчас, выполните вход в личный кабинет или пройдите регистрацию';
  
    this.route.queryParams.pipe(takeUntil(this.destroy$)).subscribe((params: Params) => {
      if (params['sessionFaild']) {
        this.sessionErrorResponce();
      }
    })
  }

  clickToLogin(): void {
    this.router.navigate(['/login']);
  }

  clickToRegister(): void {
    this.router.navigate(['/registration'])
  }

}