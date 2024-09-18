// function joinOr(list, delimiter = ', ', word = 'or ') {
//   let formattedList = '';
//   for (let index = 0; index < list.length; index++) {
//     let currentItem = list[index];
//     if (index === 0) {
//       formattedList += currentItem;
//     } else if (index === 1 && list.length === 2) {
//       formattedList += ` ${word}${currentItem}`;
//     } else if (index === list.length - 1) {
//       formattedList += `${delimiter}${word}${currentItem}`;
//     } else {
//       formattedList += `${delimiter}${currentItem}`;
//     }
//   }
//   return formattedList;
// }

console.log(joinOr([1, 2, 3])); // => "1, 2, or 3"
console.log(joinOr([1, 2, 3], '; ')); // => "1; 2; or 3"
console.log(joinOr([1, 2, 3], ', ', 'and ')); // => "1, 2, and 3"
console.log(joinOr([])); // => ""
console.log(joinOr([5])); // => "5"
console.log(joinOr([1, 2])); // => "1 or 2"

// REFACTORED

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
