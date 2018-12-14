import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { QuestionsAdapter } from '../shared/adapters/questions';
import { QuizService } from './quiz.service';
import { HttpClient } from '@angular/common/http';

describe('QuizService', () => {
  let httpMock: HttpTestingController;
  let quizService: QuizService;
  let inject: TestBed;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuizService],
      imports: [HttpClientTestingModule]
    });
    inject = getTestBed();
    httpMock = inject.get(HttpTestingController);
    quizService = inject.get(QuizService);
    httpClient = inject.get(HttpClient);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(quizService).toBeTruthy();
  });

  it('getQuizQuestion should be called with proper arguments', () => {
    const params = {
      id: 'some Id',
      email: 'test@newput.com'
    };
    const queResponse = {
      payload: {
        data: [
          {
            qId: 'q1',
            text: 'The members of the Rajya Sabha are elected by',
            level: '1',
            category: 'social science',
            sub_category: 'politics',
            que_choice:
            {
              choice_1: 'the people',
              choice_2: 'lok sabha',
              choice_3: 'elected members of the legislative assembly',
              choice_4: 'elected members of the legislative council',
              choice_1_value: 'the_people',
              choice_2_value: 'lok_sabha',
              choice_3_value: 'elected_members_of_the_legislative_assembly',
              choice_4_value: 'elected_members_of_the_legislative_council'
            },
            user_answer: {
              answer: ''
            }
          },
          {
            qId: 'q1',
            text: 'The members of the Rajya Sabha are elected by',
            level: '1',
            category: 'social science',
            sub_category: 'politics',
            que_choice:
            {
              choice_1: 'the people',
              choice_2: 'lok sabha',
              choice_3: 'elected members of the legislative assembly',
              choice_4: 'elected members of the legislative council',
              choice_1_value: 'the_people',
              choice_2_value: 'lok_sabha',
              choice_3_value: 'elected_members_of_the_legislative_assembly',
              choice_4_value: 'elected_members_of_the_legislative_council'
            },
            user_answer: {
              answer: ''
            }
          }
        ]
      }
    };
    quizService.getQuizQuestions(params).subscribe((response) => {
      expect(response.questions.length).toBe(2);
    }, (error) => {

    });
    const req = httpMock.expectOne('http://localhost:3000/api/v1/quizData/questions?id=gk&email=test@newput.com');
    expect(req.request.method).toBe('GET');
    req.flush(queResponse);
  });

  it('getQuizQuestion should return empty question when no question available', () => {
    const params = {
      id: 'some Id',
      email: 'test@newput.com'
    };
    const queResponse = {
      payload: {
        data: []
      }
    };
    quizService.getQuizQuestions(params).subscribe((response) => {
      expect(response.questions.length).toBe(0);
    });
    const req = httpMock.expectOne('http://localhost:3000/api/v1/quizData/questions?id=gk&email=test@newput.com');
    expect(req.request.method).toBe('GET');
    req.flush(queResponse);
  });

  it('saveAnswer should save answer with provided value', () => {
    const expectedResponse = {
      payload: {
        data: '',
        message: 'success'
      }
    };
    const samplePostData = {
      id: 'q1',
      answer: 'test',
      email: 'test@newput.com'
    };
    quizService.saveAnswer(samplePostData).subscribe((response) => {
      expect(response.payload.message).toBe('success');
    });
    const req = httpMock.expectOne(quizService.apiUrl + '/answer');
    expect(req.request.method).toBe('PUT');
    req.flush(expectedResponse);
  });

  it('saveAnswer should alert when id is not provided', () => {
    const expectedResponse = {
      payload: {
        data: '',
        message: 'error'
      }
    };
    const samplePostData = {
      answer: 'test',
      email: 'test@newput.com'
    };
    quizService.saveAnswer(samplePostData).subscribe((response) => {
      fail();
    }, (error) => {
        expect(error.error.payload.message).toBe('error');
    });
    const req = httpMock.expectOne(quizService.apiUrl + '/answer');
    expect(req.request.method).toBe('PUT');
    req.flush(expectedResponse, { status: 400, statusText : 'id is not provided'});
  });
});
