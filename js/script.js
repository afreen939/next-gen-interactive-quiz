const questions = [
    {
        question: "What does HTML stand for?",
        answers: [
            { text: "Hyper Text Markup Language", correct: true },
            { text: "High Text Machine Language", correct: false },
            { text: "Hyperlink Text Management Language", correct: false },
            { text: "Home Tool Markup Language", correct: false }
        ]
    },

    {
        question: "Which language is used to style a webpage?",
        answers: [
            { text: "HTML", correct: false },
            { text: "CSS", correct: true },
            { text: "JavaScript", correct: false },
            { text: "Python", correct: false }
        ]
    },

    {
        question: "Which language is used to add interactivity to webpages?",
        answers: [
            { text: "HTML", correct: false },
            { text: "CSS", correct: false },
            { text: "JavaScript", correct: true },
            { text: "SQL", correct: false }
        ]
    },

    {
        question: "Which HTML tag is used to create a paragraph?",
        answers: [
            { text: "<p>", correct: true },
            { text: "<h1>", correct: false },
            { text: "<div>", correct: false },
            { text: "<br>", correct: false }
        ]
    },

    {
        question: "Which CSS property changes text color?",
        answers: [
            { text: "background-color", correct: false },
            { text: "font-size", correct: false },
            { text: "color", correct: true },
            { text: "text-style", correct: false }
        ]
    },
    {
    question: "Which keyword is used to declare a variable that can be reassigned?",
    answers: [
        { text: "const", correct: false },
        { text: "let", correct: true },
        { text: "fixed", correct: false },
        { text: "static", correct: false }
    ]
},
{
    question: "What does DOM stand for?",
    answers: [
        { text: "Document Object Model", correct: true },
        { text: "Data Object Method", correct: false },
        { text: "Digital Object Management", correct: false },
        { text: "Document Order Method", correct: false }
    ]
},
{
    question: "Which method is used to find an HTML element by its ID?",
    answers: [
        { text: "getElementById()", correct: true },
        { text: "getElement()", correct: false },
        { text: "findById()", correct: false },
        { text: "selectId()", correct: false }
    ]
},
{
    question: "Which event occurs when a user clicks an element?",
    answers: [
        { text: "hover", correct: false },
        { text: "submit", correct: false },
        { text: "click", correct: true },
        { text: "change", correct: false }
    ]
},
{
    question: "Which CSS layout system is useful for arranging items in rows and columns?",
    answers: [
        { text: "CSS Grid", correct: true },
        { text: "HTML Table", correct: false },
        { text: "JavaScript", correct: false },
        { text: "CSS Text", correct: false }
    ]
}
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-button");

const questionNumber = document.getElementById("question-number");
const scoreDisplay = document.getElementById("score-display");
const progress = document.getElementById("progress");

let currentQuestionIndex = 0;
let score = 0;
let quizFinished = false;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    quizFinished = false;
    nextButton.textContent = "Next";
    nextButton.style.display = "none";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent =
        `${currentQuestionIndex + 1}. ${currentQuestion.question}`;
    questionNumber.textContent =
        `Question ${currentQuestionIndex + 1} of ${questions.length}`;
    scoreDisplay.textContent =
        `Score: ${score}`;
    progress.style.width =
        `${((currentQuestionIndex + 1) / questions.length) * 100}%`;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.textContent = answer.text;
        button.dataset.correct = answer.correct;
        button.addEventListener("click", selectAnswer);
        answerButtons.appendChild(button);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(event) {
    const selectedButton = event.target;
    const isCorrect = selectedButton.dataset.correct === "true";
    if (isCorrect) {
        selectedButton.style.background = "#d1fae5";
    selectedButton.style.borderColor = "#10b981";
    score++;
    scoreDisplay.textContent = `Score: ${score}`;
} else {
    selectedButton.style.background = "#fee2e2";
    selectedButton.style.borderColor = "#ef4444";
    }
    Array.from(answerButtons.children).forEach(button => {
        button.disabled = true;
        if (button.dataset.correct === "true") {
            button.style.background = "#d1fae5";
            button.style.borderColor = "#10b981";
        }
    });
    nextButton.style.display = "block";
}

nextButton.addEventListener("click", () => {
    if (quizFinished) {
        restartQuiz();
        return;
    }
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        showQuestion();
    } else {
        showScore();
    }
});

function showScore() {
    resetState();
    quizFinished = true;
    questionNumber.textContent = "Quiz Completed";
    scoreDisplay.textContent =
        `Final Score: ${score}/${questions.length}`;
    progress.style.width = "100%";
    questionElement.textContent =
        `🎉 You scored ${score} out of ${questions.length}!`;
    nextButton.textContent = "Restart Quiz";
    nextButton.style.display = "block";
}

function restartQuiz() {
    // currentQuestionIndex = 0;
    // score = 0;
    // nextButton.textContent = "Next";
    // showQuestion();
    location.reload();
}

startQuiz();

