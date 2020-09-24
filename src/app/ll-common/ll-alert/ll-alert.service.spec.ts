import {CommonModule} from '@angular/common';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { MAT_SNACK_BAR_DATA, MatSnackBar, MatSnackBarModule, MatSnackBarRef } from '@angular/material/snack-bar';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';

import {LlAlertComponent} from './ll-alert.component';
import {LlAlertService} from './ll-alert.service';

describe('LlAlertService', () => {
  let alertType: string;
  let component: LlAlertComponent;
  let fixture: ComponentFixture<LlAlertComponent>;
  const message = 'This is a test';
  let snackBar: MatSnackBar;
  let snackBarRef: MatSnackBarRef<LlAlertComponent>;
  let spyOpenAlert: jasmine.Spy;
  let LlAlertService: LlAlertService;

  beforeEach(async(() => {
    TestBed.overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [LlAlertComponent]
      }
    });
    TestBed.configureTestingModule({
      declarations: [LlAlertComponent],
      imports: [
        CommonModule,
        MatIconModule,
        MatSnackBarModule,
        NoopAnimationsModule,
      ],
      providers: [
        MatSnackBar,
        LlAlertService,
        {
          provide: MatSnackBarRef,
          useValue: {}
        }, {
          provide: MAT_SNACK_BAR_DATA,
          useValue: {}
        }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LlAlertComponent);
    snackBar = TestBed.get(MatSnackBar);
    LlAlertService = TestBed.get(LlAlertService);
    spyOpenAlert = spyOn(LlAlertService, 'openAlert').and.callThrough();
  });

  afterEach(() => {
    if (snackBarRef) {
      snackBarRef.dismiss();
    }
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(LlAlertService).toBeDefined();
  });

  it('should run openAlert', () => {
    alertType = 'info';
    snackBarRef = LlAlertService.openAlert(alertType, message);
    expect(spyOpenAlert).toHaveBeenCalled();
  });

  it('should not open second alert while first one is still open', () => {
    alertType = 'info';
    snackBarRef = LlAlertService.openAlert(alertType, message);
    const snackBarRef2 = LlAlertService.openAlert(alertType, 'This ia alert 2');
    expect(snackBarRef2).toBe(null);
  });

  it('should set component alert type for info', () => {
    alertType = 'info';
    snackBarRef = LlAlertService.openAlert(alertType, message);
    component = snackBarRef.instance;
    expect(component.alertType).toBe('info');
  });

  it('should set component alert type for error', () => {
    alertType = 'error';
    snackBarRef = LlAlertService.openAlert(alertType, message);
    component = snackBarRef.instance;
    expect(component.alertType).toBe('error');
  });

  it('should set component alert type for warn', () => {
    alertType = 'warn';
    snackBarRef = LlAlertService.openAlert(alertType, message);
    component = snackBarRef.instance;
    expect(component.alertType).toBe('warn');
  });
});
