import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';
import {MatButtonModule, MatInputModule} from '@angular/material';

import { AuthService } from './../../services/auth.service';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatInputModule
  ],
  providers: [AuthService],
  declarations: [LoginComponent],
  exports: [LoginComponent]
})
export class LoginModule { }
