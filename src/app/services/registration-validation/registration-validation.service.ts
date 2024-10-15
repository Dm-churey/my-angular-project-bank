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

  emailValidator(control: AbstractControl): ValidationErrors | null {
    const email = control.value;
    const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!email) {
      return { required: true };
    }

    if (!pattern.test(email)) {
      return { invalidCharacters: true };
    }

    return null;
  }

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

  // birthDateValidator(control: AbstractControl): ValidationErrors | null {
  //   const birthDate = control.value;
    
  //   if (!birthDate) {
  //     return { required: true };
  //   }

  //   const currentDate = new Date();
  //   const birthYear = new Date(birthDate).getFullYear();
  //   const age = currentDate.getFullYear() - birthYear;

  //   if (age < 18 || age > 100) {
  //     return { invalidAge: true };
  //   }

  //   return null;
  // }

  addressValidator(control: AbstractControl): ValidationErrors | null {
    const address = control.value;

    if (!address) {
      return { required: true };
    }

    if (address.length < 1 || address.length > 100) {
      return { length: true };
    }

    if (!/^(?!.*\s{2})[^\s].*[^\s]$/.test(address)) {
      return { invalidCharacters: true };
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

    if (!/^(?!.*\s)/.test(password)) {
      return { spaces: true };
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