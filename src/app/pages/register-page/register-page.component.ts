import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistrationValidationService } from 'src/app/services/registration-validation/registration-validation.service';
import { AuthorizationService } from 'src/app/services/authorization-service/authorization.service';
import { Router } from '@angular/router';
import { RegisterInterface } from 'src/app/models/register';
import { Subscription, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators'
import { MatSnackBar } from '@angular/material/snack-bar';
import { DestroyService } from 'src/app/services/destroy-service/destroy.service';
import { ErrorsClass } from 'src/app/classes/errors-class';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
  providers: [DestroyService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterPageComponent extends ErrorsClass implements OnInit {
  registrationForm!: FormGroup;
  hidePassword = true;
  hideConfirmPassword = true;
  submitedForm: boolean = false;
  aSub!: Subscription;

  constructor(
    private readonly formBuilder: FormBuilder, 
    private readonly validationService: RegistrationValidationService, 
    private readonly router: Router,
    private readonly authService: AuthorizationService,
    @Inject(DestroyService) private destroy$: Observable<void>,
    snackBar: MatSnackBar,
  ) { super(snackBar) }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.registrationForm = this.formBuilder.group({
      phoneNumber: ['', [Validators.required, this.validationService.phoneNumberValidator]],
      login: ['', [Validators.required, this.validationService.loginValidator]],
      email: ['', [Validators.required, Validators.email, this.validationService.emailValidator]],
      firstName: ['', [Validators.required, this.validationService.firstNameValidator]],
      lastName: ['', [Validators.required, this.validationService.lastNameValidator]],
      middleName: ['', [Validators.required, this.validationService.middleNameValidator]],
      birthdate: ['', Validators.required],
      sex: ['', Validators.required],
      address: ['', [Validators.required, this.validationService.addressValidator]],
      password: ['', [Validators.required, this.validationService.passwordValidator]],
      confirmPassword: ['', [Validators.required, this.validationService.confirmPasswordValidator]]
    });
  }

  onPasswordChange(event: any) {
    const passwordControl = this.registrationForm.get('password');
    const confirmPasswordControl = this.registrationForm.get('confirmPassword');
  
    if (passwordControl && confirmPasswordControl) {
      passwordControl.updateValueAndValidity();
      confirmPasswordControl.updateValueAndValidity();
    }
  }

  togglePasswordVisibility(event: MouseEvent): void {
    event.stopPropagation();
    event.preventDefault();
    this.hidePassword = !this.hidePassword;
  }

  toggleConfirmPasswordVisibility(event: MouseEvent): void {
    event.stopPropagation();
    event.preventDefault();
    this.hideConfirmPassword = !this.hideConfirmPassword;
  }

  onSubmit() {
    if (this.registrationForm.valid) {

      const formValues = this.registrationForm.value;
    
      const userData: RegisterInterface = {
        login: formValues.login,
        email: formValues.email,
        firstName: formValues.firstName,
        lastName: formValues.lastName,
        middleName: formValues.middleName,
        birthdate: formValues.birthDate,
        sex: formValues.sex,
        phoneNumber: formValues.phoneNumber,
        address: formValues.address,
        password: formValues.password
      };

      this.registrationForm.disable();

      this.authService.registerUser(userData)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.submitedForm = true;
          alert("Регистрация прошла успешно, вы можете войти используя указанные учетные данные.");
          this.router.navigate(['/login'], {
            queryParams: {
              registered: true
            }
          });
        },
        error: (error) => {
          this.registerErrorResponce(error);
          //this.cdr.detectChanges();
          this.registrationForm.enable();
        }
      });
    }
  }

  getPhoneNumberErrorMessage() {
    const control = this.registrationForm.controls.phoneNumber;
    return control?.hasError('required') ? 'Обязательное поле' :
           control?.hasError('invalidPhone') ? 'Формат номера телефона должен соотвествовать +7 (___)___-__-__' : '';
  }

  getLoginErrorMessage() {
    const control = this.registrationForm.get('login');
    return control?.hasError('required') ? 'Обязательное поле' :
           control?.hasError('length') ? 'Длина логина должна быть от 1 до 50 символов' :
           control?.hasError('invalidCharacters') ? 'Значение содержит запрещенные символы' : '';
  }

  getEmailErrorMessage() {
    const control = this.registrationForm.get('email');
    return control?.hasError('required') ? 'Обязательное поле' :
           control?.hasError('invalidCharacters') || control?.hasError('email') ? 'Неверный формат email' : '';
  }

  getFirstNameErrorMessage() {
    const control = this.registrationForm.get('firstName');
    return control?.hasError('required') ? 'Обязательное поле' :
           control?.hasError('length') ? 'Фамилия должна содержать от 4 до 50 символов' :
           control?.hasError('invalidCharacters') ? 'Значение содержит запрещенные символы' : '';
  }

  getLastNameErrorMessage() {
    const control = this.registrationForm.get('lastName');
    return control?.hasError('required') ? 'Обязательное поле' :
           control?.hasError('length') ? 'Имя должна содержать от 4 до 50 символов' :
           control?.hasError('invalidCharacters') ? 'Значение содержит запрещенные символы' : '';
  }

  getMiddleNameErrorMessage() {
    const control = this.registrationForm.get('middleName');
    return control?.hasError('required') ? 'Обязательное поле' :
           control?.hasError('length') ? 'Отчество должна содержать от 4 до 50 символов' :
           control?.hasError('invalidCharacters') ? 'Значение содержит запрещенные символы' : '';
  }

  getBirthdateErrorMessage() {
    const control = this.registrationForm.get('birthdate');
    return control?.hasError('required') ? 'Обязательное поле' :
           control?.hasError('invalidAge') ? 'Ваш возраст должен быть от 18 до 100 лет' : '';
  }

  getSexErrorMessage() {
    const control = this.registrationForm.get('sex');
    return control?.hasError('required') ? 'Обязательное поле' : '';
  }

  getAddressErrorMessage() {
    const control = this.registrationForm.get('address');
    return control?.hasError('required') ? 'Обязательное поле' :
           control?.hasError('length') ? 'Адрес должен содержать от 1 до 100 символов' : 
           control?.hasError('invalidCharacters') ? 'Адрес содержит недопустимые символы' : '';
  }

  getPasswordErrorMessage() {
    const control = this.registrationForm.get('password');
    return control?.hasError('required') ? 'Обязательное поле' :
           control?.hasError('length') ? 'Пароль должен содержать от 9 до 30 символов' :
           control?.hasError('missingRequirements') ? 'Пароль должен содержать заглавные буквы и спецсимволы' :
           control?.hasError('spaces') ? 'Пароль не должен содержать пробелов' :
           control?.hasError('notMatch') ? 'Введенные пароли не совпадают' : '';
  }

  getConfirmPasswordErrorMessage() {
    const control = this.registrationForm.get('confirmPassword');
    return control?.hasError('required') ? 'Обязательное поле' :
           control?.hasError('notMatch') ? 'Введенные пароли не совпадают' : '';
  }
}