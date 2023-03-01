const board = document.querySelector('.board');
const boxes = document.querySelectorAll('.box');
const resetBtn = document.querySelector('#reset');
const resetAllBtn = document.querySelector('#resetAll');
const start = document.querySelector('.start');
const play1 = document.querySelector('.player1');
const play2 = document.querySelector('.player2');
const result = document.querySelector('.result');
const FinalresultPlayer1 = document.querySelector('.score-player1');
const FinalresultPlayer2 = document.querySelector('.score-player2');
let round;
let player1;
let player2;
let side = [];
resultPlayer1 = [];
resultPlayer2 = [];
let scorePlayer1 = 0;
let scorePlayer2 = 0;
let finalScorePlayer1 = 0;
let finalScorePlayer2 = 0;
let clickCounter = 0;
const combinate = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6],
];
const Start = () => {
	const change = Math.floor(Math.random() * 2);
	player1 = '<i class="fa-solid fa-x"></i>';
	play1.innerHTML = `Gracz 1: ${player1}`;
	player2 = '<i class="fa-solid fa-o"></i>';
	play2.innerHTML = `Gracz 2: ${player2}`;
	start.style.visibility='visible'
	if (change === 0) {
		round = 0;
		play1.classList.add('active');
		play2.classList.remove('active');
		side = resultPlayer1;
		start.innerHTML = 'Zaczyna Gracz 1'
	} else {
		round = 1;
		play1.classList.remove('active');
		play2.classList.add('active');
		side = resultPlayer2;
		start.innerHTML = 'Zaczyna Gracz 2'
	}
};

const winner = (side) => {
	for (let j = 0; j < combinate.length; j++) {
		for (let i = 0; i < side.length; i++) {
			if (combinate[j].includes(resultPlayer1[i]) === true) {
				scorePlayer1++;
			} else if (combinate[j].includes(resultPlayer2[i]) === true) {
				scorePlayer2++;
			} else {
				continue;
			}
			if (scorePlayer1 == 3) {
				result.style.visibility = 'visible';
				result.innerHTML = 'Wygrywa Gracz 1!';
				finalScorePlayer1++;
				FinalresultPlayer1.innerHTML = `${finalScorePlayer1}`;
				play2.classList.remove('active');
				play1.classList.add('active');
				board.classList.add('disabled');

				break;
			} else if (scorePlayer2 == 3) {
				result.style.visibility = 'visible';
				result.innerHTML = 'Wygrywa Gracz 2!';
				finalScorePlayer2++;
				FinalresultPlayer2.innerHTML = `${finalScorePlayer2}`;
				play1.classList.remove('active');
				play2.classList.add('active');
				board.classList.add('disabled');
				break;
			} else {
				continue;
			}
		}
		scorePlayer1 = 0;
		scorePlayer2 = 0;
	}
};

const changeSide = (box) => {
	start.style.visibility='hidden'
	if (round % 2 == 0) {
		box.innerHTML = player1;
		play1.classList.remove('active');
		play2.classList.add('active');
		resultPlayer1.push(parseInt(box.getAttribute('id')));
	} else {
		box.innerHTML = player2;
		play2.classList.remove('active');
		play1.classList.add('active');
		resultPlayer2.push(parseInt(box.getAttribute('id')));
	}
};
const remis = (clickCounter) => {
	if (clickCounter == 9 && result.innerHTML === '') {
		result.style.visibility = 'visible';
		result.innerHTML = 'Remis';
	} else {
		return;
	}
};
boxes.forEach((box) => {
	box.addEventListener('click', (e) => {
		if (box.innerHTML === '') {
			changeSide(box);
			winner(side);
			clickCounter++;
			round++;
		} else {
			return;
		}
		remis(clickCounter);
	});
});

const reset = () => {
	boxes.forEach((box) => {
		box.innerHTML = '';
	});
	board.classList.remove('disabled');
	resultPlayer1 = [];
	resultPlayer2 = [];
	scorePlayer1 = 0;
	scorePlayer2 = 0;
	round = 0;
	clickCounter=0;
	result.innerHTML = '';
	result.style.visibility = 'hidden';
	play2.classList.remove('active');
	play1.classList.add('active');
	Start();
};
const resetAll = () => {
	reset()
	finalScorePlayer1 = 0;
	finalScorePlayer2 = 0;
	FinalresultPlayer1.innerHTML = `0`;
	FinalresultPlayer2.innerHTML = `0`;
};
resetBtn.addEventListener('click', reset);
resetAllBtn.addEventListener('click', resetAll);
window.addEventListener('keyup', (e) => {
	if (e.key === 'Enter') {
		reset();
	}
});
Start();
