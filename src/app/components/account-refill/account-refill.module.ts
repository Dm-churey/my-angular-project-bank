import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { AccountRefillComponent } from './refill-component/account-refill.component';
import { HttpClientModule } from '@angular/common/http';
import { CanDeactivateOperationsGuard } from 'src/app/guards/can-deactivate-operations.guard';
import { RouterModule } from '@angular/router';
import { accountRefillRoutingModule } from './account-refill-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { ConfirmRefillComponent } from './confirm-refill/confirm-refill.component';
import { ConfirmRefillGuard } from './confirm-refill.guard';


@NgModule({
  declarations: [
    AccountRefillComponent,
    ConfirmRefillComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    accountRefillRoutingModule,
    NgxMaskModule.forRoot(),
  ],
  exports: [
    RouterModule
  ],
  providers: [
    CanDeactivateOperationsGuard,
    ConfirmRefillGuard,
  ]
})
export class AccountRefillModule { }
