import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LlRetirementsavingsPageComponent } from './ll-retirementsavings-page.component';

describe('LlRetirementsavingsPageComponent', () => {
  let component: LlRetirementsavingsPageComponent;
  let fixture: ComponentFixture<LlRetirementsavingsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LlRetirementsavingsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LlRetirementsavingsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
