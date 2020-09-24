import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsandstatementsComponent } from './reportsandstatements.component';

describe('ReportsandstatementsComponent', () => {
  let component: ReportsandstatementsComponent;
  let fixture: ComponentFixture<ReportsandstatementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportsandstatementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsandstatementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
