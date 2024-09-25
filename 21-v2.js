let readline = require('readline-sync');

const PLAY_TO = 21;
const DEALER_HITS_UNTIL = 17;

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
  for (let suit in SUITS) {
    for (let card in CARDS) {
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
  console.log(
    `Dealer shows ${
      flipped
        ? dealerHand.map(card => formatCard(card)).join(' ')
        : formatCard(dealerHand[0])
    }`
  );
  console.log(
    `Player has ${playerHand.map(card => formatCard(card)).join(' ')}\n`
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
  while (handTotal > PLAY_TO) {
    if (aceCount) {
      handTotal -= 10;
      aceCount -= 1;
    } else {
      break;
    }
  }
  return handTotal;
}

function dealerLogic(dealerHand, deck) {
  while (calculateHand(dealerHand) < DEALER_HITS_UNTIL) {
    hit(dealerHand, deck);
  }
}

function isBust(handTotal) {
  return handTotal > PLAY_TO;
}

function displayResult(playerHandTotal, dealerHandTotal) {
  if (isBust(playerHandTotal)) {
    console.log('You bust! Dealer wins!');
  } else {
    console.log(
      `Player has ${playerHandTotal}. Dealer ${
        dealerHandTotal > PLAY_TO ? `busts!` : `has ${dealerHandTotal}.`
      }`
    );
    if (playerHandTotal > dealerHandTotal || dealerHandTotal > PLAY_TO) {
      console.log('Player wins!');
    } else if (dealerHandTotal > playerHandTotal) {
      console.log('Dealer wins!');
    } else {
      console.log("It's a tie!");
    }
  }
}

function playAgain() {
  let answer;
  while (true) {
    answer = readline
      .question('\nPlay another hand? (Y)es or (N)o\n')
      .trim()
      .toLowerCase();
    if (['y', 'n'].includes(answer)) break;
    console.clear();
    console.log("Invalid choice! Enter 'Y' to play again or 'N' to quit.");
  }
  if (answer !== 'y') return false;
  return true;
}

console.clear();
console.log(`Welcome! Today we're playing to ${PLAY_TO}\n`);
while (true) {
  let deck = shuffle(initializeDeck());
  let [playerHand, dealerHand] = deal(deck);
  let playerHandTotal = calculateHand(playerHand);
  while (true) {
    let action;
    while (true) {
      displayHands(playerHand, dealerHand);
      console.log(`Your hand counts ${playerHandTotal} points.\n`);
      action = readline.question('(H)it or (S)tay?\n').trim().toLowerCase();
      if (['s', 'h'].includes(action)) break;
      displayHands(playerHand, dealerHand);
      console.log("Invalid choice! Enter 'H' to hit or 'S' to stay.");
    }
    if (action === 's') break;
    hit(playerHand, deck);
    playerHandTotal = calculateHand(playerHand);
    if (playerHandTotal > PLAY_TO) {
      break;
    }
    console.clear();
  }

  if (playerHandTotal <= PLAY_TO) {
    displayHands(playerHand, dealerHand, 1);
    dealerLogic(dealerHand, deck);
  }

  console.clear();
  displayHands(playerHand, dealerHand, 1);
  displayResult(playerHandTotal, calculateHand(dealerHand));

  if (!playAgain()) break;
  console.clear();
}

console.clear();
console.log(`Thanks for playing ${PLAY_TO}. Have a great day!\n`);
