import { BehaviorSubject, Observable } from 'rxjs';

import { AuthenticationService } from './_services/authentication.service';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from './product.model';
import { environment } from '../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private currentUserSubject: BehaviorSubject<Product>;
  public currentUser: Observable<Product>;
  public currentUserLoggedIn = this.authenticationService.currentUserValue;
  public sharedAddPriceInformation = new BehaviorSubject<any>('');
  public teleCastAddPricePayment = this.sharedAddPriceInformation.asObservable();

  public sharedPriceData = new BehaviorSubject<any>('');
  public telePriceData = this.sharedPriceData.asObservable();

  public sharedAddChargeInformation = new BehaviorSubject<any>('');
  public teleCastAddChargePayment = this.sharedAddChargeInformation.asObservable();
  public isUserLogin = this.currentUserLoggedIn !== null ? true : false;
  public headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*');

  // mongodb local uri
  public uri = environment.productionurl;
  // public uri = environment.localurl;
  constructor(private http: HttpClient, private authenticationService: AuthenticationService) {
    this.currentUserSubject = new BehaviorSubject<Product>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): Product {
    return this.currentUserSubject.value;
  }

  public addPriceData(data) {
    this.sharedPriceData.next(data);
  }

  public addNewPriceMethod(data) {
    this.sharedAddPriceInformation.next(data);
  }

  public addNewChargesMethod(data) {
    this.sharedAddChargeInformation.next(data);
  }

  // get Tenant config details
  getTenantInformationConfig() {
    return this.http.get(`${this.uri}/product/config/details`);
  }

  getProduct() {
    return this.http.get(`${this.uri}/product/list`);
  }

  getProductById(id) {
    return this.http.get(`${this.uri}/product/list/${id}`);
  }

  addProduct(productDetails) {
    return this.http.post(`${this.uri}/product/create`, productDetails);
  }

  updateProduct(updateProductDetails) {
    return this.http.post(`${this.uri}/product/update/${updateProductDetails.id}`, updateProductDetails);
  }

  deleteProduct(id){
    return this.http.get(`${this.uri}/product/delete/${id}`);
  }

  uploadProductImage(productImageDetails) {
    return this.http.post(`${this.uri}/product/image/upload`, productImageDetails);
  }

  addPriceGroup(productPriceGroup) {
    return this.http.post(`${this.uri}/product/pricegroup/information`, productPriceGroup);
  }

  getProductPriceGroupById(id) {
    return this.http.get(`${this.uri}/product/pricegroup/information/${id}`);
  }

  addPriceGroupChargesOnetime(priceGroupChargesOnetime) {
    return this.http.post(`${this.uri}/product/pricegroup/charges/onetime/information`, priceGroupChargesOnetime);
  }

  addPriceGroupChargesSubscription(priceGroupChargesSubscription) {
    return this.http.post(`${this.uri}/product/pricegroup/charges/subscription/information`, priceGroupChargesSubscription);
  }

  addPriceGroupChargesUsages(priceGroupChargesUsages) {
    return this.http.post(`${this.uri}/product/pricegroup/charges/usages/information`, priceGroupChargesUsages);
  }

  getProductPriceChargesGroupById(priceGroupChargesData) {
    return this.http.post(`${this.uri}/product/pricegroup/charges/information`, priceGroupChargesData);
  }

  // Coupons api

  getAllCouponsInformation() {
    return this.http.get(`${this.uri}/product/coupon/list`);
  }

  addCouponsInformation(couponsData) {
    return this.http.post(`${this.uri}/product/create/coupon`, couponsData);
  }

  deleteCouponsInformation(id){
    return this.http.get(`${this.uri}/product/delete/coupon/${id}`);
  }

  updateCouponInformation(updateCouponDetails) {
    return this.http.post(`${this.uri}/product/update/coupon/${updateCouponDetails.id}`, updateCouponDetails);
  }

  getCouponsInformation(id){
    return this.http.get(`${this.uri}/product/list/coupon/${id}`);
  }

  // Vouchers api

  getAllVouchersInformation() {
    return this.http.get(`${this.uri}/product/voucher/list`);
  }

  addVouchersInformation(vouchersData) {
    return this.http.post(`${this.uri}/product/create/voucher`, vouchersData);
  }

  deleteVouchersInformation(id){
    return this.http.get(`${this.uri}/product/delete/voucher/${id}`);
  }

  updateVoucherInformation(updateVoucherDetails) {
    return this.http.post(`${this.uri}/product/update/voucher/${updateVoucherDetails.id}`, updateVoucherDetails);
  }

  getVouchersInformation(id){
    return this.http.get(`${this.uri}/product/list/voucher/${id}`);
  }
}
