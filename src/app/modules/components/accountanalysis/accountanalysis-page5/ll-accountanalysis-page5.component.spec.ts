import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LlAccountanalysisPage5Component } from './ll-accountanalysis-page5.component';

describe('LlAccountanalysisPage5Component', () => {
  let component: LlAccountanalysisPage5Component;
  let fixture: ComponentFixture<LlAccountanalysisPage5Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LlAccountanalysisPage5Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LlAccountanalysisPage5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
