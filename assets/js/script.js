// FUNCTIONS

function hideShow(div1, div2) {
  div1.classList.add("hide");
  div2.classList.remove("hide");
}

function loadQuestion() {
  timerCount = TOTAL_SECONDS_TIMER;
  timer = setInterval(setTimer, SPEED_TIMER);

  const quizContainer = document.getElementById("quiz");
  const optionsContainer = document.getElementById("options");
  const currentQ = questions[currentQuestion];

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
    clearInterval(timer);
  } else {
    wrongAnswers++;
    clearInterval(timer);
  }

  currentQuestion++;

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
  const circleAnswers = document.querySelector("#donut"); //this needs to be fixed with the circular diagram
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
    timerDiv.innerText = timerCount;
  }
  console.log(timerCount);

  if (timerCount == 0) {
    // manda avanti domanda
    const currentQ = questions[currentQuestion];
    const shuffledOptions1 = shuffleArray(currentQ.options);
    clearInterval(timer);
    selectAnswer(shuffledOptions1);
  }
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
let score = 0;
let wrongAnswers = 0;
// timer setup
let timer;
const TOTAL_SECONDS_TIMER = 30;
const SPEED_TIMER = 1000; //ms
let timerCount = TOTAL_SECONDS_TIMER;
const timerDiv = document.querySelector("#timer");

//DOM selection
const firstPage = document.querySelector("section");
const secondPage = document.querySelector("#quizContainer");
const thirdPage = document.querySelector("#resultsContainer");
const fourthPage = document.querySelector("#rateUs");

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

// ROBA STELLE
/* let maxStars = 10; // Numero massimo di stelle
let currentRating = 0; */

/* function generateStars() {
  let starRatingDiv = document.getElementById("stars");

  for (let i = 0; i < maxStars; i++) {
    const div = document.createElement("div");

    div.innerHTML = `<svg width="47" height="46" viewBox="0 0 47 46" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.2044 1.55551C22.6143 0.569963 24.0104 0.569964 24.4203 1.55552L29.9874 14.9402C30.1602 15.3557 30.5509 15.6396 30.9994 15.6756L45.4494 16.834C46.5134 16.9193 46.9448 18.2471 46.1341 18.9415L35.1248 28.3722C34.7831 28.6649 34.6338 29.1242 34.7382 29.5619L38.1018 43.6626C38.3494 44.7009 37.2199 45.5215 36.309 44.9651L23.9379 37.4089C23.5538 37.1743 23.0709 37.1743 22.6868 37.4089L10.3157 44.9651C9.40478 45.5215 8.27528 44.7009 8.52295 43.6626L11.8865 29.5619C11.9909 29.1242 11.8416 28.6649 11.4999 28.3722L0.490575 18.9415C-0.320069 18.2471 0.111362 16.9193 1.17535 16.834L15.6253 15.6756C16.0738 15.6396 16.4645 15.3557 16.6374 14.9402L22.2044 1.55551Z" fill="#00FFFF"/>
    </svg>`;
    // aggiungere dinamicamente classe e nel css definire il fill scuro
    // per svg

    div.addEventListener("click", () => {
      // ciclo for che prende da i
    });
    starRatingDiv.appendChild(div);
  }
}

function changeStarColor() {
  const stars = document.querySelectorAll("#stars svg");
  // ciclo
  // i
  // da 0 a i --> rimuovi classe opaca
  console.log(stars);
}

function rateStar(rating) {
  currentRating = rating;
  updateRatingDisplay();
}

function updateRatingDisplay() {
  document.getElementById("ratingValue").innerText = "Rating: " + currentRating;
}

generateStars();
 */
