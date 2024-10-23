import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountRefillComponent } from './refill-component/account-refill.component';
import { CanDeactivateOperationsGuard } from 'src/app/guards/can-deactivate-operations.guard';
import { ExitOrderComponent } from '../exit-order/exit-order.component';
import { ConfirmRefillComponent } from './confirm-refill/confirm-refill.component';
import { ConfirmRefillGuard } from './confirm-refill.guard';

const refillRoutes: Routes = [
  { path: '', component: AccountRefillComponent, canDeactivate: [CanDeactivateOperationsGuard] },
  { path: 'confirm-refill', component: ConfirmRefillComponent, canActivate: [ConfirmRefillGuard], canDeactivate: [CanDeactivateOperationsGuard] },
  { path: 'exit-order', component: ExitOrderComponent },
];

@NgModule({
  imports: [RouterModule.forChild(refillRoutes)],
  exports: [RouterModule]
})
export class accountRefillRoutingModule { }