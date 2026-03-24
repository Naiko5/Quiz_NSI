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
    const quizCube = document.getElementById('quiz_cube');
    if (!quizCube) return;

    quizCube.innerHTML = '';
    quizCube.style.justifyContent = 'center';

    const finalScoreText = document.createElement('div');
    finalScoreText.style.fontSize = '72px';
    finalScoreText.style.fontWeight = 'bold';
    finalScoreText.style.color = '#000000';
    finalScoreText.style.textAlign = 'center';
    finalScoreText.style.marginBottom = '20px';
    finalScoreText.textContent = `${score}/${questions.length}`;

    const messageText = document.createElement('div');
    messageText.style.fontSize = '24px';
    messageText.style.fontWeight = '500';
    messageText.style.color = '#000000';
    messageText.style.textAlign = 'center';
    messageText.textContent = 'Quiz terminé !';

    quizCube.appendChild(finalScoreText);
    quizCube.appendChild(messageText);
}

document.addEventListener('DOMContentLoaded', () => {
    updateScoreDisplay();
    displayQuestion();
});