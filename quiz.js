let questions = [
    {
        question: "Quelle est la capitale de la France ?",
        reponses: ["Paris", "Lyon", "Marseille"],
        bonneReponse: 0
    },
    {
        question: "Quel est le plus grand océan du monde ?",
        reponses: ["Océan Atlantique", "Océan Pacifique", "Océan Indien"],
        bonneReponse: 1
    },
    {
        question: "Quel est le symbole chimique de l'eau ?",
        reponses: ["H2O", "CO2", "O2"],
        bonneReponse: 0
    }
];


const buttons = document.querySelectorAll('#reponse_1, #reponse_2, #reponse_3');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        let display = document.getElementById('salam_display');
        if (!display) {
            display = document.createElement('div');
            display.id = 'salam_display';
            document.body.appendChild(display);
        }
        display.textContent = 'salam alikoum';
    });
});