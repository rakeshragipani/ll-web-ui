import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LlRiskassessmentPage2Component } from './ll-riskassessment-page2.component';

describe('LlRiskassessmentPage2Component', () => {
  let component: LlRiskassessmentPage2Component;
  let fixture: ComponentFixture<LlRiskassessmentPage2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LlRiskassessmentPage2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LlRiskassessmentPage2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
