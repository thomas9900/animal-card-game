// pseudo code
// flip card and ask question
// connect question to animal
// make right and wrong answers and show
// show your number of correct and wrong answers
// show your best gamescore in localstorage


let hasFlippedCard = false;
let lockBoard = false;
let firstCard;
let correctScore = 0;
let wrongScore = 0;
const correctScore_span = document.getElementById('correct-score');
const wrongScore_span = document.getElementById('wrong-score');
const cards = document.querySelectorAll('.animal-card');
const octo = document.querySelector('.octo');
const owl = document.querySelector('.owl');
const elements = {
    question: document.querySelector('.question'),
    questionDiv: document.querySelector('.question-div'),
    firstAnswer: document.querySelector('.a'),
    secondAnswer: document.querySelector('.b')
};


const flipCard = function() {
    let animal = this.dataset.framework
    // console.log(animal)
    showQuestion(animal);
    // if (lockBoard === true) return;
    this.classList.add('flip');
    // if (this === firstCard) return;
    
    if (hasFlippedCard === false) {
        //first click
        hasFlippedCard = true;
        firstCard = this;
        // return;
        
    }
    
    disableCard();

}

// function checkForMatch() {
//     let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

//     isMatch ? disableCards() : unflipCards();
// }

function disableCard() {
    firstCard.removeEventListener('click', flipCard);

    // resetBoard(); 
}

function unflipCard() {
    lockBoard = true;

    firstCard.classList.remove('flip');
    console.log(firstCard)
    resetBoard();     
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    firstCard = null;
}

(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 4);
        card.style.order = randomPos;
    });
})();

cards.forEach(card => card.addEventListener('click', flipCard));


const showQuestion = animal => {
    const questions  = [`
        <p>Type of a(n) ${animal}?</p>
        <button class="a">A) Crocodile</button><br>
        <button class="b">B) Octopus</button><br>
        <button class="c">C) Owl</button><br>
        <button class="d">D) Snake</button><br>
    `,
    `
        <p>Color of a(n) ${animal}?</p>
        <button class="a">A) Green</button><br>
        <button class="b">B) Red</button><br>
        <button class="c">C) Blue</button><br>
        <button class="d">D) Red & Blue</button><br>
    `]; 
    const randomQuestion = questions[Math.floor(Math.random() * questions.length)];


    elements.questionDiv.insertAdjacentHTML('afterbegin', randomQuestion);

    answerQuestion(animal);


}

function answerQuestion(animal) {
    elements.questionDiv.addEventListener('click', e => {
        console.log(elements.questionDiv)

        if (e.target.matches('.a') && animal == 'crocodile') {
            console.log('croc a')
            correctAnswer();
        } else if (e.target.matches('.b') && animal === 'octopus') {
            console.log('octo b')
            correctAnswer();
        } else if (e.target.matches('.c') && animal === 'owl') {
            console.log('owl c')
            correctAnswer();
        } else if (e.target.matches('.d') && animal === 'snake') {
            console.log('snake d')
            correctAnswer();
        }
         else if (e.target.matches('button')) {
            console.log('wrongscore')
             wrongAnswer();
        }

        // console.log(e.target)
    });
    // if (animal === 'crocodile') {
    //     correctAnswer();
    // }
    // if (animal === 'octopus') {
    //     wrongAnswer();
}


// function main() {
//     elements.firstAnswer.addEventListener('click',() => answerQuestion('crocodile'));
//     elements.secondAnswer.addEventListener('click',() => answerQuestion('octopus'));
// }

// main();


function correctAnswer() {
    correctScore++;
    correctScore_span.innerHTML = correctScore;
    elements.questionDiv.textContent = '';
    // elements.questionDiv.parentNode.removeChild(elements.questionDiv);

    // while (elements.questionDiv.firstChild) {
    //     elements.questionDiv.removeChild(elements.questionDiv.lastChild);
    // }
    unflipCard();
}

function wrongAnswer() {
    wrongScore++;
    wrongScore_span.innerHTML = wrongScore;
}


// function game() {
//     switch () {
//         case 'rs':
//         case 'pr':
//         case 'sp':
//             correctAnswer();
//             break;
//         case 'rp':
//         case 'ps':
//         case 'sr':
//             wrongAnswer();
//             break;
//     }
// }

