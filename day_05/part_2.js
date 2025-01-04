import fs from "fs";
function parseFile() {
  // Read the whole file as a string
  const fileContents = fs.readFileSync("./adventData.txt", "utf-8");

  // Split into ordering rules and update pages
  let [orderingRules, updatePages] = fileContents.trim().split("\n\n");

  orderingRules = orderingRules
    .split("\n")
    .map((value) => value.split("|").map(Number));

  updatePages = updatePages
    .split("\n")
    .map((value) => value.split(",").map(Number));

  return [orderingRules, updatePages];
}

const [orderingRules, updatePages] = parseFile();

const lessThanMe = {};
const moreThanMe = {};

for (let i = 0; i < orderingRules.length; i++) {
  if (!moreThanMe[orderingRules[i][0]]) {
    moreThanMe[orderingRules[i][0]] = [];
  }
  moreThanMe[orderingRules[i][0]].push(orderingRules[i][1]);

  if (!lessThanMe[orderingRules[i][1]]) {
    lessThanMe[orderingRules[i][1]] = [];
  }
  lessThanMe[orderingRules[i][1]].push(orderingRules[i][0]);
}

// console.log("lessThanMe", lessThanMe);
// console.log("moreThanMe", moreThanMe);

// lessThanMe {
//   '13': [ 97, 61, 29, 47, 75, 53 ],
//   '29': [ 75, 97, 53, 61, 47 ],
//   '47': [ 97, 75 ],
//   '53': [ 47, 75, 61, 97 ],
//   '61': [ 97, 47, 75 ],
//   '75': [ 97 ]
// }
// moreThanMe {
//   '29': [ 13 ],
//   '47': [ 53, 13, 61, 29 ],
//   '53': [ 29, 13 ],
//   '61': [ 13, 53, 29 ],
//   '75': [ 29, 53, 47, 61, 13 ],
//   '97': [ 13, 61, 47, 29, 53, 75 ]
// }
// 75,47,61,53,29
// 75,97,47,61,53
// breaks rule 97|75

let count = 0;
let invalidLines = [];
// let updatePages = [[75, 97, 47, 61, 53]];

for (let i = 0; i < updatePages.length; i++) {
  let validLine = true;

  for (let j = 0; j < updatePages[i].length; j++) {
    const val = updatePages[i][j];
    // console.log(val);
    //find related rules
    //none of the values in moreThanMe can be found moving forward
    // none of the values in lessThanMe can be found moving backwards
    let invalidForwardValues = false;
    if (lessThanMe[val] && j !== updatePages[i].length - 1) {
      for (let y = 0; y < lessThanMe[val].length; y++) {
        let unit = lessThanMe[val][y];
        if (updatePages[i].slice(j + 1).includes(unit)) {
          invalidForwardValues = true;
          break;
        }
      }
    }
    let invalidBackwardsValues = false;
    if (moreThanMe[val] && j !== 0) {
      invalidBackwardsValues = moreThanMe[val].some((value) => {
        updatePages[i].slice(0, j).includes(value);
      });
    }

    if (invalidForwardValues || invalidBackwardsValues) {
      validLine = false;
      break;
    }
  }
  if (validLine) {
    count += updatePages[i][Math.floor(updatePages[i].length / 2)];
  } else {
    invalidLines.push(updatePages[i]);
  }
}

count = 0;
function compareFn(a, b) {
  // console.log("comparing", a, b);
  // comparing 97 75
  console.log(lessThanMe[b]);
  if (lessThanMe[b] && lessThanMe[b].includes(a)) {
    // console.log("wrong order");
    return -1;
  }
  // console.log("dont change this order");
  return 0;
}

invalidLines = invalidLines.map((line) => line.sort(compareFn));

console.log(invalidLines);

for (let i = 0; i < invalidLines.length; i++) {
  count += invalidLines[i][Math.floor(invalidLines[i].length / 2)];
}

console.log(count);
// console.log(invalidLines[0]);

// console.log(invalidLines[0].sort(compareFn));
