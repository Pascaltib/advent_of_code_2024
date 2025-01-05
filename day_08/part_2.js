import fs from "fs";

const fileContents = fs.readFileSync("./adventData.txt", "utf-8").trim();

const uniqueCharacters = [...new Set(fileContents)].filter(
  (value) => value !== "\n" && value !== "."
);

console.log(uniqueCharacters);

const grid = fileContents.split("\n").map((val) => val.split(""));

let resultPoints = [];
for (const char of uniqueCharacters) {
  let charPositions = [];
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === char) {
        charPositions.push([i, j]);
        resultPoints.push([i, j]);
      }
    }
  }

  // possible combinations
  let pairs = [];
  for (let i = 0; i < charPositions.length; i++) {
    for (let j = i + 1; j < charPositions.length; j++) {
      pairs.push([charPositions[i], charPositions[j]]);
    }
  }

  for (const pair of pairs) {
    const coor0 = pair[0];
    const coor1 = pair[1];
    const result = [coor0[0] - coor1[0], coor0[1] - coor1[1]];

    let validPoint0 = true;
    let currentPoint0 = [coor0[0] + result[0], coor0[1] + result[1]];
    while (validPoint0) {
      if (
        currentPoint0[0] >= 0 &&
        currentPoint0[0] < grid.length &&
        currentPoint0[1] >= 0 &&
        currentPoint0[1] < grid[0].length
      ) {
        resultPoints.push(currentPoint0);
        currentPoint0 = [
          currentPoint0[0] + result[0],
          currentPoint0[1] + result[1],
        ];
      } else {
        validPoint0 = false;
      }
    }

    let validPoint1 = true;
    let currentPoint1 = [coor1[0] + -1 * result[0], coor1[1] + -1 * result[1]];
    while (validPoint1) {
      if (
        currentPoint1[0] >= 0 &&
        currentPoint1[0] < grid.length &&
        currentPoint1[1] >= 0 &&
        currentPoint1[1] < grid[0].length
      ) {
        resultPoints.push(currentPoint1);
        currentPoint1 = [
          currentPoint1[0] + -1 * result[0],
          currentPoint1[1] + -1 * result[1],
        ];
      } else {
        validPoint1 = false;
      }
    }
  }
}

// console.log(resultPoints);

const unique = Array.from(
  new Set(resultPoints.map((arr) => JSON.stringify(arr)))
).map((str) => JSON.parse(str));

console.log(unique.length);
