import { Component, OnInit, Input, Output , EventEmitter} from '@angular/core';
import { InfoPopupComponent } from '../../shared/info-popup/info-popup.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-question-section',
  templateUrl: './question-section.component.html',
  styleUrls: ['./question-section.component.scss']
})
export class QuestionSectionComponent implements OnInit {
  @Input() displayQuestion;
  @Output() saveAndNext = new EventEmitter();
  @Output() markReview = new EventEmitter();
  @Output() clearAnswer = new EventEmitter();
  @Output() submitQuiz = new EventEmitter();
  _this: any;
  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  public saveAndNavigate() {
    this.saveAndNext.emit(this.displayQuestion);
  }

  public markForReview () {
    this.markReview.emit(this.displayQuestion);
  }

  public clear() {
    this.clearAnswer.emit(this.displayQuestion);
  }

  public submitTest() {
    const _this = this;
    const infoPopupRef = _this.dialog.open(InfoPopupComponent, {
      data: {
        title: 'Do you really want to Submit test?',
        description: 'Please review your answers before submiting.',
        showCancelBtn: true,
        closeBtnLabel: 'Submit',
        callback: function () {
          _this.submitQuiz.emit(this.displayQuestion);
        }
     }
  });
  }
}
