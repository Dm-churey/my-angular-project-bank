import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginIntreface } from 'src/app/models/login';
import { AuthorizationService } from 'src/app/services/authorization-service/authorization.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginPageComponent implements OnInit, OnDestroy {

  loginForm!: FormGroup;
  hidePassword = true;
  aSub!: Subscription;
  errorMessage: any;

  constructor(private readonly formBuilder: FormBuilder, 
              private readonly authService: AuthorizationService, 
              private readonly router: Router, 
              private readonly route: ActivatedRoute,
              private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.initForm();
  }

  ngOnDestroy(): void {
    if (this.aSub) {
      this.aSub.unsubscribe();
    }
  }

  initForm() {
    this.loginForm = this.formBuilder.group({
      login: ['', [Validators.required]],
      password: ['', Validators.required]
    });

    this.route.queryParams.subscribe((params: Params) => {
      if (params['registered']) {
        //Сообщение (теперь вы можете войти в систему, используя свли данные)
      } else if (params['accessDenied']) {
        //Сообщение (для начала авторизуйтесь в системе)
      }
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

      this.aSub = this.authService.loginUser(loginData).subscribe({
        next: () => {
          this.router.navigate(['/home']);
        },
        error: (error) => {
          this.errorMessage = error.error || 'Произошла ошибка при входе';
          this.cdr.detectChanges();
          this.loginForm.enable();
        }
      });
    }
  }

}
