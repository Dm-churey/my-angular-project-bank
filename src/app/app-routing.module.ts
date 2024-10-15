import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { DataChangesGuard } from './guards/can-deactivate-form.guard';
import { SitePageComponent } from './pages/site-page/site-page.component';

const routes: Routes = [
    { path: 'main', component: MainPageComponent },
    { path: 'login', component: LoginPageComponent },
    { path: 'registration', component: RegisterPageComponent, canDeactivate: [DataChangesGuard] },
    { path: '', redirectTo: '/main', pathMatch: 'full' },
    
    { 
        path: 'home', 
        component: SitePageComponent,
        children: []

    },
    { path: '**', component: NotFoundPageComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}