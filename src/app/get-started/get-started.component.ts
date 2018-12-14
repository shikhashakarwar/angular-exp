import { Component, OnInit } from '@angular/core';
import { QuizLocalForage } from '../services/quizStorage.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-get-started',
  templateUrl: './get-started.component.html',
  styleUrls: ['./get-started.component.scss']
})
export class GetStartedComponent implements OnInit {
  submit: any;

  constructor(private localForage: QuizLocalForage, private router: Router) { }

  ngOnInit() {
      const _this = this;
      _this.localForage.getItem('user').then(function (values: any) {
        if (values && values.token) {
          _this.router.navigateByUrl('dashboard');
        }
      });
  }

}
