import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigBillingCurrencyComponent } from './configbilling-currency.component';

describe('ConfigBillingCurrencyComponent', () => {
  let component: ConfigBillingCurrencyComponent;
  let fixture: ComponentFixture<ConfigBillingCurrencyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigBillingCurrencyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigBillingCurrencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
