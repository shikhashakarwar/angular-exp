import { Component } from '@angular/core';
import { HttpRequests } from "./configs/httpRequest";
import { qLocalForage } from "./services/quizStorage.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'quiz-web';
  
  constructor(private HttpRequests: HttpRequests, private LocalForage: qLocalForage) {
    let _this = this;  
    this.LocalForage.getItem("user").then(function (value: any) {
          if(value) {
            _this.HttpRequests.setToken(value.token);
          }

      })
  }
}
