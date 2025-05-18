const icons = ['😀','🎉','🚀','🌟','🍀','🐱','🎈','🌈'];
let grid = []; 
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let moveCount = 0;
let matchesFound = 0;

// Duplicate and shuffle
function initGame() {
  const doubled = [...icons, ...icons];
  grid = doubled.sort(() => Math.random() - 0.5);
  const gameBoard = document.getElementById('game');
  gameBoard.innerHTML = '';
  grid.forEach((icon, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.icon = icon;
    card.dataset.index = index;
    card.addEventListener('click', flipCard);
    gameBoard.appendChild(card);
  });
}

// Flip logic
function flipCard() {
  if (lockBoard || this.classList.contains('flipped')) return;
  this.textContent = this.dataset.icon;
  this.classList.add('flipped');

  if (!firstCard) {
    firstCard = this;
    return;
  }
  secondCard = this;
  checkMatch();
}

function checkMatch() {
  moveCount++;
  lockBoard = true;
  if (firstCard.dataset.icon === secondCard.dataset.icon) {
    matchesFound++;
    resetTurn();
    if (matchesFound === icons.length) showCongrats();
  } else {
    setTimeout(() => {
      firstCard.textContent = '';
      secondCard.textContent = '';
      firstCard.classList.remove('flipped');
      secondCard.classList.remove('flipped');
      resetTurn();
    }, 1000);
  }
}

function resetTurn() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}

function showCongrats() {
  const modal = document.getElementById('congratsModal');
  document.getElementById('moveCountText').textContent =
    `It took you ${moveCount} moves.`;
  modal.style.display = 'block';
}

// Modal logic
const howToModal = document.getElementById('howToModal');
const howToBtn = document.getElementById('howToBtn');
const howToClose = document.querySelector('#howToModal .close');
howToBtn.onclick = () => howToModal.style.display = 'block';
howToClose.onclick = () => howToModal.style.display = 'none';

// Congrats modal close
const congratsModal = document.getElementById('congratsModal');
const congratsClose = document.getElementById('congratsClose');
congratsClose.onclick = () => congratsModal.style.display = 'none';

// Close on outside click
window.onclick = (e) => {
  if (e.target == howToModal) howToModal.style.display = 'none';
  if (e.target == congratsModal) congratsModal.style.display = 'none';
}

document.addEventListener('DOMContentLoaded', initGame);
document.getElementById('newGameBtn').addEventListener('click', () => {
  initGame();
});

