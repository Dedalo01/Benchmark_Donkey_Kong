// FUNCTIONS

// testing, decommenta dopo finito
function hideShow(div1, div2) {
  div1.classList.add("hide");
  div2.classList.remove("hide");
}

function loadQuestion() {
  resetAnimation();
  timerCount = TOTAL_SECONDS_TIMER;
  timer = setInterval(setTimer, SPEED_TIMER);

  const quizContainer = document.getElementById("quiz");
  const optionsContainer = document.getElementById("options");
  const currentQ = questions[currentQuestion];
  const questionCounter = document.getElementById("questionCounter");
  questionCounter.innerHTML = `QUESTION ${currentQuestionNumber}<span style="color: #D20094"> / ${questions.length}</span>`;

  quizContainer.textContent = currentQ.question;
  optionsContainer.innerHTML = "";

  // Mescola le opzioni
  const shuffledOptions = shuffleArray(currentQ.options);

  shuffledOptions.forEach((option) => {
    const button = document.createElement("button");
    button.textContent = option;
    button.className = "option";

    button.addEventListener("click", () => selectAnswer(option));
    optionsContainer.appendChild(button);
  });
}

function selectAnswer(selectedOption) {
  const currentQ = questions[currentQuestion];

  if (selectedOption === currentQ.correct && timerCount != 0) {
    score++;
  } else {
    wrongAnswers++;
  }
  clearInterval(timer);
  currentQuestion++;
  currentQuestionNumber++;

  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
}

function shuffleArray(array) {
  // Algoritmo di Fisher-Yates per mescolare l'array
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// third page functions
function showResult() {
  //in this function the proceed button(div1) function is also need to be added for hidden/show next page
  const totalQuestions = questions.length;
  let rightToFix = (score * 100) / totalQuestions;
  let wrongToFix = (wrongAnswers * 100) / totalQuestions;
  let rightPercentage = rightToFix.toFixed(1); //toFixed returns a string, so parseFloat needed
  let wrongPercentage = wrongToFix.toFixed(1);
  const correctDiv = document.querySelector("#correct-result");
  const wrongDiv = document.querySelector("#wrong-result p");
  const rightPercent = document.createElement("p"); //lui mi serve nell'if è il terzo p dentro al div di correct
  const wrongPercent = document.createElement("p");
  rightPercent.innerHTML = `${rightPercentage}&percnt;`;
  // added gae
  generateAnswerCircleProgressBar(parseInt(wrongToFix));
  // end added gae
  wrongPercent.innerHTML = `${wrongPercentage}&percnt;`;
  correctDiv.appendChild(rightPercent);
  wrongDiv.appendChild(wrongPercent);
  const numCorrectAnswers = document.createElement("p");
  const numWrongAnswers = document.createElement("p");
  numCorrectAnswers.innerText = `${score}/${totalQuestions} questions`;
  numWrongAnswers.innerText = `${wrongAnswers}/${totalQuestions} questions`;
  correctDiv.appendChild(numCorrectAnswers);
  wrongDiv.appendChild(numWrongAnswers);
  showCongratulations();
  hideShow(secondPage, thirdPage);
}
//this function shows the paragraph inside the circular diagram in div3
function showCongratulations() {
  const circleAnswers = document.querySelector(".valueContainer"); //this needs to be fixed with the circular diagram
  const rightAnswerInPercentage = document.querySelector(
    "#correct-result p:nth-child(2)"
  );
  const resultPercent = rightAnswerInPercentage.textContent; //I need the percentage of right answers
  const resultPercentNum = parseInt(resultPercent);
  const examResults = document.createElement("p");
  if (resultPercentNum >= 60) {
    //the first two text rows have different CSS rules, inside the span tags
    examResults.innerHTML =
      "<span>Congratulations!</span> <br> <span>You passed the exam!.</span> <br><br>We'll send you the certificate in few minutes. <br>Check your email (including promotions / spam folder)";
  } else {
    examResults.innerHTML =
      "<span>We're sorry!</span> <br> <span>You didn't pass the exam!</span> <br><br>Don't give up now, you can try again in the next exam period in a few months.";
  }
  circleAnswers.appendChild(examResults);
}

function setTimer() {
  if (timerCount > 0) {
    timerCount--;
    circle.classList.add("startAnimation");
  }
  console.log(timerCount);

  if (timerCount == 0) {
    // manda avanti domanda
    const currentQ = questions[currentQuestion];
    const shuffledOptions1 = shuffleArray(currentQ.options);
    circle.style.stroke = "rgb(108, 248, 248)";
    clearInterval(timer);
    selectAnswer(shuffledOptions1);
    resetAnimation();
  } else {
    timerNumber.innerText = timerCount;
  }
}

// Timer animation

function resetAnimation() {
  circle.classList.remove("startAnimation");
  circle.style.stroke = "rgb(108, 248, 248)";

  void circle.offsetWidth;

  setTimeout(() => {
    circle.classList.add("startAnimation");
  }, 10);

  console.log("Resettata animazione");
}

// CORRECT ANSW CIRCLE
function generateAnswerCircleProgressBar(wrongAnsw) {
  let countPercent = 0;

  let progress = setInterval(() => {
    countPercent++;

    /* valueContainer.textContent = `${countPercent}%`; // NON SERVE */
    progressBar.style.background = `conic-gradient(#C2128D ${
      countPercent * 3.6
    }deg, #00FFFF ${countPercent * 3.6}deg)`;

    if (countPercent == wrongAnsw) {
      clearInterval(progress);
    }
  }, SPEED_ANSWER_BAR);
}

// COSTANT AND VARIABLES
const questions = [
  {
    question: "What does CPU stand for?",
    options: [
      "Central Processing Unit",
      "Central Process Unit",
      "Computer Personal Unit",
      "Central Processor Unit",
    ],
    correct: "Central Processing Unit",
  },
  {
    question:
      "In the programming language Java, which of these keywords would you put on a variable to make sure it doesn't get modified?",
    options: ["Final", "Static", "Private", "Public"],
    correct: "Final",
  },
  {
    question: "The logo for Snapchat is a Bell.",
    options: ["False", "True"],
    correct: "False",
  },
  {
    question:
      "Pointers were not used in the original C programming language; they were added later on in C++.",
    options: ["False", "True"],
    correct: "False",
  },
  {
    question:
      "What is the most preferred image format used for logos in the Wikimedia database?",
    options: [".svg", ".png", ".jpeg", ".gif"],
    correct: ".svg",
  },
  {
    question: "In web design, what does CSS stand for?",
    options: [
      "Cascading Style Sheet",
      "Counter Strike: Source",
      "Corrective Style Sheet",
      "Computer Style Sheet",
    ],
    correct: "Cascading Style Sheet",
  },
  {
    question:
      "What is the code name for the mobile operating system Android 7.0?",
    options: ["Nougat", "Ice Cream Sandwich", "Jelly Bean", "Marshmallow"],
    correct: "Nougat",
  },
  {
    question: "On Twitter, what is the character limit for a Tweet?",
    options: ["140", "120", "160", "100"],
    correct: "140",
  },
  {
    question: "Linux was first created as an alternative to Windows XP.",
    options: ["False", "True"],
    correct: "False",
  },
  {
    question:
      "Which programming language shares its name with an island in Indonesia?",
    options: ["Java", "Python", "C", "Jakarta"],
    correct: "Java",
  },
];

let currentQuestion = 0;
let currentQuestionNumber = 1;
let score = 0;
let wrongAnswers = 0;
// timer setup
let timer;
const TOTAL_SECONDS_TIMER = 30;
const SPEED_TIMER = 1000; //ms
const SPEED_ANSWER_BAR = 30;
let timerCount = TOTAL_SECONDS_TIMER;
const timerDiv = document.querySelector("#timer");

//animation timer
const timerNumber = document.querySelector("#timerNumber");
const timerSvg = document.querySelector("#timerSvg");
/* console.log(timerSvg); */

//DOM selection
const firstPage = document.querySelector("section");
const secondPage = document.querySelector("#quizContainer");
const thirdPage = document.querySelector("#resultsContainer");
const fourthPage = document.querySelector("#rateUs");

// CIRCULAR ANSWER DOM
let progressBar = document.querySelector("#answerProgressBar");
let valueContainer = document.querySelector(
  "#answerProgressBar .valueContainer"
);

// TIMER DOM
const circle = document.querySelector(".circle");

// Btn selection
const proceedButton = document.querySelector("#proceedBtn");
const rateUsButton = document.querySelector("#rateUsBtn");

// EventListeners
proceedButton.addEventListener("click", function () {
  hideShow(firstPage, secondPage);
});
proceedButton.addEventListener("click", function () {
  loadQuestion();
});
rateUsButton.addEventListener("click", function () {
  hideShow(thirdPage, fourthPage);
});

const stelle = document.querySelectorAll(".singleStar");
const divStars = document.querySelectorAll(".star");
let isClicked = false;
console.log(isClicked);

// starAnimation();
for (let i = 0; i < stelle.length; i++) {
  stelle[i].addEventListener("click", () => {
    isClicked = true;
  });
  stelle[i].addEventListener("click", () => {
    changeColor(i);
  });
}

function changeColor(index) {
  for (let i = 0; i < divStars.length; i++) {
    if (i <= index) {
      divStars[i].classList.remove("star");
    } else {
      divStars[i].classList.add("star");
    }
  }
  console.log(isClicked);
}

function removeStars() {
  for (let i = 0; i < divStars.length; i++) {
    divStars[i].classList.add("star");
  }
}
