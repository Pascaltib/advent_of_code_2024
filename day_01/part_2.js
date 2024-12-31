import { parseFileColumns } from "../parseFile.js";

const { col1, col2 } = parseFileColumns();

// const col1 = [3, 4, 2, 1, 3, 3];

// const col2 = [4, 3, 5, 3, 9, 3];

let sum = 0;
for (let i = 0; i < col1.length; i++) {
  const value = col1[i];
  const numMatches = col2.filter((item) => item === value).length;
  sum += numMatches * value;
}

console.log(sum);
