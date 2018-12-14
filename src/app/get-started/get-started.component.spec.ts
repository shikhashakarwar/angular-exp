import { async, ComponentFixture, TestBed, getTestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';

import { RegistrationModule } from './registration/registration.module';
import { LoginModule } from './login/login.module';
import { QuizLocalForage } from '../services/quizStorage.service';
import { AuthService } from '../services/auth.service';
import { HttpRequests } from '../configs/httpRequest';
import { GetStartedComponent } from './get-started.component';

class QuizLocalForageStub {
  getItem = jasmine.createSpy('getItem').and.returnValue(Promise.resolve({
    firstName: 'test',
    lastName: 'test',
    email: 'test@newput.com',
    token: 'testing'
  }));
}

const RouteStub = jasmine.createSpyObj('Router', ['navigateByUrl']);

describe('GetStartedComponent', () => {
  let component: GetStartedComponent;
  let fixture: ComponentFixture<GetStartedComponent>;
  let quizStorage: QuizLocalForage;
  let injector: TestBed;
  let route: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        RegistrationModule,
        LoginModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,
        NoopAnimationsModule
      ],
      declarations: [GetStartedComponent],
      providers: [
        AuthService,
        HttpRequests,
        { provide: QuizLocalForage, useClass: QuizLocalForageStub },
        { provide: Router, useValue: RouteStub }
      ]
    }).compileComponents();

    injector = getTestBed();
    quizStorage = injector.get(QuizLocalForage);
    route = injector.get(Router);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetStartedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to dashboard if user exist in local storage', () => {
    component.ngOnInit();
    expect(route.navigateByUrl).toHaveBeenCalled();
    const routeSpy = route.navigateByUrl as jasmine.Spy;
    expect(routeSpy.calls.first().args[0]).toBe('dashboard');
  });

  // TODO: need to dicscus
  it('should throw error if authtoken in not in local forage', () => {
    const testStub = {
      firstName: 'test',
      lastName: 'test',
      email: 'test@newput.com'
    };
    quizStorage.getItem = jasmine.createSpy('getItem').and.returnValue(Promise.resolve(testStub));
    component.ngOnInit();
    const routeSpy = route.navigateByUrl as jasmine.Spy;
    expect(routeSpy.calls.first().args[0]).toBe('dashboard');
  });
});
