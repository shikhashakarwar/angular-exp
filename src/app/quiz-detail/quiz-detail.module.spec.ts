import {} from 'jasmine';
import { QuizDetailModule } from './quiz-detail.module';

describe('QuizDetailModule', () => {
  let quizDetailModule: QuizDetailModule;

  beforeEach(() => {
    quizDetailModule = new QuizDetailModule();
  });

  it('should create an instance', () => {
    expect(quizDetailModule).toBeTruthy();
  });
});
