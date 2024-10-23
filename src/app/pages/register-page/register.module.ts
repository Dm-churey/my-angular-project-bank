import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RegisterRoutingModule } from './register-routing.module';
import { RegisterPageComponent } from './register-page-component/register-page.component';
import { DataChangesGuard } from 'src/app/guards/can-deactivate-form.guard';
import { APP_DATE_FORMATS, AppDateAdapter } from 'src/app/adapters/date-adapter';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { NgxMaskModule } from 'ngx-mask';
import { RegistrationValidationService } from './registration-validation/registration-validation.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    RegisterPageComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    HttpClientModule,
    RegisterRoutingModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
  ],
  exports: [
    RouterModule,
  ],
  providers: [
    DataChangesGuard,
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS },
    RegistrationValidationService
  ]
})
export class RegisterModule { }
