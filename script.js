const scoreElement = document.querySelector(".js-score");
const movesElement = document.querySelector(".js-moves");
const resultElement = document.querySelector(".js-result");
const autoRunElement = document.querySelector(".autoRun");

let computerMove = "";
let result = "";

// console.log(JSON.parse(localStorage.getItem('score')));
// const score ={
//     wins: 0,
//     loses: 0,
//     ties: 0
// }
let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  loses: 0,
  ties: 0,
};
// **scoree === null => !score**
// if(!score){
//     score = {
//         wins: 0,
//         loses: 0,
//         ties: 0
//     };
// }

updateScoreElement();

function pickComputerMove() {
  const randomNumber = Math.random();
  if (randomNumber > 0 && randomNumber < 1 / 3) {
    computerMove = "Rock";
  } else if (randomNumber > 1 / 3 && randomNumber < 2 / 3) {
    computerMove = "Paper";
  } else if (randomNumber > 2 / 3 && randomNumber < 1) {
    computerMove = "Scissors";
  }
}
function pickResult(move) {
  localStorage.setItem("score", JSON.stringify(score));

  updateScoreElement();
  updateResult();
  updateMove(move);
}
function updateScoreElement() {
  scoreElement.innerHTML = `Wins: ${score.wins} Loses: ${score.loses} Ties: ${score.ties}`;
}
function updateResult() {
  resultElement.innerHTML = `${result}.`;
}
function updateMove(yourMove) {
  movesElement.innerHTML = 
  `<div class="movesDiv">
  <img src="img/hand-${yourMove}.png" class="me"> 
  <img src="img/hand-${computerMove}.png" class="movesImg cpu">.
  </div>`;
}
function resetSandM() {
  movesElement.innerHTML = ``;
  resultElement.innerHTML = ``;
}

let isAutoRun = false;
let intervalId;

function autoRun(){
  if(!isAutoRun){
    intervalId = setInterval(() => {
      const moves = ["Rock", "paper", "Scissors"];
      const randomIndex = Math.floor(Math.random()*3);
      const playerMove = moves[randomIndex];
  
      pickComputerMove();
      playGame(playerMove);
      pickResult(playerMove);
    }, 1000);
    isAutoRun = true;
  } else{
    clearInterval(intervalId);
    isAutoRun = false;
  }
  if(isAutoRun){
    autoRunElement.innerHTML = "Stop autoRun";
  }else{
    autoRunElement.innerHTML = "Start autoRun"
  }
}

function playGame(playerMove) {
  if (playerMove === "Rock") {
    if (computerMove == "Rock") {
      result = "Tie";
    } else if (computerMove == "Scissors") {
      result = "You Won";
    } else if (computerMove == "Paper") {
      result = "You Lose";
    }
  } else if (playerMove === "Paper") {
    if (computerMove === "Paper") {
      result = "Tie";
    } else if (computerMove === "Rock") {
      result = "You Won";
    } else if (computerMove === "Scissors") {
      result = "You Lose";
    }
  } else if (playerMove === "Scissors") {
    if (computerMove === "Scissors") {
      result = "Tie";
    } else if (computerMove === "Paper") {
      result = "You Won";
    } else if (computerMove === "Rock") {
      result = "You Lose";
    }
  }

  if (result === "You Won") {
    score.wins += 1;
  } else if (result === "You Lose") {
    score.loses += 1;
  } else if (result === "Tie") {
    score.ties += 1;
  }
}

function rock() {
  pickComputerMove();
  playGame("Rock");
  pickResult("Rock");
}

function paper() {
  pickComputerMove();
  playGame("Paper");
  pickResult("Paper");
}

function scissors() {
  pickComputerMove();
  playGame("Scissors");
  pickResult("Scissors");
}

function reset() {
  score.wins = 0;
  score.loses = 0;
  score.ties = 0;
  resetSandM();
  updateScoreElement();
  console.log("reset score");
  localStorage.removeItem("score");
}
