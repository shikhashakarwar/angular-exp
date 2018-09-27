import { Component, OnInit } from '@angular/core';
import { login } from "./login.model";
import { AuthService } from "./../../services/auth.service";
import { HttpRequests } from "../../configs/httpRequest";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: login = {
    email: null,
    password: null
  };
  showError: Boolean = false;
  submit: any;
  
  constructor(private AuthService: AuthService, private HttpRequests: HttpRequests, private router: Router) { }

  ngOnInit() {
  
  }

  signIn() {
    this.showError = false;
    this.AuthService.login(this.user).subscribe((data) => {
      console.log("login in success");
      this.HttpRequests.setToken(data.payload.user.token);
      this.router.navigate(['/dashboard']);
    },
    (error) => {
      this.showError = true;
      console.log(error);
    })
  }

}
