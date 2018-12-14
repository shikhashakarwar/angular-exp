import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { QuizLocalForage } from '../services/quizStorage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private userService: UserService, private router: Router, private QuizLocalForageService: QuizLocalForage) { }

  ngOnInit() {
    const _this = this;
    _this.QuizLocalForageService.getItem('user').then(function (values: any) {
      _this.userService.getUserInfo({email: values.email}).subscribe((data) => {

      }, (error) => {
        console.log(error);
      });
    });
  }
}
