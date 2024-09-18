/* eslint-disable */

/*

Problem

Determine if 2 of the squares in a winning line are controlled by the human with an empty spot in the third square. 
In case of this, return the empty square.

Example:

detectThreat({ 1: 'X', 2: 'X' }); // 3

Data

The board object. The nested array listing the winning positions. 

A
Declare and initialize an Array that contains the human squares
Iterate through the winning positions and see if any of them have 2 matches with human controlled squares
For any that are, check if the other spot is empty
  If it is, return the square number that is empty

C

*/

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

// function detectThreat(board) {
//   let playerPositions = Object.keys(board)
//     .filter(key => board[key] === 'X')
//     .map(number => Number(number));

//   let threatenedLines = WINNING_POSITIONS.filter(lines => {
//     let matches = 0;
//     for (let index in lines) {
//       if (playerPositions.includes(lines[index])) {
//         matches += 1;
//       }
//     }
//     return matches === 2;
//   });

//   let threatenedSquare;

//   threatenedLines.forEach(line => {
//     for (index = 0; index < 3; index++) {
//       let square = line[index];
//       if (!board[square]) {
//         threatenedSquare = square;
//       }
//     }
//   });
//   return threatenedSquare;
// }

function detectThreat(board) {
  for (let line = 0; line < WINNING_POSITIONS.length; line++) {
    let [sq1, sq2, sq3] = WINNING_POSITIONS[line];

    console.log(sq1, sq2, sq3);

    let playerPositions = Object.keys(board)
      .filter(key => board[key] === 'X')
      .map(number => Number(number));

    console.log(playerPositions);
    if (
      playerPositions.filter(
        position => position === sq1 || position === sq2 || position === sq3
      ).length === 2
    ) {
      return WINNING_POSITIONS[line].filter(sq => board[sq] === '')[0];
    }
  }
  return null;
}

// function detectWinner(board) {
//   for (let line = 0; line < WINNING_POSITIONS.length; line++) {
//     let [sq1, sq2, sq3] = WINNING_POSITIONS[line];
//     if (
//       board[sq1] === HUMAN_MARKER &&
//       board[sq2] === HUMAN_MARKER &&
//       board[sq3] === HUMAN_MARKER
//     ) {
//       return 'Player';
//     }
//     if (
//       board[sq1] === COMPUTER_MARKER &&
//       board[sq2] === COMPUTER_MARKER &&
//       board[sq3] === COMPUTER_MARKER
//     ) {
//       return 'Computer';
//     }
//   }
//   return null;
// }

console.log(detectThreat({ 1: 'X', 2: 'X', 3: '' }));
