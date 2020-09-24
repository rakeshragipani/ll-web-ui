import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LlRiskassessmentPage1Component } from './ll-riskassessment-page1.component';

describe('LlRiskassessmentPage1Component', () => {
  let component: LlRiskassessmentPage1Component;
  let fixture: ComponentFixture<LlRiskassessmentPage1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LlRiskassessmentPage1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LlRiskassessmentPage1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
