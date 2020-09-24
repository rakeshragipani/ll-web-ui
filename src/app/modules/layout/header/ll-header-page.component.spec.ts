import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LlHeaderPageComponent } from './ll-header-page.component';

describe('LlHeaderPageComponent', () => {
  let component: LlHeaderPageComponent;
  let fixture: ComponentFixture<LlHeaderPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LlHeaderPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LlHeaderPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
