const quizData = [
    [
        {
            question: "What is the capital of France?",
            options: ["Paris", "Berlin", "London", "Rome"],
            answer: "Paris"
        },
        {
            question: "What is the largest planet in the solar system?",
            options: ["Earth", "Jupiter", "Saturn", "Mars"],
            answer: "Jupiter"
        },
        {
            question: "What is the powerhouse of the cell?",
            options: ["Nucleus", "Mitochondria", "Ribosome", "Lysosome"],
            answer: "Mitochondria"
        },
        {
            question: "What is the chemical symbol for water?",
            options: ["H2O", "CO2", "CH4", "O2"],
            answer: "H2O"
        },
        {
            question: "What is the largest desert in the world?",
            options: ["Antarctic Desert", "Arabian Desert", "Gobi Desert", "Sahara Desert"],
            answer: "Sahara Desert"
        }        
    ],
    [
        {
            question: "Which country is known as the 'Land of the Rising Sun'?",
            options: ["China", "South Korea", "Japan", "Vietnam"],
            answer: "Japan"
        },
        {
            question: "What is the largest ocean on Earth?",
            options: ["Atlantic Ocean", "Pacific Ocean", "Indian Ocean", "Arctic Ocean"],
            answer: "Pacific Ocean"
        },
        {
            question: "What is the chemical symbol for gold?",
            options: ["Cu", "Ag", "Fe", "Au"],
            answer: "Au"
        },
        {
            question: "Who is the author of 'To Kill a Mockingbird'?",
            options: ["Harper Lee", "John Steinbeck", "J.K. Rowling", "Ernest Hemingway"],
            answer: "Harper Lee"
        },
        {
            question: "What is the boiling point of water in Fahrenheit?",
            options: ["32°F", "100°F", "0°F", "212°F"],
            answer: "212°F"
        }
    ],
    [
        {
            question: "Which continent is the largest by land area?",
            options: ["Asia", "Africa", "North America", "South America"],
            answer: "Asia"
        },
        {
            question: "Who painted the Mona Lisa?",
            options: ["Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Michelangelo"],
            answer: "Leonardo da Vinci"
        },
        {
            question: "What is the chemical symbol for sodium?",
            options: ["So", "Sn", "Na", "Si"],
            answer: "Na"
        },
        {
            question: "What year did World War II end?",
            options: ["1945", "1939", "1941", "1950"],
            answer: "1945"
        },
        {
            question: "What is the largest mammal in the world?",
            options: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
            answer: "Blue Whale"
        }
    ]
];

let currentRound = 0;
let currentQuestion = 0;
let score = 0;
let currentLevel = 0;
let timerInterval;
let timeLeft = 40;
const home = document.getElementById('home');
const levels = document.getElementById('levels');
const quiz = document.getElementById('quiz');
const questionElem = document.getElementById('question');
const optionsElem = document.getElementById('options');
const resultElem = document.getElementById('result');
const scoreElem = document.getElementById('score');
const nextBtn = document.getElementById('next');
const submitBtn = document.getElementById('submit');
const newRoundBtn = document.getElementById('newRoundBtn');
const passBtn = document.getElementById('pass');
const level1Btn = document.getElementById('level1Btn');
const level2Btn = document.getElementById('level2Btn');
const level3Btn = document.getElementById('level3Btn');
const timerElem = document.getElementById('time');

function startQuiz() {
    home.style.display = 'none';
    levels.style.display = 'block';
    level2Btn.disabled = true; 
    level3Btn.disabled = true; 
    startTimer();
}

function startLevel(level) {
    currentLevel = level;
    levels.style.display = 'none';
    quiz.style.display = 'block';
    loadQuestion();
}

function restartQuiz() {
    document.getElementById('timeup').style.display = 'none';
    document.getElementById('quiz').style.display = 'block';
    clearInterval(timerInterval);
    currentQuestion = 0;
    score = 0;
    timeLeft = 40;
    startTimer();
    loadQuestion();
}

function loadQuestion() {
    const question = quizData[currentRound][currentQuestion];
    questionElem.textContent = question.question;
    optionsElem.innerHTML = "";
    question.options.forEach(option => {
        const radioBtn = document.createElement('input');
        radioBtn.type = "radio";
        radioBtn.name = "option";
        radioBtn.value = option;
        optionsElem.appendChild(radioBtn);
        const label = document.createElement('label');
        label.textContent = option;
        optionsElem.appendChild(label);
        optionsElem.appendChild(document.createElement('br'));
    });
    nextBtn.style.display = 'none';
    passBtn.style.display = 'block';
    submitBtn.style.display = 'block';
}

function checkAnswer() {
    const userAnswer = document.querySelector('input[name="option"]:checked');
    if (!userAnswer) {
        alert("Please select an option");
        return;
    }
    if (userAnswer.value === quizData[currentRound][currentQuestion].answer) {
        score++;
        resultElem.textContent = "Correct!";
        resultElem.style.fontSize = "25px";
    } else {
        resultElem.textContent = "Incorrect. The correct answer is " + quizData[currentRound][currentQuestion].answer;
    }
    nextBtn.style.display = 'block';
    submitBtn.style.display = 'none';
    passBtn.style.display = 'none';
}

function passQuestion() {
    nextQuestion();
}

function nextQuestion() {
    currentQuestion++;
    resultElem.textContent = "";
    submitBtn.style.display = 'block';

    if (currentQuestion < quizData[currentRound].length) {
        loadQuestion();
    } else {
        endRound();
    }
}

function endRound() {
    clearInterval(timerInterval);
    const timeTaken = 40 - timeLeft;
    let quizResult = {
        round: currentRound + 1,
        score: score,
        totalQuestions: quizData[currentRound].length,
        timeTaken: timeTaken
    };

    let quizResults = JSON.parse(localStorage.getItem('quizResults')) || [];
    quizResults.push(quizResult);
    localStorage.setItem('quizResults', JSON.stringify(quizResults));

    if (score === quizData[currentRound].length) {
        resultElem.textContent = "Woah! You're amazing!";
        resultElem.style.fontSize = "24px";
    } else if (score >= 3) {
        resultElem.textContent = "Quiz completed!";
    } else {
        resultElem.innerHTML = "You didn't pass this round. <br> Try again";
        document.getElementById('tryAgainBtn').style.display = 'block';
        scoreElem.textContent = "Your score: " + score + "/" + quizData[currentRound].length;
        timerElem.textContent = "Time taken: " + timeTaken;
        document.getElementById('options').style.display = 'none';
        nextBtn.style.display = 'none';
        questionElem.style.display = 'none';
        submitBtn.style.display = 'none';
        passBtn.style.display = 'none';
        return;
    }

    scoreElem.textContent = "Your score: " + score + "/" + quizData[currentRound].length;
    timerElem.textContent = "Time taken: " + timeTaken;
    document.getElementById('options').style.display = 'none';
    nextBtn.style.display = 'none';
    questionElem.style.display = 'none';
    submitBtn.style.display = 'none';

    if (currentQuestion < quizData[currentRound].length - 1) {
        passBtn.style.display = 'block';
    } else {
        passBtn.style.display = 'none';
    }

    if (currentRound < 2) {
        newRoundBtn.style.display = 'block';
    } else {
        newRoundBtn.style.display = 'none';
        resultElem.textContent = "You've successfully completed all three rounds! Congratulations!";
    }
}

function tryAgain() {
    document.getElementById('tryAgainBtn').style.display = 'none';
    currentQuestion = 0; 
    score = 0; 
    timeLeft = 40; 
    loadQuestion(); 
    resultElem.textContent = "";
    scoreElem.textContent = "";
    document.getElementById('options').style.display = 'block';
    questionElem.style.display = 'block';
    nextBtn.style.display = 'none';
    startTimer(); 
}

function startTimer() {
    timerElem.textContent = timeLeft;
    clearInterval(timerInterval);

    timerInterval = setInterval(() => {
        timeLeft--;
        timerElem.textContent = timeLeft;
        if (timeLeft === 0) {
            clearInterval(timerInterval);
            timeUp(); 
        }
    }, 1000);
}

function startNewRound() {
    currentQuestion = 0;
    score = 0;
    currentRound = (currentRound + 1) % quizData.length;
    timeLeft = 40;
    loadQuestion();
    resultElem.textContent = "";
    scoreElem.textContent = "";
    document.getElementById('options').style.display = 'block';
    questionElem.style.display = 'block';
    newRoundBtn.style.display = 'none';
    nextBtn.style.display = 'none';
    startTimer();
}

function timeUp() {
    clearInterval(timerInterval);
    document.getElementById('quiz').style.display = 'none';
    document.getElementById('timeup').style.display = 'block';
}

loadQuestion();
