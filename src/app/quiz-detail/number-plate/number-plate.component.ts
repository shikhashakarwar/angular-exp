import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IQuestions } from 'src/app/models/questions';

@Component({
  selector: 'app-number-plate',
  templateUrl: './number-plate.component.html',
  styleUrls: ['./number-plate.component.scss']
})
export class NumberPlateComponent implements OnInit {
  @Input() questionsByCategory;
  @Input() displayQuestion: IQuestions;
  @Output() navigateQues = new  EventEmitter();
  totalQuestions = 0;
  currentCatQuestions = [];

  constructor() { }

  ngOnInit() {
    this.questionsByCategory.subscribe((data: Array<object>) => {
      this.currentCatQuestions = data;
      this.totalQuestions = data.length;
    });
  }

  public onNumberClick(index: number) {
    this.navigateQues.emit(index);
  }
}
