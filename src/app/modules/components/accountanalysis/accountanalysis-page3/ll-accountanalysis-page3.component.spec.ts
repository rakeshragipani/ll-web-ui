import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LlAccountanalysisPage3Component } from './ll-accountanalysis-page3.component';

describe('LlAccountanalysisPage3Component', () => {
  let component: LlAccountanalysisPage3Component;
  let fixture: ComponentFixture<LlAccountanalysisPage3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LlAccountanalysisPage3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LlAccountanalysisPage3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
