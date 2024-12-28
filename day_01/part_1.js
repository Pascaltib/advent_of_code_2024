import parseFile from "../parseFile.js";

const { col1, col2 } = parseFile();

// const col1 = [3, 4, 2, 1, 3, 3];

// const col2 = [4, 3, 5, 3, 9, 3];

const sorted_col1 = col1.sort((x, y) => x - y);
const sorted_col2 = col2.sort((x, y) => x - y);

let diff_sum = 0;
for (let i = 0; i < sorted_col1.length; i++) {
  diff_sum += Math.abs(sorted_col2[i] - sorted_col1[i]);
}

console.log(diff_sum);
