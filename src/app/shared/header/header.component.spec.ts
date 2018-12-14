import { async, ComponentFixture, TestBed, getTestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { QuizLocalForage } from '../../services/quizStorage.service';

import { HeaderComponent } from './header.component';

const dummyLocalForageRes = {
  firstName: 'test',
  lastName: 'test',
  email: 'test@newput.com',
  token: 'token'
};

class QuizLocalForageStub {
  getItem = jasmine.createSpy('getItem').and.returnValue(Promise.resolve(dummyLocalForageRes));
}

fdescribe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let injector: TestBed;
  let quizLocalForage: QuizLocalForage;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [HeaderComponent],
      providers: [
        { provide: QuizLocalForage, useClass: QuizLocalForageStub}
      ]
    }).compileComponents();

    injector = getTestBed();
    quizLocalForage = injector.get(QuizLocalForage);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set isLoggedin to true if local storage exists', () => {
    expect(component.isLoggedInUser).toBe(false);
    component.ngOnInit();
    quizLocalForage.getItem('user').then((response) => {
      expect(response.token).toBeDefined();
      expect(component.isLoggedInUser).toBeTruthy();
    });
  });
});
