import { Injectable } from '@angular/core';
import { ClientInterface } from 'src/app/models/client';
import { ClientRequestsService } from 'src/app/services/client-requests-service/client-requests.service';

@Injectable({
  providedIn: 'root'
})
export class AgeValidationService {

  data: ClientInterface | null = null;

  constructor(private readonly clientService: ClientRequestsService) { }

  validateAge(): boolean {
    this.clientService.client$.subscribe(client => {
      this.data = client;
    });
    
    const birthdate = this.data?.birthdate;
    const gender = this.data?.sex;

    if (!birthdate || !gender) {
      return false;
    }

    const dateParts = birthdate.split('-');
    const year = parseInt(dateParts[0], 10);
    const month = parseInt(dateParts[1], 10);
    const day = parseInt(dateParts[2], 10);

    const birthDate = new Date(year, month - 1, day);
    
    const currentDate = new Date();
    const ageDifference = currentDate.getFullYear() - birthDate.getFullYear();

    if (gender === 'Male' && (ageDifference >= 18 && ageDifference <= 60)) {
      return true;
    }

    if (gender === 'Female' && (ageDifference >= 30 && ageDifference <= 50)) {
      return true;
    }

    return false;
  }
}
