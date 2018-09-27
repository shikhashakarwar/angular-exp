import { Component, OnInit } from '@angular/core';
import { UserService } from "../services/user.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private UserService: UserService, private router: Router) { }

  ngOnInit() {
    console.log("we are on dashboard");
    this.UserService.getUserInfo().subscribe((data) => {
      console.log("user service response success");
      console.log(data);
    }, (error) =>{
      console.log("user service response error");
      console.log(error);
    })
  }
}
