// import { TestBed } from '@angular/core/testing';
// import { RegistrationValidationService } from './registration-validation.service';
// import { AbstractControl } from '@angular/forms';

// describe('RegistrationValidationService', () => {
//   let service: RegistrationValidationService;
//   let abstractControl: AbstractControl;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       providers: [RegistrationValidationService]
//     });
//     service = TestBed.inject(RegistrationValidationService);
//     abstractControl = new AbstractControl();
//   });

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });

//   // phoneNumberValidator tests
//   describe('phoneNumberValidator', () => {
//     it('should return required error when phone number is empty', () => {
//       abstractControl.setValue('');
//       expect(service.phoneNumberValidator(abstractControl)).toEqual({ required: true });
//     });

//     it('should validate correct phone number format', () => {
//       abstractControl.setValue('+79123456789');
//       expect(service.phoneNumberValidator(abstractControl)).toBeNull();
//     });

//     it('should return invalid phone error for incorrect format', () => {
//       abstractControl.setValue('+7912345');
//       expect(service.phoneNumberValidator(abstractControl)).toEqual({ invalidPhone: true });
//     });

//     it('should allow phone numbers with spaces', () => {
//       abstractControl.setValue('+7 9123456789');
//       expect(service.phoneNumberValidator(abstractControl)).toBeNull();
//     });

//     it('should allow phone numbers with parentheses', () => {
//       abstractControl.setValue('+7(912)345-6789');
//       expect(service.phoneNumberValidator(abstractControl)).toBeNull();
//     });
//   });

//   // emailValidator tests
//   describe('emailValidator', () => {
//     it('should return required error when email is empty', () => {
//       abstractControl.setValue('');
//       expect(service.emailValidator(abstractControl)).toEqual({ required: true });
//     });

//     it('should validate correct email format', () => {
//       abstractControl.setValue('test@example.com');
//       expect(service.emailValidator(abstractControl)).toBeNull();
//     });

//     it('should return invalid characters error for incorrect format', () => {
//       abstractControl.setValue('invalid_email');
//       expect(service.emailValidator(abstractControl)).toEqual({ invalidCharacters: true });
//     });

//     it('should allow emails with periods in domain', () => {
//       abstractControl.setValue('user@subdomain.example.co.uk');
//       expect(service.emailValidator(abstractControl)).toBeNull();
//     });

//     it('should allow emails with hyphens in local part', () => {
//       abstractControl.setValue('user.name@example.com');
//       expect(service.emailValidator(abstractControl)).toBeNull();
//     });
//   });

//   // loginValidator tests
//   describe('loginValidator', () => {
//     it('should return required error when login is empty', () => {
//       abstractControl.setValue('');
//       expect(service.loginValidator(abstractControl)).toEqual({ required: true });
//     });

//     it('should validate correct login length', () => {
//       abstractControl.setValue('short_login');
//       expect(service.loginValidator(abstractControl)).toBeNull();
//     });

//     it('should return length error for too short login', () => {
//       abstractControl.setValue('sh');
//       expect(service.loginValidator(abstractControl)).toEqual({ length: true });
//     });

//     it('should return length error for too long login', () => {
//       abstractControl.setValue('verylonglogin');
//       expect(service.loginValidator(abstractControl)).toEqual({ length: true });
//     });

//     it('should return invalid characters error for special characters', () => {
//       abstractControl.setValue('login!@#$%^&*()_+-=');
//       expect(service.loginValidator(abstractControl)).toEqual({ invalidCharacters: true });
//     });

//     it('should allow logins with underscores', () => {
//       abstractControl.setValue('_valid_login');
//       expect(service.loginValidator(abstractControl)).toBeNull();
//     });

//     it('should allow logins with hyphens', () => {
//       abstractControl.setValue('hyphenated-login');
//       expect(service.loginValidator(abstractControl)).toBeNull();
//     });
//   });

//   // firstNameValidator tests
//   describe('firstNameValidator', () => {
//     it('should return required error when first name is empty', () => {
//       abstractControl.setValue('');
//       expect(service.firstNameValidator(abstractControl)).toEqual({ required: true });
//     });

//     it('should validate correct first name length', () => {
//       abstractControl.setValue('ValidFirstName');
//       expect(service.firstNameValidator(abstractControl)).toBeNull();
//     });

//     it('should return length error for too short first name', () => {
//       abstractControl.setValue('Sh');
//       expect(service.firstNameValidator(abstractControl)).toEqual({ length: true });
//     });

//     it('should return length error for too long first name', () => {
//       abstractControl.setValue('VeryLongFirstName');
//       expect(service.firstNameValidator(abstractControl)).toEqual({ length: true });
//     });

//     it('should return invalid characters error for non-Russian letters', () => {
//       abstractControl.setValue('InvalidName');
//       expect(service.firstNameValidator(abstractControl)).toEqual({ invalidCharacters: true });
//     });

//     it('should allow first names with hyphens', () => {
//       abstractControl.setValue('Hyphenated-Name');
//       expect(service.firstNameValidator(abstractControl)).toBeNull();
//     });
//   });

//   describe('addressValidator', () => {
//     it('should return required error when address is empty', () => {
//       abstractControl.setValue('');
//       expect(service.addressValidator(abstractControl)).toEqual({ required: true });
//     });

//     it('should validate correct address length', () => {
//       abstractControl.setValue('ValidAddress');
//       expect(service.addressValidator(abstractControl)).toBeNull();
//     });

//     it('should return length error for too short address', () => {
//       abstractControl.setValue('Sh');
//       expect(service.addressValidator(abstractControl)).toEqual({ length: true });
//     });

//     it('should return length error for too long address', () => {
//       abstractControl.setValue('VeryLongAddress');
//       expect(service.addressValidator(abstractControl)).toEqual({ length: true });
//     });

//     it('should return invalid characters error for consecutive spaces', () => {
//       abstractControl.setValue('Invalid Address   With Spaces');
//       expect(service.addressValidator(abstractControl)).toEqual({ invalidCharacters: true });
//     });

//     it('should allow addresses with commas', () => {
//       abstractControl.setValue('123 Main St, Anytown, USA');
//       expect(service.addressValidator(abstractControl)).toBeNull();
//     });
//   });

//   // passwordValidator tests
//   describe('passwordValidator', () => {
//     it('should return required error when password is empty', () => {
//       abstractControl.setValue('');
//       expect(service.passwordValidator(abstractControl)).toEqual({ required: true });
//     });

//     it('should validate correct password length', () => {
//       abstractControl.setValue('StrongPassword123!');
//       expect(service.passwordValidator(abstractControl)).toBeNull();
//     });

//     it('should return length error for too short password', () => {
//       abstractControl.setValue('Short');
//       expect(service.passwordValidator(abstractControl)).toEqual({ length: true });
//     });

//     it('should return length error for too long password', () => {
//       abstractControl.setValue('VeryLongPasswordThatIsTooLongForSecurity');
//       expect(service.passwordValidator(abstractControl)).toEqual({ length: true });
//     });

//     it('should return missing requirements error for passwords without uppercase letters', () => {
//       abstractControl.setValue('alllowercase');
//       expect(service.passwordValidator(abstractControl)).toEqual({ missingRequirements: true });
//     });

//     it('should return missing requirements error for passwords without special characters', () => {
//       abstractControl.setValue('AllNumbersAndLetters');
//       expect(service.passwordValidator(abstractControl)).toEqual({ missingRequirements: true });
//     });

//     it('should return spaces error for passwords containing spaces', () => {
//       abstractControl.setValue('Password With Spaces');
//       expect(service.passwordValidator(abstractControl)).toEqual({ spaces: true });
//     });
//   });

//   // confirmPasswordValidator tests
//   describe('confirmPasswordValidator', () => {
//     it('should return required error when confirm password is empty', () => {
//       abstractControl.setValue('');
//       expect(service.confirmPasswordValidator(abstractControl)).toEqual({ required: true });
//     });

//     // it('should match passwords correctly', () => {
//     //   abstractControl.setValue('password123!@#');
//     //   const passwordControl = new AbstractControl();
//     //   passwordControl.setValue('password123!@#');
//     //   expect(service.confirmPasswordValidator(abstractControl)).toBeNull();
//     // });

//     // it('should return mismatch error for non-matching passwords', () => {
//     //   abstractControl.setValue('different_password');
//     //   const passwordControl = new AbstractControl();
//     //   passwordControl.setValue('password123!@#');
//     //   expect(service.confirmPasswordValidator(abstractControl)).toEqual({ notMatch: true });
//     // });
//   });
// });