export class HomeView {
    constructor(containerId, startQuizCallback) {
        this.container = document.getElementById(containerId);
        this.startQuizCallback = startQuizCallback;
        this.render();
    }

    render() {
        this.container.innerHTML = `
        <div class="start-screen">
            <h2>Bienvenue à Quizzzyy</h2>
            <p>Ce quiz contient plusieurs questions à choix multiples pour tester vos connaissances.</p>
            <p>Prêt à commencer?</p>
            <button id="start-button" class="btn">Commencer le Quiz</button>
        </div>
        `;

        // on affiche le dernier score, s'il existe...
        this.showLastScore();
        document.getElementById('start-button').addEventListener('click', () => {
            this.startQuizCallback();
        });
    }

    showLastScore() {
        const lastScore = localStorage.getItem('lastScore');
        const scoreContainer = document.createElement('div');
        scoreContainer.id = 'last-score';
        if (lastScore) {
            const score = JSON.parse(lastScore);
            scoreContainer.innerHTML = `
            <p>Dernier score : ${score.correct} / ${score.total} (${score.percentage}%)</p>
        `;
        } else {
            scoreContainer.innerHTML = '';
        }
        // Ajoutez le score au début du container
        this.container.prepend(scoreContainer);
    }

    show() {
        this.container.classList.remove('hidden');
    }

    hide() {
        this.container.classList.add('hidden');
    }
}