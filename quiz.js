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
    }
];

let currentQuestionIndex = 0;

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
function handleAnswer(selectedIndex) {
    const currentQuestion = questions[currentQuestionIndex];
    
    if (selectedIndex === currentQuestion.bonneReponse) {
        console.log('Bonne réponse !');
    } else {
        console.log('Mauvaise réponse !');
    }
    
    // Move to the next question
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        displayQuestion();
    } else {
        console.log('Quiz terminé !');
        document.getElementById('question_cube').textContent = 'Quiz terminé !';
        document.getElementById('reponses_cube').innerHTML = '';
    }
}

// Display the first question when the page loads
document.addEventListener('DOMContentLoaded', displayQuestion);