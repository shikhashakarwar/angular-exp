import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { QuestionsAdapter } from '../shared/adapters/questions';
import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class QuizService {
  apiUrl = 'http://localhost:3000/api/v1/quizData';
  constructor(private http: HttpClient) {}

  getQuizQuestions(options: any): Observable<any> {
      return this.http.get(this.apiUrl + '/questions', {
        params: {id: 'gk', email: options.email}
      })
      .pipe(map((res: any) => new QuestionsAdapter(res.payload.data)));
  }

  getAnwsers(options: any): Observable<any> {
      return this.http.get(this.apiUrl + '/quizData/answers');
  }

  saveAnswer(options): Observable<any> {
    return this.http.put(this.apiUrl + '/answer', options);
  }
}
