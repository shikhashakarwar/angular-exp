import {} from 'jasmine';
import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Component } from '@angular/core';
import { HeaderComponent } from './shared/header/header.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpRequests } from './configs/httpRequest';
import { QuizLocalForage } from './services/quizStorage.service';
describe('AppComponent', () => {
  let httpRequests: HttpRequests;
  let quizLocalForage: QuizLocalForage;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        HeaderComponent
      ],
      providers: [HttpRequests, QuizLocalForage],
      imports: [RouterTestingModule]
    }).compileComponents();

    httpRequests = TestBed.get(HttpRequests);
    quizLocalForage = TestBed.get(QuizLocalForage);
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'quiz-web'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('quiz-web');
  }));
});
