import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import { GetStartedComponent } from './get-started.component';
import { RegistrationModule } from "./registration/registration.module";
import { LoginModule } from "./login/login.module";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RegistrationModule,
    LoginModule
  ],
  declarations: [GetStartedComponent]
})
export class GetStartedModule { }
