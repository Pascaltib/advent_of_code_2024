import { parseFileRows } from "../parseFile.js";
import { Worker } from "node:worker_threads";

function runTryToSolve(grid, position, timeLimitMs = 500) {
  return new Promise((resolve, reject) => {
    const worker = new Worker(new URL("./worker.js", import.meta.url), {
      workerData: { grid, position },
    });

    // If the worker doesn't finish in timeLimitMs, kill it.
    const timeout = setTimeout(() => {
      worker.terminate();
      reject(new Error("Timed out"));
    }, timeLimitMs);

    worker.on("message", (message) => {
      clearTimeout(timeout);
      if (message.success) {
        resolve(message.result);
      } else {
        reject(new Error(message.error));
      }
    });

    worker.on("error", (error) => {
      clearTimeout(timeout);
      reject(error);
    });

    worker.on("exit", (code) => {
      if (code !== 0) {
        clearTimeout(timeout);
        reject(new Error(`Worker stopped with exit code ${code}`));
      }
    });
  });
}

let grid = parseFileRows();

let infiniteLoopCount = 0;

let position;

for (let i = 0; i < grid.length; i++) {
  for (let j = 0; j < grid[0].length; j++) {
    if (grid[i][j] === "^") {
      position = [i, j];
    }
  }
}

for (let i = 0; i < grid.length; i++) {
  for (let j = 0; j < grid[0].length; j++) {
    if (grid[i][j] === ".") {
      grid[i][j] = "#";
      try {
        // Attempt to solve with a 30ms limit
        const result = await runTryToSolve(grid, position, 500);
        console.log(`Cell [${i}, ${j}] solved:`, result);
      } catch (err) {
        // If it times out (or errors), increment infiniteLoopCount or revert the cell, etc.
        infiniteLoopCount++;
        console.warn(`Cell [${i}, ${j}] timed out or failed:`, err.message);
      }
      grid[i][j] = ".";
    }
  }
}

console.log(infiniteLoopCount);
