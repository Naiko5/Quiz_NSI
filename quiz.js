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

// Function to update score display
function updateScoreDisplay() {
    document.getElementById('score_text').textContent = `Score: ${score}`;
}

// Function to display the current question
function displayQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    
    // Display the question text
    const questionCube = document.getElementById('question_cube');
    questionCube.textContent = currentQuestion.question;
    
    // Clear previous responses
    const reponsesCube = document.getElementById('reponses_cube');
    reponsesCube.innerHTML = '';
    
    // Create a button for each possible answer
    currentQuestion.reponses.forEach((reponse, index) => {
        const button = document.createElement('button');
        button.className = 'reponse_button';
        button.textContent = reponse;
        button.dataset.index = index;
        
        button.addEventListener('click', () => {
            handleAnswer(index);
        });
        
        reponsesCube.appendChild(button);
    });
}

// Function to handle answer selection
func    score++;
        updateScoreDisplay();
    } else {
        console.log('Mauvaise réponse !');
    }
    
    // Move to the next question
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        displayQuestion();
    } else {
        console.log('Quiz terminé !');
        displayFinalScore();
    }
}

// Function to display final score
function displayFinalScore() {
    const quizCube = document.getElementById('quiz_cube');
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
    quizCube.appendChild(messageText);   displayQuestion();
    } else {
        console.log('Quiz terminé !');
        document.getElementById('question_cube').textContent = 'Quiz terminé !';
        document.getElementById('reponses_cube').innerHTML = '';
    }
}

// Display the first question when the page loads
document.addEventListener('DOMContentLoaded', displayQuestion);