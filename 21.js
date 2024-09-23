/* eslint-disable */

let readline = require('readline-sync');

const SUITS = ['D', 'H', 'C', 'S'];
const CARDS = [
  'A',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  'J',
  'Q',
  'K',
];

function initializeDeck() {
  let deck = [];
  for (suit in SUITS) {
    for (card in CARDS) {
      deck.push([SUITS[suit], CARDS[card]]);
    }
  }
  return deck;
}

function deal(deck) {
  let playerHand = [getCard(deck), getCard(deck)];
  let dealerHand = [getCard(deck), getCard(deck)];
  return [playerHand, dealerHand];
}

function getCard(deck) {
  let randomIndex = Math.floor(Math.random() * deck.length);
  let card = deck.splice(randomIndex, 1)[0];
  return card;
}

function formatCard(card) {
  return `${card[1]}${card[0]}`;
}

function displayHands(playerHand, dealerHand, flipped) {
  console.log(
    `Dealer shows ${
      flipped
        ? dealerHand.map(card => formatCard(card))
        : formatCard(dealerHand[0])
    }`
  );
  console.log(`Player has ${playerHand.map(card => formatCard(card))}`);
}

function hit(hand, deck) {
  console.log('Hit!');
  return hand.push(getCard(deck));
}

function calculateHand(hand) {
  return hand
    .map(card => card[1])
    .reduce((sum, current) => {
      if (Number(current) === Number(current)) {
        return (sum += Number(current));
      } else if (current === 'A') {
        return (sum += 11);
      } else {
        return (sum += 10);
      }
    }, 0);
}

function checkForBust(hand) {
  let handTotal = calculateHand(hand);
  return handTotal > 21;
}

function dealerLogic(dealerHand, deck) {
  while (calculateHand(dealerHand) < 17) {
    hit(dealerHand, deck);
  }
}

function playAgain() {
  let answer = readline
    .question('Play another hand? Y/N\n')
    .trim()
    .toLowerCase();
  if (answer !== 'y') return false;
  return true;
}

while (true) {
  let deck = initializeDeck();
  let [playerHand, dealerHand] = deal(deck);
  displayHands(playerHand, dealerHand);
  while (true) {
    let action = readline.question('Hit or stay?\n');
    if (action === 'stay') break;
    hit(playerHand, deck);
    displayHands(playerHand, dealerHand);
    if (checkForBust(playerHand)) {
      console.log(`You bust!`);
      break;
    }
  }
  displayHands(playerHand, dealerHand, 1);
  dealerLogic(dealerHand, deck);
  displayHands(playerHand, dealerHand, 1);

  if (!playAgain()) break;
}

// while (true) {
//   let deck = shuffle(initializeDeck());
//   deal(deck);
//   playPlayerHand()
//   playComputerHand();
//   displayHands();
//   calculateWinner();
//   if (!playAgain()) break;
// }
