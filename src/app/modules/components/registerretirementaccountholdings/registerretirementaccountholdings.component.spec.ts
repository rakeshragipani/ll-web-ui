import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterretirementaccountholdingsComponent } from './registerretirementaccountholdings.component';

describe('RegisterretirementaccountholdingsComponent', () => {
  let component: RegisterretirementaccountholdingsComponent;
  let fixture: ComponentFixture<RegisterretirementaccountholdingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterretirementaccountholdingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterretirementaccountholdingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
