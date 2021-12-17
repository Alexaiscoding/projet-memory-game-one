import { images } from "./images.js";

const board = document.getElementById("board");
const movesElement = document.querySelector(".display-moves .count");
const scoreElement = document.querySelector(".result");
const nameElement = document.querySelector(".name");

let playerName;
let boardIsLocked = false;
let score = 0;
let moves = 0;

function generateCard(image) {
  const div = document.createElement("div");
  div.classList.add("memory-card");
  const tpl = `
    <img class="front-face" src="./img/image-frontface.png" alt="image1" />
    <img class="back-face" src="./img/${image}" alt="front-image" />
`;
  div.innerHTML = tpl;
  return div;
}

function appendCardToBoard(cards) {
  cards.forEach((card) => {
    board.appendChild(card);
  });
}

function shuffleImages(images) {
  let m = images.length,
    i,
    mem;

  while (m) {
    i = Math.floor(Math.random() * m--);
    mem = images[m];
    images[m] = images[i];
    images[i] = mem;
  }
  return images;
}

function flipCard() {
  moves++;
  if (this.classList.contains("locked") || boardIsLocked) return;
  //console.log("> who is this>", this)

  // flip de front-face à back-face
  this.classList.toggle("flip");
  const flip1 = document.querySelectorAll(".memory-card.flip:not(.locked)");

  if (flip1.length === 2) {
    boardIsLocked = true;
    if (matchChecked(flip1[0], flip1[1])) {
      score++;
      flip1[0].classList.add("locked");
      flip1[1].classList.add("locked");
    }
    
  }
  displayInfos();
}

function displayInfos() {
  movesElement.innerHTML = moves;
  scoreElement.innerHTML = score;
}

function displayName(name) {
  nameElement.textContent = name;
}

function matchChecked(card1, card2) {
  const firstOpenCard = card1.querySelector(".back-face");
  const secondOpenCard = card2.querySelector(".back-face");

  if (firstOpenCard.src === secondOpenCard.src) {
    boardIsLocked = false;
    return true;
  } else {
    setTimeout(() => {
      firstOpenCard.closest(".memory-card").classList.remove("flip");
      secondOpenCard.closest(".memory-card").classList.remove("flip");
      boardIsLocked = false;
    }, 1500);
  }
}

function startGame() {
  playerName = "toto"
  // playerName = prompt("players name ?")
  const shuffled = shuffleImages(images);
  const cards = shuffled.map(generateCard);
  
  score = 0;
  moves = 0;

  displayName(playerName);
  appendCardToBoard(cards);
  cards.forEach((card) => card.addEventListener("click", flipCard));
}

startGame();
