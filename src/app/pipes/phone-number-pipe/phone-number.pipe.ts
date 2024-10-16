import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneNumber'
})
export class PhoneNumberPipe implements PipeTransform {

  transform(phoneNumber: string): string {
    if (!phoneNumber) return '';
    
    const phone = phoneNumber.replace(/\D/g, '');
    const firstNumber = phone.slice(0, 1);
    const areaCode = phone.slice(1, 4);
    const restOfNumber = phone.slice(4, 11);
    const formattedNumber = `+${firstNumber}(${areaCode}) ${restOfNumber.slice(0, 3)}-${restOfNumber.slice(3, 5)}-${restOfNumber.slice(5)}`;
    return formattedNumber;
  }

}
