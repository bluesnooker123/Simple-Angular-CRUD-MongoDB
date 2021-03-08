import { BehaviorSubject, Observable } from 'rxjs';

import { Account } from './account.model';
import { AuthenticationService } from './_services/authentication.service';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AccountService {
  private currentUserSubject: BehaviorSubject<Account>;
  public currentUser: Observable<Account>;
  public sharedContactInformation = new BehaviorSubject<any>('');
  public teleCastContactDetails = this.sharedContactInformation.asObservable();
  public sharedAddPaymentInformation = new BehaviorSubject<any>('');
  public teleCastAddNewPayment = this.sharedAddPaymentInformation.asObservable();
  public currentUserLoggedIn = this.authenticationService.currentUserValue;
  public isUserLogin = this.currentUserLoggedIn !== null ? true : false;
  public headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*');

  // mongodb local uri
  public uri = environment.productionurl;
  // public uri = environment.localurl;

  constructor(private http: HttpClient, private authenticationService: AuthenticationService) {
    this.currentUserSubject = new BehaviorSubject<Account>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public sharedContactDetails(data) {
    this.sharedContactInformation.next(data);
  }

  public addNewPaymentMethod(data) {
    this.sharedAddPaymentInformation.next(data);
  }

  public get currentUserValue(): Account {
    return this.currentUserSubject.value;
  }

  // getAccount config
  getAccountConfig() {
    return this.http.get(`${this.uri}/account/config/details`);
  }

  // getContact config
  getContactConfig() {
    return this.http.get(`${this.uri}/contact/config/details`);
  }

  // getPayment config
  getPaymentConfig() {
    return this.http.get(`${this.uri}/payment/config/details`);
  }

  // getBillinginformation config
  getBillingInformationConfig() {
    return this.http.get(`${this.uri}/billing/config/details`);
  }

  getAccount() {
    return this.http.get(`${this.uri}/account/list`);
  }

  getAccountById(id) {
    return this.http.get(`${this.uri}/account/list/${id}`);
  }

  addAccount(accountDetails) {
    return this.http.post(`${this.uri}/account/create`, accountDetails);
  }

  updateAccount(updateAccountDetails) {
    return this.http.post(`${this.uri}/account/update/${updateAccountDetails.id}`, updateAccountDetails);
  }

  deleteAccount(id){
    return this.http.get(`${this.uri}/account/delete/${id}`);
  }

  // Contact
  addContact(contactDetails) {
    return this.http.post(`${this.uri}/contact/create`, contactDetails);
  }

  // Get Contacts
  getContacts(id) {
    return this.http.get(`${this.uri}/contact/list/${id}`);
  }

  // Payment Service
  verifyPayment(data) {
    return this.http.post(`${this.uri}/verify/payment`, data);
  }

  // Get Payment Details
  getPaymentInformation(id) {
    return this.http.get(`${this.uri}/account/payment/information/${id}`);
  }

  // Bill Information
  addBillInformation(data) {
    return this.http.post(`${this.uri}/account/billinfo/create`, data);
  }

  // Get Bill Information
  getBillInformation(id) {
    return this.http.get(`${this.uri}/account/billinfo/create/${id}`);
  }

  // Tax Information
  addTaxInformation(data) {
    return this.http.post(`${this.uri}/account/taxinfo/create`, data);
  }

  // Get Tax Information
  getTaxInformation(id) {
    return this.http.get(`${this.uri}/account/taxinfo/create/${id}`);
  }
}
