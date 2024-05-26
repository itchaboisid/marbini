const LAST_QUESTION = 10;
var selectedIndexes = [];
var questionIndex = undefined;
var selectedAnswers = [null, null, null, null, null, null, null, null, null, null];

const startTest = () => {
  //generate 10 random question indexes
  selectedIndexes = [];
  let count = 0;
  while (count < 10) {
    let number = null;
    do {
      number = Math.floor(Math.random() * 10);
    } while (selectedIndexes.includes(number));
    selectedIndexes.push(number);
    count++;
  }

  //show
  questionIndex = 0;
  let questionObj = questions[selectedIndexes[questionIndex]];
  //console.log(questionObj);

  //show new question
  displayQuestion(questionObj);

  //set the question number
  document.getElementById("counter").innerHTML = questionIndex + 1;

  //disable previous button and next button
  document.getElementById("next").style.pointerEvents = "none";
  document.getElementById("next").style.color = "gray";

  document.getElementById("previous").style.pointerEvents = "none";
  document.getElementById("previous").style.color = "gray";

  //hide the intro page an show the test
  document.getElementsByClassName("welcome")[0].style.display = "none";
  document.getElementsByClassName("container")[0].style.display = "flex";

  //don't show test result
  document.getElementById("test-result").style.display = "none";

  //hide restart button
  document.getElementById("restart").style.display = "none";

  //hide the right side
  document.getElementsByClassName("your-answers")[0].style.display = "none";
};

const resetPreviousStyles = () => {
  //reset styles added previously
  document.getElementById("div-ans-a").style.border = "none";
  document.getElementById("div-ans-b").style.border = "none";
  document.getElementById("div-ans-c").style.border = "none";
  document.getElementById("div-ans-d").style.border = "none";
  document.getElementById("div-ans-e").style.border = "none";
  document.getElementById("div-ans-f").style.border = "none";
  document.getElementById("div-ans-g").style.border = "none";
};

const displaySelectedAnswer = (answer) => {
  if (answer === 0) {
    document.getElementById("div-ans-a").style.border = "2.5px solid white";
  } else if (answer === 1) {
    document.getElementById("div-ans-b").style.border = "2.5px solid white";
  } else if (answer === 2) {
    document.getElementById("div-ans-c").style.border = "2.5px solid white";
  }
  else if (answer === 3) {
    document.getElementById("div-ans-d").style.border = "2.5px solid white";
  }
  else if (answer === 4) {
    document.getElementById("div-ans-e").style.border = "2.5px solid white";
  }
  else if (answer === 5) {
    document.getElementById("div-ans-f").style.border = "2.5px solid white";
  } else {
    document.getElementById("div-ans-g").style.border = "2.5px solid white";
  }
};

const displayQuestion = (questionObj) => {
  document.getElementById("question").innerHTML = questionObj.question;
  document.getElementById("ans-a").innerHTML = questionObj.answers[0].text;
  document.getElementById("ans-b").innerHTML = questionObj.answers[1].text;
  document.getElementById("ans-c").innerHTML = questionObj.answers[2].text;
  document.getElementById("ans-d").innerHTML = questionObj.answers[3].text;
  document.getElementById("ans-e").innerHTML = questionObj.answers[4].text;
  document.getElementById("ans-f").innerHTML = questionObj.answers[5].text;
  document.getElementById("ans-g").innerHTML = questionObj.answers[6].text;


  //enable previous button if there's a previous question
  if (questionIndex > 0) {
    document.getElementById("previous").style.pointerEvents = "auto";
    document.getElementById("previous").style.color = "black";
  } else {
    document.getElementById("previous").style.pointerEvents = "none";
    document.getElementById("previous").style.color = "gray";
  }

  //enable the next button only if there's an existing answer
  if (selectedAnswers[questionIndex] !== null) {
    document.getElementById("next").style.pointerEvents = "auto";
    document.getElementById("next").style.color = "black";
  } else {
    document.getElementById("next").style.pointerEvents = "none";
    document.getElementById("next").style.color = "gray";
  }

  //next 'next question to finish' if question is the last

  if (questionIndex === LAST_QUESTION - 1) {
    document.getElementById("next").innerHTML = "Finish";
  } else {
    document.getElementById("next").innerHTML = "Next question >";
  }
};

const nextQuestion = () => {
  if (questionIndex < selectedIndexes.length - 1) {
    questionIndex++;
    let questionObj = questions[selectedIndexes[questionIndex]];
    //console.log(questionObj);

    //reset styles added previously
    resetPreviousStyles();

    //show new question
    displayQuestion(questionObj);

    if (selectedAnswers[questionIndex] !== null) {
      //previous answer exist
      //set the selected answer since user can change the answer
      let answer = selectedAnswers[questionIndex];
      displaySelectedAnswer(answer);
    }

    //set the question number
    document.getElementById("counter").innerHTML = questionIndex + 1;
  } else {
    showAllQuestionAndAnswer();
  }
};

const previousQuestion = () => {
  console.log(questionIndex);
  if (questionIndex > 0) {
    questionIndex--;

    let questionObj = questions[selectedIndexes[questionIndex]];
    //console.log(questionObj);

    resetPreviousStyles();

    //show new question
    displayQuestion(questionObj);

    //set the question number
    document.getElementById("counter").innerHTML = questionIndex + 1;

    //set the selected answer since user can change the answer
    let answer = selectedAnswers[questionIndex];
    displaySelectedAnswer(answer);
  }
};

const selectedAnswer = (ans) => {
  //reset styles added previously
  resetPreviousStyles();

  //setSelected answers
  displaySelectedAnswer(ans);

  //when answer is selected, enable the next button
  document.getElementById("next").style.pointerEvents = "auto";
  document.getElementById("next").style.color = "black";

  //user answer so we can display it at the end
  selectedAnswers[questionIndex] = ans;
  //console.log(selectedAnswers);
};

//function to show the chosen question and answer. For summary at the end of the test
const showElement = (questionObj, chosenAnswer, index) => {
  let element = "";

  switch (chosenAnswer) {
    case 0:
      element = `<div id="question-count">Question <span id="counter"></span>${index}/10</div>
        <div id="question">${questionObj.question}</div>
        <div class="ans" id="div-ans-a" style="${chosenAnswer === 0 ? 'border: 2px solid white;' : ''}">
          <span class="my-alpha">A</span><span id="ans-a">${questionObj.answers[0].text}</span>
        </div>
        <div class="ans" id="div-ans-b">
          <span class="my-alpha">B</span><span id="ans-b">${questionObj.answers[1].text}</span>
        </div>
        <div class="ans" id="div-ans-c">
          <span class="my-alpha">C</span><span id="ans-c">${questionObj.answers[2].text}</span>
        </div>
        <div class="ans" id="div-ans-d">
          <span class="my-alpha">D</span><span id="ans-d">${questionObj.answers[3].text}</span>
        </div>
        <div class="ans" id="div-ans-e">
          <span class="my-alpha">E</span><span id="ans-e">${questionObj.answers[4].text}</span>
        </div>
        <div class="ans" id="div-ans-f">
          <span class="my-alpha">F</span><span id="ans-f">${questionObj.answers[5].text}</span>
        </div>
        <div class="ans" id="div-ans-g" style="margin-bottom: 40px">
          <span class="my-alpha">G</span><span id="ans-g">${questionObj.answers[6].text}</span>
        </div>
        `;
      break;
    case 1:
      element =`<div id="question-count">Question <span id="counter"></span>${index}/10</div>
      <div id="question">${questionObj.question}</div>
      <div class="ans" id="div-ans-a"}">
        <span class="my-alpha">A</span><span id="ans-a">${questionObj.answers[0].text}</span>
      </div>
      <div class="ans" id="div-ans-b" style="${chosenAnswer === 1 ? 'border: 2px solid white;' : ''}">
      <span class="my-alpha">B</span><span id="ans-b">${questionObj.answers[1].text}</span>
      </div>
      <div class="ans" id="div-ans-c">
        <span class="my-alpha">C</span><span id="ans-c">${questionObj.answers[2].text}</span>
      </div>
      <div class="ans" id="div-ans-d">
        <span class="my-alpha">D</span><span id="ans-d">${questionObj.answers[3].text}</span>
      </div>
      <div class="ans" id="div-ans-e">
        <span class="my-alpha">E</span><span id="ans-e">${questionObj.answers[4].text}</span>
      </div>
      <div class="ans" id="div-ans-f">
        <span class="my-alpha">F</span><span id="ans-f">${questionObj.answers[5].text}</span>
      </div>
      <div class="ans" id="div-ans-g" style="margin-bottom: 40px">
        <span class="my-alpha">G</span><span id="ans-g">${questionObj.answers[6].text}</span>
      </div>
      `;
      break;
    case 2:
      element = `<div id="question-count">Question <span id="counter"></span>${index}/10</div>
      <div id="question">${questionObj.question}</div>
        <div class="ans" id="div-ans-a">
        <span class="my-alpha">A</span><span id="ans-a">${questionObj.answers[0].text}</span>
      </div>
      <div class="ans" id="div-ans-b">
        <span class="my-alpha">B</span><span id="ans-b">${questionObj.answers[1].text}</span>
      </div>
      <div class="ans" id="div-ans-c" style="${chosenAnswer === 2 ? 'border: 2px solid white;' : ''}">
        <span class="my-alpha">C</span><span id="ans-c">${questionObj.answers[2].text}</span>
      </div>
      <div class="ans" id="div-ans-d">
        <span class="my-alpha">D</span><span id="ans-d">${questionObj.answers[3].text}</span>
      </div>
      <div class="ans" id="div-ans-e">
        <span class="my-alpha">E</span><span id="ans-e">${questionObj.answers[4].text}</span>
      </div>
      <div class="ans" id="div-ans-f">
        <span class="my-alpha">F</span><span id="ans-f">${questionObj.answers[5].text}</span>
      </div>
      <div class="ans" id="div-ans-g" style="margin-bottom: 40px">
        <span class="my-alpha">G</span><span id="ans-g">${questionObj.answers[6].text}</span>
      </div>
      `;
      break;
      case 3:
      element = `<div id="question-count">Question <span id="counter"></span>${index}/10</div>
      <div id="question">${questionObj.question}</div>
      <div class="ans" id="div-ans-a">
        <span class="my-alpha">A</span><span id="ans-a">${questionObj.answers[0].text}</span>
      </div>
      <div class="ans" id="div-ans-b">
        <span class="my-alpha">B</span><span id="ans-b">${questionObj.answers[1].text}</span>
      </div>
      <div class="ans" id="div-ans-c">
        <span class="my-alpha">C</span><span id="ans-c">${questionObj.answers[2].text}</span>
      </div>
      <div class="ans" id="div-ans-d" style="${chosenAnswer === 3 ? 'border: 2px solid white;' : ''}">
        <span class="my-alpha">D</span><span id="ans-d">${questionObj.answers[3].text}</span>
      </div>
      <div class="ans" id="div-ans-e">
        <span class="my-alpha">E</span><span id="ans-e">${questionObj.answers[4].text}</span>
      </div>
      <div class="ans" id="div-ans-f">
        <span class="my-alpha">F</span><span id="ans-f">${questionObj.answers[5].text}</span>
      </div>
      <div class="ans" id="div-ans-g" style="margin-bottom: 40px">
        <span class="my-alpha">G</span><span id="ans-g">${questionObj.answers[6].text}</span>
      </div>
      `;
      break;
      case 4:
      element = `<div id="question-count">Question <span id="counter"></span>${index}/10</div>
      <div id="question">${questionObj.question}</div>
      <div class="ans" id="div-ans-a">
        <span class="my-alpha">A</span><span id="ans-a">${questionObj.answers[0].text}</span>
      </div>
      <div class="ans" id="div-ans-b">
        <span class="my-alpha">B</span><span id="ans-b">${questionObj.answers[1].text}</span>
      </div>
      <div class="ans" id="div-ans-c">
        <span class="my-alpha">C</span><span id="ans-c">${questionObj.answers[2].text}</span>
      </div>
      <div class="ans" id="div-ans-d">
        <span class="my-alpha">D</span><span id="ans-d">${questionObj.answers[3].text}</span>
      </div>
      <div class="ans" id="div-ans-e" style="${chosenAnswer === 4 ? 'border: 2px solid white;' : ''}">
        <span class="my-alpha">E</span><span id="ans-e">${questionObj.answers[4].text}</span>
      </div>
      <div class="ans" id="div-ans-f">
        <span class="my-alpha">F</span><span id="ans-f">${questionObj.answers[5].text}</span>
      </div>
      <div class="ans" id="div-ans-g" style="margin-bottom: 40px">
        <span class="my-alpha">G</span><span id="ans-g">${questionObj.answers[6].text}</span>
      </div>
      `;
      break;
      case 5:
      element = `<div id="question-count">Question <span id="counter"></span>${index}/10</div>
      <div id="question">${questionObj.question}</div>
      <div class="ans" id="div-ans-a">
        <span class="my-alpha">A</span><span id="ans-a">${questionObj.answers[0].text}</span>
      </div>
      <div class="ans" id="div-ans-b">
        <span class="my-alpha">B</span><span id="ans-b">${questionObj.answers[1].text}</span>
      </div>
      <div class="ans" id="div-ans-c">
        <span class="my-alpha">C</span><span id="ans-c">${questionObj.answers[2].text}</span>
      </div>
      <div class="ans" id="div-ans-d">
        <span class="my-alpha">D</span><span id="ans-d">${questionObj.answers[3].text}</span>
      </div>
      <div class="ans" id="div-ans-e">
        <span class="my-alpha">E</span><span id="ans-e">${questionObj.answers[4].text}</span>
      </div>
      <div class="ans" id="div-ans-f" style="${chosenAnswer === 5 ? 'border: 2px solid white;' : ''}">
        <span class="my-alpha">F</span><span id="ans-f">${questionObj.answers[5].text}</span>
      </div>
      <div class="ans" id="div-ans-g" style="margin-bottom: 40px">
        <span class="my-alpha">G</span><span id="ans-g">${questionObj.answers[6].text}</span>
      </div>
      `;
      break;
    default:
      element = `<div id="question-count">Question <span id="counter"></span>${index}/10</div>
        <div id="question">${questionObj.question}</div>
        <div class="ans" id="div-ans-a">
          <span class="my-alpha">A</span><span id="ans-a">${questionObj.answers[0].text}</span>
        </div>
        <div class="ans" id="div-ans-b">
          <span class="my-alpha">B</span><span id="ans-b">${questionObj.answers[1].text}</span>
        </div>
        <div class="ans" id="div-ans-c">
          <span class="my-alpha">C</span><span id="ans-c">${questionObj.answers[2].text}</span>
        </div>
        <div class="ans" id="div-ans-d">
          <span class="my-alpha">D</span><span id="ans-d">${questionObj.answers[3].text}</span>
        </div>
        <div class="ans" id="div-ans-e">
          <span class="my-alpha">E</span><span id="ans-e">${questionObj.answers[4].text}</span>
        </div>
        <div class="ans" id="div-ans-f">
          <span class="my-alpha">F</span><span id="ans-f">${questionObj.answers[5].text}</span>
        </div>
        <div class="ans" id="div-ans-g" style="margin-bottom: 40px; ${chosenAnswer === 6 ? 'border: 2px solid white;' : ''}">
          <span class="my-alpha">G</span><span id="ans-g">${questionObj.answers[6].text}</span>
        </div>
        `;
      // Repeat for other cases (2, 3, 4, 5, 6)
  }

  return element;
};
  // Hide the section contining the questions

const showAllQuestionAndAnswer = () => {
  


  //store the count for later comparison
  let likhaCount = 0;
  let abacusCount = 0;
  let ambassadorCount = 0;
  let sportsCount = 0;
  let mathCount = 0;
  let scienceCount = 0;
  let letratoCount = 0;

  //get the questions and selected answer in order to display the summary
  for (let i = 0; i < selectedIndexes.length; i++) {
    let questionObj = questions[selectedIndexes[i]];
    let answer = selectedAnswers[i];
    let element = showElement(questionObj, answer, i + 1);
    document.getElementById("answers").innerHTML += element;

    let cat = questionObj.answers[answer].cat;
    switch (cat) { 
      case "likha":
        likhaCount++;
        break;
      case "abacus":
        abacusCount++;
        break;
      case "ambassador":
        ambassadorCount++;
        break;
      case "sports":
        sportsCount++;
        break; 
      case "math":
        mathCount++;
        break;
      case "science":
        scienceCount++;
        break;
      case "letrato":
        letratoCount++;
        break;
    }
  }

  showPersonalities(likhaCount, abacusCount, ambassadorCount, sportsCount, mathCount, scienceCount, letratoCount);

  //hide the previous and finish button and show restart 

  document.querySelector('#question-count').style.display = 'none';
  document.querySelector('#question').style.display = 'none';
  document.querySelector('#div-ans-a').style.display = 'none';
  document.querySelector('#div-ans-b').style.display = 'none';
  document.querySelector('#div-ans-c').style.display = 'none';
  document.querySelector('#div-ans-d').style.display = 'none';
  document.querySelector('#div-ans-e').style.display = 'none';
  document.querySelector('#div-ans-f').style.display = 'none';
  document.querySelector('#div-ans-g').style.display = 'none';

  // Show the test result and the preview of selected answers
  document.getElementById("next").style.display = "none";
  document.getElementById("previous").style.display = "none";
};

const showPersonalities = (likha, abacus, ambassador, sports, math, science, letrato) => {
  // Clear previous results
  document.getElementById("personalities").innerHTML = "";



  // Initialize club data
  const clubs = [
    { name: "Likha ", score: likha, img: "logos/likha.jpg", traits: `<li>- Artistic and Creative</li><li>- Prefer Solitude for Inspiration</li><li>- Enjoy Exploring Ideas Deeply</li>` },
    { name: "Abacus", score: abacus, img: "logos/ict.jpg", traits: `<li>- Methodical and Detail-Oriented</li><li>- Enjoy Precision and Accuracy</li><li>- Prefer Working Independently and Focusing on Tasks</li>` },
    { name: "Ambassador", score: ambassador, img: "logos/ambassador.jpg", traits: `<li>- Outgoing and Charismatic</li><li>- Enjoy Networking and Building Relationships</li><li>- Prefer Communicating and Interacting with Others</li>` },
    { name: "Sports", score: sports, img: "logos/Sport.jpg", traits: `<li>- Energetic and Competitive</li><li>- Enjoy Physical Activities and Challenges</li><li>- Prefer Dynamic and Social Environments</li>` },
    { name: "Math", score: math, img: "logos/Math.jpg", traits: `<li>- Analytical and Logical Thinker</li><li>- Prefer Structured and Orderly Approach</li><li>- Enjoy Problem-Solving and Critical Thinking</li>` },
    { name: "Science", score: science, img: "logos/Science.jpg", traits: `<li>- Curious and Inquisitive</li><li>- Enjoy Experimentation and Exploration</li><li>- Prefer Collaborative and Social Learning</li>` },
    { name: "Letrato", score: letrato, img: "logos/letrato.jpg", traits: `<li>- Reflective and Thoughtful</li><li>- Prefer to Observe Before Acting</li><li>- Enjoy Quiet and Calm Environments</li>` }
];

// Find the highest score
let highestScore = Math.max(likha, abacus, ambassador, sports, math, science, letrato);

// Filter clubs with the highest score
let topClubs = clubs.filter(club => club.score === highestScore);

// Display only the first two top clubs with the same score
// Display only one randomly selected top club if there are multiple clubs with the same highest score
if (topClubs.length > 1) {
  const randomIndex = Math.floor(Math.random() * topClubs.length);
  const randomClub = topClubs[randomIndex];
  
  // Display the image and title for the randomly selected top club
  document.getElementById("image").src = randomClub.img;
  let traitTitle = document.getElementById("trait-title");
  traitTitle.innerHTML = `You're compatible with ${randomClub.name}`;
  traitTitle.style.textAlign = "center";  

  // Append the traits of the randomly selected top club
  document.getElementById("personalities").innerHTML += randomClub.traits;
} else {
  // Display the image and title for the first top club (only once)
  const club = topClubs[0];
  document.getElementById("image").src = club.img;
  let traitTitle = document.getElementById("trait-title");
  traitTitle.innerHTML = `You're compatible with ${club.name}`;
  traitTitle.style.textAlign = "center";  

  // Append the traits of the top club
  document.getElementById("personalities").innerHTML += club.traits;
}


// If there are more than two top clubs, display a message

// Show test result
document.getElementById("test-result").style.display = "flex";

// Show restart button
document.getElementById("restart").style.display = "block";

// Show the finish button
document.getElementById("finish").style.display = "block";

// Show the right side
document.getElementsByClassName("your-answers")[0].style.display = "block";
}
const restartQuestion = () => {
 window.location.reload();
};

