import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OperationsGuard implements CanActivate {

  constructor(private readonly router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {

    const requestId = localStorage.getItem('requestId');

    if (requestId && requestId !== '') {
      return of(true);
    } else {
      this.router.navigate(['/new-card'], {
        queryParams: {
            orderDenied: true
        }
      })
      return of(false);
    }
  }
  
}
