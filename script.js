// Constants

const startButton = document.querySelector("#start-btn");
const nextButton = document.getElementById("next-btn");
const playAgainButton1 = document.getElementById("play-again-1");
const playAgainButton2 = document.getElementById("play-again-2");
const playAgainButton3 = document.getElementById("play-again-3");
const highScoresButton1 = document.getElementById("high-scores-1");
const highScoresButton2 = document.getElementById("high-scores-2");
const startScreenContainerEl = document.querySelector("#start-screen-container");
const questionScreenContainer = document.querySelector("#question-screen-container");
const gameOverContainer = document.querySelector("#game-over-container");
const highScoresContainer = document.querySelector("#high-scores-container");
const timeIsUpContainer = document.querySelector("#time-is-up-container");

const timerNumberEl = document.getElementById("count-down");
const currentScoreEl = document.getElementById("current-score");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const initialsEl = document.getElementById("initials");
const saveScoreBtn = document.getElementById("save-score-btn");
const highScoresList = document.getElementById("high-scores-list");
const mostRecentScore = localStorage.getItem("mostRecentScore");

// Variables

var timeLeft = 60;
var quizTimer;

let shuffledQuestions, currentQuestionIndex;

// Add event listeners to buttons

startButton.addEventListener("click", startGame);

nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    setNextQuestion();
});

playAgainButton1.addEventListener("click", playAgain);
playAgainButton2.addEventListener("click", playAgain);
playAgainButton3.addEventListener("click", playAgain);

function playAgain() {
    timeIsUpContainer.classList.add("hide");
    gameOverContainer.classList.add("hide");
    highScoresContainer.classList.add("hide");
    startScreenContainerEl.classList.remove("hide");
    timeLeft = 60;
//    clearInterval(quizTimer);
    startGame();
}

highScoresButton1.addEventListener("click", highScores);
highScoresButton2.addEventListener("click", highScores);

function highScores() {
    timeIsUpContainer.classList.add("hide");
    highScoresContainer.classList.remove("hide");
}

var highScores = JSON.parse(localStorage.getItem("highScores")) || [];

function saveScore(e) {
    e.preventDefault();
    var gameScore = {
        initials: initialsEl.value, finalScore: timeLeft
    }
    highScores.push(gameScore);
    localStorage.setItem("highScores", JSON.stringify(highScores))
}

saveScoreBtn.addEventListener("click", saveScore);

// Start Game Script

function startGame() {
    timerNumberEl.classList.remove("hide");
    clearInterval(quizTimer);
    quizTimer = setInterval(function() {
        console.log(timeLeft);
        if (timeLeft > 0) {
            timeLeft--;
            document.getElementById("count-down").innerHTML = timeLeft + " seconds remaining";
        } else {
            clearInterval(quizTimer);
            document.getElementById("count-down").innerHTML = "Time Is Up!";
            timeIsUp();
        }
    }, 1000);

    shuffledQuestions = questions.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;
    startScreenContainerEl.classList.add("hide");
    questionScreenContainer.classList.remove("hide");
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("btn");
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click", selectAnswer)
        answerButtonsElement.appendChild(button);
    })
}

function resetState() {
    clearStatusClass(document.body);
    nextButton.classList.add("hide");
    while(answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    setStatusClass(document.body, correct);

    if(shuffledQuestions.length > currentQuestionIndex + 1) {

    } else {
        gameOver();
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add("correct");
        nextButton.classList.remove("hide");
    } else {
        element.classList.add("wrong");
        timeLeft = timeLeft - 5;
    }
}

function clearStatusClass(element) {
    element.classList.remove("correct");
    element.classList.remove("wrong");
}

// End Game Script

function timeIsUp() {
    questionScreenContainer.classList.add("hide");
    timeIsUpContainer.classList.remove("hide");
//    clearInterval(quizTimer);
}

function gameOver() {
    clearInterval(quizTimer);

    questionScreenContainer.classList.add("hide");
    gameOverContainer.classList.remove("hide");
   
    var finalScore = timeLeft;       
    console.log(finalScore);

    document.getElementById("current-score").innerHTML += "Your score is: " + finalScore;

    localStorage.setItem("mostRecentScore", finalScore);
    timeIsUpContainer.classList.add("hide");
}

// High Scores List

saveHighScore = e => {
    startScreenContainerEl.classList.add("hide");
    gameOverContainer.classList.add("hide");
    timeIsUpContainer.classList.add("hide");
    highScoresContainer.classList.remove("hide");

    e.preventDefault();

    var highScoresList = JSON.parse(window.localStorage.getItem("highScoresList")) || [];

    var gameScore = {
        score: mostRecentScore,
        person: initialsEl.value
    };


    highScoresList.push(gameScore);

    highScoresList.sort( (a,b) => {
        return b.score - a.score;
    })

    highScoresList.splice(5);

    localStorage.setItem("highScoresList", JSON.stringify(highScoresList));
    
    console.log(highScoresList);
}

/*
viewHighScores() {
    const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    console.log(highScores);
    
    const MAX_HIGH_SCORES = 5;
    console.log(highScores);
}
*/


// Questions Array

const questions = [
    {
        question: "What tag is used to define a hyperlink, or link to another page?",
        answers: [
            {text: "<h1>", correct: false },
            {text: "<em>", correct: false },
            {text: "<a>", correct: true },
            {text: "<strong>", correct: false }
        ]
    },
    {
        question: "What tag defines the main part of the HTML document, and usually includes contents like text, hyperlinks, images, tables, lists, etc.?",
        answers: [
            {text: "<br></br>", correct: false },
            {text: "<body></body>", correct: true },
            {text: "<title></title>", correct: false },
            {text: "<head></head>", correct: false }
        ]
    },
    {
        question: "What is the name of CSS design that uses adaptable elements based on the device size?",
        answers: [
            {text: "<Responsive>", correct: true },
            {text: "<Cascading>", correct: false },
            {text: "<Shifting>", correct: false },
            {text: "<Evolution>", correct: false }
        ]
    },
    {
        question: "What CSS property sets the size of the whitespace outside the content but inside the border?",
        answers: [
            {text: "<Spacer>", correct: false },
            {text: "<Margin>", correct: false },
            {text: "<White Space>", correct: false },
            {text: "<Padding>", correct: true }
        ]
    },
    {
        question: "Which JavaScript element is used to store and manipulate text?",
        answers: [
            {text: "<Arrays>", correct: false },
            {text: "<Strings>", correct: true },
            {text: "<Functions>", correct: false },
            {text: "<Variables>", correct: false }
        ]
    },
    {
        question: "Inside which HTML element do we put JavaScript?",
        answers: [
            {text: "<js", correct: false },
            {text: "<scripting>", correct: false },
            {text: "<javascript>", correct: false },
            {text: "<script>", correct: true }
        ]
    }
]