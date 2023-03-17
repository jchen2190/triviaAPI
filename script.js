const categoryMenu = document.getElementById('category-menu');
categoryMenu.addEventListener('change', fetchTriviaQuestions);
const getTriviaBtn = document.getElementById('get-trivia-btn');
getTriviaBtn.addEventListener('click', fetchTriviaQuestions);

const scoreBox = document.getElementById('score-box');
const questionH3 = document.getElementById('question-h3');
const answerChoiceBtns = document.querySelectorAll('.answer-choice-btn');

let correctAnswer
let score = 0, tries = 0, avg = 0;

// answer buttons
for (let i = 0; i < answerChoiceBtns.length; i++) {
    answerChoiceBtns[i].addEventListener('click', evalAnswerChoice)
}

function fetchTriviaQuestions() {
    questionH3.innerHTML = "";
    fetch(`https://opentdb.com/api.php?amount=1&category=${categoryMenu.value}&type=multiple`, { method: "GET" })
    .then(jsonData => jsonData.json())
    .then(obj => {
        questionH3.innerHTML = obj.results[0].question;
        correctAnswer = obj.results[0].correct_answer;

        const allChoices = [...obj.results[0].incorrect_answers, correctAnswer + '&nbsp;'];
        allChoices.sort(() => Math.random() - 0.5);

        for (let i = 0; i < answerChoiceBtns.length; i++) {
            answerChoiceBtns[i].innerHTML = `${answerChoiceBtns[i].id}. &nbsp; ${allChoices[i]}`;
            answerChoiceBtns[i].style.backgroundColor = "#eee";
            answerChoiceBtns[i].style.color = "#333";
            answerChoiceBtns[i].style.display = "block"
            answerChoiceBtns[i].style.userSelect = "none"
        }
    })
}

function evalAnswerChoice() {
    tries++;
    if(this.innerHTML.slice(-6) == '&nbsp;') { // recognize correct answer
        this.style.backgroundColor = "darkgreen";
        score++;
    } else {
        this.style.backgroundColor = "darkred";
    }
    this.style.color = "#fff";
    avg = score / tries;
    avg = avg.toFixed(3);

    scoreBox.innerHTML = `Tries: ${tries} &nbsp; &nbsp; &nbsp; Score: ${score} &nbsp; &nbsp; &nbsp; Avg: ${avg}`
}