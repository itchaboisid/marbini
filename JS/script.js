const LAST_QUESTION = 5;
var selectedIndexes = [];
var questionIndex = undefined;
var selectedAnswers = [null, null, null, null, null];

const startTest = () => {
  //generate 5 random questions indexes
  selectedIndexes = [];
  let count = 0;
  while (count < 5) {
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
};

const displaySelectedAnswer = (answer) => {
  if (answer === 0) {
    document.getElementById("div-ans-a").style.border = "2px solid black";
  } else if (answer === 1) {
    document.getElementById("div-ans-b").style.border = "2px solid black";
  } else if (answer === 2) {
    document.getElementById("div-ans-c").style.border = "2px solid black";
  } else {
    document.getElementById("div-ans-d").style.border = "2px solid black";
  }
};

const displayQuestion = (questionObj) => {
  document.getElementById("question").innerHTML = questionObj.question;
  document.getElementById("ans-a").innerHTML = questionObj.answers[0].text;
  document.getElementById("ans-b").innerHTML = questionObj.answers[1].text;
  document.getElementById("ans-c").innerHTML = questionObj.answers[2].text;
  document.getElementById("ans-d").innerHTML = questionObj.answers[3].text;

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
      element = `<div id="question-count">Question <span id="counter"></span>${index}/5</div>
        <div id="question">${questionObj.question}</div>
        <div class="ans" id="div-ans-a" style="border: 2px solid black">
          <span class="my-alpha">A</span><span id="ans-a">${questionObj.answers[0].text}</span>
        </div>
        <div class="ans" id="div-ans-b">
          <span class="my-alpha">B</span><span id="ans-b">${questionObj.answers[1].text}</span>
        </div>
        <div class="ans" id="div-ans-c">
          <span class="my-alpha">C</span><span id="ans-c">${questionObj.answers[2].text}</span>
        </div>
        <div class="ans" id="div-ans-d" style="margin-bottom: 40px">
          <span class="my-alpha">D</span><span id="ans-d">${questionObj.answers[3].text}</span>
        </div>
        `;
      break;
      case 1:
        element = `<div id="question-count">Question <span id="counter"></span>${index}/5</div>
          <div id="question">${questionObj.question}</div>
          <div class="ans" id="div-ans-a" style="border: 2px solid black">
            <span class="my-alpha">A</span><span id="ans-a">${questionObj.answers[0].text}</span>
          </div>
          <div class="ans" id="div-ans-b">
            <span class="my-alpha">B</span><span id="ans-b">${questionObj.answers[1].text}</span>
          </div>
          <div class="ans" id="div-ans-c">
            <span class="my-alpha">C</span><span id="ans-c">${questionObj.answers[2].text}</span>
          </div>
          <div class="ans" id="div-ans-d" style="margin-bottom: 40px">
            <span class="my-alpha">D</span><span id="ans-d">${questionObj.answers[3].text}</span>
          </div>
          `;
        break;
        case 2:
      element = `<div id="question-count">Question <span id="counter"></span>${index}/5</div>
        <div id="question">${questionObj.question}</div>
        <div class="ans" id="div-ans-a" style="border: 2px solid black">
          <span class="my-alpha">A</span><span id="ans-a">${questionObj.answers[0].text}</span>
        </div>
        <div class="ans" id="div-ans-b">
          <span class="my-alpha">B</span><span id="ans-b">${questionObj.answers[1].text}</span>
        </div>
        <div class="ans" id="div-ans-c">
          <span class="my-alpha">C</span><span id="ans-c">${questionObj.answers[2].text}</span>
        </div>
        <div class="ans" id="div-ans-d" style="margin-bottom: 40px">
          <span class="my-alpha">D</span><span id="ans-d">${questionObj.answers[3].text}</span>
        </div>
        `;
      break;
      default:
      element = `<div id="question-count">Question <span id="counter"></span>${index}/5</div>
        <div id="question">${questionObj.question}</div>
        <div class="ans" id="div-ans-a" style="border: 2px solid black">
          <span class="my-alpha">A</span><span id="ans-a">${questionObj.answers[0].text}</span>
        </div>
        <div class="ans" id="div-ans-b">
          <span class="my-alpha">B</span><span id="ans-b">${questionObj.answers[1].text}</span>
        </div>
        <div class="ans" id="div-ans-c">
          <span class="my-alpha">C</span><span id="ans-c">${questionObj.answers[2].text}</span>
        </div>
        <div class="ans" id="div-ans-d" style="margin-bottom: 40px">
          <span class="my-alpha">D</span><span id="ans-d">${questionObj.answers[3].text}</span>
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

  // Show the test result and the preview of selected answers
  document.getElementById("next").style.display = "none";
  document.getElementById("previous").style.display = "none";
};

const showPersonalities = (likha, abacus, ambassador, sports, math, science, letrato) => {
  if (likha > abacus && likha > ambassador && likha > sports && likha > math && likha > science && likha > letrato) {
    // Show result for "Likha"
    document.getElementById("image").src = "Clubs logo/likha.jpg";
    document.getElementById("trait-title").innerText = "You're compatible to Likha";
    // Append Likha traits
    let element = `<li>- Artistic and Creative</li>
    <li>- Prefer Solitude for Inspiration</li>
    <li>- Enjoy Exploring Ideas Deeply</li>`;
    document.getElementById("personalities").innerHTML += element;
  } else if (abacus > likha && abacus > ambassador && abacus > sports && abacus > math && abacus > science && abacus > letrato) {
    // Show result for "Abacus"
    document.getElementById("image").src = "Clubs logo/ict.jpg";
    document.getElementById("trait-title").innerText = "You're compatible to Abacus";
    // Append Abacus traits
    let element = `<li>- Methodical and Detail-Oriented</li>
    <li>- Enjoy Precision and Accuracy</li>
    <li>- Prefer Working Independently and Focusing on Tasks</li>`;
    document.getElementById("personalities").innerHTML += element;
  } else if (ambassador > likha && ambassador > abacus && ambassador > sports && ambassador > math && ambassador > science && ambassador > letrato) {
    // Show result for "Ambassador"
    document.getElementById("image").src = "Clubs logo/ambassador.jpg";
    document.getElementById("trait-title").innerText = "You're compatible to Ambassador";
    // Append Ambassador traits
    let element = `<li>- Outgoing and Charismatic</li>
    <li>- Enjoy Networking and Building Relationships</li>
    <li>- Prefer Communicating and Interacting with Others</li>`;
    document.getElementById("personalities").innerHTML += element;
  } else if (sports > likha && sports > abacus && sports > ambassador && sports > math && sports > science && sports > letrato) {
    // Show result for "Sports"
    document.getElementById("image").src = "Clubs logo/Sport.jpg";
    document.getElementById("trait-title").innerText = "You're compatible to Sports";
    // Append Sports traits
    let element = `<li>- Energetic and Competitive</li>
    <li>- Enjoy Physical Activities and Challenges</li>
    <li>- Prefer Dynamic and Social Environments</li>`;
    document.getElementById("personalities").innerHTML += element;
  } else if (math > likha && math > abacus && math > ambassador && math > sports && math > science && math > letrato) {
    // Show result for "Math"
    document.getElementById("image").src = "Clubs logo/Math.jpg";
    document.getElementById("trait-title").innerText = "You're compatible to Math";
    // Append Math traits
    let element = `<li>- Analytical and Logical Thinker</li>
    <li>- Prefer Structured and Orderly Approach</li>
    <li>- Enjoy Problem-Solving and Critical Thinking</li>`;
    document.getElementById("personalities").innerHTML += element;
  } else if (science > likha && science > abacus && science > ambassador && science > sports && science > math && science > letrato) {
    // Show result for "Science"
    document.getElementById("image").src = "Clubs logo/Science.jpg";
    document.getElementById("trait-title").innerText = "You're compatible to Science";
    // Append Science traits
    let element = `<li>- Curious and Inquisitive</li>
    <li>- Enjoy Experimentation and Exploration</li>
    <li>- Prefer Collaborative and Social Learning</li>`;
    document.getElementById("personalities").innerHTML += element;
  } else {
    // Show result for "Letrato"
    document.getElementById("image").src = "Clubs logo/letrato.jpg";
    document.getElementById("trait-title").innerText = "You're compatible to Letrato";
    // Append Letrato traits
    let element = `<li>- Reflective and Thoughtful</li>
    <li>- Prefer to Observe Before Acting</li>
    <li>- Enjoy Quiet and Calm Environments</li>`;
    document.getElementById("personalities").innerHTML += element;
  }

  // Show test result
  document.getElementById("test-result").style.display = "flex";

  // Show restart button
  document.getElementById("restart").style.display = "block";


  document.getElementById("finish").style.display = "block";

  // Show the right side
  document.getElementsByClassName("your-answers")[0].style.display = "block";
};

const restartQuestion = () => {
 window.location.reload();
};
