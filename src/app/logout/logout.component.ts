import { Component, OnInit } from '@angular/core';
import { qLocalForage } from "../services/quizStorage.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})

export class LogoutComponent implements OnInit {
  
  constructor(private localForage: qLocalForage, private router: Router) { }

  ngOnInit() {
    let _this = this;
    _this.localForage.clear().then(function () {
      _this.router.navigate(['/getStarted']);
    })
  }
}
