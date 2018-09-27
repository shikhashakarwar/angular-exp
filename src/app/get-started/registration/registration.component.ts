import { Component, OnInit } from '@angular/core';
import { registration } from "./registration";
import { AuthService } from "../../services/auth.service";
import {  Router } from "@angular/router";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  submit: any;
  
  signUpUser: registration = {
    firstName: null,
    lastName: null,
    email: null,
    password: null
  };

  showError: Boolean = false;
  constructor(private AuthService: AuthService, private router: Router) { }

  ngOnInit() {

  }
  
  signUp() {
    this.showError = false;
    this.AuthService.registerUser(this.signUpUser).subscribe((data) => {
      console.log("sign up user success");
      this.router.navigate['dashboard'];
    }, (error) => {
      console.log("sign up user error");
      if(error && error.status == '409') {
        this.showError = true;
      }
      console.log(error);
    });
  }
}
