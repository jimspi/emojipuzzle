const icons = ['😀','🎉','🚀','🌟','🍀','🐱','🎈','🌈'];
let grid = []; 
let firstCard = null;
let secondCard = null;
let lockBoard = false;

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
  lockBoard = true;
  if (firstCard.dataset.icon === secondCard.dataset.icon) {
    resetTurn();
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

// Modal logic
const modal = document.getElementById('howToModal');
const btn = document.getElementById('howToBtn');
const span = document.querySelector('.close');
btn.onclick = () => modal.style.display = 'block';
span.onclick = () => modal.style.display = 'none';
window.onclick = (e) => { if (e.target == modal) modal.style.display = 'none'; }

document.addEventListener('DOMContentLoaded', initGame);
