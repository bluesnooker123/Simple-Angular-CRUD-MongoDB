export interface Product {
  // tslint:disable-next-line: ban-types
  taxcode: String;
  taxmode: String;
  creationdate: Date;
}

export interface ProductCoupon {
  // tslint:disable-next-line: ban-types
  name: String;
  startdate: String;
  enddate: Date;
}

export interface ProductVoucher {
  // tslint:disable-next-line: ban-types
  name: String;
  startdate: String;
  enddate: Date;
}
