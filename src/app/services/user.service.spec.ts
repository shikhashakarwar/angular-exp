import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';

describe('UserService', () => {
  let injector: TestBed;
  let httpMock: HttpTestingController;
  let userService: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserService],
      imports: [HttpClientTestingModule]
    });

    injector = getTestBed();
    userService = injector.get(UserService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });


  it('should be created', () => {
    expect(userService).toBeTruthy();
  });

  it('shold get user Information', () => {
    const params = {
      email: 'test@newput.com'
    };

    const expectedRes = {
      payload: {
        data: {
          email: 'test@newput.com',
          password: 123431,
          firstName: 'test',
          lastName: 'test'
        },
        message: 'successfully'
      }
    };

    userService.getUserInfo(params).subscribe((response) => {
      expect(response.payload.data.firstName).toEqual('test');
    });
    const req = httpMock.expectOne('http://localhost:3000/api/v1/user/info?email=' + params.email);
    expect(req.request.method).toBe('GET');
    // flush method provide mock response
    req.flush(expectedRes);
  });
});
