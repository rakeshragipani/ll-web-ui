import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterretirementMFAaccountComponent } from './registerretirement-mfaaccount.component';

describe('RegisterretirementMFAaccountComponent', () => {
  let component: RegisterretirementMFAaccountComponent;
  let fixture: ComponentFixture<RegisterretirementMFAaccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterretirementMFAaccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterretirementMFAaccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
