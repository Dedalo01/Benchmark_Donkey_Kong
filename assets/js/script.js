const questions = [
    {
      question: "What does CPU stand for?",
      options: ["Central Processing Unit", "Central Process Unit", "Computer Personal Unit", "Central Processor Unit"],
      correct: "Central Processing Unit"
    },
    {
      question: "In the programming language Java, which of these keywords would you put on a variable to make sure it doesn't get modified?",
      options: ["Final", "Static", "Private", "Public"],
      correct: "Final"
    },
    {
      question: "The logo for Snapchat is a Bell.",
      options: ["False", "True"],
      correct: "False"
    },
    {
      question: "Pointers were not used in the original C programming language; they were added later on in C++.",
      options: ["False", "True"],
      correct: "False"
    },
    {
      question: "What is the most preferred image format used for logos in the Wikimedia database?",
      options: [".svg", ".png", ".jpeg", ".gif"],
      correct: ".svg"
    },
    {
      question: "In web design, what does CSS stand for?",
      options: ["Cascading Style Sheet", "Counter Strike: Source", "Corrective Style Sheet", "Computer Style Sheet"],
      correct: "Cascading Style Sheet"
    },
    {
      question: "What is the code name for the mobile operating system Android 7.0?",
      options: ["Nougat", "Ice Cream Sandwich", "Jelly Bean", "Marshmallow"],
      correct: "Nougat"
    },
    {
      question: "On Twitter, what is the character limit for a Tweet?",
      options: ["140", "120", "160", "100"],
      correct: "140"
    },
    {
      question: "Linux was first created as an alternative to Windows XP.",
      options: ["False", "True"],
      correct: "False"
    },
    {
      question: "Which programming language shares its name with an island in Indonesia?",
      options: ["Java", "Python", "C", "Jakarta"],
      correct: "Java"
    },
  ];

  let currentQuestion = 0;
  let score = 0;
  let wrongAnswers = 0;

  function loadQuestion() {
    const quizContainer = document.getElementById('quiz');
    const optionsContainer = document.getElementById('options');
    const currentQ = questions[currentQuestion];

    quizContainer.textContent = currentQ.question;
    optionsContainer.innerHTML = '';

    // Mescola le opzioni
    const shuffledOptions = shuffleArray(currentQ.options);

    shuffledOptions.forEach((option, index) => {
      const button = document.createElement('button');
      button.textContent = option;
      button.className = 'option';
      button.addEventListener('click', () => selectAnswer(option));
      optionsContainer.appendChild(button);
    });
  }

  function selectAnswer(selectedOption) {
    const currentQ = questions[currentQuestion];

    if (selectedOption === currentQ.correct) {
      score++;
    } else {
      wrongAnswers++;
    }

    currentQuestion++;

    if (currentQuestion < questions.length) {
      loadQuestion();
    } else {
      showResult();
    }
  }

  function showResult() {
    const correctResultContainer = document.getElementById('correct-result');
    const wrongResultContainer = document.getElementById('wrong-result');
    const totalQuestions = questions.length;
    const correctPercentage = (score / totalQuestions) * 100;
    const wrongPercentage = (wrongAnswers / totalQuestions) * 100;

    correctResultContainer.textContent = `Correct (${correctPercentage.toFixed(2)}%) ${score}/10 questions`;
    wrongResultContainer.textContent = `Wrong (${wrongPercentage.toFixed(2)}%) ${wrongAnswers}/10 questions`;
  }

  function shuffleArray(array) {
    // Algoritmo di Fisher-Yates per mescolare l'array
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  // Inizia il quiz
  loadQuestion();