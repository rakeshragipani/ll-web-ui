import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NeedahelpComponent } from './needahelp.component';

describe('NeedahelpComponent', () => {
  let component: NeedahelpComponent;
  let fixture: ComponentFixture<NeedahelpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NeedahelpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NeedahelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
