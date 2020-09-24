import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterRetirementAccountComponent } from './registerretirementaccount-page.component';

describe('LlRraccountPage1Component', () => {
  let component: RegisterRetirementAccountComponent;
  let fixture: ComponentFixture<RegisterRetirementAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterRetirementAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterRetirementAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
