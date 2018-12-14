import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AuthService } from './auth.service';
import { QuizLocalForage } from './quizStorage.service';

describe('AuthService', () => {
  let injector: TestBed;
  let authService: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService, QuizLocalForage]
    });

    injector = getTestBed();
    authService = injector.get(AuthService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('login should called with proper arguments', () => {
      const dummyParams = {
        email: 'testing@newput.com',
        password: 1313121
      };
      authService.login(dummyParams).subscribe((response) => {
        expect(response.message).toContain('success');
      });
      const req = httpMock.expectOne('http://localhost:3000/api/v1/auth/login');
      expect(req.request.method).toBe('POST');
      req.flush({
        payload: {
          user: {
            email: 'test@newput.com',
            password: 123431,
            firstName: 'test',
            lastName: 'test'
          }
        }
      });
  });

  it('register user should called with proper arguments', () => {
    const dummyParams = {
      email: 'test@newput.com',
      password: 123431,
      firstName: 'test',
      lastName: 'test'
    };
    authService.registerUser(dummyParams).subscribe((response) => {
      expect(response.message).toContain('success');
    });
    const req = httpMock.expectOne('http://localhost:3000/api/v1/auth/register');
    expect(req.request.method).toBe('POST');
    req.flush({
      payload: {
        user: dummyParams
      }
    });
  });

  it('register user should return when server fails', () => {
    const dummyParams = {
      email: 'test@newput.com',
      password: 123431,
      firstName: 'test',
      lastName: 'test'
    };
    authService.registerUser(dummyParams).subscribe((response) => {
      fail('fails due to server not responded');
    }, (error) => {
        expect(error.message).toEqual('');
    });
    const req = httpMock.expectOne('http://localhost:3000/api/v1/auth/register');
    expect(req.request.method).toBe('POST');
    req.flush({
      payload: {
        user: dummyParams
      }
    });
  });
});
