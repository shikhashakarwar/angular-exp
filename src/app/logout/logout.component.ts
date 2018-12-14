import { Component, OnInit } from '@angular/core';
import { QuizLocalForage } from '../services/quizStorage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})

export class LogoutComponent implements OnInit {

  constructor(private localForage: QuizLocalForage, private router: Router) { }

  ngOnInit() {
    const _this = this;
    _this.localForage.clear().then(function () {
      _this.router.navigateByUrl('getStarted');
    });
  }
}
