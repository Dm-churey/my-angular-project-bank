import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators'
import { MessageClass } from 'src/app/classes/message-class';
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
export class LoginPageComponent extends MessageClass implements OnInit {

  loginForm!: FormGroup;
  hidePassword = true;
  aSub!: Subscription;

  constructor(
    private readonly formBuilder: FormBuilder, 
    private readonly authService: AuthorizationService, 
    private readonly router: Router, 
    private readonly route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    @Inject(DestroyService) private destroy$: Observable<void>,
    snackBar: MatSnackBar,      
  ) { super(snackBar) }

  ngOnInit(): void {
    this.initForm();

    this.route.queryParams.pipe(takeUntil(this.destroy$)).subscribe((params: Params) => {
      if (params['registered']) {
        this.registerSuccessResponce();
      } else if (params['accessDenied']) {
        this.authErrorResponce();
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
          this.loginErrorResponce(error);
          this.cdr.detectChanges();
          this.loginForm.enable();
        }
      });
    }
  }

}
