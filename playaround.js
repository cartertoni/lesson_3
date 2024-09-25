let score1 = 1;
let score2 = 2;

function calculateScore(score) {
  return score * 3;
}
let obj = {
  'Score 1': calculateScore(score1),
  'Score 2': calculateScore(score2),
};

console.log(obj);
