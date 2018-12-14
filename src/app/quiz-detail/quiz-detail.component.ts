import { Component, OnInit } from '@angular/core';
import { QuizService } from '../services/quiz.service';
import { Observable, forkJoin } from 'rxjs';
import { QuizLocalForage } from '../services/quizStorage.service';
import { Subject } from 'rxjs/Subject';
import { IQuestions, questionState } from '../models/questions';
import { Router } from '@angular/router';


@Component({
  selector: 'app-quiz-detail',
  templateUrl: './quiz-detail.component.html',
  styleUrls: ['./quiz-detail.component.scss']
})

export class QuizDetailComponent implements OnInit {

  totalQuestions: number;
  options = {
    email: ''
  };
  questionData: IQuestions[] = [];
  questionsByCategory = [];
  someValue: Subject<any> = new Subject<any>();
  displayQuestion: IQuestions;
  currentQuestion = 0;
  category = '';
  currentTabData: Array<IQuestions>;

  constructor(private quizService: QuizService, private quizStorage: QuizLocalForage, private router: Router) { }

  ngOnInit() {
    const _this = this;
    _this.quizStorage.getItem('user').then(function (values: any) {
      if (typeof(values) !== 'undefined') {
        _this.options.email = values.email;
        _this.getPreRequisiteData().subscribe(function (responseData: IQuestions) {
          _this.processResponseData({questions: responseData[0].questions});
        });
      }
    });
  }

  public getPreRequisiteData(): Observable<IQuestions> {
    const _this = this;
    return Observable.create(function (observer) {
      return forkJoin(_this.quizService.getQuizQuestions(_this.options)).subscribe(function (values: any) {
        observer.next(values);
        observer.complete();
      });
    });
  }

  public processResponseData(questionData) {
    this.questionData = questionData.questions;
    this.totalQuestions = this.questionData.length;
    console.log(this.questionData);
    this.preapereQuestionsMetaData();
    this.nominateQuestion(0);
  }

  preapereQuestionsMetaData() {
    const questionsByCategory = {};
    for (let i = 0; i < this.questionData.length; i++) {
      const question = this.questionData[i];
      if (question.subCategory) {
        if (questionsByCategory[question.subCategory]) {
          questionsByCategory[question.subCategory]['data'].push(question);
        } else {
          questionsByCategory[question.subCategory] = {'data': [question]};
        }
      } else {
        if (questionsByCategory[question.category]) {
          questionsByCategory[question.category]['data'].push(question);
        } else {
          questionsByCategory[question.category] = {'data': [question]};
        }
      }
    }
    this.setQuestionState(questionsByCategory);
  }

  setQuestionState(questionsByCategory) {
    for (const category in questionsByCategory) {
      if (questionsByCategory.hasOwnProperty(category)) {
        const data = questionsByCategory[category].data;
        questionsByCategory[category]['totalQuestions'] = data.length;
        const stateMetaData = this.filterQuestionByState(data);
        this.questionsByCategory.push({'catName': category,
          'data': data,
          'answered': stateMetaData.answeredCount,
          'unAnswered': stateMetaData.unAnsweredCount,
          'readLater': stateMetaData.readLaterCount
        });
      }
    }
  }

  filterQuestionByState(questionData) {
      const state = {
        'answeredCount': 0,
        'unAnsweredCount': 0,
        'readLaterCount': 0
      };
      questionData.filter(function (question) {
          if (question.state === questionState.answered) {
            state.answeredCount++;
          }
          if (question.state === questionState.unAnswered) {
            state.unAnsweredCount++;
          }
          if (question.state === questionState.readLater) {
            state.readLaterCount++;
          }
      });
      return state;
  }

  public nominateQuestion(currentQuestion) {
    let index = 0;
      for (let i = 0; i < this.questionsByCategory.length; i++) {
        if (this.questionsByCategory[i].catName === this.category) {
          index = this.questionsByCategory[i].data.indexOf(currentQuestion);
          break;
        }
      }
      index += 1;
      let question: IQuestions;
      for (let i = 0; i < this.questionsByCategory.length; i++) {
        if (this.questionsByCategory[i].catName === this.category) {
          question = this.questionsByCategory[i].data[index];
          break;
        }
      }
      this.displayQuestion = question ? question : this.questionsByCategory[0].data[0];
  }

  public onTabChange(event) {
    this.category = event.tab.textLabel;
    for (let i = 0; i < this.questionsByCategory.length; i++) {
      const questions = this.questionsByCategory[i];
      if (questions.catName === this.category) {
        this.currentTabData = questions.data;
        this.displayQuestion = questions.data[0];
        break;
      }
    }
    this.someValue.next(this.currentTabData);
  }

  public onSaveAndNextClick (question: IQuestions) {
    const _this = this;
    if (_this.displayQuestion.customAnswer) {
      _this.displayQuestion['state'] = questionState.answered;
    }
    this.saveAnswer({qId: _this.displayQuestion.id, email: _this.options.email,
      answer: _this.displayQuestion.customAnswer}).then(function (data) {
        _this.nominateQuestion(question);
      }, function(error) {
        _this.nominateQuestion(question);
      });
  }
  public saveAnswer(options) {
    const _this = this;
    return new Promise(function (reslove, reject) {
      _this.quizService.saveAnswer(options).subscribe((data) => {
        reslove(data);
      }, (error) => {
        console.log(error);
        reject(error);
      });
    });
  }

  public onMarkReviewClick (question: IQuestions) {
    this.displayQuestion.state = questionState.readLater;
    this.nominateQuestion(question);
  }

  public onClearClick (question: IQuestions) {
    const _this = this;
    _this.displayQuestion.customAnswer = null;
    _this.displayQuestion.state = 'unAnswered';
  }

  public goToQuestion(index: number) {
    const data = this.currentTabData[index];
    this.displayQuestion = data;
  }

  public onSubmitingQuiz(question: IQuestions) {
    const _this = this;
    this.saveAnswer({qId: _this.displayQuestion.id, email: _this.options.email,
      answer: _this.displayQuestion.customAnswer}).then(function () {
        _this.router.navigate(['/dashboard']);
      }, function (erorr) {

      });
  }
}
