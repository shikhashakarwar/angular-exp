import { async, ComponentFixture, TestBed, getTestBed } from '@angular/core/testing';
import { AuthService } from '../../services/auth.service';
import { of, throwError } from 'rxjs';

import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';

import { LoginComponent } from './login.component';

import { HttpRequests } from '../../configs/httpRequest';
import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatInputModule } from '@angular/material';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { } from 'rxjs/add/observable/of';
import { Router } from '@angular/router';

const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

const dummyLoginResponse = {
  payload: {
    user: {
      firstName: 'test',
      lastName: 'test',
      email: 'test@newput.com',
      token: jasmine.any(String)
    },
    message: 'success'
  }
};

class AuthServiceStub {
  login = jasmine.createSpy('login').and.callFake(
    () => of(dummyLoginResponse)
  );
}

class HttpRequestStub {
  authToken = null;
  setToken = jasmine.createSpy('setToken').and.callFake(
    (token) => {
      this.authToken = 'Bearer' + token;
    }
  );
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let route: Router;
  let injector: TestBed;
  let httpRequests: HttpRequests;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        FormsModule,
        MatButtonModule,
        MatInputModule,
        HttpClientTestingModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        NoopAnimationsModule
      ],
      providers: [
        { provide: HttpRequests, useClass: HttpRequestStub },
        { provide: Router, useValue: routerSpy },
        { provide: AuthService, useClass: AuthServiceStub }
      ]
    }).compileComponents();

    injector = getTestBed();
    authService = TestBed.get(AuthService);
    route = injector.get(Router);
    httpRequests = injector.get(HttpRequests);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('on singIn click it should login user', () => {
    component.signIn();
    const navigateByUrlSpy = route.navigateByUrl as jasmine.Spy;
    expect(navigateByUrlSpy).toHaveBeenCalled();
    expect(navigateByUrlSpy.calls.first().args[0]).toBe('dashboard');
  });

  it('should show error when login fails', () => {
    expect(component.showError).toBe(false);
    authService.login = jasmine.createSpy('login').and.returnValue(throwError({ status: '409', message: 'falis' }));
    component.signIn();
    expect(authService.login).toHaveBeenCalled();
    expect(component.showError).toBe(true);
  });

  it('should set token to httpRequest service', () => {
    expect(httpRequests.authToken).toBeNull();
    component.signIn();
    expect(authService.login).toHaveBeenCalled();
    authService.login({ email: 'test@newput.com', password: '13121' }).subscribe((response) => {
      expect(httpRequests.setToken).toHaveBeenCalled();
      httpRequests.setToken(response.payload.user.token);
      expect(httpRequests.authToken).not.toBeNull();
      expect(httpRequests.authToken).toEqual(response.payload.user.token);
    });
  });
});
