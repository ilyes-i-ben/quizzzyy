export class ResultView {
    constructor(containerId, restartQuizCallback) {
        this.container = document.getElementById(containerId);
        this.restartQuizCallback = restartQuizCallback;
    }

    renderResults(score, questions) {
        this.container.innerHTML = `
            <div class="result-summary">
                <h2>Résultat du Quiz</h2>
                <p class="result-score">${score.correct} / ${score.total} (${score.percentage}%)</p>
                <p>${this.getScoreMessage(score.percentage)}</p>
            </div>
            <div class="answer-review-container">
                <h3>Révision des Réponses</h3>
                <div class="answer-reviews"></div>
            </div>
            <button id="restart-button" class="btn">Recommencer le Quiz</button>
        `;

        const answerReviewsContainer = this.container.querySelector('.answer-reviews');
        questions.forEach((question, index) => {
            const isCorrect = question.isCorrect();
            const reviewElement = document.createElement('div');
            reviewElement.className = `answer-review ${isCorrect ? 'correct' : 'incorrect'}`;

            let reviewContent = `
                <p><strong>Question ${index + 1}:</strong> ${question.text}</p>
            `;

            switch (question.type) {
                case 'radio':
                case 'checkbox':
                    const correctOptions = question.options
                        .filter(option => option.correct)
                        .map(option => option.text)
                        .join(', ');

                    let userAnswerText = 'Pas de réponse';

                    if (question.userAnswer) {
                        if (Array.isArray(question.userAnswer)) {
                            userAnswerText = question.userAnswer
                                .map(id => {
                                    const option = question.options.find(opt => opt.id === id);
                                    return option ? option.text : '';
                                })
                                .filter(text => text)
                                .join(', ');
                        } else {
                            const selectedOption = question.options.find(opt => opt.id === question.userAnswer);
                            userAnswerText = selectedOption ? selectedOption.text : 'Réponse invalide';
                        }
                    }

                    reviewContent += `
                        <p>Votre réponse: ${userAnswerText}</p>
                        <p>Réponse correcte: ${correctOptions}</p>
                    `;
                    break;

                case 'text':
                    reviewContent += `
                        <p>Votre réponse: ${question.userAnswer || 'Pas de réponse'}</p>
                        <p>Réponse correcte: ${question.correctAnswer}</p>
                    `;
                    break;
            }

            reviewElement.innerHTML = reviewContent;
            answerReviewsContainer.appendChild(reviewElement);
        });

        document.getElementById('restart-button').addEventListener('click', () => {
            this.restartQuizCallback();
        });
    }

    getScoreMessage(percentage) {
        if (percentage >= 90) {
            return 'Excellent! Vous êtes un expert!';
        } else if (percentage >= 70) {
            return 'Très bien! Vous avez de bonnes connaissances!';
        } else if (percentage >= 50) {
            return 'Pas mal, mais vous pouvez faire mieux!';
        } else {
            return 'Continuez à apprendre, vous vous améliorerez!';
        }
    }

    show() {
        this.container.classList.remove('hidden');
    }

    hide() {
        this.container.classList.add('hidden');
    }
}