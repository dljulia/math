const firstMode = document.querySelector(".firstMode");
const secondMode = document.querySelector(".secondMode");
const thirdMode = document.querySelector(".thirdMode");
const startButton = document.querySelector(".start");
const launchPage = document.querySelector(".launch");
const gamePage = document.querySelector(".game");
const exampleNumber = document.querySelector(".number");
const answer = document.querySelector(".answer");
const nextNumber = document.querySelector(".next");
const cancelNumber = document.querySelector(".cancel");
const buttonsContainer = document.querySelector(".buttons");
const timer = document.querySelector(".timer");
const correct = document.querySelector(".correct");
const mistake = document.querySelector(".mistakes");
const results = document.querySelector(".results");
const timeText = document.querySelector(".timeText");
const correctText = document.querySelector(".correctText");
const mistakeText = document.querySelector(".mistakeText");

const firstModeArr = [11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
const secondModeArr = [21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32];
const thirdModeArr = [11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32];

let chosenArr = null;
let numberIndex = 0;
let correctCounter = 0;
let mistakeCounter = 0;
let seconds = +timer.textContent.slice(-2);
let minutes = +timer.textContent.slice(0,2);

// Функция перемешивания массива
function shuffle(arr){
	for(let i = 0; i < arr.length; i++){
		const randomIndex = Math.floor(Math.random() * arr.length);
		const temp = arr[randomIndex];
		arr[randomIndex] = arr[i];
		arr[i] = temp;
	}
	return arr;
}

// Функция форматирования времени
function format(value) {
  if (value < 10) {
    return `0${value}`;
  } else {
    return value;
  }
}

// Функция таймера
function timerStart() {
  timerId = setInterval(() => {
    if (seconds == 59) {
      seconds = 0;
      minutes += 1;
    } else {
      seconds++;
    }
    timer.textContent = `${format(minutes)}:${format(seconds)}`;
  }, 1000);
}

document.addEventListener("click", (event) => {
  const element = event.target.closest('.mode');

  if (element.classList.contains("firstMode")) {
    element.classList.add("active");
    secondMode.classList.remove("active");
    thirdMode.classList.remove("active");
  }

  if (element.classList.contains("secondMode")) {
    element.classList.add("active");
    firstMode.classList.remove("active");
    thirdMode.classList.remove("active");
  }

  if (element.classList.contains("thirdMode")) {
    element.classList.add("active");
    firstMode.classList.remove("active");
    secondMode.classList.remove("active");
  }
});

startButton.addEventListener("click", () => {
  launchPage.classList.add("hidden");
  gamePage.classList.remove("hidden");

  if (firstMode.classList.contains("active")) {
    chosenArr = [...firstModeArr];
  }

  if (secondMode.classList.contains("active")) {
    chosenArr = [...secondModeArr];
  }

  if (thirdMode.classList.contains("active")) {
    chosenArr = [...thirdModeArr];
  }

  shuffle(chosenArr);

  exampleNumber.textContent = `${chosenArr[numberIndex]}`;

  timerStart();
});

nextNumber.addEventListener("click", () => {
  if (numberIndex == (chosenArr.length - 1)) {
    clearInterval(timerId);
    gamePage.classList.add("hidden");
    launchPage.classList.remove("hidden");
    results.classList.remove("hidden");
    timeText.textContent = `Время: ${format(minutes)}:${format(seconds)}`;
    correctText.textContent = `Правильно: ${correctCounter}`;
    mistakeText.textContent = `Неправильно: ${mistakeCounter}`;

    seconds = 0;
    minutes = 0;
    timer.textContent = `${format(minutes)}:${format(seconds)}`;
    correctCounter = 0;
    mistakeCounter = 0;
    correct.textContent = correctCounter;
    mistake.textContent = mistakeCounter;
    answer.textContent = "";
    chosenArr = null;
    return;
  }

  if (parseInt(answer.textContent) == Math.pow(chosenArr[numberIndex], 2)) {
    numberIndex += 1;
    exampleNumber.textContent = `${chosenArr[numberIndex]}`;
    answer.textContent = "";
    correctCounter++;
    correct.textContent = correctCounter;
  } else {
    numberIndex += 1;
    exampleNumber.textContent = `${chosenArr[numberIndex]}`;
    answer.textContent = "";
    mistakeCounter++;
    mistake.textContent = mistakeCounter;
  }
});

buttonsContainer.addEventListener("click", (event) => {
  const element = event.target.closest(".numberButton");

  answer.textContent += element.textContent;
});

cancelNumber.addEventListener("click", () => {
  answer.textContent = answer.textContent.slice(0, -1);
});