import { Component, OnInit, Input, Output , EventEmitter} from '@angular/core';

@Component({
  selector: 'question-section',
  templateUrl: './question-section.component.html',
  styleUrls: ['./question-section.component.scss']
})
export class QuestionSectionComponent implements OnInit {
  @Input('displayQuestion') question;
  @Output() saveAndNext = new EventEmitter();
  @Output() markReview = new EventEmitter();

  constructor() { }

  ngOnInit() {
    console.log(this.question); 
  }
  
  saveAndNavigate() {
    this.saveAndNext.emit(this.question);
  }

  markForReview () {
    this.markReview.emit(this.question);
  }

  clear() {
    this.question.customAnswer = '';
  }
}
