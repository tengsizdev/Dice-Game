// BUTTON ELEMENTS
const btnRoll = document.querySelector('.btn--roll'),
	btnNew = document.querySelector('.btn--new'),
	btnHold = document.querySelector('.btn--hold');

// DICE IMAGE
const diceImg = document.querySelector('.dice');

// ELEMENTS
const scoreOne = document.getElementById('score--0'),
	scoreTwo = document.getElementById('score--1'),
	currentOne = document.getElementById('current--0'),
	currentTwo = document.getElementById('current--1'),
	playerOne = document.querySelector('.player--0'),
	playerTwo = document.querySelector('.player--1');

function togglePlay() {
	playerOne.classList.toggle('player--active');
	playerTwo.classList.toggle('player--active');
}

function isPlayerOneActive() {
	return playerOne.classList.contains('player--active');
}

function userRolls() {
	const randomNum = Math.floor(Math.random() * 6) + 1;
	diceImg.src = `./img/dice-${randomNum}.png`;

	if (randomNum === 1) {
		if (isPlayerOneActive()) {
			currentOne.textContent = 0;
		} else {
			currentTwo.textContent = 0;
		}
		togglePlay();
		return;
	}

	if (isPlayerOneActive()) {
		currentOne.textContent = Number(currentOne.textContent) + randomNum;
	} else {
		currentTwo.textContent = Number(currentTwo.textContent) + randomNum;
	}
}

function holdScore() {
	if (isPlayerOneActive()) {
		if (currentOne.textContent === '0') return;
		updateHold(scoreOne, currentOne, playerOne);
	} else{
		if (currentTwo.textContent === '0') return;
		updateHold(scoreTwo, currentTwo, playerTwo);
	}

	togglePlay();
}

function updateHold(score, current, player) {
	score.textContent = Number(score.textContent) + Number(current.textContent);
	current.textContent = 0;

	const count = Number(score.textContent);

	if (count >= 100) {
		player.classList.add('player--winner');
		btnRoll.disabled = true;
		btnHold.disabled = true;
	}
}

function newGame() {
	playerOne.classList.remove('player--winner');
	playerTwo.classList.remove('player--winner');
	playerTwo.classList.remove('player--active');
	playerOne.classList.add('player--active');

	scoreOne.textContent = 0;
	scoreTwo.textContent = 0;

	currentOne.textContent = 0;
	currentTwo.textContent = 0;

	btnRoll.removeAttribute('disabled');
	btnHold.removeAttribute('disabled');
}

btnRoll.addEventListener('click', userRolls);
btnHold.addEventListener('click', holdScore);
btnNew.addEventListener('click', newGame);