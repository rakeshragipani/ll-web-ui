import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LlSidenavComponent } from './ll-sidenav.component';

describe('LlSidenavComponent', () => {
  let component: LlSidenavComponent;
  let fixture: ComponentFixture<LlSidenavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LlSidenavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LlSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
