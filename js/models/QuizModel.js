import { Question } from "./Question.js";
import {questions} from "../data/questions.js";

export class QuizModel {
    constructor() {
        this.questions = [];
        this.currentQuestionIndex = 0;
        this.userAnswers = [];
    }

    loadQuestions() {
        try {
            this.questions = questions.map(data => new Question(data));
            return this.questions;
        } catch (error) {
            console.error("Error loading questions:", error);
            throw error;
        }
    }

    getCurrentQuestion() {
        return this.questions[this.currentQuestionIndex];
    }

    setAnswer(answer) {
        this.getCurrentQuestion()?.setUserAnswer(answer);
    }

    nextQuestion() {
        if (this.currentQuestionIndex < this.questions.length - 1) {
            this.currentQuestionIndex++;
            return true;
        }
        return false;
    }

    previousQuestion() {
        if (this.currentQuestionIndex > 0) {
            this.currentQuestionIndex--;
            return true;
        }
        return false;
    }

    calculateScore() {
        let correctAnswers = 0;
        this.questions.forEach(question => {
            correctAnswers += question.isCorrect(); // on cast le boolean en integer.
        });
        return {
            correct: correctAnswers,
            total: this.questions.length,
            percentage: Math.round((correctAnswers / this.questions.length) * 100)
        };
    }

    getProgress() {
        return {
            current: this.currentQuestionIndex + 1,
            total: this.questions.length,
            percentage: ((this.currentQuestionIndex + 1) / this.questions.length) * 100
        };
    }

    resetQuiz() {
        this.currentQuestionIndex = 0;
        this.questions.forEach(question => question.resetUserAnswer());
    }
}