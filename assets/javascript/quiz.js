/*---------------------------------------------------------------------Tutorial from Youtube - 'Web Dev Simplified'*/
/*---------------------------------------------------------------------Quiz*/
const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
});

const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
let shuffledQuestions, currentQuestionIndex;

function startGame() {
    startButton.classList.add('hide');
    shuffledQuestions = questions.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove('hide');
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    clearStatusClass(document.body);
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    setStatusClass(document.body, correct);
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    });
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');
    } else {
        startButton.innerText = 'Restart';
        startButton.classList.remove('hide');
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

const questions = [
    {
        question: 'Presently, how many playable gathering classes are there?',
        answers: [
            { text: '5', correct: false },
            { text: '4', correct: false },
            { text: '3', correct: true },
            { text: '2', correct: false }
        ]
    },
    {
        question: 'As of Shadowbringers, what are the names of the currently available tank jobs?',
        answers: [
            { text: 'Paladin, Warrior, Dark Knight and Gunbreaker', correct: true },
            { text: 'Paladin, Warrior and Dark Knight', correct: false },
            { text: 'Paladin, Warrior, Dark Knight and Monk', correct: false },
            { text: 'Paladin, Warrior, Dark Knight, Monk and Gunbreaker', correct: false }
        ]
    },
    {
        question: 'What is the name of the wind Primals in ARR?',
        answers: [
            { text: 'Ifrit', correct: false },
            { text: 'Garuda', correct: true },
            { text: 'Ramuh', correct: false },
            { text: 'Titan', correct: false },
        ]
    },
    {
        question: 'What is the name of the 10th Alexander raid?',
        answers: [
            { text: 'Alexander - The Fist of the Father', correct: false },
            { text: 'Alexander - The Cuff of the Son', correct: false },
            { text: 'Alexander - The Eyes Of The Creator', correct: true },
            { text: 'Alexander - The Heart of the Creator', correct: false }
        ]
    }
];