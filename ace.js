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
  console.log(aceCount);
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

console.log(
  calculateHand([
    ['D', 'A'],
    ['D', 'A'],
    ['D', 'A'],
    ['D', 'A'],
    ['D', 'A'],
    ['D', 'A'],
  ])
);
