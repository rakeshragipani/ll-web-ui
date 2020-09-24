import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LlAccountanalysisPage1Component } from './ll-accountanalysis-page1.component';

describe('LlAccountanalysisPage1Component', () => {
  let component: LlAccountanalysisPage1Component;
  let fixture: ComponentFixture<LlAccountanalysisPage1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LlAccountanalysisPage1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LlAccountanalysisPage1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
