import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from './registration.component';
import { FormsModule } from '@angular/forms';
import {MatButtonModule, MatInputModule} from '@angular/material';
@NgModule({
  imports: [
    CommonModule,
    MatButtonModule, MatInputModule,
    FormsModule
  ],
  declarations: [RegistrationComponent],
  exports: [RegistrationComponent]
})
export class RegistrationModule { }
