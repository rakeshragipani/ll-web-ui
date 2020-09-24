import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterRetirementPlanComponent } from './registerretirementplan.component';

describe('LlRetirementsavingsPageComponent', () => {
  let component: RegisterRetirementPlanComponent;
  let fixture: ComponentFixture<RegisterRetirementPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterRetirementPlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterRetirementPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
