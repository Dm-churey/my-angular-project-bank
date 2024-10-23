import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable()
export class ConfirmRefillGuard implements CanActivate {

  constructor(private readonly router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {

    const requestId = localStorage.getItem('requestId');

    if (requestId && requestId !== '') {
      return of(true);
    } else {
      this.router.navigate(['/home'], {
        queryParams: {
            operationDenied: true
        }
      })
      return of(false);
    }
  }
  
}