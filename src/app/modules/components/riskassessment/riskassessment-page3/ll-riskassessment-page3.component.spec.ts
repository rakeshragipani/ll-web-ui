import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LlRiskassessmentPage3Component } from './ll-riskassessment-page3.component';

describe('LlRiskassessmentPage3Component', () => {
  let component: LlRiskassessmentPage3Component;
  let fixture: ComponentFixture<LlRiskassessmentPage3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LlRiskassessmentPage3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LlRiskassessmentPage3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
