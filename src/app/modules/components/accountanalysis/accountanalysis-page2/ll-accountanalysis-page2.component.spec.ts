import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LlAccountanalysisPage2Component } from './ll-accountanalysis-page2.component';

describe('LlAccountanalysisPage2Component', () => {
  let component: LlAccountanalysisPage2Component;
  let fixture: ComponentFixture<LlAccountanalysisPage2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LlAccountanalysisPage2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LlAccountanalysisPage2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
