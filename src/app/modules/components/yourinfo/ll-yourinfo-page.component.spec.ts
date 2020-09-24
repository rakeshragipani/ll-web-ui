import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LlYourinfoPageComponent } from './ll-yourinfo-page.component';

describe('LlYourinfoPageComponent', () => {
  let component: LlYourinfoPageComponent;
  let fixture: ComponentFixture<LlYourinfoPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LlYourinfoPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LlYourinfoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
