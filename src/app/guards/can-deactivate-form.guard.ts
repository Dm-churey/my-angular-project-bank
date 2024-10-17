import { Injectable } from "@angular/core";
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { RegisterPageComponent } from "../pages/register-page/register-page-component/register-page.component";

@Injectable()
export class DataChangesGuard
  implements CanDeactivate<RegisterPageComponent> {
  constructor() {}

  canDeactivate(
    component: RegisterPageComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState: RouterStateSnapshot
  ) {
    if (component.registrationForm.dirty && !component.submitedForm)
      return window.confirm(
        'Данные будут потеряны. Хотите продолжить выход со страницы?'
      );
    else return true;
  }
}