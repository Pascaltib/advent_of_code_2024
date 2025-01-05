import { parentPort, workerData } from "node:worker_threads";

function tryToSolve(grid, position) {
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

    if (
      futurePos[0] >= 0 &&
      futurePos[1] >= 0 &&
      futurePos[0] < grid.length &&
      futurePos[1] < grid[0].length
    ) {
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
  return "Solved";
}

// Run the logic and post message back to the parent
try {
  const result = tryToSolve(workerData.grid, workerData.position);
  parentPort.postMessage({ success: true, result });
} catch (error) {
  parentPort.postMessage({ success: false, error });
}
