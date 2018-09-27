import { Component, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material";
import { QuizService } from "../services/quiz.service";

@Component({
  selector: 'app-quiz-detail',
  templateUrl: './quiz-detail.component.html',
  styleUrls: ['./quiz-detail.component.scss']
})

export class QuizDetailComponent implements OnInit {

  options = {

  };
  constructor(private QuizService: QuizService) { }

  ngOnInit() {
      this.getQuestions();
  }

  public getQuestions() {
    this.QuizService.getQuizQuestions(this.options).subscribe((data)=> {
      console.log(data);
    }, (error) => {
      console.log(error);
    })
  }
}
