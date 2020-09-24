import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyRetirementAccount } from './companyretirementaccount-page.component';

describe('CompanyRetirementAccount', () => {
  let component: CompanyRetirementAccount;
  let fixture: ComponentFixture<CompanyRetirementAccount>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyRetirementAccount ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyRetirementAccount);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
