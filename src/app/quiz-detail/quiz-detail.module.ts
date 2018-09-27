import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizDetailComponent } from './quiz-detail.component';
import { InfoPopupModule } from "../shared/info-popup/info-popup.module";
import { MatDialogModule } from "@angular/material";
import { NumberPlateComponent } from './number-plate/number-plate.component';
import { QuestionSectionComponent } from './question-section/question-section.component';
import { QuizService } from "../services/quiz.service";

@NgModule({
  imports: [
    CommonModule,
    InfoPopupModule,
    MatDialogModule
  ],
  declarations: [QuizDetailComponent, NumberPlateComponent, QuestionSectionComponent],
  providers: [QuizService],
  exports: [QuizDetailComponent]
})
export class QuizDetailModule { }
