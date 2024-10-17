import { NgModule } from '@angular/core';
import { LoginPageComponent } from './login-page-component/login-page.component';
import { RouterModule, Routes } from '@angular/router';

const loginRoutes: Routes = [
  { path: '', component: LoginPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(loginRoutes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
