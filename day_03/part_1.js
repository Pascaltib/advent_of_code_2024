import fs from "fs";

// const string =
//   "xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))";

const string = fs.readFileSync("./adventData.txt", "utf-8");

const re = /mul\((\d{1,3}),(\d{1,3})\)/g;

const matches = string.matchAll(re);

// log matches
let sum = 0;
for (const match of matches) {
  sum += match[1] * match[2];
}

console.log(sum);

