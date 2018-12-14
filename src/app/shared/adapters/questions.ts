import { IQuestions, questionState } from '../../models/questions';

export class QuestionsAdapter implements IQuestions {
    id: string;
    text: string;
    choices: object;
    category: string;
    subCategory: string;
    answers: string;
    level: string;
    state: string;
    customAnswer: string;
    questions: IQuestions[] = [];

    constructor(data) {
        for (let i = 0; i < data.length; i++) {
            this.questions.push({
                id: data[i].qId,
                text: data[i].text,
                choices: [
                    {
                        text: data[i].que_choice.choice_1,
                        value: data[i].que_choice.choice_1_value
                    },
                    {
                        text: data[i].que_choice.choice_2,
                        value: data[i].que_choice.choice_2_value
                    },
                    {
                        text: data[i].que_choice.choice_3,
                        value: data[i].que_choice.choice_3_value
                    },
                    {
                        text: data[i].que_choice.choice_4,
                        value: data[i].que_choice.choice_4_value
                    }
                ],
                category: data[i].category,
                subCategory: data[i].sub_category,
                answers: data[i].user_answer,
                customAnswer: (data[i].user_answer && data[i].user_answer.answer) ? (data[i].user_answer.answer) : '',
                level: data[i].level,
                state: (data[i].user_answer && data[i].user_answer.answer) ?  questionState.answered : questionState.unAnswered
            });
        }
    }

}
