import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionPage2Component } from './subscription-page2.component';

describe('SubscriptionPage2Component', () => {
  let component: SubscriptionPage2Component;
  let fixture: ComponentFixture<SubscriptionPage2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscriptionPage2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionPage2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
