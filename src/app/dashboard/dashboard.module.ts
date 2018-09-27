import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { DashboardComponent } from './dashboard.component';
import { UserService } from "../services/user.service";
import { MatButtonModule } from "@angular/material";
import { MatCardModule } from "@angular/material";
import { SideNavigationModule } from "./side-navigation/side-navigation.module";
import { QuizModule } from "../quiz/quiz.module";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatCardModule,
    SideNavigationModule,
    QuizModule
  ],
  declarations: [DashboardComponent],
  providers: [UserService],
  exports: [DashboardComponent]
})
export class DashboardModule { }
