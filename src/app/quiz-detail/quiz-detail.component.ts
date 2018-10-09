import { Component, OnInit } from '@angular/core';
import { QuizService } from "../services/quiz.service";
import { Observable, forkJoin } from "rxjs";
import { qLocalForage } from "../services/quizStorage.service";
import { Subject } from "rxjs/Subject";
import { IQuestions, questionState } from "../models/questions";


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
  currentQuestion : number = 0;
  category: string = '';

  constructor(private QuizService: QuizService, private quizStorage: qLocalForage) { }
  
  ngOnInit() {
    let _this = this;
    _this.quizStorage.getItem('user').then(function (values: any) {
      if(typeof(values) !== 'undefined') {
        _this.options.email = values.email;
        _this.getPreRequisiteData().subscribe(function (responseData: IQuestions) {
          _this.processResponseData({questions: responseData[0].questions});
        });
      }
    });
  };
  
  public getPreRequisiteData(): Observable<IQuestions> {
    let _this = this;
    return Observable.create(function (observer) {
      return forkJoin(_this.QuizService.getQuizQuestions(_this.options)).subscribe(function (values:any) {
        observer.next(values);
        observer.complete();
      })
    });
  };

  public processResponseData(questionData) {
    this.questionData = questionData.questions;
    this.totalQuestions = this.questionData.length;
    console.log(this.questionData);
    this.preapereQuestionsMetaData();
    this.someValue.next(this.questionsByCategory);
    this.nominateQuestion(0);
  }

  preapereQuestionsMetaData() {
    let questionsByCategory = {};
    for (let i = 0; i < this.questionData.length; i++) {
      const question = this.questionData[i];
      if (question.subCategory) {
        if(questionsByCategory[question.subCategory]) {
          questionsByCategory[question.subCategory]['data'].push(question);
        } else {
          questionsByCategory[question.subCategory] = {'data': [question]};
        }
      } else {
        if(questionsByCategory[question.category]) {
          questionsByCategory[question.category]['data'].push(question);
        } else {
          questionsByCategory[question.category] = {'data': [question]};
        }
      }
    }
    this.setQuestionState(questionsByCategory);
  };

  setQuestionState(questionsByCategory) {
    let test = [];
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
        })
      }
    }
  };

  filterQuestionByState(questionData) {
      let state = {
        'answeredCount': 0,
        'unAnsweredCount': 0,
        'readLaterCount': 0
      }
      questionData.filter(function (question) {
          if (question.state == questionState.answered) {
            state.answeredCount++;
          }
          if (question.state == questionState.unAnswered) {
            state.unAnsweredCount++;
          }
          if (question.state == questionState.readLater) {
            state.readLaterCount++;
          }
      });
      return state;
  };

  public nominateQuestion(index) {
    let question;
    for (let i = 0; i < this.questionsByCategory.length; i++) {
      if(this.questionsByCategory[i].catName == this.category) {
        question = this.questionsByCategory[i].data[index];
        break;
      }
      
    }
    this.displayQuestion = question ? question : this.questionsByCategory[0].data[0];
  };

  public onTabChange(event) {
    this.category = event.tab.textLabel;
    for (let i = 0; i < this.questionsByCategory.length; i++) {
      const questions = this.questionsByCategory[i];
      if (questions.catName == this.category) {
        this.displayQuestion = questions.data[0];
        break;
      }
    }
  }

  public onSaveAndNextClick (question) {
    this.displayQuestion['state'] = questionState.answered;
    console.log(this.questionsByCategory);
    this.QuizService.saveAnswer({qId: this.displayQuestion.id, email: this.options.email, answer: this.displayQuestion.customAnswer}).subscribe((data) => {
      let index = 0;
      for (let i = 0; i < this.questionsByCategory.length; i++) {
        if(this.questionsByCategory[i].catName == this.category) {
          index = this.questionsByCategory[i].data.indexOf(question);
          break;
        }  
      }
      index += 1;
      this.nominateQuestion(index);
    }, (error) => {
        console.log("error");
        console.log(error);
        
    })
  }

  public onMarkReviewClick (question) {
    this.displayQuestion.state = questionState.readLater;
    console.log(this.questionsByCategory);
  }
}
