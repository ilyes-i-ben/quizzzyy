export class Question {
    constructor(data) {
        this.id = data.id;
        this.text = data.text;
        this.type = data.type;
        this.options = data.options || [];
        this.correctAnswer = data.correctAnswer || null;
        this.userAnswer = null;
    }

    isCorrect() {
        if (!this.userAnswer) return false;

        switch (this.type) {
            case 'radio':
                const correctOption = this.options.find(option => option.correct);
                return this.userAnswer === correctOption.id;

            case 'checkbox':
                const correctOptions = this.options
                    .filter(option => option.correct)
                    .map(option => option.id);

                const userAnswers = Array.isArray(this.userAnswer) ? this.userAnswer : [this.userAnswer];

                return correctOptions.length === userAnswers.length &&
                    correctOptions.every(id => userAnswers.includes(id));

            case 'text':
                return this.userAnswer.toLowerCase().trim() === this.correctAnswer.toLowerCase().trim();

            default:
                return false;
        }
    }

    setUserAnswer(answer) {
        this.userAnswer = answer;
    }

    resetUserAnswer() {
        this.userAnswer = null;
    }
}