import { MatSnackBar } from "@angular/material/snack-bar";
import { EMPTY, Observable } from "rxjs";

export class MessageClass {

    constructor(private snackBar: MatSnackBar) {}

    loginErrorResponce(error: any) {
        this.snackBar.open(error.error, 'Закрыть', {
            duration: 4000,
            panelClass: ['snackbar-container_error']
          });
    }

    authErrorResponce() {
        this.snackBar.open('Для начала авторизуйтесь в системе', 'Закрыть', {
            duration: 4000,
            panelClass: ['snackbar-container_error']
        });
    }

    registerErrorResponce(error: any) {
        this.snackBar.open(error.error, 'Закрыть', {
            duration: 4000,
            panelClass: ['snackbar-container_error']
        })
    }

    registerSuccessResponce() {
        this.snackBar.open('Теперь вы можете войти в систему, используя свои данные', 'Закрыть', {
            duration: 4000,
            panelClass: ['snackbar-container_success']
        });
    }

    sessionErrorResponce() {
        this.snackBar.open('Пожалуйста войдите в систему заново', 'Закрыть', {
            duration: 4000,
            panelClass: ['snackbar-container_error']
        });
    }

    cardsAndAccountsErrorResponce(error: any) {
        this.snackBar.open(error.error || 'Ошибка при загрузке данных', 'Закрыть', {
            duration: 4000,
            panelClass: ['snackbar-container_error']
        });
    }

    getClientErrorResponce(error: any): Observable<any> {
        this.snackBar.open(error.error || 'Ошибка при загрузке данных пользователя', 'Закрыть', {
            duration: 4000,
            panelClass: ['snackbar-container_error']
        });
        return EMPTY;
    }

    logoutErrorResponce(error: any) {
        this.snackBar.open(error.error || 'Произошла ошибка, попробуйте заново', 'Закрыть', {
            duration: 4000,
            panelClass: ['snackbar-container_error']
        });
    }
}