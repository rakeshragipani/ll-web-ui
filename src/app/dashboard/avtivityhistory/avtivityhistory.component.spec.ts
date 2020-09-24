import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvtivityhistoryComponent } from './avtivityhistory.component';

describe('AvtivityhistoryComponent', () => {
  let component: AvtivityhistoryComponent;
  let fixture: ComponentFixture<AvtivityhistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvtivityhistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvtivityhistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
