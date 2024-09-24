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

function shuffle(deck) {
  let shuffledDeck = [];
  for (let i = 0; i < 52; i++) {
    let randomIndex = Math.floor(Math.random() * deck.length);
    let card = deck.splice(randomIndex, 1)[0];
    shuffledDeck.push(card);
  }
  return shuffledDeck;
}

function deal(deck) {
  let playerHand = [getCard(deck), getCard(deck)];
  let dealerHand = [getCard(deck), getCard(deck)];
  return [playerHand, dealerHand];
}

function getCard(deck) {
  return deck.pop();
}

function formatCard(card) {
  return `${card[1]}${card[0]}`;
}

function displayHands(playerHand, dealerHand, flipped) {
  console.clear();
  console.log(
    `Dealer shows ${
      flipped
        ? dealerHand.map(card => formatCard(card))
        : formatCard(dealerHand[0])
    }`
  );
  console.log(
    `Player has ${playerHand.map(card => formatCard(card)).join(' ')}`
  );
}

function hit(hand, deck) {
  return hand.push(getCard(deck));
}

function calculateHand(hand) {
  let handTotal = hand
    .map(card => card[1])
    .reduce((sum, current) => {
      if (Number(current) === Number(current)) {
        return sum + Number(current);
      } else if (current === 'A') {
        return sum + 11;
      } else {
        return sum + 10;
      }
    }, 0);

  let aceCount = hand.filter(card => card[1] === 'A').length;
  while (handTotal > 21) {
    if (aceCount) {
      handTotal -= 10;
      aceCount -= 1;
    } else {
      break;
    }
  }
  return handTotal;
}

function checkForBust(hand) {
  return calculateHand(hand) > 21;
}

function dealerLogic(dealerHand, deck) {
  while (calculateHand(dealerHand) < 17) {
    hit(dealerHand, deck);
  }
}

function endGame(playerHand, dealerHand) {
  let playerHandTotal = calculateHand(playerHand);
  let dealerHandTotal = calculateHand(dealerHand);
  displayHands(playerHand, dealerHand, 1);
  console.log(
    `\nPlayer has ${playerHandTotal}. Dealer ${
      checkForBust(dealerHand) ? `busts!` : `has ${dealerHandTotal}.`
    }`
  );
  if (playerHandTotal > dealerHandTotal || dealerHandTotal > 21) {
    console.log('Player wins!');
  } else if (dealerHandTotal > playerHandTotal) {
    console.log('Dealer wins!');
  } else {
    console.log("It's a tie!");
  }
}

function playAgain() {
  let answer = readline
    .question('\nPlay another hand? Y/N\n')
    .trim()
    .toLowerCase();
  if (answer !== 'y') return false;
  return true;
}

while (true) {
  let deck = shuffle(initializeDeck());
  let [playerHand, dealerHand] = deal(deck);
  displayHands(playerHand, dealerHand);
  while (true) {
    let action;
    while (true) {
      action = readline.question('\n(H)it or (S)tay?\n').trim().toLowerCase();
      if (['s', 'h'].includes(action)) break;
      displayHands(playerHand, dealerHand);
      console.log("Invalid choice! Enter 'H' to hit or 'S' to stay.");
    }
    if (action === 's') break;
    hit(playerHand, deck);
    if (checkForBust(playerHand)) {
      console.clear();
      displayHands(playerHand, dealerHand);
      console.log('You bust! Dealer wins.');
      break;
    }
    displayHands(playerHand, dealerHand);
  }

  if (!checkForBust(playerHand)) {
    console.log('You stay!');
    displayHands(playerHand, dealerHand, 1);
    dealerLogic(dealerHand, deck);
    endGame(playerHand, dealerHand);
  }

  if (!playAgain()) break;
}
