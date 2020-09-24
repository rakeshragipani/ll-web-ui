import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LlRiskassessmentPage4Component } from './ll-riskassessment-page4.component';

describe('LlRiskassessmentPage4Component', () => {
  let component: LlRiskassessmentPage4Component;
  let fixture: ComponentFixture<LlRiskassessmentPage4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LlRiskassessmentPage4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LlRiskassessmentPage4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
