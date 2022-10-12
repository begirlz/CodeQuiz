var divCountdown = document.getElementById('countdown');
var divContainer = document.getElementById('container');
var divResultBox = document.getElementById('resultBox');
var divQuizBox = document.getElementById('quizBox');
var divUserScore = document.getElementById('userScore');
var divHighScore = document.getElementById('divHighScore');
var divStartBox = document.getElementById('startBox');


var startBtn = document.getElementById('startButton');
var highScoreBtn = document.getElementById('highScore');
var userInitailsBtn = document.getElementById('userInitails');

var timeLeft = 75;

// Quiz variables
var questionsIndex = 0;
var score = 0;

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
    }
    // ,{
    //     id: 2,
    //     question: "Arrays in Javascript can be used to store ______.",
    //     answers: ["1 - Numbers and strings", "2 - Other Arrays", "3 - Booleans", "4 - All of the above", ],
    //     correctAnswer: "4 - All of the above"
    // },
    // {
    //     id: 3,
    //     question: "String values must be enclosed within ______ when being assigned to variables.",
    //     answers: ["1 - Quotes", "2 - Curly Brackets", "3 - Commas", "4 - Parentheses"],
    //     correctAnswer: "1 - Quotes"
    // },
    // {
    //     id: 4,
    //     question: "A very useful tool used during development and debugging for printing content to the debugger is:",
    //     answers: ["1 - Javascript", "2 - console.log", "3 - Terminal/bash", "4 - For loops"],
    //     correctAnswer: "2 - console.log"
    // }
];

divUserScore.style.display = 'none';
divHighScore.style.display = 'none'

//go to the landing msg
document.getElementById('goBack').addEventListener('click', function() {
    divStartBox.style.display = 'block'
    divHighScore.style.display = 'none';
});

//clear high score
document.getElementById('clearScore').addEventListener('click', function() {
    score = 0;
    divStartBox.style.display = 'block'
    divHighScore.style.display = 'none';
});

//display high score
function showHighScore() {
    divStartBox.style.display = 'none'
    divHighScore.style.display = 'block';
    //document.getElementById('HighScore').innerHTML = saveUserInitails;
}
highScoreBtn.addEventListener('click', showHighScore);

function saveUserInitailsScore() {
    console.log(document.getElementById('initials').value);
    document.getElementById('HighScore').innerHTML = document.getElementById('initials').value;
    divUserScore.style.display = 'none';
    divHighScore.style.display = 'block';
}
userInitailsBtn.addEventListener('click', saveUserInitailsScore);

// Timer that counts down from 75
function countdown(timeLeft) {

    var timeInterval = setInterval(function() {

        if (timeLeft > 0) {
            divCountdown.textContent = 'Time: ' + timeLeft;
            timeLeft--;
        } else if (timeLeft === 0) {
            clearInterval(timeInterval);
            gameOver();
        } else if (questionsIndex === (questions.length - 1)) {
            clearInterval(timeInterval);
        }
    }, 1000);
}

function gameOver() {
    saveUserInitailsScore();
}



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



function startButtonClick(e) {
    e.preventDefault;
    e.stopPropagation;

    document.querySelector('#startBox').style.display = 'none';

    countdown(timeLeft);
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

        document.querySelector('#finalScore').textContent += score;

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
        divResultBox.innerHTML = '<hr> Correct';
        score++;

    } else {
        countdown(timeLeft - 10)
        divResultBox.innerHTML = '<hr> Wrong';
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