const rules = document.querySelector(".rules");
const close = document.getElementById("close");
const rulesBtn = document.getElementById("rules");
const nextBtn = document.getElementById("next");
const frame1 = document.querySelector(".frame-1");
const scoreBoard = document.querySelector(".score-board");

//images
const rock = document.querySelector(".game-area>img");
const scissors = document.querySelector(".game-area img:nth-child(2)");
const paper = document.querySelector(".game-area img:nth-child(3)");
const game = document.querySelector(".game");

//frame-2 divs
const frame2 = document.createElement("div");
frame2.classList.add("frame-2");
let choiceDiv = document.createElement("div");
choiceDiv.classList.add("choices");

//win or loose display
let msgDiv = document.createElement("div");
msgDiv.classList.add("message-div");
let msg = document.createElement("p");
msg.classList.add("win-message");
let playAgainBtn = document.createElement("button");
playAgainBtn.classList.add("play-again");
let replayBtn = document.createElement("button");
replayBtn.classList.add("replay");

//scores
let userScore = 0;
let pcScore = 0;
let userScoreEle = document.getElementById("user-score");
let pcScoreEle = document.getElementById("computer-score");

//choice divs
let pcChoiceDiv = document.createElement("div");
pcChoiceDiv.classList.add("pc-choice-div");
let userChoiceDiv = document.createElement("div");
userChoiceDiv.classList.add("user-choice-div");

//frame 3 - winner card
let frame3 = document.querySelector(".frame-3");

let images = [rock, paper, scissors];
let compSelect = "";
let userSelect = "";
rules.style.display = "none";

frame2.style.display = "none";
frame1.parentNode.insertBefore(frame2, frame1.nextSibling);

//main funtion
userChoice();

function computerChoice() {
  randomIndex = Math.floor(Math.random() * 3);
  compSelect = images[randomIndex];

  //creating p tag for "pc picked"
  let specifier = document.createElement("p");
  let clone = compSelect.cloneNode(true);
  specifier.classList.add("pc-picked"); //p tag class name
  specifier.innerHTML = "PC Picked"; // creeated p tag
  pcChoiceDiv.appendChild(specifier); //insert p tag in userChoice div
  pcChoiceDiv.appendChild(clone);
  choiceDiv.appendChild(pcChoiceDiv);
}

function userChoice() {
  images.forEach((img) => {
    img.addEventListener("click", function handler() {
      userSelect = img;

      frame1.style.display = "none";
      frame2.style.display = "block";

      choiceDiv.innerHTML = "";
      msgDiv.innerHTML = "";
      pcChoiceDiv.innerHTML = "";
      userChoiceDiv.innerHTML = "";

      //creating p tag for "user picked"
      let specifier = document.createElement("p");
      let clone = userSelect.cloneNode(true);
      specifier.classList.add("user-picked");
      specifier.innerHTML = "You Picked";
      userChoiceDiv.appendChild(specifier);
      userChoiceDiv.appendChild(clone);
      computerChoice();
      choiceDiv.appendChild(userChoiceDiv);
      choiceDiv.insertBefore(msgDiv, userChoiceDiv);

      frame2.appendChild(choiceDiv);

      checkWinner();
    });
  });
}

function checkWinner() {
  let winner = "";
  let computer = compSelect.dataset.framework;
  let user = userSelect.dataset.framework;
  if (computer === "paper-icon" && user === "rock-icon") {
    winner = "computer";
  } else if (computer === "rock-icon" && user === "scissors-icon") {
    winner = "computer";
  } else if (computer === "scissors-icon" && user === "paper-icon") {
    winner = "computer";
  } else if (computer === user) {
    winner = "Tie";
  } else {
    winner = "user";
  }

  msgDiv.innerHTML = "";

  if (winner === "user") {
    const userImg = userChoiceDiv.querySelector("img");

    // Create wrapper div
    const wrapper = document.createElement("div");
    wrapper.classList.add("winner-animate");

    // Insert wrapper before replacing
    userImg.parentNode.replaceChild(wrapper, userImg);
    wrapper.appendChild(userImg);
    userScore++;
    userScoreEle.innerHTML = userScore;
    saveScores();

    msg.innerHTML = "YOU WIN AGAINST PC";
    playAgainBtn.textContent = "Play Again";
    nextBtn.style.display = "block";
    msgDiv.appendChild(msg);
    msgDiv.appendChild(playAgainBtn);
    choiceDiv.insertBefore(msgDiv, userChoiceDiv);

    playAgainBtn.addEventListener("click", resetGame);
  } else if (winner === "computer") {
    const pcImg = pcChoiceDiv.querySelector("img");

    const wrapper = document.createElement("div");
    wrapper.classList.add("winner-animate");

    pcImg.parentNode.replaceChild(wrapper, pcImg);
    wrapper.appendChild(pcImg);
    pcScore++;
    pcScoreEle.innerHTML = pcScore;
    saveScores();

    msg.innerHTML = "YOU LOST AGAINST PC";
    playAgainBtn.textContent = "Play Again";
    msgDiv.appendChild(msg);
    msgDiv.appendChild(playAgainBtn);
    choiceDiv.insertBefore(msgDiv, userChoiceDiv);
    playAgainBtn.addEventListener("click", resetGame);
  } else {
    msg.innerHTML = "TIE UP";
    replayBtn.textContent = "Replay";
    msgDiv.appendChild(msg);
    msgDiv.appendChild(replayBtn);
    choiceDiv.insertBefore(msgDiv, userChoiceDiv);
    replayBtn.addEventListener("click", resetGame);
  }
}

function resetGame() {
  pcChoiceDiv.innerHTML = "";
  userChoiceDiv.innerHTML = "";
  msgDiv.innerHTML = "";
  choiceDiv.innerHTML = "";

  compSelect = "";
  userSelect = "";
  scoreBoard.style.display = "flex";
  frame1.style.display = "block";
  frame2.style.display = "none";
  frame3.style.display = "none";

  document
    .querySelectorAll(".winner-animate")
    .forEach((img) => img.classList.remove("winner-animate"));
}
//rules button close fuctionality
close.addEventListener("click", () => {
  rules.style.display = "none";
});

//reopen the closed rules block
rulesBtn.addEventListener("click", () => {
  rules.style.display = "block";
});

nextBtn.addEventListener("click", () => {
  scoreBoard.style.display = "none";
  frame1.style.display = "none";
  frame2.style.display = "none";
  frame3.style.display = "block";
  nextBtn.style.display = "none";
  const playAgainBtn2 = document.querySelector(".play-again-frame-3");
  playAgainBtn2.addEventListener("click", resetGame);
});

function saveScores() {
  localStorage.setItem("userScore", userScore);
  localStorage.setItem("pcScore", pcScore);
}

window.addEventListener("load", () => {
  const savedUserScores = localStorage.getItem("userScore");
  const savedPcScores = localStorage.getItem("pcScore");

  if (savedUserScores !== null) {
    userScore = parseInt(savedUserScores);
    userScoreEle.textContent = userScore;
  }

  if (savedPcScores !== null) {
    pcScore = parseInt(savedPcScores);
    pcScoreEle.textContent = pcScore;
  }
});
