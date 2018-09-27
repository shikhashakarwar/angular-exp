import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizComponent } from './quiz.component';
import { InfoPopupModule } from "../shared/info-popup/info-popup.module";
import { InfoPopupComponent } from "../shared/info-popup/info-popup.component";
import { MatCardModule, MatDialogModule } from '@angular/material';
import { QuizDetailModule } from "../quiz-detail/quiz-detail.module";
import { RouterModule } from "@angular/router";

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    InfoPopupModule,
    MatDialogModule,
    QuizDetailModule,
    RouterModule
  ],
  declarations: [QuizComponent],
  entryComponents: [InfoPopupComponent]
})
export class QuizModule { }
