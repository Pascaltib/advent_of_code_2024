import fs from "fs";

// const string =
//   "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))";

const string = fs.readFileSync("./adventData.txt", "utf-8");

const re = /mul\((\d{1,3}),(\d{1,3})\)|do\(\)|don't\(\)/g;

const matches = string.matchAll(re);

// log matches
let sum = 0;
let enabled = true;
for (const match of matches) {
  // console.log(enabled);
  // console.log(match);
  if (match[0] === "don't()") {
    enabled = false;
  } else if (match[0] === "do()") {
    enabled = true;
  } else {
    if (enabled) {
      sum += match[1] * match[2];
    }
  }
}

console.log(sum);
