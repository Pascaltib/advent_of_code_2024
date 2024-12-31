import { parseFileRows } from "../parseFile.js";

const rows = parseFileRows();

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

for (let i = 0; i < rows.length; i++) {
  let row = rows[i];
  // console.log(row);
  let increasing;
  let valid = true;
  for (let j = 1; j < row.length; j++) {
    if (j === 1) {
      increasing = row[j - 1] > row[j];
    }
    const diff = row[j - 1] - row[j];
    const absDiff = Math.abs(diff);
    if (absDiff < 1 || absDiff > 3) {
      // console.log("Invalid diff", absDiff);
      valid = false;
    }
    if ((diff > 0 && !increasing) || (diff < 0 && increasing)) {
      // console.log("Invalid direction", diff);
      valid = false;
    }
  }
  if (valid) {
    finalCount++;
  }
}

console.log(finalCount);
