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
let prev = document.getElementById("prevB");
let userDisplay = document.getElementById("userDisplay")

formSubmit.addEventListener("submit", function (event) {
  event.preventDefault();

  for (let i = 0; i < localStorage.length; i++) {
    let email = userEmail.value;
    if (email == localStorage.key(i)) {
      let a = localStorage.getItem(email)

      quiz.innerHTML = `<h2>You answered ${a} out of ${questions.length} correctly!!</h2>
      <button onclick = "location.reload()">Reload</button>`;
    }
  }

  let username = usernameInput.value;
  let email = userEmail.value;

  userDisplay.textContent = username;
  box.style.display = "none";
  boxQuiz.style.display = "block";
});

//------------------------------------------------------------------------------------------------------------->

let currentQuestion = 0;
let score = 0;
let userChoices = [];

let submit = document.getElementById('submit')
function loadQuestion() {
  let questionElement = document.getElementById("question");
  let choiceElements = document.getElementsByTagName("span");

  questionElement.textContent = questions[currentQuestion].question;
  var previousAnswer = userChoices[currentQuestion];
  if (previousAnswer !== undefined) {
    var choices = document.getElementsByName("choice");
    choices[previousAnswer].checked = true;
  }

  for (let i = 0; i < choiceElements.length; i++) {
    choiceElements[i].textContent = questions[currentQuestion].choices[i];

  }


  if (currentQuestion == 0) {
    prev.style.display = "none";
  } else {
    prev.style.display = "inline-flex";
  }
  // sessionStorage.setItem(currentQuestion);
}

submit.addEventListener("click", () => {

  let choices = document.getElementsByName("choice");
  var selectedChoice = -1;

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
    // selectedChoice.disabled = true;
    // localStorage.setItem(choices)


  }
  userChoices[currentQuestion] = selectedChoice;

  currentQuestion++;


  if (currentQuestion === questions.length) {
    let email = userEmail.value
    localStorage.setItem(email, score)
    quiz.innerHTML = `<h2>You answered ${score} out of ${questions.length} correctly!!</h2>
      <button onclick = "location.reload()">Reload</button>`;
  } else {
    loadQuestion();
  }

  for (let i = 0; i < choices.length; i++) {
    choices[i].checked = false
    if (userChoices[currentQuestion] !== undefined) {
      choices.checked === userChoices[currentQuestion].value;
      choices.disabled = true; // Disable the radio button
    }

  }
  // choices.disabled = false

});

function showPreviousQuestion() {
  currentQuestion--;
  loadQuestion();
}
if (currentQuestion === questions.length) {
  

  quiz.innerHTML = `<h2>You answered ${score} out of ${questions.length} correctly</h2>
    <button onclick = "location.reload()">Reload</button>`
}

else {

  loadQuestion();
}

prev.addEventListener("click", showPreviousQuestion)


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

