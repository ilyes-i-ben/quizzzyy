export class QuizController {
    // plus ou moins une injection de dépendance des model et les views...
    constructor(model, homeView, quizView, resultView) {
        this.model = model;
        this.homeView = homeView;
        this.quizView = quizView;
        this.resultView = resultView;

        this.currentState = 'home'; // 'home', 'quiz', or 'result'
    }

     init() {
        try {
            this.model.loadQuestions();
            this.showHomeView();
        } catch (error) {
            console.error("Error initializing quiz:", error);
        }
    }

    showHomeView() {
        this.currentState = 'home';
        this.homeView.show();
        this.quizView.hide();
        this.resultView.hide();
    }

    startQuiz() {
        this.currentState = 'quiz';
        this.model.resetQuiz();
        this.homeView.hide();
        this.quizView.show();
        this.resultView.hide();
        this.renderCurrentQuestion();
    }

    showResults() {
        this.currentState = 'result';
        const score = this.model.calculateScore();

        // on utilise localStorage pour stocker son score, et l'afficher par la suite.
        localStorage.setItem('lastScore', JSON.stringify(score));
        this.homeView.hide();
        this.quizView.hide();
        this.resultView.show();
        this.resultView.renderResults(score, this.model.questions);
    }

    restartQuiz() {
        this.startQuiz();
    }

    renderCurrentQuestion() {
        const currentQuestion = this.model.getCurrentQuestion();
        const progress = this.model.getProgress();
        this.quizView.renderQuestion(currentQuestion, progress);
    }

    handleAnswer(answer) {
        this.model.setAnswer(answer);
    }

    nextQuestion() {
        const hasNext = this.model.nextQuestion();
        if (hasNext) {
            this.renderCurrentQuestion();
        }
    }

    previousQuestion() {
        const hasPrevious = this.model.previousQuestion();
        if (hasPrevious) {
            this.renderCurrentQuestion();
        }
    }
}