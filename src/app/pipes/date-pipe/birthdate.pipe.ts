import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'birthdate'
})
export class BirthdatePipe implements PipeTransform {

  transform(birthdate: string): string {
    if (!birthdate) return '';
    
    const birthDate = new Date(birthdate);
    const day = birthDate.getDate().toString().padStart(2, '0');
    const month = (birthDate.getMonth() + 1).toString().padStart(2, '0');
    const year = birthDate.getFullYear();
    return `${day}.${month}.${year}`;
  }

}
