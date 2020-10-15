import React from 'react';
import { AnswerObject} from '../App';
import { Wrapper, ButtonWrapper} from './QuestionCard.styles';

type Props = {
    question: string;
    answers: string[];
    callback: (e : React.MouseEvent<HTMLButtonElement>) => void;
    userAnswer: AnswerObject | undefined;
    questionNr: number;
    totalQuestion: number;
}

const QuestionCard: React.FC<Props> = ({
    question,
    answers,
    callback,
    userAnswer,
    questionNr,
    totalQuestion
}) => (
    <Wrapper>
        <p className="number" >
            Question: {questionNr} / {totalQuestion}
        </p>
        <p dangerouslySetInnerHTML={{ __html: question}}/>
        <div>
            {answers.map((answer, index) => (
                <ButtonWrapper 
                    key = {index}
                    correct={userAnswer?.correctAnswer === answer}
                    userClicked={userAnswer?.answer === answer}
                >
                    <button 
                        disabled={userAnswer ? true : false} 
                        onClick={callback}
                        value={answer}
                    >
                        <span dangerouslySetInnerHTML={{ __html: answer}}/>
                    </button>
                </ButtonWrapper>
            ))}
        </div>
    </Wrapper>
);

export default QuestionCard;