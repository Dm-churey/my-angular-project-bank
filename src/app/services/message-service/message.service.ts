import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { EMPTY, Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class MessageService {

    constructor(private snackBar: MatSnackBar) {}

    public loginOrRegisterOrLogoutErrorResponce(error: any): void {
        this.snackBar.open(error.error || 'Произошла ошибка, попробуйте заново', 'Закрыть', {
            duration: 4000,
            panelClass: ['snackbar-container_error']
          });
    }

    public successResponce(message: string): void {
        this.snackBar.open(message, 'Закрыть', {
            duration: 4000,
            panelClass: ['snackbar-container_success']
        });
    }

    public cardsAndAccountsOrClientErrorResponce(error: any): Observable<any> {
        this.snackBar.open(error.error || 'Ошибка при загрузке данных', 'Закрыть', {
            duration: 4000,
            panelClass: ['snackbar-container_error']
        });
        return EMPTY;
    }

    public errorMessage(message: string): void {
        this.snackBar.open(message, 'Закрыть', {
            duration: 5000,
            panelClass: ['snackbar-container_error']
        });
    }
}