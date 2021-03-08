import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { HttpClient, HttpEvent, HttpInterceptor, HttpHandler } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LocalStorageService } from 'ngx-webstorage';
import {  Router, ActivatedRoute  } from '@angular/router';

@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrls: [ './quote.component.css' ]
})
export class QuoteComponent implements OnInit {

  name = 'Angular 8 reactive form with dynamic fields and validations example';
  QuoteForm: FormGroup;
  units: FormArray;
  totalSum: number = 0;
  myFormValueChanges$;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private storage: LocalStorageService,
    private currencyPipe: CurrencyPipe,
    private route: ActivatedRoute,
    private router: Router
    ) {

      }

  /**
   * Form initialization
   */
  ngOnInit() {
    // create form with validators and dynamic rows array

    // load first row at start
    this.QuoteForm = this.formBuilder.group({
      companyName: ['', [Validators.required, Validators.maxLength(25)]],
      countryName: [''],
      city: [''],
      zipCode: [''],
      street: [''],
      units: this.formBuilder.array([ this.getUnit() ])
  });

  console.log(this.QuoteForm);

    // initialize stream on units
    this.myFormValueChanges$ = this.QuoteForm.controls.units.valueChanges;
    // subscribe to the stream so listen to changes on units
    this.myFormValueChanges$.subscribe(units => this.updateTotalUnitPrice(units));

    // preload some data into form fields
    const geoIpInfo = this.storage.retrieve('geoIpInfo');
    if (geoIpInfo) {
      this.QuoteForm.patchValue({
        countryName: geoIpInfo.country_name,
        city: geoIpInfo.city,
        zipCode: geoIpInfo.postal,
        companyName: geoIpInfo.org
      });
    } else {
      this.getCountryByIpOnline().subscribe((res) => {
          console.log('This is your IP information: ', res );
          // put responce into storage so no nedded request it again on reload
          this.storage.store('geoIpInfo', res);
          // update form data
          this.QuoteForm.patchValue({
            countryName: res.country_name,
            city: res.city,
            zipCode: res.postal,
            companyName: geoIpInfo.org
          });
      }, (err) => {
          this.QuoteForm.patchValue({countryName: 'N/A', city: 'N/A', zipCode: 'N/A'});
      });
    }
  }

  /**
   * unsubscribe listener
   */
  ngOnDestroy(): void {
    this.myFormValueChanges$.unsubscribe();
  }

  /**
   * Save form data
   */
  save(model: any, isValid: boolean, e: any) {
    e.preventDefault();
    alert('Form data are: ' + JSON.stringify(model));
  }

  /**
   * Create form unit
   */
  private getUnit(): FormGroup {
    console.log('inside getUnit');
    const numberPatern = '^[0-9.,]+$';
    return this.formBuilder.group({
      unitName: 'A',
      qty: 1,
      unitPrice: 'A',
      unitTotalPrice: 0
    });
  }
/*
  private getUnit() {
    console.log('inside getUnit');
    const numberPatern = '^[0-9.,]+$';
    return this.formBuilder.group({
      unitName: ['', Validators.required],
      qty: [1, [Validators.required, Validators.pattern(numberPatern)]],
      unitPrice: ['', [Validators.required, Validators.pattern(numberPatern)]],
      unitTotalPrice: [{value: '', disabled: true}]
    })
  }
*/
  /**
   * Add new unit row into form
   */
  addUnit() {
    const control = this.QuoteForm.controls.units as FormArray;
    control.push(this.getUnit());
  }

  /**
   * Remove unit row from form on click delete button
   */
  removeUnit(i: number) {
    const control = this.QuoteForm.controls.units as FormArray;
    control.removeAt(i);
  }

  /**
   * This is one of the way how clear units fields.
   */
  clearAllUnits() {
    const control = this.QuoteForm.controls.units as FormArray;
    while(control.length) {
      control.removeAt(control.length - 1);
    }
    control.clearValidators();
    control.push(this.getUnit());
  }

  /**
   * This is example how patch units array. Before patch you have to create
   * same number of FormArray controls. As we have already one control created
   * by default we start from i = 1 not 0. This way it could be implemented in
   * ngOnInit in case of update just you have to prepare FormArray and then patch
   * whole form object not just units.
   */
  addSomeUnitsFromArrayExample() {
    const unitsArray = [
      {unitName: 'test unit 1', qty: 2, unitPrice: 22.44},
      {unitName: 'test unit 2', qty: 1, unitPrice: 4},
      {unitName: 'test unit 3', qty: 44, unitPrice: 1.50}
    ]
    const control = this.QuoteForm.controls.units as FormArray;
    for (let i = 1; i < unitsArray.length; i++) {
      control.push(this.getUnit());
    }
    this.QuoteForm.patchValue({units: unitsArray});
  }

  /**
   * Update prices as soon as something changed on units group
   */
  private updateTotalUnitPrice(units: any) {
    // get our units group controll
    const control = this.QuoteForm.controls.units as FormArray;
    // before recount total price need to be reset.
    this.totalSum = 0;
    for (let i in units) {
      let totalUnitPrice = (units[i].qty *units[i].unitPrice);
      // now format total price with angular currency pipe
      let totalUnitPriceFormatted = this.currencyPipe.transform(totalUnitPrice, 'USD', 'symbol-narrow', '1.2-2');
      // update total sum field on unit and do not emit event myFormValueChanges$ in this case on units
      control.at(+i).get('unitTotalPrice').setValue(totalUnitPriceFormatted, {onlySelf: true, emitEvent: false});
      // update total price for all units
      this.totalSum += totalUnitPrice;
    }
  }

  /**
   * Get online geoIp information to pre-fill form fields country, city and zip
   */
  private getCountryByIpOnline(): Observable<any> {
    return this.http.get('https://ipapi.co/json/');
        //.map(this.extractData) //commented by Chirag
        //.catchError(this.handleError); //commented by Chirag
  }

  /**
   * responce data extraction from http responce
   */
  private extractData(res: Response) {
    const body = res.json();
    return body || { };
  }

  /**
   * handle error if geoIp service not available.
   */
  private handleError (error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      //const err = body.error || JSON.stringify(body);
      const err = error.json() || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
