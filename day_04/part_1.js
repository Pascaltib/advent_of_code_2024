import { parseFileRows } from "../parseFile.js";

const grid = parseFileRows();

// console.log(grid);

//She only has to find one word: XMAS.
// This word search allows words to be horizontal, vertical, diagonal, written backwards, or even overlapping other words. It's a little unusual, though, as you don't merely need to find one instance of XMAS - you need to find all of them. Here are a few ways XMAS might appear, where irrelevant characters have been replaced with .:

// Answer is 18

// ....XXMAS.
// .SAMXMS...
// ...S..A...
// ..A.A.MS.X
// XMASAMX.MM
// X.....XA.A
// S.S.S.S.SS
// .A.A.A.A.A
// ..M.M.M.MM
// .X.X.XMASX

let count = 0;

// horizontal, vertical, diagonal, written backwards, or even overlapping other words.

// 8 directions

// right
for (let i = 0; i < grid.length; i++) {
  count += (grid[i].join("").match(/XMAS/g) || []).length;
}

// left
for (let i = 0; i < grid.length; i++) {
  count += (grid[i].reverse().join("").match(/XMAS/g) || []).length;
}

// down
const down = [];
for (let i = 0; i < grid[0].length; i++) {
  let string = "";
  for (let j = 0; j < grid.length; j++) {
    string += grid[j][i];
  }
  // down.push(string);
  count += (string.match(/XMAS/g) || []).length;
}

// for (let i = 0; i < down.length; i++) {
//   down[i].match(/XMAS/g) ? count++ : null;
// }

// up
const up = [];
for (let i = 0; i < grid[0].length; i++) {
  let string = "";
  for (let j = grid.length - 1; j >= 0; j--) {
    string += grid[j][i];
  }
  count += (string.match(/XMAS/g) || []).length;

  // up.push(string);
}

// for (let i = 0; i < up.length; i++) {
//   up[i].match(/XMAS/g) ? count++ : null;
// }

// to top right and to bottom left
// here ill start at the bottom right corner and go top right then when im done
// ill increment the column and do it again until I finish the bottom right corner of diagonals
for (let i = 0; i < grid[0].length; i++) {
  let diagonal = [];
  let row = grid.length - 1;
  let col = i;
  while (row >= 0 && col < grid[0].length) {
    diagonal.push(grid[row][col]);
    col++;
    row--;
  }
  count += (diagonal.join("").match(/XMAS/g) || []).length;
  count += (diagonal.reverse().join("").match(/XMAS/g) || []).length;
}

// top left half of diagonals
for (let i = grid.length - 2; i >= 0; i--) {
  let diagonal = [];
  let row = i;
  let col = 0;
  while (col < grid[0].length && row >= 0) {
    diagonal.push(grid[row][col]);
    col++;
    row--;
  }
  count += (diagonal.join("").match(/XMAS/g) || []).length;
  count += (diagonal.reverse().join("").match(/XMAS/g) || []).length;
}

// Here I will do towards top left and towards bottom right

for (let i = grid[0].length - 1; i >= 0; i--) {
  let diagonal = [];
  let col = i;
  let row = grid.length - 1;
  while (row >= 0 && col >= 0) {
    diagonal.push(grid[row][col]);
    col--;
    row--;
  }
  count += (diagonal.join("").match(/XMAS/g) || []).length;
  count += (diagonal.reverse().join("").match(/XMAS/g) || []).length;
}

for (let i = grid.length - 2; i >= 0; i--) {
  let diagonal = [];
  let col = grid[0].length - 1;
  let row = i;
  while (col >= 0 && row >= 0) {
    diagonal.push(grid[row][col]);
    col--;
    row--;
  }
  count += (diagonal.join("").match(/XMAS/g) || []).length;
  count += (diagonal.reverse().join("").match(/XMAS/g) || []).length;
}

console.log(count);
// 1222 too low :(
