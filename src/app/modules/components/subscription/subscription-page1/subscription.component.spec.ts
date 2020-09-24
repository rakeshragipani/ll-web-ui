import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionPage1Component } from './subscription-page1.component';

describe('SubscriptionPage1Component', () => {
  let component: SubscriptionPage1Component;
  let fixture: ComponentFixture<SubscriptionPage1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscriptionPage1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionPage1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
