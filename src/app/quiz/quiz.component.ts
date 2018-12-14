import { Component, OnInit } from '@angular/core';
import { InfoPopupComponent } from '../shared/info-popup/info-popup.component';
import { MatDialog } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { QuizService } from '../services/quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
  quizId = 1;

  constructor(private dialog: MatDialog, private router: Router, private route: ActivatedRoute, private QuizService: QuizService) { }

  ngOnInit() {
    const _this = this;
    _this.route.queryParams.subscribe((params) => {
      _this.quizId = params['id'] ? params['id'] : _this.quizId;
    });
  }

  showOverViewPopUp(): void {
    const infoPopupRef = this.dialog.open(InfoPopupComponent, {
        data: {title: 'Quiz Instructions', 'description':
        '<ul><li>Time: Time alloted for quiz is 15 mins.</li><li>Total questions: total questions for this quiz is 20.</li></ul>' }
    });
  }
}
