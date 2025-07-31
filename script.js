const textBox = document.querySelector(".text-box");
const randomText = document.querySelector(".random-text");
const restartBtn = document.querySelector("#icon");
const stats = document.querySelector(".stats");
const timer = document.querySelector("#timer");
const wpm = document.querySelector("#wpm");
const accuracy = document.querySelector("#accuracy");
const stopBtn = document.querySelector(".stop");
let isTyping = false;
let startTime, intervalId;

const sentences = [
  "Practice makes a woman perfect, keep practising dumping until you find the one who does not need fixing, editing or updating",
  "Typing is a useful skill, especially when you need to type Im dumping you faster than he types wyd?",
  "Stay hungry, stay foolish and also stay away from him",
  "Consistency is the key, but him being consistently toxic is not",
  "Success comes with time but not your ex. He comes with excuses, toxicity, and deception",
  "Not every bug is in your code, some are promising you false love and affection",
  "He said he needed space, so you gave him the entire cloud and never looked back.",
  "Shes not ignoring you, Shes just busy coding her future and youre not in the import list.",
  "Romanticize your growth, Not a situationship with poor syntax and even poorer effort.",
  "You are not a backup plan or a placeholder, you are the main function in the code of life.",
];

// function normalizeText(text){
// will do when bored
// }

function loadNewSentence() {
  const randomIndex = Math.floor(Math.random() * sentences.length); //math.floor is for rounding the number and math.random picks up any randome numbe from 0 to 1 eg 0.7655
  randomText.innerText = sentences[randomIndex];
  textBox.value = "";
  timer.innerText = "0";
  wpm.innerText = "0";
  accuracy.innerText = "0%";
  textBox.focus();
  isTyping = false;
}

textBox.addEventListener("input", () => {
  // syntax for addeventlisntener: element.addEventListener(eventType, eventHandler);

  // addEventListener takes 2 parameters,
  // 1 = eventType, 2 = a callback function (eventHandler)
  // eventType (string): What kind of event should we listen for?
  // 2 = callbackFunction: a function that should run when that event happens.

  //here textBox is the element we are calling and input is a string that is predefined in js which basically means that whenever
  //someone starts typing in the element (here: textBox) LISTEN TO THIS EVENT

  if (!isTyping) {
    isTyping = true;
    startTime = new Date();
    intervalId = setInterval(updateStats, 1000);
  }
  checkTypingProgress();
});

function updateStats() {
  const currentTime = new Date();
  const elapsedTime = Math.floor((currentTime - startTime) / 1000);
  timer.innerText = elapsedTime;

  if (elapsedTime >= 30) {
    clearInterval(intervalId);
    isTyping = false;
    alert("Time's up, Check Statistics!");
  }

  const typedText = textBox.value.trim();
  //.value gets the value from the textBox variable & .trim() function trims down the starting & the
  // ending spaces

  /*
  In JavaScript, everything (almost) is an object — or behaves like one.
  something.anyFunction().anyProperty.anyMethod()
  
  --> Chain of trust ( when it breaks):

  const result = user.profile.getName().toUpperCase().slice(0, 3);

  This will break if:
  user is undefined
  or profile is missing
  or getName() returns undefined or null
  */

  const wordCount = typedText
    .split(/\s+/)
    .filter((word) => word.length > 0).length;

  // here
  // .split(/\s+/)
  // means
  // 1. \s+ is a regular expression literal
  // s means space and + sign indicates to check if there are one or more spaces
  // 2. the "/" these around the "\s+" (regex) are used to defined a reg expression literal
  // these forward slashesare here knwonn as delimiters
  // 3. A regex literal is just a regular expression written directly into the code,
  // using slashes /.../ as delimiters — without needing to create a RegExp object manually.
  // 4. So: /\s+/ splits any gap between words, no matter how many spaces

  // then
  // array.filter(callbackFunction)
  // 1. This creates a new array containing only those elements where the callbackFunction returns true.
  // 2. here, we make an arrow function, word => word.length > 0
  // this selects words that are not spaces
  // 4. So: this basically means, Remove anything empty (""), in case extra whitespace was at start or end.

  // then
  // .length
  // this counts the length of the returned array

  //so finally wordCount stores how many words the user has written (number)

  const wpmValue = Math.round((wordCount / elapsedTime) * 60) || 0;
  wpm.innerText = wpmValue;

  // Math.round((wordCount/elapsed.time)*60) - this returns wpm
  // if words per minute is bychance NaN then it uses 0, because of the || 0 condition
  // || is the Logical OR operator but,
  // In JavaScript, it’s often used as a fallback or default operator
  // So, it means "If the math gives a real number, use it. Otherwise, use 0."
}

function checkTypingProgress() {
  const targetText = randomText.innerText.toLowerCase();
  const typedText = textBox.value.toLowerCase();

  let correctChars = 0;
  for (let i = 0; i < typedText.length; i++) {
    if (typedText[i] === targetText[i]) correctChars++;
  }

  const accuracyValue =
    typedText.length > 0
      ? Math.round((correctChars / typedText.length) * 100)
      : 0;
  accuracy.innerText = accuracyValue + "%";

  //if the typing is just as same as the given text
  if (typedText.length >= targetText.length) {
    clearInterval(intervalId);
    isTyping = false;
    updateStats();

    const isPerfect = typedText === targetText;
    if (isPerfect) {
      alert("Well done! ✅ You typed it correctly.");
    } else {
      alert("Finished! But with some mistakes. Check your accuracy.");
    }
  }
}

restartBtn.addEventListener("click", () => {
  clearInterval(intervalId);
  isTyping = false;
  loadNewSentence();
});

stopBtn.addEventListener("click", () => {
  updateStats();
  checkTypingProgress();
  clearInterval(intervalId);
  isTyping = false;
});

textBox.addEventListener("paste", (e) => {
  e.preventDefault();
});

const strictMode = true; // you can tie this to checkbox later

const isCorrect = strictMode
  ? typedText === targetText
  : typedText.toLowerCase() === targetText.toLowerCase();

function startCountdown(seconds = 3) {
  let count = seconds;
  const countdown = setInterval(() => {
    randomText.innerText = `Starting in ${count}...`;
    count--;
    if (count < 0) {
      clearInterval(countdown);
      loadNewSentence();
    }
  }, 1000);
}
