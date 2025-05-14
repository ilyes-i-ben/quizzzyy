export class QuizView {
    constructor(containerId, navigationCallbacks) {
        this.container = document.getElementById(containerId);
        this.questionContainer = document.getElementById('question-container');
        this.progressBar = document.getElementById('progress-bar');
        this.nextButton = document.getElementById('next-button');
        this.prevButton = document.getElementById('prev-button');
        this.submitButton = document.getElementById('submit-button');

        this.callbacks = navigationCallbacks;

        this.setupEventListeners();
    }

    setupEventListeners() {
        this.nextButton.addEventListener('click', () => {
            this.callbacks.onNext();
        });

        this.prevButton.addEventListener('click', () => {
            this.callbacks.onPrevious();
        });

        this.submitButton.addEventListener('click', () => {
            this.callbacks.onSubmit();
        });
    }

    renderQuestion(question, progress) {
        this.questionContainer.innerHTML = '';

        const questionElement = document.createElement('div');
        questionElement.className = 'question';

        const questionTitle = document.createElement('h3');
        questionTitle.className = 'question-title';
        questionTitle.textContent = `Question ${progress.current} sur ${progress.total} :`;
        questionTitle.innerHTML += '<br>';
        questionTitle.innerHTML += question.text;
        questionElement.appendChild(questionTitle);

        const optionsContainer = document.createElement('div');
        optionsContainer.className = 'options';

        switch (question.type) {
            case 'radio':
                this.renderRadioOptions(optionsContainer, question);
                break;
            case 'checkbox':
                this.renderCheckboxOptions(optionsContainer, question);
                break;
            case 'text':
                this.renderTextInput(optionsContainer, question);
                break;
        }

        questionElement.appendChild(optionsContainer);
        this.questionContainer.appendChild(questionElement);

        this.progressBar.style.width = `${progress.percentage}%`;

        this.prevButton.classList.toggle('hidden', progress.current === 1);
        this.nextButton.classList.toggle('hidden', progress.current === progress.total);
        this.submitButton.classList.toggle('hidden', progress.current !== progress.total);
    }

    renderRadioOptions(container, question) {
        question.options.forEach(option => {
            const optionLabel = document.createElement('label');
            optionLabel.className = 'option';

            const isSelected = question.userAnswer === option.id;
            if (isSelected) {
                optionLabel.classList.add('selected');
            }

            const radioInput = document.createElement('input');
            radioInput.type = 'radio';
            radioInput.name = `question${question.id}`;
            radioInput.value = option.id;
            radioInput.checked = isSelected;

            const customRadio = document.createElement('span');
            customRadio.className = 'radio-custom';

            const optionText = document.createElement('span');
            optionText.className = 'option-text';
            optionText.textContent = option.text;

            optionLabel.appendChild(radioInput);
            optionLabel.appendChild(customRadio);
            optionLabel.appendChild(optionText);

            radioInput.addEventListener('change', () => {
                container.querySelectorAll('.option').forEach(opt => {
                    opt.classList.remove('selected');
                });

                optionLabel.classList.add('selected');

                this.callbacks.onAnswer(option.id);
            });

            container.appendChild(optionLabel);
        });
    }

    renderCheckboxOptions(container, question) {
        const userAnswers = Array.isArray(question.userAnswer)
            ? question.userAnswer
            : (question.userAnswer ? [question.userAnswer] : []);

        question.options.forEach(option => {
            const optionLabel = document.createElement('label');
            optionLabel.className = 'option';

            const isSelected = userAnswers.includes(option.id);
            if (isSelected) {
                optionLabel.classList.add('selected');
            }

            const checkboxInput = document.createElement('input');
            checkboxInput.type = 'checkbox';
            checkboxInput.name = `question${question.id}`;
            checkboxInput.value = option.id;
            checkboxInput.checked = isSelected;

            const customCheckbox = document.createElement('span');
            customCheckbox.className = 'checkbox-custom';

            const optionText = document.createElement('span');
            optionText.className = 'option-text';
            optionText.textContent = option.text;

            optionLabel.appendChild(checkboxInput);
            optionLabel.appendChild(customCheckbox);
            optionLabel.appendChild(optionText);

            optionLabel.addEventListener('click', (e) => {
                console.log('clicked !')
                if (e.target === checkboxInput) return;

                if (checkboxInput.checked) {
                    optionLabel.classList.add('selected');
                } else {
                    optionLabel.classList.remove('selected');
                }

                const allChecked = Array.from(
                    container.querySelectorAll('input[type="checkbox"]:checked')
                ).map(input => input.value);

                this.callbacks.onAnswer(allChecked);
            });

            checkboxInput.addEventListener('change', () => {
                if (checkboxInput.checked) {
                    optionLabel.classList.add('selected');
                } else {
                    optionLabel.classList.remove('selected');
                }

                const allChecked = Array.from(
                    container.querySelectorAll('input[type="checkbox"]:checked')
                ).map(input => input.value);

                this.callbacks.onAnswer(allChecked);
            });

            container.appendChild(optionLabel);
        });
    }

    renderTextInput(container, question) {
        const inputContainer = document.createElement('div');
        inputContainer.className = 'text-input-container';

        const label = document.createElement('label');
        label.textContent = 'Votre réponse:';

        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'text-answer';
        input.value = question.userAnswer || '';
        input.placeholder = 'Tapez votre réponse ici';

        input.addEventListener('input', (e) => {
            this.callbacks.onAnswer(e.target.value);
        });

        inputContainer.appendChild(label);
        inputContainer.appendChild(input);
        container.appendChild(inputContainer);
    }

    show() {
        this.container.classList.remove('hidden');
    }

    hide() {
        this.container.classList.add('hidden');
    }
}