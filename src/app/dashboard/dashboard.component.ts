import { Component, OnInit } from '@angular/core';
import { UserService } from "../services/user.service";
import { Router } from '@angular/router';
import { qLocalForage } from "../services/quizStorage.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private UserService: UserService, private router: Router, private qLocalForage: qLocalForage) { }

  ngOnInit() {
    console.log("we are on dashboard");
    var _this = this;
    _this.qLocalForage.getItem('user').then(function (values:any) {
      _this.UserService.getUserInfo({email: values.email}).subscribe((data) => {
        console.log("user service response success");
        console.log(data);
      }, (error) =>{
        console.log("user service response error");
        console.log(error);
      })
    })
  }
}
