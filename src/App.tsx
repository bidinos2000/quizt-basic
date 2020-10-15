import React, { useState } from 'react';
import QuestionCard from './components/QuestionCard'
import { fetchQuizQuestions} from './API';
import {QuestionState, Difficulty} from './API';
import './style.scss';

export type AnswerObject = {
    question: string;
    answer: string;
    correct: boolean;
    correctAnswer: string;
}

const TOTAL_QUESTIONS = 10;

const  App = () => {
    const [loading,setLoading] = useState(false);
    const[questions, setQuestions] = useState<QuestionState[]>([]);
    const[number, setNumber] = useState(0);
    const [userAnsers,setUserAnsers] = useState<AnswerObject[]>([]);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(true);
    
    const startTrivia = async () => {
        setLoading(true);
        setGameOver(false);

        const newQuestion = await fetchQuizQuestions(
            TOTAL_QUESTIONS,
            Difficulty.EASY
        );

        setQuestions(newQuestion);
        setScore(0);
        setUserAnsers([]);
        setNumber(0);
        setLoading(false);
    }

    const checkAnswer = (e : React.MouseEvent<HTMLButtonElement>) => {
        if(!gameOver) {
            //user answer
            const answer = e.currentTarget.value;
            //check answer against correct answer
            const correct = questions[number].correct_answer === answer;
            //add score if answer is correct
            if(correct) setScore(prev => prev + 1)
            //save answer in the array for user answers
            const answerObject = {
                question : questions[number].question,
                answer,
                correct,
                correctAnswer: questions[number].correct_answer,
            }
            setUserAnsers(prev => [...prev, answerObject])
        }
    }

    const nextQuestion = () => {
        //move on to the nex question if not the last question
        const nextQuestion = number + 1;

        if(nextQuestion === TOTAL_QUESTIONS) { 
            setGameOver(true);
        }else{
            setNumber(nextQuestion);
        }
    }

    return (
        <div className='App'>
            <h1>REACT QUIZ</h1>
            { gameOver || userAnsers.length === TOTAL_QUESTIONS ? (
                <button 
                    className="start" 
                    onClick={startTrivia}
                >Start</button>
            ) : null}
            {!gameOver ? <p className="score">Score: {score} </p> : null}
            {loading && <p className="loading">Loading Questions...</p>}
            {!loading && !gameOver &&(
            <QuestionCard 
                questionNr = {number + 1}
                totalQuestion={TOTAL_QUESTIONS}
                question = {questions[number].question}
                answers = {questions[number].answers}
                userAnswer = {userAnsers ? userAnsers[number] : undefined}
                callback = { checkAnswer}
            />
            )}
            {!gameOver && !loading && userAnsers.length === number + 1 && number !== TOTAL_QUESTIONS - 1 ? (
                <button className="next" onClick={nextQuestion}>
                    Next Question
                </button>
            ): null}
        </div>
    );
}

export default App;
