import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  public uri = environment.productionurl;
    // public uri = environment.localurl;
  constructor(private http: HttpClient) { }


  configCreateAccountConfig(which: string, newData: object) {
    //console.log('Create Account Config service: ' + which);
    return this.http.post<any>(`${this.uri}/configCreateAccountConfig`, { which, newData})
    .pipe( );
  }

  configReadAccountConfig(which: string) {
    //console.log('Read Account Config service: ' + which);
    return this.http.post<any>(`${this.uri}/configReadAccountConfig`, { which })
    .pipe( );
  }

  configUpdateAccountConfig(which: string, oldData: object, newData: object) {
    //console.log('Update Account Config service: ' + which);
    return this.http.post<any>(`${this.uri}/configUpdateAccountConfig`, { which, oldData, newData})
    .pipe( );
  }

  configDeleteAccountConfig(user_id: string, which: string, deleted_Data: object) {
    //console.log('Delete Account Config service: ' + which);
    return this.http.post<any>(`${this.uri}/configDeleteAccountConfig`, { user_id, which, deleted_Data})
    .pipe( );
  }



  configCreateBillingConfig(which: string, newData: object) {
    //console.log('Create Billing Config service: ' + which);
    return this.http.post<any>(`${this.uri}/configCreateBillingConfig`, { which, newData})
    .pipe( );
  }

  configReadBillingConfig(which: string) {
    //console.log('Read Billing Config service: ' + which);
    return this.http.post<any>(`${this.uri}/configReadBillingConfig`, { which })
    .pipe( );
  }

  configUpdateBillingConfig(which: string, oldData: object, newData: object) {
    //console.log('Update Billing Config service: ' + which);
    return this.http.post<any>(`${this.uri}/configUpdateBillingConfig`, { which, oldData, newData})
    .pipe( );
  }

  configDeleteBillingConfig(which: string, deleted_Data: object) {
    //console.log('Delete Billing Config service: ' + which);
    return this.http.post<any>(`${this.uri}/configDeleteBillingConfig`, { which, deleted_Data})
    .pipe( );
  }


  configCreatePaymentConfig(which: string, newData: object) {
    //console.log('Create Payment Config service: ' + which);
    return this.http.post<any>(`${this.uri}/configCreatePaymentConfig`, { which, newData})
    .pipe( );
  }

  configReadPaymentConfig(which: string) {
    //console.log('Read Payment Config service: ' + which);
    return this.http.post<any>(`${this.uri}/configReadPaymentConfig`, { which })
    .pipe( );
  }

  configUpdatePaymentConfig(which: string, oldData: object, newData: object) {
    //console.log('Update Payment Config service: ' + which);
    return this.http.post<any>(`${this.uri}/configUpdatePaymentConfig`, { which, oldData, newData})
    .pipe( );
  }

  configDeletePaymentConfig(which: string, deleted_Data: object) {
    //console.log('Delete Payment Config service: ' + which);
    return this.http.post<any>(`${this.uri}/configDeletePaymentConfig`, { which, deleted_Data})
    .pipe( );
  }

}
