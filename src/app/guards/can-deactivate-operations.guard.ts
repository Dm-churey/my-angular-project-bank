import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from '@angular/router';
import { NewCardOrderComponent } from '../components/new-card-order/new-card-order.component';
import { ConfirmOrderComponent } from '../components/confirm-order/confirm-order.component';
import { OperationsRequestsService } from '../services/operations-requests-service/operations-requests.service';
import { DestroyService } from '../services/destroy-service/destroy.service';
import { takeUntil } from 'rxjs/operators';
import { MessageService } from '../services/message-service/message.service';

@Injectable({
  providedIn: 'root'
})
export class CanDeactivateOperationsGuard implements CanDeactivate<NewCardOrderComponent | ConfirmOrderComponent>{

  private excludeRoutes: string[] = ['/order'];
  
  constructor(private readonly operService: OperationsRequestsService, private destroy$: DestroyService, private readonly messadeService: MessageService) {}
  
  canDeactivate(
    component: NewCardOrderComponent | ConfirmOrderComponent,
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
    nextState: RouterStateSnapshot
  ) {

    const nextPath = nextState.url;

    if (this.excludeRoutes.some(excludePath => nextPath.startsWith(excludePath)) && component as ConfirmOrderComponent) {
      return true
    } else 
    if ((component as NewCardOrderComponent).successSend) {
      return true;
    } else if ((component as ConfirmOrderComponent).successSend) {
      return true
    } 
    const shouldExit = window.confirm('Операция будет отменена. Хотите продолжить выход со страницы?');

    if (shouldExit) {
      this.operService.deleteOperation().pipe(takeUntil(this.destroy$)).subscribe({
        next: () => {
          localStorage.removeItem('requestId');
        },
        error: () => {
          this.messadeService.errorMessage('Не удалось остановить операцию');
        }
      })
    }
    
    return shouldExit;
  }
  
}