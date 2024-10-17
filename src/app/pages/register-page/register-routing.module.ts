import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterPageComponent } from './register-page-component/register-page.component';
import { DataChangesGuard } from 'src/app/guards/can-deactivate-form.guard';

const registerRoutes: Routes = [
  { path: '', component: RegisterPageComponent, canDeactivate: [DataChangesGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(registerRoutes)],
  exports: [RouterModule]
})
export class RegisterRoutingModule { }
