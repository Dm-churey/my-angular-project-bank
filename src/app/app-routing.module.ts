import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { SitePageComponent } from './pages/site-page/site-page.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DataChangesGuard } from './guards/can-deactivate-form.guard';
import { AuthGuard } from './guards/auth.guard';
import { PersonalProfileComponent } from './components/personal-profile/personal-profile.component';

const routes: Routes = [
    { path: 'main', component: MainPageComponent },
    { path: 'login', component: LoginPageComponent },
    { path: 'registration', component: RegisterPageComponent, canDeactivate: [DataChangesGuard] },
    //{ path: '', redirectTo: '/main', pathMatch: 'full' },
    
    { 
        path: '', 
        component: SitePageComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', redirectTo: '/home', pathMatch: 'full' },
            { path: 'home', component: DashboardComponent },
            { path: 'profile', component: PersonalProfileComponent },
        ]

    },
    { path: '**', component: NotFoundPageComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}