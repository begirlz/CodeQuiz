var divCountdown = document.getElementById('countdown');
var divContainer = document.getElementById('container');
var divResultBox = document.getElementById('resultBox');
var divQuizBox = document.getElementById('quizBox');
var divUserScore = document.getElementById('userScore');
var divSavedScore = document.getElementById('divSavedScore');
var divStartBox = document.getElementById('startBox');

var startBtn = document.getElementById('startButton');
var viewScoreBtn = document.getElementById('viewScore');
var savedInitailsBtn = document.getElementById('savedInitailsBtn');
var savedScore = document.getElementById('savedScore');
var finalScore = document.querySelector('#finalScore');

var timeLeft = 75;

// Quiz variables
var questionsIndex = 0;
var score = 0;

divStartBox.style.display = 'block';
divUserScore.style.display = 'none';
divSavedScore.style.display = 'none';


//go to the landing msg
document.getElementById('goBack').addEventListener('click', function() {
    divStartBox.style.display = 'block'
    divSavedScore.style.display = 'none';
});

//clear saved score
document.getElementById('clearScore').addEventListener('click', function() {
    score = 0;
    showScore();
});

//display high score
function showScore() {
    divStartBox.style.display = 'none'
    divQuizBox.style.display = 'none';
    divUserScore.style.display = 'none';
    divSavedScore.style.display = 'block';
    savedScore.textContent = "User: " + document.getElementById('initials').value + " Scored: " + score;
}
viewScoreBtn.addEventListener('click', showScore);

//save user initials
function saveUserInitailsScore() {
    divStartBox.style.display = 'none';
    divQuizBox.style.display = 'none';
    divUserScore.style.display = 'none';
    divSavedScore.style.display = 'block';

    savedScore.textContent = "User: " + document.getElementById('initials').value + " Scored: " + score;
    questionsIndex = 0;
    score = 0;
    divCountdown.textContent = '';
    timeLeft = null;
}
savedInitailsBtn.addEventListener('click', saveUserInitailsScore);


// creating an array of questions and answers
const questions = [{
        id: 0,
        question: "Commonly used data types do NOT include:",
        answers: ["1 - Booleans", "2 - Alerts", "3 - Strings", "4 - Numbers"],
        correctAnswer: "2 - Alerts"
    },
    {
        id: 1,
        question: "The condition of an if/else statement is enclosed within ______.",
        answers: ["1 - Quotes", "2 - Curly Brackets", "3 - Parentheses", "4 - Square Brackets"],
        correctAnswer: "3 - Parentheses"
    },
    {
        id: 2,
        question: "Arrays in Javascript can be used to store ______.",
        answers: ["1 - Numbers and strings", "2 - Other Arrays", "3 - Booleans", "4 - All of the above", ],
        correctAnswer: "4 - All of the above"
    },
    {
        id: 3,
        question: "String values must be enclosed within ______ when being assigned to variables.",
        answers: ["1 - Quotes", "2 - Curly Brackets", "3 - Commas", "4 - Parentheses"],
        correctAnswer: "1 - Quotes"
    },
    {
        id: 4,
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        answers: ["1 - Javascript", "2 - console.log", "3 - Terminal/bash", "4 - For loops"],
        correctAnswer: "2 - console.log"
    }
];

// Timer that counts down from 75
function countdown() {

    var timeInterval = setInterval(function() {

        if ((timeLeft > 0)) {
            divCountdown.textContent = 'Time: ' + timeLeft;
            timeLeft--;

        } else if (timeLeft === 0) {
            clearInterval(timeInterval);
            divQuizBox.style.display = 'none';
            divUserScore.style.display = 'block';
            divCountdown.textContent = '';
        } else {
            clearInterval(timeInterval);
        }
    }, 1000);
}

//show current question on div
function showQuestions(question, divQuizBox) {
    //store the output and the answer choices
    var output = [];
    var answers;

    // reset the list of answers
    answers = [];
    // for each available answer to this question...
    for (choice in question.answers) {
        // add an html button for answer
        answers.push(
            '<input class="option" type="button" value="' + question.answers[choice] + '">'
        );
    }
    // add question and its answers to the output
    output.push(
        '<div class="question">' + question.question + '</div>' +
        '<div class="answers">' + answers.join('') + '</div>'
    );
    //put HTML string on the page
    divQuizBox.innerHTML = output.join('');
}
//click start button
function startButtonClick(e) {
    e.preventDefault;
    e.stopPropagation;

    timeLeft = 75;
    divStartBox.style.display = 'none';
    divQuizBox.style.display = 'block';

    countdown();
    addQuestions();
}

//Start counting down when startButton is clicked
startBtn.addEventListener('click', startButtonClick);

//add question to div
function addQuestions() {
    divResultBox.innerHTML = "";
    if (questionsIndex < questions.length) {
        showQuestions(questions[questionsIndex], divQuizBox);
        CheckAnswer();
    } else if (questionsIndex == questions.length) {
        divQuizBox.style.display = 'none';
        divUserScore.style.display = 'block';

        finalScore.textContent = "Your final score is " + score;
    }
}

//check the answer
function CheckAnswer() {
    var answerList = document.querySelectorAll(".option");
    answerList.forEach(function(element) {
        element.addEventListener('click', DisplayResult);
    });
}

//display result
function DisplayResult() {

    var userInput = this.value;

    if (userInput == questions[questionsIndex].correctAnswer) {
        divResultBox.innerHTML = '<hr> Correct!';
        score++;

    } else {
        //subtract 10 secounds for wrong answer
        if (timeLeft >= 10) {
            timeLeft = timeLeft - 10;
            divResultBox.innerHTML = '<hr> Wrong!';
        } else if (timeLeft < 10) {
            divUserScore.style.display = 'block';
            divQuizBox.style.display = 'none';
            timeLeft = 0;
        }

    }
    stateChange(-1);
    questionsIndex++;
}

//Delay 1 second before the next question
function stateChange(newState) {
    setTimeout(function() {
        if (newState == -1) {
            addQuestions();
        }
    }, 1000);
}