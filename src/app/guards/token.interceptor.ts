import { Injectable } from "@angular/core";
import { AuthorizationService } from "../services/authorization-service/authorization.service";
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Router } from "@angular/router";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(private readonly authService: AuthorizationService, private readonly router: Router) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.authService.isAuthenticated()) {
            const token = this.authService.getAccessToken();
            req = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                    //Authorization: this.authService.getAccessToken()
                }
            })
        }
        return next.handle(req).pipe(
            catchError(
                (error: HttpErrorResponse) => this.handleAuthError(error)
            )
        )
    }

    private handleAuthError(error: HttpErrorResponse): Observable<any> {
        if (error.status === 401) {
            this.router.navigate(['/main'], {
                queryParams: {
                    sessionFaild: true
                }
            })
        }

        return throwError(error)
    }

}