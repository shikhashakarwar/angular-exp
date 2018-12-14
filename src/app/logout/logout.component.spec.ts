import {} from 'jasmine';
import { async, ComponentFixture, TestBed, getTestBed } from '@angular/core/testing';

import { QuizLocalForage } from '../services/quizStorage.service';
import { RouterTestingModule } from '@angular/router/testing';

import { LogoutComponent } from './logout.component';
import { Router } from '@angular/router';

class QuizLocalForageStub {
  clear = jasmine.createSpy('clear').and.returnValue(Promise.resolve(true));
}

const RouterStub = jasmine.createSpyObj('Router', ['navigateByUrl']);

describe('LogoutComponent', () => {
  let component: LogoutComponent;
  let fixture: ComponentFixture<LogoutComponent>;
  let quizLocalForage: QuizLocalForage;
  let injector: TestBed;
  let route: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [LogoutComponent],
      providers: [
        { provide: QuizLocalForage, useClass: QuizLocalForageStub },
        { provide: Router, useValue: RouterStub}
      ]
    }).compileComponents();

    injector = getTestBed();
    route = injector.get(Router);
    quizLocalForage = injector.get(QuizLocalForage);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should clear local storage in init cycle', () => {
    component.ngOnInit();
    expect(quizLocalForage.clear).toHaveBeenCalled();
  });

  it('should redirect to start page after clearing local forage', () => {
    component.ngOnInit();
    expect(quizLocalForage.clear).toHaveBeenCalled();
    quizLocalForage.clear().then(() => {
      expect(route.navigateByUrl).toHaveBeenCalled();
      const navigation = route.navigateByUrl as jasmine.Spy;
      expect(navigation.calls.first().args[0]).toEqual('getStarted');
    });
  });
});
