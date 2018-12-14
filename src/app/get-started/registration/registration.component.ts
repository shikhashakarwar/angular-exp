import { Component, OnInit } from '@angular/core';
import { IRegistration } from './registration';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  submit: any;
  signUpUser: IRegistration = {
    firstName: null,
    lastName: null,
    email: null,
    password: null
  };

  showError: Boolean = false;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() { }

  signUp() {
    this.showError = false;
    this.authService.registerUser(this.signUpUser).subscribe((data) => {
      this.router.navigateByUrl('dashboard');
    }, (error) => {
      if (error && error.status === '409') {
        this.showError = true;
      }
    });
  }
}
