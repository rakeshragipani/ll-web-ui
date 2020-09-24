import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LlCreateaccountPageComponent } from './ll-createaccount-page.component';

describe('LlCreateaccountPageComponent', () => {
  let component: LlCreateaccountPageComponent;
  let fixture: ComponentFixture<LlCreateaccountPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LlCreateaccountPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LlCreateaccountPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
