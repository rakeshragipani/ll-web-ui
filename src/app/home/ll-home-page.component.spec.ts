import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LlHomePageComponent } from './ll-home-page.component';

describe('LlHomePageComponent', () => {
  let component: LlHomePageComponent;
  let fixture: ComponentFixture<LlHomePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LlHomePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LlHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
