import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetirementAccountsComponent } from './retirementaccounts.component';

describe('RetirementAccountsComponent', () => {
  let component: RetirementAccountsComponent;
  let fixture: ComponentFixture<RetirementAccountsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetirementAccountsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetirementAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
