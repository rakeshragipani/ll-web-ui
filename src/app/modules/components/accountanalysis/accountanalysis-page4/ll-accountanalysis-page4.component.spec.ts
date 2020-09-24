import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LlAccountanalysisPage4Component } from './ll-accountanalysis-page4.component';

describe('LlAccountanalysisPage4Component', () => {
  let component: LlAccountanalysisPage4Component;
  let fixture: ComponentFixture<LlAccountanalysisPage4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LlAccountanalysisPage4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LlAccountanalysisPage4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
