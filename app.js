let hasFlippedCard = false;
let lockBoard = false;
let currentCard;
let correctScore = 0;
let wrongScore = 0;
const correctScore_span = document.getElementById('correct-score');
const wrongScore_span = document.getElementById('wrong-score');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const cards = document.querySelectorAll('.animal-card');
const card = document.querySelector('.animal-card');

const owl = [
    {
        question: 'How many owl species are there in the world?',
        answers: [
            {text: '225', correct: true},
            {text: '980', correct: false},
            {text: '400', correct: false},
            {text: '1200', correct: false}
        ]
    },
    {
        question: 'What is the diet of an owl?',
        answers: [
            {text: 'Omnivore', correct: false},
            {text: 'Carnivore', correct: true},
            {text: 'Herbivore', correct: false},
            {text: 'Fruitarian', correct: false}
        ]
    }
];
const snake = [
    {
        question: 'How many snake species are there?',
        answers: [
            {text: '3000', correct: true},
            {text: '2000', correct: false},
            {text: '700', correct: false},
            {text: '3500', correct: false}
        ]
    },
    {
        question: 'What is the diet of a snake?',
        answers: [
            {text: 'Omnivore', correct: false},
            {text: 'Carnivore', correct: true},
            {text: 'Herbivore', correct: false},
            {text: 'Fruitarian', correct: false}
        ]
    }
];
const crocodile = [
    {
        question: 'How many species of crocodile are there?',
        answers: [
            {text: '13', correct: true},
            {text: '55', correct: false},
            {text: '70', correct: false},
            {text: '93', correct: false}
        ]
    },
    {
        question: 'What is the diet of a crocodile?',
        answers: [
            {text: 'Omnivore', correct: false},
            {text: 'Carnivore', correct: true},
            {text: 'Herbivore', correct: false},
            {text: 'Fruitarian', correct: false}
        ]
    }
];
const octopus = [
    {
        question: 'How many species are there of octopus?',
        answers: [
            {text: '300', correct: true},
            {text: '200', correct: false},
            {text: '90', correct: false},
            {text: '80', correct: false}
        ]
    },
    {
        question: "What is the diet of an octopus?",
        answers: [
            {text: 'Omnivore', correct: false},
            {text: 'Carnivore', correct: true},
            {text: 'Herbivore', correct: false},
            {text: 'Fruitarian', correct: false}
        ]
    }
];

function flipCard() {
    let animal = this.dataset.framework;

    if (lockBoard === true) return;

    if (hasFlippedCard === false) {
        hasFlippedCard = true;
        currentCard = this;
    }

    this.classList.add('flip');
    questionContainerElement.classList.remove('hide');

    // remove html answer-buttons
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
    
    // disable current card
    currentCard.removeEventListener('click', flipCard);

    showQuestion(animal);
}

function showQuestion(animal) {
    lockBoard = true;
    const randomNum = Math.floor(Math.random() * 2);
    let question;

    // create random question
    if (animal === 'owl') {
        question = owl[randomNum];
    } else if (animal === 'snake') {
        question = snake[randomNum];
    } else if (animal === 'crocodile') {
        question = crocodile[randomNum];
    } else if (animal === 'octopus') {
        question = octopus[randomNum];
    }
    questionElement.innerText = question.question;

    // create answer button
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

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    if (correct) {
        correctScore++;
        correctScore_span.innerHTML = correctScore;
        unflipCard();
        correctScore_span.classList.add('green-glow');
        setTimeout(() => correctScore_span.classList.remove('green-glow'), 400);
    } else {
        wrongScore++;
        wrongScore_span.innerHTML = wrongScore;
        wrongScore_span.classList.add('red-glow');
        setTimeout(() => wrongScore_span.classList.remove('red-glow'), 400);
    }
}

function unflipCard() {
    currentCard.classList.remove('flip');
    questionContainerElement.classList.add('hide');
    currentCard.classList.add('darken');

    // reset board  
    [hasFlippedCard, lockBoard] = [false, false];
}

// random card position
(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 4);
        card.style.order = randomPos;
    });
})();

cards.forEach(card => card.addEventListener('click', flipCard));
