let readline = require('readline-sync');

const INITIAL_MARKER = ' ';
const HUMAN_MARKER = 'X';
const COMPUTER_MARKER = 'O';
const WINS_NEEDED = 2;
const WINNING_POSITIONS = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];

function displayBoard(board) {
  console.clear();

  console.log(`You are ${HUMAN_MARKER}. Computer is ${COMPUTER_MARKER}.`);

  console.log('');
  console.log('     |     |');
  console.log(`  ${board['1']}  |  ${board['2']}  |  ${board['3']}`);
  console.log('     |     |');
  console.log('-----+-----+-----');
  console.log('     |     |');
  console.log(`  ${board['4']}  |  ${board['5']}  |  ${board['6']}`);
  console.log('     |     |');
  console.log('-----+-----+-----');
  console.log('     |     |');
  console.log(`  ${board['7']}  |  ${board['8']}  |  ${board['9']}`);
  console.log('     |     |');
  console.log('');
}

function initializeBoard() {
  let board = {};

  for (let square = 1; square <= 9; square++) {
    board[String(square)] = INITIAL_MARKER;
  }

  return board;
}

function updateBoard(board, marker, choice) {
  board[choice] = marker;
}

function playerChoosesSquare(board) {
  let square = '';

  while (true) {
    square = readline
      .question(`Choose a square: ${joinOr(emptySquares(board))}\n`)
      .trim();

    if (emptySquares(board).includes(square)) {
      break;
    }
    console.log("Sorry that's not a valid square.");
  }
  updateBoard(board, HUMAN_MARKER, square);
}

function computerChooseSquares(board) {
  let square = detectThreat(board);
  console.log(square);
  if (!square) {
    let randomIndex = Math.floor(Math.random() * emptySquares(board).length);
    square = emptySquares(board)[randomIndex];
  }
  updateBoard(board, COMPUTER_MARKER, square);
}

function emptySquares(board) {
  return Object.keys(board).filter(key => board[key] === INITIAL_MARKER);
}

function boardFull(board) {
  return emptySquares(board).length === 0;
}

function detectWinner(board) {
  for (let line = 0; line < WINNING_POSITIONS.length; line++) {
    let [sq1, sq2, sq3] = WINNING_POSITIONS[line];
    if (
      board[sq1] === HUMAN_MARKER &&
      board[sq2] === HUMAN_MARKER &&
      board[sq3] === HUMAN_MARKER
    ) {
      return 'Player';
    }
    if (
      board[sq1] === COMPUTER_MARKER &&
      board[sq2] === COMPUTER_MARKER &&
      board[sq3] === COMPUTER_MARKER
    ) {
      return 'Computer';
    }
  }
  return null;
}

function someoneWon(board) {
  return !!detectWinner(board);
}

function joinOr(list, delimiter = ', ', word = 'or') {
  let length = list.length;
  if (length === 0) {
    return '';
  } else if (length === 1) {
    return list[0];
  } else if (length === 2) {
    return list.join(` ${word} `);
  } else {
    return `${list
      .slice(0, -1)
      .join(delimiter)}${delimiter}${word} ${list.slice(-1)}`;
  }
}

function displayScore(score) {
  console.log(
    `This game is first to ${WINS_NEEDED}.\nCurrent number of wins:\nPlayer: ${score.Player} Computer: ${score.Computer}`
  );
}

function detectThreat(board) {
  for (let line = 0; line < WINNING_POSITIONS.length; line++) {
    let [sq1, sq2, sq3] = WINNING_POSITIONS[line];

    let playerPositions = Object.keys(board)
      .filter(key => board[key] === HUMAN_MARKER)
      .map(number => Number(number));

    if (
      playerPositions.filter(
        position => position === sq1 || position === sq2 || position === sq3
      ).length === 2
    ) {
      let threatenedSquare = WINNING_POSITIONS[line].filter(
        sq => board[sq] !== HUMAN_MARKER
      )[0];
      if (board[threatenedSquare] === ' ') return threatenedSquare;
    }
  }
  return null;
}

while (true) {
  let score = { Player: 0, Computer: 0 };
  while (true) {
    let board = initializeBoard();

    while (true) {
      displayBoard(board);
      playerChoosesSquare(board);
      if (someoneWon(board) || boardFull(board)) break;

      computerChooseSquares(board);
      if (someoneWon(board) || boardFull(board)) break;
    }

    console.clear();
    displayBoard(board);

    if (someoneWon(board)) {
      let winner = detectWinner(board);
      score[winner] += 1;

      if (score[winner] === WINS_NEEDED) {
        console.log(`${winner} wins the match!`);
        break;
      } else {
        console.log(`${winner} won!`);
        displayScore(score);
      }

      while (true) {
        if (
          readline.question('\nEnter any key to continue to the next round.\n')
        )
          break;
      }
    } else {
      console.log("It's a tie!");
    }
  }

  let answer = readline.question('Play again? (y or n)\n').trim();
  if (answer[0] !== 'y') break;
}

console.clear();
console.log('Thanks for playing Tic Tac Toe!');
