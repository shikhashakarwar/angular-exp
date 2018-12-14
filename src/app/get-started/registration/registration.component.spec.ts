import { async, ComponentFixture, TestBed, getTestBed } from '@angular/core/testing';
import { AuthService } from '../../services/auth.service';
import { of, throwError } from 'rxjs';

import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';

import { RegistrationComponent } from './registration.component';

import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatInputModule } from '@angular/material';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { } from 'rxjs/add/observable/of';
import { Router } from '@angular/router';

const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
class AuthServiceStub {
  registerUser = jasmine.createSpy('registerUser').and.callFake(
    () => of(true)
  );
}

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;
  let authService: AuthService;
  let route: Router;
  let injector: TestBed;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RegistrationComponent],
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
        { provide: Router, useValue: routerSpy },
        { provide: AuthService, useClass: AuthServiceStub }
      ]
    }).compileComponents();

    injector = getTestBed();
    authService = TestBed.get(AuthService);
    route = injector.get(Router);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('on singup click it should register user', () => {
    component.signUp();
    const navigateByUrlSpy = route.navigateByUrl as jasmine.Spy;
    expect(navigateByUrlSpy).toHaveBeenCalled();
    expect(navigateByUrlSpy.calls.first().args[0]).toBe('dashboard');
  });

  it('should show error when registration fails', () => {
    expect(component.showError).toBe(false);
    authService.registerUser = jasmine.createSpy('registerUser').and.returnValue(throwError({status: '409', message: 'falis'}));
    component.signUp();
    expect(component.showError).toBe(true);
  });
});
