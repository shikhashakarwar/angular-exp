import { Component, OnInit } from '@angular/core';
import { QuizLocalForage } from '../../services/quizStorage.service';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLoggedInUser: Boolean = false;

  constructor(private localForage: QuizLocalForage) { }

  ngOnInit() {
    const _this = this;
    _this.localForage.getItem('user').then(function (values: any) {
        if (values && values.token) {
          _this.isLoggedInUser = true;
        }
    });
  }

}
