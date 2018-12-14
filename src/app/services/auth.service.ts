import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { QuizLocalForage } from './quizStorage.service';

@Injectable()
export class AuthService {

  private apiUrl = 'http://localhost:3000/api/v1/auth/';
  constructor(private httpClient: HttpClient, private localForage: QuizLocalForage) { }

  setData(options: any) {
    const _this = this;
    return new Promise(function (reslove, reject) {
      return _this.localForage.setItem(options.key, options.value).then(function() {
        return reslove();
      }, function (error: any) {
        return reject(error);
      });
    });
  }

  login(data: any): Observable<any> {
    return new Observable((observer) => {
      this.httpClient.post(this.apiUrl + 'login', data).subscribe((response: Response) => {
        this.setData({key: 'user', value: response['payload'].user}).then(function () {
            observer.next(response);
        });
      },
      (error) => {
        observer.error(error);
      }
      );
    });
  }

  registerUser(data: any): Observable<any> {
    return new Observable((observer) => {
      this.httpClient.post(this.apiUrl + 'register', data).subscribe((response: Response) => {
        this.setData({key: 'user', value: response['payload'].user}).then(function () {
            observer.next(response);
        });
      },
      (error) => {
        observer.error(error);
      });
    });
  }
}
