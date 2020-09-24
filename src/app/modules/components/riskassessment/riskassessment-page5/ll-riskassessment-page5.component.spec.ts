import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LlRiskassessmentPage5Component } from './ll-riskassessment-page5.component';

describe('LlRiskassessmentPage5Component', () => {
  let component: LlRiskassessmentPage5Component;
  let fixture: ComponentFixture<LlRiskassessmentPage5Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LlRiskassessmentPage5Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LlRiskassessmentPage5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
