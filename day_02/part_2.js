import { parseFileRows } from "../parseFile.js";

const rows = parseFileRows();

// take first 5 rows

// const rows = something.slice(20, 25);

// const rows = [[27, 24, 26, 29, 30, 33, 36]];

// const rows = [
//   [7, 6, 4, 2, 1],
//   [1, 2, 7, 8, 9],
//   [9, 7, 6, 2, 1],
//   [1, 3, 2, 4, 5],
//   [8, 6, 4, 4, 1],
//   [1, 3, 6, 7, 9],
// ];

// All increasing or decreasing
// Diff of at least one and at most three

let finalCount = 0;

function checkValid(arr) {
  console.log(arr);
  let increasing;
  let valid = true;
  for (let i = 1; i < arr.length; i++) {
    if (i === 1) {
      increasing = arr[i - 1] < arr[i];
      console.log("increasing", increasing);
    }
    const diff = arr[i - 1] - arr[i];
    const absDiff = Math.abs(diff);
    if (absDiff < 1 || absDiff > 3) {
      console.log("Invalid diff", absDiff);

      return false;

      // if (checkValid(arr.toSpliced(i - 1, 1), 1)) {
      //   return true;
      // } else {
      //   return checkValid(arr.toSpliced(i, 1), 1);
      // }
    }
    if ((diff > 0 && increasing) || (diff < 0 && !increasing)) {
      console.log("Invalid direction", diff);

      return false;
      // if (checkValid(arr.toSpliced(i - 1, 1), 1)) {
      //   return true;
      // } else {
      //   return checkValid(arr.toSpliced(i, 1), 1);
      // }
    }
  }
  return valid;
}

for (let i = 0; i < rows.length; i++) {
  let row = rows[i];
  const valid = checkValid(row);
  if (valid) {
    finalCount++;
  } else {
    let secondCheck = false;
    for (let j = 0; j < row.length; j++) {
      if (checkValid(row.toSpliced(j, 1))) {
        secondCheck = true;
        break;
      }
    }
    if (secondCheck) {
      finalCount++;
    }
  }
}

console.log(finalCount);
