let questions = [
    {
        question: "Quelle est la capitale de la France ?",
        reponses: ["Paris", "Lyon", "Marseille"],
        bonneReponse: 0
    },
    {
        question: "Quel est le plus grand océan du monde ?",
        reponses: ["Océan Atlantique", "Océan Pacifique", "Océan Indien", "Océan Arctique"],
        bonneReponse: 1
    },
    {
        question: "Quel est le symbole chimique de l'eau ?",
        reponses: ["H2O", "CO2"],
        bonneReponse: 0
    },
    {
        question: "Quel est le plus grand pays du monde en termes de superficie ?",
        reponses: ["Russie", "Canada", "Chine", "États-Unis"],
        bonneReponse: 0
    },
    {
        question: "Quel est le plus grand désert du monde ?",
        reponses: ["Sahara", "Désert de Gobi", "Désert de l'Antarctique"],
        bonneReponse: 2
    },
    {
        question: "Quel est le plus grand mammifère terrestre ?",
        reponses: ["Éléphant d'Afrique", "Girafe", "Rhinocéros blanc"],
        bonneReponse: 0
    },
    {
        question: "Quel est le plus grand fleuve du monde ?",
        reponses: ["Nil", "Amazonie", "Yangtsé"],
        bonneReponse: 1
    },
    {
        question: "Quel est le plus grand lac d'eau douce du monde ?",
        reponses: ["Lac Supérieur", "Lac Victoria", "Lac Baïkal"],
        bonneReponse: 1
    }
];

let currentQuestionIndex = 0;
let score = 0;
let currentScreen = 'start'; // 'start', 'quiz', or 'results'
let userAnswers = []; // Track user's answers
let showingAnswers = false; // Track if answer comparison is shown

// Screen Management Functions
function showScreen(screenName) {
    const startScreen = document.getElementById('start_screen');
    const quizScreen = document.getElementById('quiz_screen');
    const resultsScreen = document.getElementById('results_screen');
    
    // Hide all screens
    startScreen.classList.remove('active');
    quizScreen.classList.remove('active');
    resultsScreen.classList.remove('active');
    startScreen.classList.add('exit-left');
    quizScreen.classList.add('exit-left');
    resultsScreen.classList.add('exit-left');
    
    // Show the selected screen
    setTimeout(() => {
        if (screenName === 'quiz') {
            quizScreen.style.display = 'flex';
            quizScreen.classList.add('active');
            quizScreen.classList.remove('exit-left');
            currentScreen = 'quiz';
        } else if (screenName === 'results') {
            resultsScreen.style.display = 'flex';
            resultsScreen.classList.add('active');
            resultsScreen.classList.remove('exit-left');
            currentScreen = 'results';
        } else if (screenName === 'start') {
            startScreen.style.display = 'flex';
            startScreen.classList.add('active');
            startScreen.classList.remove('exit-left');
            currentScreen = 'start';
        }
    }, 100);
}

function handleSubjectSelection(subject) {
    if (subject === 'Culture Générale') {
        // Reset quiz state
        currentQuestionIndex = 0;
        score = 0;
        userAnswers = [];
        showingAnswers = false;
        updateScoreDisplay();
        
        // Transition to quiz
        showScreen('quiz');
        displayQuestion();
    }
}

function updateScoreDisplay() {
    const scoreText = document.getElementById('score_text');
    if (scoreText) {
        scoreText.textContent = `Score: ${score}`;
    }
}

function displayQuestion() {
    if (currentQuestionIndex >= questions.length) {
        displayFinalScore();
        return;
    }

    const currentQuestion = questions[currentQuestionIndex];

    const questionCube = document.getElementById('question_cube');
    const reponsesCube = document.getElementById('reponses_cube');

    if (!questionCube || !reponsesCube) return;

    questionCube.textContent = currentQuestion.question;
    reponsesCube.innerHTML = '';

    currentQuestion.reponses.forEach((reponse, index) => {
        const button = document.createElement('button');
        button.className = 'reponse_button';
        button.textContent = reponse;
        button.dataset.index = index;

        button.addEventListener('click', () => handleAnswer(index));

        reponsesCube.appendChild(button);
    });
}

function handleAnswer(selectedIndex) {
    const currentQuestion = questions[currentQuestionIndex];
    
    // Store user's answer
    userAnswers.push({
        questionIndex: currentQuestionIndex,
        selectedIndex: selectedIndex,
        correct: selectedIndex === currentQuestion.bonneReponse
    });
    
    if (selectedIndex === currentQuestion.bonneReponse) {
        score++;
        updateScoreDisplay();
    } else {
        console.log('Mauvaise réponse !');
    }

    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        displayQuestion();
    } else {
        console.log('Quiz terminé !');
        displayFinalScore();
    }
}

function displayFinalScore() {
    showScreen('results');
    
    const finalScoreText = document.getElementById('final_score_text');
    finalScoreText.textContent = `${score}/${questions.length}`;
    
    // Reset answers comparison display
    const answersComparison = document.getElementById('answers_comparison');
    answersComparison.innerHTML = '';
    showingAnswers = false;
}

function displayAnswersComparison() {
    const answersComparison = document.getElementById('answers_comparison');
    answersComparison.innerHTML = '';
    
    userAnswers.forEach(answer => {
        const question = questions[answer.questionIndex];
        const answerItem = document.createElement('div');
        answerItem.className = `answer_item ${answer.correct ? 'correct' : 'incorrect'}`;
        
        const questionText = document.createElement('div');
        questionText.className = 'answer_question';
        questionText.textContent = `Q${answer.questionIndex + 1}: ${question.question}`;
        
        const userAnswerText = document.createElement('div');
        userAnswerText.className = `answer_detail ${answer.correct ? 'correct-text' : 'incorrect-text'}`;
        userAnswerText.textContent = `Votre réponse: ${question.reponses[answer.selectedIndex]}`;
        
        answerItem.appendChild(questionText);
        answerItem.appendChild(userAnswerText);
        
        if (!answer.correct) {
            const correctAnswerText = document.createElement('div');
            correctAnswerText.className = 'answer_detail correct-text';
            correctAnswerText.textContent = `Réponse correcte: ${question.reponses[question.bonneReponse]}`;
            answerItem.appendChild(correctAnswerText);
        }
        
        answersComparison.appendChild(answerItem);
    });
    
    showingAnswers = true;
}

function toggleAnswersDisplay() {
    if (!showingAnswers) {
        displayAnswersComparison();
    } else {
        const answersComparison = document.getElementById('answers_comparison');
        answersComparison.innerHTML = '';
        showingAnswers = false;
    }
}

function returnToHome() {
    // Reset all state
    currentQuestionIndex = 0;
    score = 0;
    userAnswers = [];
    showingAnswers = false;
    updateScoreDisplay();
    
    showScreen('start');
}

document.addEventListener('DOMContentLoaded', () => {
    updateScoreDisplay();
    
    // Setup subject selection
    const subjectItems = document.querySelectorAll('.subject_item:not(.disabled)');
    subjectItems.forEach(item => {
        item.addEventListener('click', () => {
            const subject = item.dataset.subject;
            handleSubjectSelection(subject);
        });
    });
    
    // Setup start button
    const startBtn = document.getElementById('start_btn');
    if (startBtn) {
        startBtn.addEventListener('click', () => {
            handleSubjectSelection('Culture Générale');
        });
    }
    
    // Setup results buttons
    const viewAnswersBtn = document.getElementById('view_answers_btn');
    if (viewAnswersBtn) {
        viewAnswersBtn.addEventListener('click', toggleAnswersDisplay);
    }
    
    const returnHomeBtn = document.getElementById('return_home_btn');
    if (returnHomeBtn) {
        returnHomeBtn.addEventListener('click', returnToHome);
    }
});