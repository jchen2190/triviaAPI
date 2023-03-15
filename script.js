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
    console.log(this.id);

    questionH3.innerHTML = ""; // clear previous questions

    fetch(`https://opentdb.com/api.php?amount=1&category=${categoryMenu.value}&type=multiple`, { method: "GET" })
    .then(jsonData => jsonData.json())
    .then(obj => { // Parse the JSON by calling the json() method on the JSON data and returning the result, which is the "regular" JS object
        questionH3.innerHTML = obj.results[0].question;
        console.log('obj:', obj); // parsed obj
        correctAnswer = obj.results[0].correct_answer;

        const allChoices = [...obj.results[0].incorrect_answers, correctAnswer + '&nbsp;']; // set all choices into one array, add &nbsp; to recognize correct answer
        allChoices.sort(() => Math.random() - 0.5); // randomize
        console.log(allChoices, correctAnswer); // ['Dance of Death', 'Brave New World&nbsp;', 'A Matter of Life and Death', 'Somewhere in Time'] 'Brave New World'

        for (let i = 0; i < answerChoiceBtns.length; i++) {
            answerChoiceBtns[i].innerHTML = `${answerChoiceBtns[i].id}. &nbsp; ${allChoices[i]}`; // A. Dance of Death  B. Brave New World.... etc.
            answerChoiceBtns[i].style.backgroundColor = "#eee";
            answerChoiceBtns[i].style.color = "#333";
            answerChoiceBtns[i].style.display = "block"
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