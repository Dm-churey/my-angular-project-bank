import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { SitePageComponent } from './pages/site-page/site-page.component';
import { TokenInterceptor } from './guards/token.interceptor';
import { CardComponent } from './components/card/card.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PersonalProfileComponent } from './components/personal-profile/personal-profile.component';
import { BalancePipe } from './pipes/balance-pipe/balance.pipe';
import { PhoneNumberPipe } from './pipes/phone-number-pipe/phone-number.pipe';
import { BirthdatePipe } from './pipes/date-pipe/birthdate.pipe';
import { MaterialModule } from './material.module';
import { NewCardComponent } from './components/new-card/new-card.component';
import { NewCardOrderComponent } from './components/new-card-order/new-card-order.component';
import { ConfirmOrderComponent } from './components/confirm-order/confirm-order.component';
import { CanDeactivateOperationsGuard } from './guards/can-deactivate-operations.guard';
import { DestroyService } from './services/destroy-service/destroy.service';
import { ExitOrderComponent } from './components/exit-order/exit-order.component';
import { NewAccountComponent } from './components/new-account/new-account.component';
import { AccountDetailsComponent } from './components/account-details/account-details.component';
import { OperationHistoryComponent } from './components/operation-history/operation-history.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    NotFoundPageComponent,
    SitePageComponent,
    CardComponent,
    DashboardComponent,
    PersonalProfileComponent,
    BalancePipe,
    PhoneNumberPipe,
    BirthdatePipe,
    NewCardComponent,
    NewCardOrderComponent,
    ConfirmOrderComponent,
    ExitOrderComponent,
    NewAccountComponent,
    AccountDetailsComponent,
    OperationHistoryComponent,
  ],
  imports: [
    MaterialModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [
    RouterModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, multi: true, useClass: TokenInterceptor },
    CurrencyPipe,
    CanDeactivateOperationsGuard,
    DestroyService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }