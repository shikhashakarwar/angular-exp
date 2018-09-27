import { Component, OnInit } from '@angular/core';
import { qLocalForage } from "../services/quizStorage.service";
import { Router } from "@angular/router";
@Component({
  selector: 'app-get-started',
  templateUrl: './get-started.component.html',
  styleUrls: ['./get-started.component.scss']
})
export class GetStartedComponent implements OnInit {
  submit: any;
  
  constructor(private localForage: qLocalForage, private router: Router) { }

  ngOnInit() {
      var _this = this;
      _this.localForage.getItem('user').then(function (values:any) {
        if(values && values.token) {
          _this.router.navigate(['/dashboard']);
        }
      });
  }

}
