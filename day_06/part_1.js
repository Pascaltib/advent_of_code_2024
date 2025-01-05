import { parseFileRows } from "../parseFile.js";
import { performance } from "node:perf_hooks";

let grid = parseFileRows();

// console.log(grid);

// position = [row, column]
const startTime = performance.now();

let position;

for (let i = 0; i < grid.length; i++) {
  for (let j = 0; j < grid[0].length; j++) {
    if (grid[i][j] === "^") {
      position = [i, j];
    }
  }
}

let directions = {
  up: [-1, 0],
  right: [0, 1],
  down: [1, 0],
  left: [0, -1],
};
const directionOrder = ["up", "right", "down", "left"];

let currentDir = "up";
let inBoard = true;

while (inBoard) {
  let futurePos = [
    position[0] + directions[currentDir][0],
    position[1] + directions[currentDir][1],
  ];

  if (futurePos[0] < grid.length && futurePos[1] < grid[0].length) {
    if (
      grid[position[0] + directions[currentDir][0]][
        position[1] + directions[currentDir][1]
      ] === "#"
    ) {
      let currentIndex = directionOrder.indexOf(currentDir);
      currentIndex = (currentIndex + 1) % 4;
      currentDir = directionOrder[currentIndex];
    } else {
      grid[position[0]][position[1]] = "X";
      position = futurePos;
    }
  } else {
    grid[position[0]][position[1]] = "X";
    inBoard = false;
  }
}

let count = 0;
grid = grid.map((line) => line.join(""));

for (let i = 0; i < grid.length; i++) {
  count += (grid[i].match(/X/g) || []).length;
}

console.log(count);

console.log("Time = ", performance.now() - startTime);
