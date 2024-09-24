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

function shuffle(deck) {
  let shuffledDeck = [];
  for (let i = 0; i < 52; i++) {
    let randomIndex = Math.floor(Math.random() * deck.length);
    let card = deck.splice(randomIndex, 1)[0];
    shuffledDeck.push(card);
  }
  return shuffledDeck;
}

let deck = initializeDeck();

deck = shuffle(deck);

console.log(deck);
