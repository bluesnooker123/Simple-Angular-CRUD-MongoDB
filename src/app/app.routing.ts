import { RouterModule, Routes } from '@angular/router';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { AuthGuard } from './_guards/auth.guard';
import { CreateComponent } from './components/create/create.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditComponent } from './components/edit/edit.component';
import { HelloComponent } from './quote/hello.component';
import { HomeComponent } from './login/home.component';
import { ListComponent } from './components/list/list.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { QuoteComponent } from './quote/quote.component';
import { RegisterComponent } from './login/register.component';

import { ConfigAccountComponent } from './components/configaccount/configaccount.component';
import { ConfigBillingComponent } from './components/configbilling/configbilling.component';
import { ConfigBillingCurrencyComponent } from './components/configbilling-currency/configbilling-currency.component';
import { ConfigPaymentComponent } from './components/configpayment/configpayment.component';


const routes: Routes = [
     {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
    {path: 'create', component: CreateComponent, canActivate: [AuthGuard]},
    {path: 'edit/:id', component: EditComponent, canActivate: [AuthGuard]},
    {path: 'list', component: ListComponent, canActivate: [AuthGuard]},
    {path: '', component: LoginComponent, canActivate: [AuthGuard]},
    // {path: 'logout', component: LogoutComponent, canActivate: [AuthGuard]},
    {path: 'users', component: HomeComponent, canActivate: [AuthGuard]},
    {path: 'register', component: RegisterComponent, canActivate: [AuthGuard]},
    {path: 'quote', component: QuoteComponent, canActivate: [AuthGuard]},
    {path: 'hello', component: HelloComponent, canActivate: [AuthGuard]},

    {path: 'config/account/list?company', component: ConfigAccountComponent, canActivate: [AuthGuard]},
    {path: 'config/account/list?industry', component: ConfigAccountComponent, canActivate: [AuthGuard]},
    {path: 'config/account/list?credit', component: ConfigAccountComponent, canActivate: [AuthGuard]},

    {path: 'config/billing/list?currency', component: ConfigBillingCurrencyComponent, canActivate: [AuthGuard]},
    {path: 'config/billing/list?day', component: ConfigBillingComponent, canActivate: [AuthGuard]},
    {path: 'config/billing/list?batch', component: ConfigBillingComponent, canActivate: [AuthGuard]},
    {path: 'config/billing/list?language', component: ConfigBillingComponent, canActivate: [AuthGuard]},
    {path: 'config/billing/list?template', component: ConfigBillingComponent, canActivate: [AuthGuard]},
    {path: 'config/billing/list?payment', component: ConfigBillingComponent, canActivate: [AuthGuard]},

    {path: 'config/payment/list?getway', component: ConfigPaymentComponent, canActivate: [AuthGuard]},
    {path: 'config/payment/list?type', component: ConfigPaymentComponent, canActivate: [AuthGuard]},


    // {path: '**', redirectTo: '' }
    {path: '**', component: LoginComponent }


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModules {

}
