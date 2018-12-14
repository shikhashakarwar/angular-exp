import { Component } from '@angular/core';
import { HttpRequests } from './configs/httpRequest';
import { QuizLocalForage } from './services/quizStorage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'quiz-web';

  constructor(private httpRequests: HttpRequests, private LocalForage: QuizLocalForage) {
    const _this = this;
    this.LocalForage.getItem('user').then(function (value: any) {
      if (value) {
        _this.httpRequests.setToken(value.token);
      }

    });
  }
}
