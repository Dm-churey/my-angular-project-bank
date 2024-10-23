import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { SitePageComponent } from './pages/site-page/site-page.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { PersonalProfileComponent } from './components/personal-profile/personal-profile.component';
import { NewCardComponent } from './components/new-card/new-card.component';
import { NewCardOrderComponent } from './components/new-card-order/new-card-order.component';
import { OperationsGuard } from './guards/operations.guard';
import { ConfirmOrderComponent } from './components/confirm-order/confirm-order.component';
import { CanDeactivateOperationsGuard } from './guards/can-deactivate-operations.guard';
import { ExitOrderComponent } from './components/exit-order/exit-order.component';
import { NewAccountComponent } from './components/new-account/new-account.component';
import { AccountDetailsComponent } from './components/account-details/account-details.component';
import { OperationHistoryComponent } from './components/operation-history/operation-history.component';

const routes: Routes = [
    { path: 'main', component: MainPageComponent },
    { 
        path: 'login',
        loadChildren: () =>
            import('./pages/login-page/login.module').then(
                m => m.LoginModule
            ),
     },
    { 
        path: 'registration', 
        loadChildren: () =>
            import('./pages/register-page/register.module').then(
                m => m.RegisterModule
            ),
    },
    { 
        path: '', 
        component: SitePageComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', redirectTo: '/home', pathMatch: 'full' },
            { path: 'home', component: DashboardComponent },
            { path: 'profile', component: PersonalProfileComponent },
            { path: 'new-card', component: NewCardComponent },
            { path: 'order', component: NewCardOrderComponent, canActivate: [OperationsGuard], canDeactivate: [CanDeactivateOperationsGuard] },
            { path: 'confirm-order', component: ConfirmOrderComponent, canActivate: [OperationsGuard], canDeactivate: [CanDeactivateOperationsGuard] },
            { path: 'exit-order', component: ExitOrderComponent },
            { path: 'new-account', component:NewAccountComponent },
            { 
                path: 'refill-account',
                loadChildren: () =>
                    import('./components/account-refill/account-refill.module').then(
                        m => m.AccountRefillModule
                    ),
            },
            { path: 'account/:id', component: AccountDetailsComponent },
            { path: 'operation-history', component: OperationHistoryComponent },
        ]
    },
    { path: '**', component: NotFoundPageComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}