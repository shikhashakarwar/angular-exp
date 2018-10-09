import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizDetailComponent } from './quiz-detail.component';
import { InfoPopupModule } from "../shared/info-popup/info-popup.module";
import { MatDialogModule } from "@angular/material";
import { NumberPlateComponent } from './number-plate/number-plate.component';
import { QuestionSectionComponent } from './question-section/question-section.component';
import { QuizService } from "../services/quiz.service";
import {MatTabsModule, MatButtonModule} from '@angular/material';
import {MatRadioModule} from '@angular/material/radio';
import { FormsModule } from "@angular/forms";


@NgModule({
  imports: [
    CommonModule,
    InfoPopupModule,
    MatDialogModule,
    MatTabsModule,
    MatRadioModule,
    MatButtonModule,
    FormsModule
  ],
  declarations: [QuizDetailComponent, NumberPlateComponent, QuestionSectionComponent],
  providers: [QuizService],
  exports: [QuizDetailComponent]
})
export class QuizDetailModule { }
