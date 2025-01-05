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

  generateCombinations(n, [...current, 0]);

  generateCombinations(n, [...current, 1]);

  generateCombinations(n, [...current, 2]);
}

let finalSum = 0;
for (const line of data) {
  const target = line[0];
  const values = line[1];
  combinations = [];
  generateCombinations(values.length - 1);

  // console.log(combinations);

  for (const combos of combinations) {
    let sum = values[0];

    for (let i = 0; i < values.length - 1; i++) {
      if (combos[i] === 0) {
        sum = sum + values[i + 1];
      } else if (combos[i] === 1) {
        sum = sum * values[i + 1];
      } else {
        sum = Number(String(sum) + String(values[i + 1]));
      }
    }

    if (sum === target) {
      finalSum += target;
      break;
    }
  }
}
console.log(finalSum);
