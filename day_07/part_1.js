import fs from "fs";

const fileContents = fs.readFileSync("./adventData.txt", "utf-8");

const lines = fileContents.trim().split("\n");

let data = lines.map((line) => line.split(":"));

data = data.map((value) => [
  Number(value[0]),
  value[1].trim().split(" ").map(Number),
]);

let combinations = [];

function generateCombinations(n, current = []) {
  if (current.length === n) {
    combinations.push(current);
    return;
  }

  generateCombinations(n, [...current, true]);

  generateCombinations(n, [...current, false]);
}

let finalSum = 0;
for (const line of data) {
  const target = line[0];
  const values = line[1];
  combinations = [];
  generateCombinations(values.length - 1);

  for (const combos of combinations) {
    let sum = values[0];

    for (let i = 0; i < values.length - 1; i++) {
      if (combos[i]) {
        sum = sum + values[i + 1];
      } else {
        sum = sum * values[i + 1];
      }
    }

    if (sum === target) {
      finalSum += target;
      break;
    }
  }
}
console.log(finalSum);
