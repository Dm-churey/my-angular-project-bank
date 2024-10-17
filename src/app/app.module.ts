import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { AppDateAdapter, APP_DATE_FORMATS } from './adapters/date-adapter';
import { DataChangesGuard } from './guards/can-deactivate-form.guard';
import { SitePageComponent } from './pages/site-page/site-page.component';
import { TokenInterceptor } from './guards/token.interceptor';
import { CardComponent } from './components/card/card.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PersonalProfileComponent } from './components/personal-profile/personal-profile.component';
import { BalancePipe } from './pipes/balance-pipe/balance.pipe';
import { PhoneNumberPipe } from './pipes/phone-number-pipe/phone-number.pipe';
import { BirthdatePipe } from './pipes/date-pipe/birthdate.pipe';
import { MaterialModule } from './material.module';

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
  ],
  imports: [
    MaterialModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  exports: [
    RouterModule,
  ],
  providers: [
    // DataChangesGuard,
    // { provide: DateAdapter, useClass: AppDateAdapter },
    // { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS },
    { provide: HTTP_INTERCEPTORS, multi: true, useClass: TokenInterceptor },
    CurrencyPipe,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }