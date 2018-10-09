export enum questionState {
    answered = 'answered',
    unAnswered = 'unanswered',
    readLater = 'readLater'
  };  

export interface IQuestions {
    id: string;
    text: string;
    choices: object;
    category: string;
    subCategory: string;
    answers: string;
    level: string;
    state: string;
    customAnswer: string;
}