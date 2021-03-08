import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigBillingComponent } from './configbilling.component';

describe('ConfigBillingComponent', () => {
  let component: ConfigBillingComponent;
  let fixture: ComponentFixture<ConfigBillingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigBillingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigBillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
