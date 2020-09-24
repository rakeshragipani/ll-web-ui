import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRetirementAccountsComponent } from './addretirementaccounts.component';

describe('RetirementAccountsComponent', () => {
  let component: AddRetirementAccountsComponent;
  let fixture: ComponentFixture<AddRetirementAccountsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRetirementAccountsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRetirementAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
