import { parseFileRows } from "../parseFile.js";

const grid = parseFileRows();

let count = 0;

function checkValid(row, col) {
  //Check top left should be M or S
  // If it is then the diagonal should be opposite
  // Check top right same process

  let valid = false;

  const topLeft = grid[row - 1][col - 1];
  const topRight = grid[row - 1][col + 1];
  const bottomLeft = grid[row + 1][col - 1];
  const bottomRight = grid[row + 1][col + 1];

  if (
    (topLeft === "M" && bottomRight === "S") ||
    (topLeft === "S" && bottomRight === "M")
  ) {
    if (
      (topRight === "M" && bottomLeft === "S") ||
      (topRight === "S" && bottomLeft === "M")
    ) {
      valid = true;
    }
  }
  return valid;
}

//avoid edges
for (let i = 1; i < grid.length - 1; i++) {
  for (let j = 1; j < grid[0].length - 1; j++) {
    if (grid[i][j] === "A") {
      checkValid(i, j) && count++;
    }
  }
}

console.log(count);
