const clickSound = new Audio("./CLICK1.wav");

const wrap = document.querySelector("#wrap");
const setting = wrap.querySelector("#setting");
const [white, black] = wrap.querySelectorAll(".timer");
const whiteSpan = white.querySelector("span");
const blackSpan = black.querySelector("span");
const timeDiv = setting.querySelector(".time");
const plusDiv = setting.querySelector(".plus");
const minusDiv = setting.querySelector(".minus");
const pauseDiv = setting.querySelector(".pause");
const pauseIcon = pauseDiv.querySelector("i");
const resetDiv = setting.querySelector(".reset");
const whiteMoveP = white.querySelector("p");
const blackMoveP = black.querySelector("p");

let isStarted = false;
let blackTurn = false;
let whiteTurn = false;
let initTime;
let blackTime;
let whiteTime;
let blackInterval;
let whiteInterval;
let isPaused = false;
let nowTurn;
let whiteMove = 0;
let blackMove = 0;

const showTime = (span, time) => {
  let min = Math.floor(Math.abs(time) / 60);
  let sec = Math.abs(time) % 60;
  console.log(sec);
  if (sec < 10) {
    sec = "0" + sec;
  }
  if (min < 10) {
    min = "0" + min;
  }

  if (time < 0) {
    span.innerHTML = `- ${min} : ${sec}`;
  } else {
    span.innerHTML = `${min} : ${sec}`;
  }
};

const onClickWhite = (e) => {
  if (isPaused) return;
  if (blackTurn) return;
  if (!isStarted) {
    timeDiv.classList.remove("whiteColor");
    timeDiv.classList.add("gray");
    pauseDiv.classList.remove("gray");
    pauseDiv.classList.add("whiteColor");

    blackTime = initTime;
    whiteTime = initTime;
    isStarted = true;
  }
  clickSound.currentTime = 0;
  clickSound.play();
  whiteTurn = false;
  blackTurn = true;
  white.classList.remove("whiteBorder");
  black.classList.add("whiteBorder");
  whiteMove += 1;
  whiteMoveP.innerHTML = `${whiteMove} move`;
  whiteInterval && clearInterval(whiteInterval);
  blackInterval = setInterval(() => {
    blackTime--;
    showTime(blackSpan, blackTime);
  }, 1000);
};

const onClickBlack = (e) => {
  if (isPaused) return;
  if (whiteTurn) return;
  if (!isStarted) {
    timeDiv.classList.remove("whiteColor");
    timeDiv.classList.add("gray");
    pauseDiv.classList.remove("gray");
    pauseDiv.classList.add("whiteColor");
    whiteTime = initTime;
    blackTime = initTime;
    isStarted = true;
  }
  clickSound.currentTime = 0;
  clickSound.play();
  whiteTurn = true;
  blackTurn = false;
  white.classList.add("whiteBorder");
  black.classList.remove("whiteBorder");
  blackMove += 1;
  blackMoveP.innerHTML = `${blackMove} move`;
  blackInterval && clearInterval(blackInterval);
  whiteInterval = setInterval(() => {
    whiteTime--;
    showTime(whiteSpan, whiteTime);
  }, 1000);
};

const onClickPlus = () => {
  if (isStarted) return;
  initTime += 60;
  showTime(whiteSpan, initTime);
  showTime(blackSpan, initTime);
};

const onClickMinus = () => {
  if (isStarted) return;
  if (initTime <= 60) return;
  initTime -= 60;
  showTime(whiteSpan, initTime);
  showTime(blackSpan, initTime);
};

const onClickPause = () => {
  if (!isStarted) return;
  if (!isPaused) {
    isPaused = true;
    if (whiteTurn) {
      nowTurn = "white";
      clearInterval(whiteInterval);
      clearInterval(blackInterval);
    } else if (blackTurn) {
      nowTurn = "black";
      clearInterval(blackInterval);
      clearInterval(whiteInterval);
    }
    pauseIcon.className = "fas fa-play center";
  } else {
    isPaused = false;
    if (nowTurn === "white") {
      whiteInterval = setInterval(() => {
        whiteTime--;
        showTime(whiteSpan, whiteTime);
      }, 1000);
    } else {
      blackInterval = setInterval(() => {
        blackTime--;
        showTime(blackSpan, blackTime);
      }, 1000);
    }
    pauseIcon.className = "fas fa-pause center";
  }
};

const onClickReset = () => {
  timeDiv.className = "time whiteColor";
  pauseDiv.className = "pause gray";
  pauseIcon.className = "fas fa-pause center";
  white.classList.remove("whiteBorder");
  black.classList.remove("whiteBorder");
  nowTurn = "";
  isStarted = false;
  isPaused = false;
  whiteTurn = false;
  blackTurn = false;
  initTime = 600;
  whiteMove = 0;
  blackMove = 0;
  whiteMoveP.innerHTML = `${whiteMove} move`;
  blackMoveP.innerHTML = `${blackMove} move`;
  whiteInterval && clearInterval(whiteInterval);
  blackInterval && clearInterval(blackInterval);
  showTime(whiteSpan, initTime);
  showTime(blackSpan, initTime);
};

function init() {
  black.addEventListener("click", onClickBlack);
  white.addEventListener("click", onClickWhite);
  plusDiv.addEventListener("click", onClickPlus);
  minusDiv.addEventListener("click", onClickMinus);
  pauseDiv.addEventListener("click", onClickPause);
  resetDiv.addEventListener("click", onClickReset);
  onClickReset();
}
init();
