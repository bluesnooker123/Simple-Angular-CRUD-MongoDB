import '@angular/material/prebuilt-themes/deeppurple-amber.css';

import { RouterModule, Routes } from '@angular/router';

import { A11yModule } from '@angular/cdk/a11y';
import { AccountService } from './account.service';
import { AlertComponent } from './components/alert.component';
import { AngularDualListBoxModule } from 'angular-dual-listbox';
import { AppComponent } from './app.component';
// import { AppRoutingModule } from './app-routing.module';
import { AppRoutingModules } from './app.routing';
import { AuthGuard } from './_guards/auth.guard';
import { BidiModule } from '@angular/cdk/bidi';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CdkScrollableModule } from '@angular/cdk/scrolling';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { CdkTableModule } from '@angular/cdk/table';
import { CreateComponent } from './components/create/create.component';
import { CurrencyPipe } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditComponent } from './components/edit/edit.component';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HelloComponent } from './quote/hello.component';
import { HomeComponent } from './login/home.component';
import { HttpClientModule } from '@angular/common/http';
import {IssueService} from './issue.service';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { ListComponent } from './components/list/list.component';
// User Registration and Authentication
import { LoginComponent } from './login/login.component';
// import { LogoutComponent } from './login/logout.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatNativeDateModule } from '@angular/material/core';
import {MatRadioModule} from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import { NavmenuComponent } from './navmenu/navmenu.component';
import { NgModule } from '@angular/core';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { ObserversModule } from '@angular/cdk/observers';
import { OverlayModule } from '@angular/cdk/overlay';
import { PlatformModule } from '@angular/cdk/platform';
import { PortalModule } from '@angular/cdk/portal';
import { QuoteComponent } from './quote/quote.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './login/register.component';
import { SidenavmenuComponent } from './sidenavmenu/sidenavmenu.component';
import { onErrorResumeNext } from 'rxjs';

import { ConfigAccountComponent } from './components/configaccount/configaccount.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ConfigBillingComponent } from './components/configbilling/configbilling.component';
import { ConfigBillingCurrencyComponent } from './components/configbilling-currency/configbilling-currency.component';
import { ConfigPaymentComponent } from './components/configpayment/configpayment.component';


@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    CreateComponent,
    EditComponent,
    AlertComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    NavmenuComponent,
    SidenavmenuComponent,
    QuoteComponent,
    HelloComponent,
    ConfigAccountComponent,
    ConfigBillingComponent, 
    ConfigBillingCurrencyComponent,
    ConfigPaymentComponent, 
    ],
  imports: [
    BrowserModule,
    // AppRoutingModule,
    AppRoutingModules,
    AngularDualListBoxModule,
    BrowserAnimationsModule,
    HttpClientModule,
    // RouterModule.forRoot(routes),
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatIconModule,
    MatRadioModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatButtonModule,
    MatTabsModule,
    MatCardModule,
    MatExpansionModule,
    MatGridListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMenuModule,
    MatTableModule,
    MatSnackBarModule,
    MatDividerModule,
    MatSidenavModule,
    ReactiveFormsModule,
    FormsModule,
    NgxWebstorageModule.forRoot(),
    FlexLayoutModule,
    Ng2SmartTableModule
  ],
  exports: [
    MatIconModule,
    MatButtonModule,
    A11yModule,
    BidiModule,
    ObserversModule,
    OverlayModule,
    PlatformModule,
    PortalModule,
    CdkStepperModule,
    CdkScrollableModule,
    CdkTableModule
  ],
  providers: [
    IssueService,
    CurrencyPipe,
    MatDatepickerModule,
    MatNativeDateModule,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
