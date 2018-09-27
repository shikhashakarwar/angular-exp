import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable()
export class QuizService {
  private apiUrl = "http://localhost:3000/api/v1";
  
  constructor(private http: HttpClient) {}

  getQuizQuestions(options : any): Observable<any> {
      return this.http.get(this.apiUrl + '/quizData/questions', {
        params: {id: 'gk'}
      });
  }
}
