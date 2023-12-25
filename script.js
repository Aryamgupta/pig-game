'use strict';
// stroring into the variables
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnhold = document.querySelector('.btn--hold');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

let scores, currentScore, activePlayer, playing, player01Name, player02Name;

const init = function () {
  player1El.classList.add('player--active');
  player01Name = prompt('Enter the name of player number 1');
  player02Name = prompt('Enter the name of player number 2');
  document.getElementById('name--0').textContent = player01Name;
  document.getElementById('name--1').textContent = player02Name;

  playing = true;
  currentScore = 0;
  activePlayer = 0;
  scores = [0, 0];
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  diceEl.classList.add('hidden');
};
init();

// intial conditions

score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

// switch user function

const switchUser = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;

  activePlayer = activePlayer === 0 ? 1 : 0;

  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//rolling funtion

btnRoll.addEventListener('click', function () {
  if (playing) {
    //random chossing
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);
    // diplay of dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    // if one arises
    if (dice !== 1) {
      //store into current score
      currentScore += dice;
      // display of current score
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchUser();
    }
  }
});

//hold butn funtionality

btnhold.addEventListener('click', function () {
  if (playing) {
    // add current score to score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // check if it is not 100
    if (scores[activePlayer] >= 50) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      if (activePlayer === 0) alert(`${player01Name}  wins the game`);
      else alert(`${player02Name}  wins the game`);
    }

    //swtich playe
    switchUser();
  }
});

// new game btn funtion

btnNew.addEventListener('click', init);
