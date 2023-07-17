let questions = [
  {
    question: "When was javascript invented?",
    choices: ["1995", "1994", "1996", "None of above"],
    answer: 0
  },
  {
    question: "What does HTML stand for?",
    choices: ["Hypertext Markup Language", "Hypertext Markdown Language", "Hyperloop Machine Language", "None"],
    answer: 0
  },
  {
    question: "Which is the full form of CSS?",
    choices: ["Central style sheets", "Cascading style sheets", "Central simple sheets", "None"],
    answer: 1
  },
  {
    question: "What language runs in a web browser?",
    choices: ["Java", "C", "C++", "Javacript"],
    answer: 3
  }
];


let formSubmit = document.getElementById('formsubmit')
let box = document.getElementById('box')
let boxQuiz = document.getElementById('box-quiz')
let usernameInput = document.getElementById("username");
let userEmail = document.getElementById("emailId");
// function validateEmail(email) {
//     var regex = /^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/;
//     return regex.test(email);
//   }


formSubmit.addEventListener("submit", function (event) {
  event.preventDefault();
  let username = usernameInput.value;
  let email = userEmail.value;
  localStorage.setItem(username, email);
  sessionStorage.setItem(username, email);
  userDisplay.textContent = username;
  box.style.display = "none";
  boxQuiz.style.display = "block";

});
//------------------------------------------------------------------------------------------------------------->

let currentQuestion = 0;
let score = 0;
let submit = document.getElementById('submit')
function loadQuestion() {
  let questionElement = document.getElementById("question");
  let choiceElements = document.getElementsByTagName("span");

  questionElement.textContent = questions[currentQuestion].question;

  for (let i = 0; i < choiceElements.length; i++) {
    choiceElements[i].textContent = questions[currentQuestion].choices[i];
  }
}


submit.addEventListener("onclick", () => {

  let choices = document.getElementsByName("choice");
  let selectedChoice = -1;

  for (let i = 0; i < choices.length; i++) {
    if (choices[i].checked) {
      selectedChoice = parseInt(choices[i].value);
      break;
    }
  }

  if (selectedChoice == -1) {
    alert("Please select an option.");
    return;
  }

  if (selectedChoice == questions[currentQuestion].answer) {
    score++;
  }

  currentQuestion++;

  if (currentQuestion === questions.length) {

    quiz.innerHTML = `<h2>You answered ${score} out of ${questions.length} correctly</h2>
    <button onclick = "location.reload()">Reload</button>`
  }

  else {

    loadQuestion();
  }


  for (let i = 0; i < choices.length; i++) {
    choices[i].checked = false;
  }


})

function shuffleQuestions() {
  for (let i = questions.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = questions[i];
    questions[i] = questions[j];
    questions[j] = temp;
  }
}

shuffleQuestions();
loadQuestion();

