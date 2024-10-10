import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class RegistrationValidationService {

  phoneNumberValidator(control: AbstractControl): ValidationErrors | null {
    const phone = `+${control.value}`;
    const pattern = /^\+7\d{10}$/;
    //const pattern = /^\+7 \(\d{3}\)\s\d{3}-\d{2}-\d{2}$/;
      
    if (!phone) {
      return { required: true };
    }

    if (!pattern.test(phone.replace(/[\(\)\-\s]/g, ''))) {
      return { invalidPhone: true };
    }

    return null;
  };

  loginValidator(control: AbstractControl): ValidationErrors | null {
    const login = control.value.toLowerCase();
      
    if (!login) {
      return { required: true };
    }

    if (login.length < 1 || login.length > 50) {
      return { length: true };
    }

    if (!/^[a-zA-Z0-9_-]+$/.test(login)) {
      return { invalidCharacters: true };
    }

    return null;
  };

  firstNameValidator(control: AbstractControl): ValidationErrors | null {
    const firstName = control.value;

    if (!firstName) {
      return { required: true };
    }

    if (firstName.length < 4 || firstName.length > 50) {
      return { length: true };
    }

    if (!/^[А-ЯЁа-яё\-]+$/.test(firstName)) {
      return { invalidCharacters: true };
    }

    return null;
  };

  lastNameValidator(control: AbstractControl): ValidationErrors | null {
    const lastName = control.value;

    if (!lastName) {
      return { required: true };
    }

    if (lastName.length < 4 || lastName.length > 50) {
      return { length: true };
    }

    if (!/^[А-ЯЁа-яё\-]+$/.test(lastName)) {
      return { invalidCharacters: true };
    }

    return null;
  };

  middleNameValidator(control: AbstractControl): ValidationErrors | null {
    const middleName = control.value;

    if (!middleName) {
      return { required: true };
    }

    if (middleName.length < 4 || middleName.length > 50) {
      return { length: true };
    }

    if (!/^[А-ЯЁа-яё\-]+$/.test(middleName)) {
      return { invalidCharacters: true };
    }

    return null;
  };

  addressValidator(control: AbstractControl): ValidationErrors | null {
    const address = control.value;

    if (!address) {
      return { required: true };
    }

    if (address.length < 1 || address.length > 100) {
      return { length: true };
    }

    return null;
  };

  passwordValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.value;

    if (!password) {
      return { required: true };
    }

    if (password.length < 9 || password.length > 30) {
      return { length: true };
    }

    if (!/^(?=.*[A-ZА-Я])(?=.*[!@#$&*()_+\-=]).+$/.test(password)) {
      return { missingRequirements: true };
    }

    return null;
  };

  confirmPasswordValidator(control: AbstractControl): ValidationErrors | null {
    const confirmPassword = control.value;
    const password = control.parent?.get('password')?.value;

    if (!confirmPassword) {
      return { required: true };
    }

    if (confirmPassword !== password) {
      return { notMatch: true };
    }

    return null;
  }; 

}