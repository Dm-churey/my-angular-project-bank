import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators'
import { MessageService } from 'src/app/services/message-service/message.service';
import { LoginIntreface } from 'src/app/models/login';
import { AuthorizationService } from 'src/app/services/authorization-service/authorization.service';
import { DestroyService } from 'src/app/services/destroy-service/destroy.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  providers: [DestroyService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginPageComponent implements OnInit {

  loginForm!: FormGroup;
  hidePassword = true;

  constructor(
    private readonly formBuilder: FormBuilder, 
    private readonly authService: AuthorizationService, 
    private readonly router: Router, 
    private readonly route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private destroy$: DestroyService,
    private readonly messageService: MessageService,     
  ) { }

  ngOnInit(): void {
    this.initForm();

    this.route.queryParams.pipe(takeUntil(this.destroy$)).subscribe((params: Params) => {
      if (params['registered']) {
        this.messageService.successResponce('Теперь вы можете войти в систему, используя свои данные');
      } else if (params['accessDenied']) {
        this.messageService.errorMessage('Для начала авторизуйтесь в системе');
      }
    });
  }

  initForm() {
    this.loginForm = this.formBuilder.group({
      login: ['', [Validators.required]],
      password: ['', Validators.required]
    });
  }

  togglePasswordVisibility(event: MouseEvent): void {
    event.stopPropagation();
    event.preventDefault();
    this.hidePassword = !this.hidePassword;
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const loginData: LoginIntreface = this.loginForm.value;
      this.loginForm.disable();

      this.authService.loginUser(loginData)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.router.navigate(['/home']);
        },
        error: (error) => {
          this.messageService.loginOrRegisterOrLogoutErrorResponce(error);
          this.cdr.detectChanges();
          this.loginForm.enable();
        }
      });
    }
  }

}
