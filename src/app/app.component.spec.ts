import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';
import {Router, Routes} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';

import {MockLlAlertService} from '@app/ll-common/ll-alert/mock-ll-alert.service';
import {MockLlErrorHandler} from '@app/ll-common/ll-error-handler/mock-ll-error-handler';
import {MockLlHeaderModule} from '@app/modules/layout/header/mock-ll-header.module';
import {MockLlLogService} from '@app/ll-common/ll-log/mock-ll-log.service';
import {LlAlertService} from '@app/ll-common/ll-alert/ll-alert.service';
import {AppComponent} from './app.component';
import {LlErrorHandler} from '@app/ll-common/ll-error-handler/ll-error-handler.service';
import {LlHomePageComponent} from '@app/home/mock-ll-home-page.component';
import {LlLogService} from '@app/ll-common/ll-log/ll-log.service';
import {LlMessage} from '@app/ll-common/ll-message/ll-message';
import {LlMessageService} from '@app/ll-common/ll-message/ll-message.service';
import {LlPageNotFoundPageComponent} from '@app/shared/page-not-found/mock-ll-page-not-found-page.component';

class LlLogEntry {
  constructor(message: string, level: any) {
  }
}

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let hostDebugElement: DebugElement;
  let router: Router;
  let spyAlertService: jasmine.Spy;
  let spyErrorHandler: jasmine.Spy;
  let spyLogService: jasmine.Spy;
  let LlAlertService: LlAlertService;
  let LlErrorHandler: LlErrorHandler;
  let LlLogService: LlLogService;
  let LlMessageService: LlMessageService;

  // copy the routes from ll-app-routing.module
  // so we can use the mock components
  const LlAppRoutes: Routes = [
    {path: '', component: LlHomePageComponent},
    {path: '**', component: LlPageNotFoundPageComponent}
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        LlHomePageComponent,
        LlPageNotFoundPageComponent
      ],
      imports: [
        RouterTestingModule.withRoutes(LlAppRoutes),
        MockLlHeaderModule
      ],
      providers: [
        {provide: LlAlertService, useClass: MockLlAlertService},
        {provide: LlErrorHandler, useClass: MockLlErrorHandler},
        {provide: LlLogService, useClass: MockLlLogService},
        LlMessageService
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    LlAlertService = TestBed.get(LlAlertService);
    spyAlertService = spyOn(LlAlertService, 'openAlert');
    LlErrorHandler = TestBed.get(LlErrorHandler);
    spyErrorHandler = spyOn(LlErrorHandler, 'handleError');
    LlLogService = TestBed.get(LlLogService);
    spyLogService = spyOn(LlLogService, 'log');
    LlMessageService = TestBed.get(LlMessageService);
    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;
    hostDebugElement = fixture.debugElement;
    router = TestBed.get(Router);
    router.initialNavigation();
  });

  it('should create the app component', () => {
    expect(component).toBeDefined();
  });

  it('should run log service on create app component', () => {
    expect(spyLogService).toHaveBeenCalled();
  });

  it('should run alert service when message broadcasts data error', fakeAsync(() => {
    let alertType: string;
    let alertMessage: string;
    const mockMessage = new LlMessage('data.responseError');
    mockMessage.payload = {
      alertType: 'error',
      alertMessage: 'error msg'
    };
    spyAlertService.and.callFake((type: any, msg: any) => {
      alertMessage = msg;
      alertType = type;
    });
    LlMessageService.broadcast(mockMessage);
    tick();
    expect(spyAlertService).toHaveBeenCalled();
    expect(alertType).toBe(mockMessage.payload.alertType);
    expect(alertMessage).toBe(mockMessage.payload.alertMessage);
  }));

  it('should create the home component when navigated to that route url', fakeAsync(() => {
    router.navigate(['']);
    tick();
    const targetElement = hostDebugElement.query(By.css('ll-home'));
    expect(targetElement).toBeDefined();
  }));

  it('should create the page not found component when navigated to that route url', fakeAsync(() => {
    router.navigate(['badpath']);
    tick();
    const targetElement = hostDebugElement.query(By.css('ll-page-not-found'));
    expect(targetElement).toBeDefined();
  }));
});
