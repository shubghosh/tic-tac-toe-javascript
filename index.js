/**
* This program is a boilerplate code for the standard tic tac toe game
* Here the “box” represents one placeholder for either a “X” or a “0”
* We have a 2D array to represent the arrangement of X or O is a grid
* 0 -> empty box
* 1 -> box with X
* 2 -> box with O
*
* Below are the tasks which needs to be completed:
* Imagine you are playing with the computer so every alternate move should be done by the computer
* X -> player
* O -> Computer
*
* Winner needs to be decided and has to be flashed
*
* Extra points will be given for approaching the problem more creatively
* 
*/

//var boxes;
var grid = [];
let gameWon = null;
let humanPlayer = 'X';
let computerPlayer ='O';
const winCombos = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[6, 4, 2]
]

const boxes = document.querySelectorAll('.cell');
initializeGrid();

function initializeGrid() {
	document.querySelector(".endgame").style.display = "none";
    grid = Array.from(Array(9).keys());
	for (var i = 0; i < boxes.length; i++) {
		boxes[i].innerText = '';
		boxes[i].style.removeProperty('background-color');
		boxes[i].addEventListener('click', onBoxClick, false);
	}
}

function onBoxClick(square) {
	if (typeof grid[square.target.id] == 'number') {
		turn(square.target.id, humanPlayer)
		if (!checkTie()) turn(bestSpot(), computerPlayer);
	}
}

function turn(squareId, player) {
	grid[squareId] = player;
	document.getElementById(squareId).innerText = player;
    gameWon = checkWin(grid, player)
	if (gameWon) gameOver(gameWon)
}

function checkWin(board, player) {
    let plays = board.reduce((a, e, i) => 
		(e === player) ? a.concat(i) : a, []);
    let gameWon = null;
	for (let [index, win] of winCombos.entries()) {
		if (win.every(elem => plays.indexOf(elem) > -1)) {
            gameWon = {index: index, player: player};
			break;
		}
	}
	return gameWon;
}

function gameOver(gameWon) {
	for (let index of winCombos[gameWon.index]) {
		document.getElementById(index).style.backgroundColor =
			gameWon.player == humanPlayer ? "blue" : "red";
	}
	for (var i = 0; i < boxes.length; i++) {
		boxes[i].removeEventListener('click', onBoxClick, false);
	}
	declareWinner(gameWon.player == humanPlayer ? "You win!" : "You lose.");
}

function declareWinner(who) {
	document.querySelector(".endgame").style.display = "block";
	document.querySelector(".endgame .text").innerText = who;
}

function emptySquares() {
	return grid.filter(s => typeof s == 'number');
}

function bestSpot() {
	return emptySquares()[0];
}

function checkTie() {
	if (emptySquares().length == 0) {
		for (var i = 0; i < boxes.length; i++) {
			boxes[i].style.backgroundColor = "green";
			boxes[i].removeEventListener('click', onBoxClick, false);
		}
		declareWinner("Tie Game!")
		return true;
	}
	return false;
}