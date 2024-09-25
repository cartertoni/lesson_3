/*

1. Create a new array to store the palindromes
2. While the length of the new array is less than the required length (s)
  a)-Starting with num...
    i) -check if it is a palindrome
    ii) -If it is, add it to the new array
  b)-Increment num by one and return to step 2ai
3. Once the length of the palindrome array has reached the desired length, s, return the array

*/

function palindrome(num, s) {
  let palindromes = [];
  while (palindromes.length < s) {
    if (checkForPalindrome(num)) {
      palindromes.push(num);
    }
    num += 1;
  }
  return palindromes;
}

function checkForPalindrome(num) {
  return (
    num >= 10 && num.toString() === num.toString().split('').reverse().join('')
  );
}

console.log(palindrome(6, 4)); // [11,22,33,44]
console.log(palindrome(75, 1)); // [77]
console.log(palindrome(101, 2)); // [101,111]
console.log(palindrome(20, 0)); // []
console.log(palindrome(0, 4)); // [11,22,33,44]
