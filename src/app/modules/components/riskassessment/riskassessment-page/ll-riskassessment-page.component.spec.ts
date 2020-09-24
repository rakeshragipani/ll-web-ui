import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LlRiskassessmentPageComponent } from './ll-riskassessment-page.component';

describe('LlRiskassessmentPageComponent', () => {
  let component: LlRiskassessmentPageComponent;
  let fixture: ComponentFixture<LlRiskassessmentPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LlRiskassessmentPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LlRiskassessmentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
