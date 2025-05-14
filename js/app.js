import { QuizModel } from './models/QuizModel.js';
import { QuizController } from './controllers/QuizController.js';
import { HomeView } from './views/HomeView.js';
import { QuizView } from './views/QuizView.js';
import { ResultView } from './views/ResultView.js';


document.addEventListener('DOMContentLoaded', () => {
    const quizModel = new QuizModel();

    const homeView = new HomeView('home-view', () => {
        quizController.startQuiz();
    });

    const quizView = new QuizView('quiz-view', {
        onNext: () => quizController.nextQuestion(),
        onPrevious: () => quizController.previousQuestion(),
        onSubmit: () => quizController.showResults(),
        onAnswer: (answer) => quizController.handleAnswer(answer),
    });

    const resultView = new ResultView('result-view', () => {
        quizController.restartQuiz();
    });

    const quizController = new QuizController(quizModel, homeView, quizView, resultView);

    quizController.init();
});