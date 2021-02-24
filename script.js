const codeQuiz = document.getElementById("code-quiz");
const timerNumberEl = document.getElementById("count-down");
const currentScoreEl = document.getElementById("current-score");
const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");

var timeLeft = 60;

let shuffledQuestions, currentQuestionIndex;

startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    setNextQuestion();
})

function startGame() {
    timeRemaining();
    startButton.classList.add("hide");
    codeQuiz.classList.add("hide");
    shuffledQuestions = questions.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove("hide");
    setNextQuestion();
}

function timeRemaining() {
    timerNumberEl.classList.remove("hide");

    console.log(timeLeft);
    
    var quizTimer = setInterval(function() {
        if (timeLeft <= 0) {
            clearInterval(quizTimer);
            document.getElementById("count-down").innerHTML = "Time Is Up!";
            gameOver();
        } else {
            document.getElementById("count-down").innerHTML = timeLeft + " seconds remaining";
        }
        timeLeft -= 1;
    }, 1000);
};

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
//            score => score + 10;
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
        startButton.classList.remove("hide");
        gameOver();
    }
}

function setStatusClass(element, correct) {
    console.log(element);
    clearStatusClass(element);
    if (correct) {
        element.classList.add("correct");
        nextButton.classList.remove("hide");
    } else {
        element.classList.add("wrong");
        console.log("wrong");
        timeLeft = timeLeft - 5;
    }
}

function clearStatusClass(element) {
    element.classList.remove("correct");
    element.classList.remove("wrong");
}

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

const controlEl = document.getElementById("controls");

function gameOver() {
    questionContainerElement.classList.add("hide");
    console.log("Game over!");
    timerNumberEl.classList.add("hide");
    var endTimeScore = timeLeft;
    console.log(endTimeScore);
    controlEl.classList.add("hide");
    
    element.classList.remove("correct");
    element.classList.remove("wrong");
    element.classList.add("neutral");


}
